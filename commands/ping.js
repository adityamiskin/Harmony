const {
    execute
} = require("./leave");

module.exports = {
    name: "ping",
    description: "pings the channel",
    async execute(client, message, args) {
        message.channel.send("pong!");
    }
};