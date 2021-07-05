require("dotenv").config();

const key = process.env.TENOR_KEY;
const fetch = require("node-fetch");
const {
    execute
} = require("./leave");

module.exports = {
    name: "gif",
    description: "sends gif to the channel",
    async execute(client, message, args) {
        let keywords = "annoyed";
        if (args.length > 0) {
            keywords = args.join(" ");
        }
        message.channel.send("sending...");

        let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${key}&limit=8`;
        let response = await fetch(url);
        let json = await response.json();
        message.channel.send(json.results[0].url);
    }
}