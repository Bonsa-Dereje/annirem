require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN);
const chatId = process.env.CHAT_ID;

let messageInterval = null;

// Function that sends the correct message
function sendReminder(day) {
    if (day === 17) {
        bot.sendMessage(
            chatId,
            "2 DAYS BEFORE ANNIVERSARY. Have you written a longgg text yet?"
        );
    }

    if (day === 18) {
        bot.sendMessage(
            chatId,
            "TOMORROW IS ANNIVERSARY. Any plans for the big day?"
        );
    }

    if (day === 19) {
        bot.sendMessage(
            chatId,
            "TODAY IS THE DAY. Everything ready?"
        );
    }
}

// Function that sets interval based on day
function updateSchedule() {
    const now = new Date();
    const day = now.getDate();

    // Clear previous interval to avoid stacking
    if (messageInterval) {
        clearInterval(messageInterval);
        messageInterval = null;
    }

    let intervalTime = null;

    // 17th -> every 6 hours
    if (day === 17) {
        intervalTime = 6 * 60 * 60 * 1000;
    }

    // 18th -> every 4 hours
    else if (day === 18) {
        intervalTime = 4 * 60 * 60 * 1000;
    }

    // 19th -> every 3 hours
    else if (day === 19) {
        intervalTime = 3 * 60 * 60 * 1000;
    }

    if (intervalTime) {
        // Send immediately when setting up
        sendReminder(day);

        // Then schedule repeating messages
        messageInterval = setInterval(() => {
            sendReminder(day);
        }, intervalTime);
    }
}

// Check every 30 minutes to adjust schedule if day changes
setInterval(updateSchedule, 30 * 60 * 1000);

// Run immediately on startup
updateSchedule();