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

//Инициализируем массив для очереди кз
var quequ = [];

// Пришло сообщение
client.on("message", message => { 

//Возврат, если сообщение отправил сами бот
if (message.author.bot) return;

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
{ name: ".calc 8 7 6 5 4", value: 'Рассчитать стоимость артов кз9. Вместо 8 7 6 5 4 ввести количество артов с кз8, кз7 и т.д. При продаже 3шт кз8 и 10шт кз6 вводить ".calc 3 0 10 0 0". Последние нули можно не вводить, т.е. ввести ".calc 3 0 10"'},

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

// Удаление ролей
if(message.content.toLowerCase()=="rs u 10"){let user = message.author.id;message.guild.member(user).roles.remove("722351148463292436");message.reply('у вас больше нет роли <@&722351148463292436>');}
if(message.content.toLowerCase()=="rs u 9"){let user = message.author.id;message.guild.member(user).roles.remove("722351369662627850");message.reply('у вас больше нет роли <@&722351369662627850>');}
if(message.content.toLowerCase()=="rs u 8"){let user = message.author.id;message.guild.member(user).roles.remove("722351414096953354");message.reply('у вас больше нет роли <@&722351414096953354>');}
if(message.content.toLowerCase()=="rs u 7"){let user = message.author.id;message.guild.member(user).roles.remove("722351455666831410");message.reply('у вас больше нет роли <@&722351455666831410>');}

//Калькулятор продажи т9
//если сообщение начинается с ".calc"
if(message.content.startsWith(config.prefix+'calc'))
{
//Создаётся массив, slice отрезает префикс, trim удаляет лишние пробелы вначале и конце сообщения (на всякий случай), split разбивает строку на массив данных разделенный пробелами
	var args = message.content.slice(config.prefix.length).trim().split(' ');
//Удаляется первый элемент массива, т.е. "calc"
args.shift();
//Если массив окажется пустой, или больше необходимого - отмена цикла и сообщение в канал
    if (!args.length || args.length > 5) {return message.reply(`некорректно введена дополнительная информация. Для справки введите команду .help`);}
//Заменяем undefined значения массива на ноль
for (var i=0; i < 5; i++ ){if(!args[i]){args[i]=0};};
//Считаем
var x = args[0]/2 + args[1]/2.5 + args[2]/3 + args[3]/4.5 + args[4]/5.5;
//Округляем до 2х знаков после запятой
x = x.toFixed(2);
//Выводим итоговую сумму
message.reply('итого ' + x + ' штук');
}

//Текущая версия
	if(message.content.toLowerCase()==config.prefix + "ver") {message.channel.send("Release v326");}

//Тестирование ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(message.content.toLowerCase() == '9+')
{
// Смотрим сколько человек уже в очереди
var readyuser = queque.length();
var user1 = message.author.id;
quequ [0] = [message.author.id, new Date()];
console.log(user1);
channel.send('<@' + quequ[0][0] + '>, вы добавлены в очередь на кз');

console.log("конец, конец, конец, конец, конец, конец, конец, конец, конец, конец, ");
}
if(message.content.toLowerCase() == 'rs q 9')
{
var time = new Date() - quequ [0][1];
let timeleft = 30 - time/60000;
timeleft = timeleft.toFixed(1);
channel.send(quequ.length + '. <@' + quequ[0][0] + '>, ' + timeleft + 'min');
}
	
});

client.login(config.token); //Где token уже был взят из config.json


