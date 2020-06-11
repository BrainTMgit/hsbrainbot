const Discord = require('discord.js'); //Подключаем discord.js для дальнейшего использования.
const config = require('./config.json'); // в конфиге прописан токен и префикс
const client = new Discord.Client(); 

client.on("message", message => { //Пришло сообщение.

// Хелпер
if(message.content.toLowerCase()==config.prefix + "help") //Если текст сообщения равен префиксу плюс help, то происходит код в {} Часть кода .toLowerCase() превращает текст в строчный. (Делает из заглавных букв обычные.) 
{
message.reply("сам разбирайся!");
}

if(message.content.toLowerCase()=="тупой бот") //реакция на тупого бота
{
message.reply("кожаный ублюдок");
}

//Выдача ролей

});

client.login(config.token); //Где token уже был взят из config.json


