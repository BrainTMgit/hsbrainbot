// Болтовня бота вырезана. Лежит в https://github.com/BrainTMgit/hsbrainbot/blob/master/bots flud
const Discord = require('discord.js'); // Подключаем discord.js для дальнейшего использования.
const config = require('./config.json'); // в конфиге прописан токен и префикс
const client = new Discord.Client(); 

// говорят, что это важный пункт, чтобы бот обрабатывал события только после этого пункта
// Заодно бот отписывается в админском канале о рестарте. Так, на всякий случай
client.on('ready',()=>{
console.log("Bot started!");
channel = client.channels.cache.get("706060221126017054");
channel.send(`BrainBot Restarted!`);
});

// реакция на приход нового юзера на сервер
client.on('guildMemberAdd', member => {
	// отправляется сообщение в основной канал
	var channel = member.guild.channels.cache.find(ch => ch.name === 'основной');
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
  description: "Дополняется по мере обновления бота",
  fields:
	 [
		 { name: ".help", value: "выводит список всех команд" },
		 { name: ".price", value: "Показать курс обмена артефактов" },
		 { name: ".ver", value: "Здесь вы можете узнать текущую версию бота." },
		 { name: "Rs s X", value: "Присвоение роли @кз7-@кз10. Вместо Х вписать цифру от 7 до 10." },
		 { name: "Rs u X", value: "Удаление роли @кз7-@кз10. Вместо Х вписать цифру от 7 до 10." },
		 { name: "%help", value: "Помощь по боту от Hades Star Compendium" }
	 ]
 }
});
}
	
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
if(message.content.toLowerCase()=="rs s 10"){let user = message.author.id;message.guild.member(user).roles.add("722351148463292436");message.reply('вам присвоена роль <@&722351148463292436>');}
if(message.content.toLowerCase()=="rs s 9"){let user = message.author.id;message.guild.member(user).roles.add("722351369662627850");message.reply('вам присвоена роль <@&722351369662627850>');}
if(message.content.toLowerCase()=="rs s 8"){let user = message.author.id;message.guild.member(user).roles.add("722351414096953354");message.reply('вам присвоена роль <@&722351414096953354>');}
if(message.content.toLowerCase()=="rs s 7"){let user = message.author.id;message.guild.member(user).roles.add("722351455666831410");message.reply('вам присвоена роль <@&722351455666831410>');}



/*
if(message.content.toLowerCase()=="rs s 9"){let user = message.author.id;message.guild.member(user).roles.add("722351369662627850");}
if(message.content.toLowerCase()=="rs s 8"){let user = message.author.id;message.guild.member(user).roles.add("722351414096953354");}
if(message.content.toLowerCase()=="rs s 7"){let user = message.author.id;message.guild.member(user).roles.add("722351455666831410");}
*/


// Удаление ролей
if(message.content.toLowerCase()=="rs u 10"){let user = message.author.id;message.guild.member(user).roles.remove("722351148463292436");message.reply('у вас больше нет роли <@&722351148463292436>');}
if(message.content.toLowerCase()=="rs u 9"){let user = message.author.id;message.guild.member(user).roles.remove("722351369662627850");message.reply('у вас больше нет роли <@&722351369662627850>');}
if(message.content.toLowerCase()=="rs u 8"){let user = message.author.id;message.guild.member(user).roles.remove("722351414096953354");message.reply('у вас больше нет роли <@&722351414096953354>');}
if(message.content.toLowerCase()=="rs u 7"){let user = message.author.id;message.guild.member(user).roles.remove("722351455666831410");message.reply('у вас больше нет роли <@&722351455666831410>');}

/*
if(message.content.toLowerCase()=="rs u 9"){let user = message.author.id;message.guild.member(user).roles.remove("722351369662627850");}
if(message.content.toLowerCase()=="rs u 8"){let user = message.author.id;message.guild.member(user).roles.remove("722351414096953354");}
if(message.content.toLowerCase()=="rs u 7"){let user = message.author.id;message.guild.member(user).roles.remove("722351455666831410");}
*/


//Текущая версия
	if(message.content.toLowerCase()==config.prefix + "ver") {message.channel.send("Release v242");}

// тестируем проверку ролей
if(message.content.toLowerCase()==config.prefix+"test")
{
	console.log("начало, начало, начало, начало, начало, начало, начало, начало, начало, начало, ");
//channel.send(message.content);
//console.log(message.content);

	console.log("конец, конец, конец, конец, конец, конец, конец, конец, конец, конец, ");
}
	
});

client.login(config.token); //Где token уже был взят из config.json


