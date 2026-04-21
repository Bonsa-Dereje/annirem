require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN);
const chatId = process.env.CHAT_ID;

function checkDateAndSend() {
    const now = new Date();
    const day = now.getDate();

    // 2 days before (17th)
    if (day === 17) {
        bot.sendMessage(chatId, "⏳ 2 DAYS BEFORE ANNIVERSARY!!!");
    }

    // 1 day before (18th)
    if (day === 18) {
        bot.sendMessage(chatId, "🔥 TOMORROW IS ANNIVERSARY!!!");
    }
}

// Check every hour
setInterval(checkDateAndSend, 60 * 60 * 1000);

// Run immediately too
checkDateAndSend();