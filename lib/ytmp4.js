const fetch = require('node-fetch');

module.exports = async (msg, url) => {
    if (!url) {
        return msg.reply('Please provide a YouTube URL!');
    }

    try {
        const response = await fetch(`https://api.example.com/ytmp4?url=${url}`);
        const data = await response.json();

        if (data.success) {
            return msg.reply(`Download started! Here's your link: ${data.downloadUrl}`);
        } else {
            return msg.reply(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error(error);
        return msg.reply('An unexpected error occurred.');
    }
};
