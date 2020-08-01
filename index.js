const Discord = require('discord.js'); //Подключаем discord.js для дальнейшего использования.
const config = require('./config.json'); // в конфиге прописан токен и префикс
const client = new Discord.Client(); 

//говорят, что это важный пункт, чтобы бот обрабатывал события только после этого пункта
client.once('ready',()=>{console.log("Bot started!");});

//реакция на приход нового юзера на сервер
client.on('guildMemberAdd', member => {
	//отправляется сообщение в основной канал
	const channel = member.guild.channels.cache.find(ch => ch.name === 'основной');
 	//ничего не делать если канал не найден
	if (!channel) return;
 	//отправляем сообщение с упоминанием пользователя
	channel.send(`Привет, ${member}. Добро пожаловать на наш скромный сервер. Вообще, я тут главный и всем заправляю. Узнать все, что я умею можно командой .help`);
}

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
  description: "корпоративный бонус не менее +10%\nне более 50% артефактов одного вида",
  fields:[
   {
    name: "RS9",
    value: "RS8 . . . . 2.0\nRS7 . . . . 2.5\nRS6 . . . . 3.0\nRS5 . . . . 4.5\nRS4 . . . . 5.5"
    	
   }/*,
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
   }*/]
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


//Выдача ролей 
if(message.content.toLowerCase()==".test")
{
message.channel.send('test');
 /*const member = message.mentions.members.first();
 const role = new Discord.Role();
 if (member.roles.cache.some(role => role.name === 'admin')) {
	message.reply('admin');*/
}

});

client.login(config.token); //Где token уже был взят из config.json


