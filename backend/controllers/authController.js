const axios = require('axios');
require('dotenv').config();
const Account = require('../models/Account');
const jsonwebtoken = require('jsonwebtoken');

const getAccountIDFromLightfunnels = async (accessToken) => {
    try {
        // add authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        const response = await axios.post('https://services.lightfunnels.com/api2', {
            query: `
                query accountQuery {
                    account {
                        id
                    }
                }
            `
        });

        return response.data.data.account.id;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving account ID from Lightfunnels');
    }
};

const auth = async (req, res) => {
    const lfClientID = process.env.LF_CLIENT_ID;
    const lfScopes = process.env.LF_SCOPES;
    const backendURL = process.env.BACKEND_URL;

    const consentLink = `https://app.lightfunnels.com/admin/oauth?client_id=${lfClientID}&redirect_uri=${backendURL}/auth/redirect&scope=${lfScopes}&state=xxx`;

    // redirect to consentLink
    return res.redirect(consentLink);
};

const redirect = async (req, res) => {
    // get code from query string
    const code = req.query.code;

    const lfClientID = process.env.LF_CLIENT_ID;
    const lfClientSecret = process.env.LF_CLIENT_SECRET;
    const backendURL = process.env.BACKEND_URL;

    try {
        const response = await axios.post('https://api.lightfunnels.com/oauth/access_token', {
            client_id: lfClientID,
            client_secret: lfClientSecret,
            code: code
        });

        const accessToken = response.data.access_token;
        const backendURL = process.env.BACKEND_URL;

        if (accessToken) {
            const LFAccountID = await getAccountIDFromLightfunnels(accessToken);

            const account = await Account.findOne({
                where: {
                    lf_id: LFAccountID
                }
            });

            if (account) {
                // account already exists

                account.lf_token = accessToken;

                if (account.status === 'UNINSTALLED') {
                    account.status = 'INSTALLED';
                    createWebhooks(account, `${backendURL}/webhook/order`, 'order/confirmed');
                    createWebhooks(account, `${backendURL}/webhook/uninstall`, 'app/uninstalled');
                }

                await account.save();

            }
            else {

                // create the account
                account = await Account.create({
                    lf_id: LFAccountID,
                    lf_token: accessToken
                });

                createWebhooks(account, `${backendURL}/webhook/order`, 'order/confirmed');
                createWebhooks(account, `${backendURL}/webhook/uninstall`, 'app/uninstall');

            }

            // create a jwt with the account id
            const token = jsonwebtoken.sign({
                account_id: account.id
            }, process.env.JWT_SECRET);

            // redirect to frontend with jwt
            return res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);

        }
        else {
            throw new Error('Error retrieving access token');
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send('Error retrieving access token');
    }
};

async function createWebhooks(account, url, event) {
    let data = JSON.stringify({
        query: `mutation CreateWebhookMutation($node: WebhookInput!) {
                createWebhook(node: $node) {
                    type
                    url
                }
            }`,
        variables: { "node": { "type": event,
            "url": url, settings:{} } }
    });

    let config = {
        method: 'post',
        url: 'https://services.lightfunnels.com/api/v2',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + account.lf_token
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    auth,
    redirect
};
