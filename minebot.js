require('dotenv').config(); // Load variables from Render/Env
const mineflayer = require('mineflayer');
const http = require('http');

// Render health check
http.createServer((req, res) => { res.end('Bot logic is active'); }).listen(process.env.PORT || 3000);

// Log variables to Render console for debugging (Don't log passwords!)
console.log(`Targeting: ${process.env.SERVER_ADDRESS} on port ${process.env.SERVER_PORT}`);

if (!process.env.SERVER_ADDRESS) {
    console.error("❌ FATAL ERROR: SERVER_ADDRESS is not set in Render Environment Variables!");
    process.exit(1); 
}

const botArgs = {
  host: process.env.SERVER_ADDRESS,
  port: parseInt(process.env.SERVER_PORT) || 25565,
  username: process.env.BOT_NAME || 'goonergirl123',
  version: '1.21.11', // <--- Change this exact line
  auth: 'offline'
};


function createBot() {
  const bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => console.log('✅ Bot joined successfully!'));
  
  bot.on('error', (err) => {
    console.log(`❌ Connection Error: ${err.code}`);
    if (err.code === 'ECONNREFUSED' && err.address === '127.0.0.1') {
        console.log("👉 Still connecting to localhost. Check Render 'Environment' tab!");
    }
  });

  bot.on('end', () => setTimeout(createBot, 10000));
}

createBot();