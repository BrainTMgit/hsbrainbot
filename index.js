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
   },
   {
    name: ".price",
    value: "Показать курс обмена артефактов"
   }]
 }
});
}

//Показ ценника
if(message.content.toLowerCase()==config.prefix + "price") //Если текст сообщения равен префиксу плюс help, то происходит код в {} Часть кода .toLowerCase() превращает текст в строчный. (Делает из заглавных букв обычные.) 
{
 message.channel.send({embed:
 {
  color: 3447003,
  title: "Текущий курс обмена артефактов",
  description: "корпоративный бонус не менее +10%",
  fields:[
   {
    name: "RS9",
    value: "RS8 . . . . 2.5\nRS7 . . . . 3.0\nRS6 . . . . 3.5\nRS5 . . . . 5.0\nRS4 . . . . 6.5"
   },
   {
    name: "RS8",
    value: "RS7 . . . . 2.5\nRS6 . . . . 3.0\nRS5 . . . . 4.0\nRS4 . . . . 5.5"
   },
   {
    name: "RS7",
    value: "RS6 . . . . 2.5\nRS5 . . . . 3.0\nRS4 . . . . 4.0"
   },
   {
    name: "RS6",
    value: "RS5 . . . . 2.5\nRS4 . . . . 3.0"
   }]
 }
});
}

if(message.content.toLowerCase()=="тупой бот") //реакция на тупого бота
{
 message.reply("кожаный ублюдок");
}
if(message.content.toLowerCase()=="бот, извинись") //реакция на тупого бота
{
 message.reply("простите, хозяин");
}

 /*
//Выдача ролей 
if(message.content.toLowerCase()=="rs s 10")
{
message.guild.roles.fetch('722351148463292436'); 
}*/

});

client.login(config.token); //Где token уже был взят из config.json


