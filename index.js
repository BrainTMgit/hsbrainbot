const config = require("./config.json"); // в конфиге прописана версия бота и префикс
const Discord = require("discord.js"); //Подключаем discord.js для дальнейшего использования.
const client = new Discord.Client(); 
client.login("NzEwMjA3ODQwMDU2NTA4NTM2.XsfWOA.eUl87pg2crGp1VsDQdU3gjyqMW0"); //Где token пишем токен бота.
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

})

