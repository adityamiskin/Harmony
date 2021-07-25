const fetch = require('node-fetch');

module.exports = {
  name: 'memes',
  description: 'gets memes from reddit',
  async execute(client, message, args, Discord) {
    fetch('https://www.reddit.com/r/memes/hot.json')
      .then((res) => res.json())
      .then((data) => {
        const rand = Math.floor(Math.random() * 25 + 1);
        const fullURL = 'https://www.reddit.com/';
        const link = data.data.children[rand].data;

        const memeEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(link.title)
          .setURL(fullURL + link.permalink)
          .setImage(link.url)
          .setFooter(`👍 ${link.ups} | 💬 ${link.num_comments}`);
        message.channel.send(memeEmbed);
      })
      .catch((err) => console.log(err));
  }
};
