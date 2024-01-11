const Account = require('../models/Account');
const crypto = require('crypto');

const orderWebhook = async (req, res) => {
    if(!await verifyWebhook(req)){
        return res.status(401).json({ error: 'Invalid webhook' });
    }

    // get order info
    const order = req.body.node;

    console.log("Order webhook", order);

    const accountID = order.account_id;
    const account = await Account.findOne({
        where: {
            lf_id: accountID
        }
    });

    if (!account) {
        return res.status(404).json({ error: 'Account not found' });
    }

    // send discord notification to active channels
    const discordChannels = JSON.parse(account.discordChannels);
    discordChannels.forEach(channel => {
        if (channel.active) {
            const message = formatOrderMessage(order);
            sendDiscordNotification(message, channel.url);
            //increase channel total
            channel.total++;
        }
    });

    // update discordChannels
    account.discordChannels = discordChannels;
    await account.save();

    return res.send('Order webhook received');
};

function formatOrderMessage(order) {
    const testIndicator = order.test ? "🚧 **Test Order**" : "";

    return `${testIndicator} ✨ **New Order!**
    \`\`\`json
    {
      🆔 OrderID: ${order.id},
      📅 OrderDate: ${order.created_at},
      👤 Customer: ${order.customer.full_name} (${order.customer.email}),
      📞 Phone: ${order.phone},
      🛒 Total: $${order.total.toFixed(2)},
      💳 Payments: $${order.payments.map(payment => payment.total).join(', ')},
      📦 Shipping: $${order.shipping},
      📍 ShippingAddress: ${order.shipping_address.line1}, ${order.shipping_address.city}, ${order.shipping_address.country}
    }
    \`\`\`
    ✅ **Order successfully processed!**`;
}

function sendDiscordNotification(message, url) {
    const axios = require('axios');

    axios.post(url, {
        content: message
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
}

const uninstallWebhook = async (req, res) => {
    if(!await verifyWebhook(req)){
        return res.status(401).json({ error: 'Invalid webhook' });
    }

    console.log("Uninstalled webhook", req.body);

    const accountID = req.body.node.id;
    const account = await Account.findOne({
        where: {
            lf_id: accountID
        }
    });

    account.status = 'UNINSTALLED';
    account.save();

    return res.send('Uninstall webhook');
};

// This function verifies the webhook using the lightfunnels-hmac header
const verifyWebhook = async (req) => {

    // calculate the hmac
    const localyCalculatedHmac = crypto
    .createHmac("sha256", process.env.LF_CLIENT_SECRET)
    .update(JSON.stringify(req.body), "utf8")
    .digest("base64");

    // check if the hmac is the same as the one in the lightfunnels-hmac header
    const hmac = req.headers["lightfunnels-hmac"];
    if(localyCalculatedHmac != hmac){
        // this webhook is fishy, abort!
        return false;
    }

    return true;
}

// Export the functions
module.exports = {
    orderWebhook,
    uninstallWebhook
};
