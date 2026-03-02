const mineflayer = require('mineflayer');
const http = require('http');

// --- WEB SERVER FOR RENDER ---
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is Active');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT);

// --- MINECRAFT BOT ---
const botArgs = {
  host: process.env.SERVER_ADDRESS,       // Use ENV
  port: parseInt(process.env.SERVER_PORT) || 25565, 
  username: process.env.BOT_NAME || 'goonergirl123',
  version: '1.21.1',                 // Update if server version changes
  auth: 'offline'
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log(`✅ ${botArgs.username} joined ${botArgs.host}`);
    // Anti-AFK loop
    setInterval(() => {
      bot.swingArm('right');
    }, 20000);
  });

  // Auto-restart logic for Render
  bot.on('end', () => {
    console.log('Disconnected. Restarting...');
    setTimeout(createBot, 5000); 
  });

  bot.on('error', (err) => console.log('Error:', err.message));
}

createBot();