const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'AUD_minecraft.aternos.me', 
  port: 37538,
  username: 'AFK_Worker', 
  version: '1.21.11',   // Explicitly set for the Mounts of Mayhem update
  auth: 'offline'       // Use 'offline' for Aternos cracked servers
});

bot.on('spawn', () => {
  console.log('✅ Bot joined 1.21.11 server.');
  
  // Anti-AFK Routine: Moves and swings arm every 30 seconds
  setInterval(() => {
    // Swing arm (visual activity)
    bot.swingArm('right');
    
    // Tiny jump
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
    
    console.log('Performed anti-kick action.');
  }, 30000); 
});

// Error handling to prevent the script from crashing
bot.on('error', (err) => console.log(`Error: ${err.message}`));
bot.on('kicked', (reason) => console.log(`Kicked for: ${reason}`));