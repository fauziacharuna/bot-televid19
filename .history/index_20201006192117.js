let telegramBot = require('node-telegram-bot-api');

//connecting to telegram 
telegram = new telegramBot("899300765:AAHUwow_IswqMJqyVYHmTUAc1-_4gjGdCqo",{
    polling: true, 
});
telegram.on("text", (message) =>{
    telegram.sendMessage(message.chat.id, "Hi " + message.chat.first_name + " Its working");
});

