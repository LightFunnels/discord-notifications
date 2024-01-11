const { v4: uuidv4 } = require('uuid');
const getAllChannels = async (req, res) => {
    const account = req.account;
    return res.json(JSON.parse(account.discordChannels));
};

// Function to get a specific channel by ID
const getChannelById = (req, res) => {
    // get channel by id
    const id = req.params.id;

    // get the account instance from req.account
    const account = req.account;

    // get the discordChannels from the account instance
    const discordChannels = JSON.parse(account.discordChannels);

    // find the channel with the given id
    const channel = discordChannels.find(channel => channel.id == id);

    // return the channel
    return res.json(channel);

};

// Function to create a new channel
const createChannel = (req, res) => {
    // create a new channel from req.body
    const channel = req.body;

    // generate a unique ID for the new channel
    const id = uuidv4();
    channel.id = id;

    // get the account instance from req.account
    const account = req.account;

    // get the discordChannels from the account instance
    const discordChannels = JSON.parse(account.discordChannels);

    // add the new channel to the discordChannels array
    discordChannels.push(channel);

    // update the account instance with the new discordChannels
    account.discordChannels = discordChannels;

    // save the account instance
    account.save();

    // return the new channel
    return res.json(channel);
};

// Function to update a channel
const updateChannel = (req, res) => {
    // get channel by id
    const id = req.params.id;

    // get the account instance from req.account
    const account = req.account;

    // get the discordChannels from the account instance
    const discordChannels = JSON.parse(account.discordChannels);

    // find the index of the channel with the given id
    const channelIndex = discordChannels.findIndex(channel => channel.id == id);

    // if the channel is found
    if (channelIndex !== -1) {
        // update the channel with the new data from req.body
        discordChannels[channelIndex] = {
            ...discordChannels[channelIndex],
            ...req.body
        };

        // update the account instance with the updated discordChannels
        account.discordChannels = discordChannels;

        // save the account instance
        account.save();

        // return the updated channel
        return res.json(discordChannels[channelIndex]);
    } else {
        // if the channel is not found, return an error
        return res.status(404).json({ error: 'Channel not found' });
    }
};

// Function to delete a channel
const deleteChannel = (req, res) => {
    // get channel by id
    const id = req.params.id;

    // get the account instance from req.account
    const account = req.account;

    // get the discordChannels from the account instance
    const discordChannels = JSON.parse(account.discordChannels);

    // find the index of the channel with the given id
    const channelIndex = discordChannels.findIndex(channel => channel.id == id);

    // if the channel is found
    if (channelIndex !== -1) {
        // remove the channel from the discordChannels array
        discordChannels.splice(channelIndex, 1);

        // update the account instance with the updated discordChannels
        account.discordChannels = discordChannels;

        // save the account instance
        account.save();

        // return success message
        return res.json({ message: 'Channel deleted successfully' });
    } else {
        // if the channel is not found, return an error
        return res.status(404).json({ error: 'Channel not found' });
    }
};

// Export the functions
module.exports = {
    getAllChannels,
    getChannelById,
    createChannel,
    updateChannel,
    deleteChannel
};
