const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = async (msg, url) => {
    if (!url) {
        return msg.reply('Please provide a YouTube URL!');
    }

    try {
        msg.reply('Downloading video...');

        const stream = ytdl(url, { quality: 'highestvideo' });
        const videoPath = `video-${Date.now()}.mp4`;

        stream.pipe(fs.createWriteStream(videoPath));

        stream.on('end', () => {
            msg.reply('Video downloaded! Sending now...');
            msg.reply({
                video: fs.readFileSync(videoPath),
                caption: 'Here is your video!'
            });
            fs.unlinkSync(videoPath);
        });

        stream.on('error', (error) => {
            console.error('Error downloading video:', error);
            msg.reply('An error occurred during download.');
        });
    } catch (error) {
        console.error('Error starting download:', error);
        msg.reply('An unexpected error occurred. Please ensure the URL is valid.');
    }
};

