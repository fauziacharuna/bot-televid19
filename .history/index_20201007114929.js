const dotenv = require('dotenv');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => res.send('<h2> Hello World! </h2>'));
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

dotenv.config('.env');

let telegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
const fetch = require("node-fetch");

//connecting to telegram 
telegram = new telegramBot(process.env.TELEGRAM_TOKEN,{
    polling: true, 

});
telegram.on("text", (message) =>{

    if (message.text.toLowerCase().indexOf("/covid") === 0) {
        // remove that /covid to get only the country 
        country = message.text.replace("/covid ", "");
        //give it to the function so it take care of the rest
        getData(country, telegram, message.chat.id);
    }
    // telegram.sendMessage(message.chat.id, "Hi " + message.chat.first_name + " Its working");
});
telegram.on("polling_error", (err) => console.log(err));
function getData(country, telegram, chat_id){
    
    let url = "https://api.coronastatistics.live/countries/" + country;
    let settings = {
        method: "get"
    };
    
    fetch(url, settings).then(
        res => res.json()
    ).then((json) => {
        resStr = `
        \n Results for : ` + json.country + `
        \n Total cases : ` + json.cases + `
        \n Total active : ` + json.active + `
        \n Total recovered : ` + json.recovered + `
        \n Total deaths : ` + json.deaths + `
        \n Today cases : ` + json.todayCases + `
        \n Today Deaths : ` + json.todayDeaths + `
        `;
            if (typeof json.country !== 'undefined' && json.country) {
                telegram.sendMessage(chat_id,resStr);
            } else {
                telegram.sendMessage(chat_id,"no such country...");
            }
            console.log(resStr);
        });
       
}
