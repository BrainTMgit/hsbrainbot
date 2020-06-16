const Discord = require('discord.js'); //Подключаем discord.js для дальнейшего использования.
const config = require('./config.json'); // в конфиге прописан токен и префикс
const client = new Discord.Client(); 

client.once('ready',()=>{console.log("Bot started!");});

client.on("message", message => { //Пришло сообщение.

// Хелпер
if(message.content.toLowerCase()==config.prefix + "help") //Если текст сообщения равен префиксу плюс help, то происходит код в {} Часть кода .toLowerCase() превращает текст в строчный. (Делает из заглавных букв обычные.) 
{
 message.channel.send({embed:
 {
  color: 3447003,
  title: "Список поддерживаемых комманд:",
  description: "будет дополняться по мере обновления бота",
  fields:[
   {
    name: ".help",
    value: "выводит список всех команд"
   }]
 }
});
}

if(message.content.toLowerCase()=="тупой бот") //реакция на тупого бота
{
 message.reply("кожаный ублюдок");
}

/*
//Выдача ролей 
if(message.content.toLowerCase()==config.prefix + "getrole")
{
const role = message.guild.roles.cache.find(role => role.name === 'кз8');
const member = message.mentions.members.first();
member.roles.add(role);
}
*/

});

client.login(config.token); //Где token уже был взят из config.json


