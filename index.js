require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN);

const chatId = process.env.CHAT_ID;

// Send TEST message every 20 seconds
setInterval(() => {
    bot.sendMessage(chatId, "TEST TEST 🚨");
    console.log("Sent TEST message");
}, 20000);