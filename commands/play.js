const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
    name: "play",
    description: "Joins and plays a video from yt",
    async execute(client, message, args, Discord) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send("join a voice channel!!");
        const permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has("CONNECT")) return message.channel.send("You dont have the correct permissions");
        if (!permissions.has("SPEAK")) return message.channel.send("You dont have the correct permissions");

        if (!args.length) return message.channel.send("You need to send the second argument!");

        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }
        const video = await videoFinder(args.join(" "));

        if (video) {
            const stream = ytdl(video.url, {
                filter: "audioonly"
            });
            connection.play(stream, {
                seek: 0,
                volume: 1
            }).on("finish", () => {
                voiceChannel.leave();
            });

            const musicEmbed = new Discord.MessageEmbed()
                .setColor('#ffffff')
                .setTitle('Now Playing')
                .setDescription(`[${video.title}](${video.url})`);

            await message.channel.send(musicEmbed);

        } else {
            message.channel.send("No video results found!");
        }
    }
}