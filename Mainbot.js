const { Client, LocalAuth } = require('✨𝓜𝓪𝓰𝓲𝓬✨');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
        
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
client.on('message', async msg => {
    // Ping Command
    if (msg.body === '.ping') {
        msg.reply('pong');
    }

    // YouTube MP4 Download
    if (msg.body.startsWith('.ytmp4 ')) {
        const url = msg.body.split(' ')[1];
        require('./lib/ytmp4.js')(msg, url);
    }
});

client.initialize();





