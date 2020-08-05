// Болтовня бота вырезана. Лежит в https://github.com/BrainTMgit/hsbrainbot/blob/master/bots flud
const Discord = require('discord.js'); // Подключаем discord.js для дальнейшего использования.
const config = require('./config.json'); // в конфиге прописан токен и префикс
const client = new Discord.Client(); 

// говорят, что это важный пункт, чтобы бот обрабатывал события только после этого пункта
client.once('ready',()=>{console.log("Bot started!");});

/*
// добавим к верхнему коду строчку, чтобы бот при рестарте отправлял сообщение о рестарте в канал #admin
client.once('ready',()=>{
	console.log("Bot started!");
	const channel = client.guild.channels.cache.find(ch => ch.name === 'admin');
	if (!channel) return;
	channel.send(`BrainBot restarted!`);
});
*/

// реакция на приход нового юзера на сервер
client.on('guildMemberAdd', member => {
	// отправляется сообщение в основной канал
	const channel = member.guild.channels.cache.find(ch => ch.name === 'основной');
 	// ничего не делать если канал не найден
	if (!channel) return;
 	// отправляем сообщение с упоминанием пользователя
	channel.send(`Привет, ${member}. Добро пожаловать на наш скромный сервер. Вообще, я тут главный и всем заправляю. Узнать все, что я умею можно командой .help`);
});

// Пришло сообщение
client.on("message", message => { 

// Хелпер
//Если текст сообщения равен префиксу плюс help, то происходит код в {} Часть кода .toLowerCase() превращает текст в строчный. (Делает из заглавных букв обычные.) 
if(message.content.toLowerCase()==config.prefix + "help")
{
 message.channel.send({embed:
 {
  color: 3447003,
  title: "Список поддерживаемых комманд:",
  description: "будет дополняться по мере обновления бота",
  fields:
	 [
		 {
			 name: ".help",
			 value: "выводит список всех команд"
		 },
		 {
			 name: ".price",
			 value: "Показать курс обмена артефактов"
		 },
		 {
			 name: ".ver",
			 value: "Здесь вы можете узнать текущую версию бота."
		 },
{
name: "%help",
value: "Помощь по боту от Hades Star Compendium"
},
{
name: "!help",
value: "Помощь по боту HadesBotty. Но последнее время бот часто не работает."
}
	 ]
 }
});
}
	
//Текущая версия
	if(message.content.toLowerCase()==config.prefix + "ver")
	{message.channel.send("Release v121");}

//Показ ценника
if(message.content.toLowerCase()==config.prefix + "price")
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
					      }
				      ]
			      }
});
}

// Выдача ролей
if(message.content.toLowerCase()==".test")
{
	set member = message.mentions.members.first();
	/*member.roles.add("722351369662627850");*/
	message.channel.send('test ${member}'); 
}

});

client.login(config.token); //Где token уже был взят из config.json


