require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN);
const chatId = process.env.CHAT_ID;

let messageInterval = null;

// Send messages based on day
function sendReminder(day) {
    if (day === 17) {
        bot.sendMessage(chatId, "2 DAYS BEFORE ANNIVERSARY. Have you written a longgg text yet?");
    }

    if (day === 18) {
        bot.sendMessage(chatId, "TOMORROW IS ANNIVERSARY. Any plans for the big day?");
    }

    if (day === 19) {
        bot.sendMessage(chatId, "TODAY IS THE DAY. Everything ready?");
    }

    if (day === 21) {
        const now = new Date();
        bot.sendMessage(chatId, `What day is it? It is day ${now.getDate()}`);
    }
}

// Scheduler
function updateSchedule() {
    const now = new Date();
    const day = now.getDate();

    // clear old interval safely
    if (messageInterval) {
        clearInterval(messageInterval);
        messageInterval = null;
    }

    let intervalTime = null;

    if (day === 17) {
        intervalTime = 3 * 60 * 60 * 1000;
    } 
    else if (day === 18) {
        intervalTime = 2 * 60 * 60 * 1000;
    } 
    else if (day === 19) {
        intervalTime = 1 * 60 * 60 * 1000;
    } 
    else if (day === 21) {
        intervalTime = 5 * 1000;

        let count = 0;
        const maxMessages = 20;

        messageInterval = setInterval(() => {
            if (count >= maxMessages) {
                clearInterval(messageInterval);
                messageInterval = null;
                return;
            }

            sendReminder(day);
            count++;
        }, intervalTime);

        // 🔥 print what day was evaluated
        console.log(`Checked day: ${day}`);
        return;
    }

    if (intervalTime) {
        sendReminder(day);

        messageInterval = setInterval(() => {
            sendReminder(day);
        }, intervalTime);
    }

    // 🔥 THIS is what you asked for:
    console.log(`Checked day: ${day}`);
}

// Re-check schedule every 30 minutes
setInterval(updateSchedule, 30 * 60 * 1000);

// Run immediately on startup
updateSchedule();