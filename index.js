// Болтовня бота вырезана. Лежит в https://github.com/BrainTMgit/hsbrainbot/blob/master/bots flud.
const Discord = require('discord.js'); // подключаем discord.js для дальнейшего использования
const config = require('./config.json'); // в конфиге прописан токен и префикс
const client = new Discord.Client(); 
const allservers = Array.from(client.guilds.cache.keys()); // возвращает массив ключей - ID серверов, подключенных к боту

// говорят, что это важный пункт, чтобы бот обрабатывал события только после этого пункта
// Заодно бот отписывается в админском канале о рестарте. Так, на всякий случай.
client.on('ready', () => {
	console.log('BrainBot started!');
	// отправляем в админский канал Рикардии уведомление о рестарте бота
	client.channels.cache.get('706060221126017054').send('BrainBot restarted');
	// в каждый канал (берется из массива) отправляется сообщение о рестарте бота
	allservers.forEach(function(i){
		// для каждого сервера выбирается основной канал системных сообщений
		channel = client.guilds.cache.get(i).systemChannel;
		// если канал выбран - туда отправляется сообщение о рестарте бота
		if(channel){channel.send('BrainBot restarted!');};
	});
});





// реакция на приход нового юзера на сервер
client.on('guildMemberAdd', member => {
	// отправляется сообщение в основной канал
	let channel = member.guild.channels.cache.find(ch => ch.name === 'основной');
 	// ничего не делать если канал не найден
	if (!channel) return;
 	// отправляем сообщение с упоминанием пользователя
	channel.send(`Привет, ${member}. Добро пожаловать на наш скромный сервер. Вообще, я тут главный и всем заправляю. Узнать все, что я умею можно командой .help`);
});

//Инициализируем массив для очереди кз
var quequ = [];
var q = [];

// Пришло сообщение
client.on("message", message => { 

//Возврат, если сообщение отправил бот
if (message.author.bot) return;

// Хелпер
//Если текст сообщения равен префиксу плюс help, то происходит код в {} Часть кода .toLowerCase() превращает текст в строчный. (Делает из заглавных букв обычные.) 
if(message.content.toLowerCase()==config.prefix + "help"){
	message.channel.send({embed:{
		color: 3447003,
		title: "Список поддерживаемых комманд:",
		description: "Дополняется по мере обновления бота. В связи с особенностями хостинга бот перезапускается ~ раз в сутки. Боту стыдно.",
		fields:[
			{ name: ".help", value: "выводит список всех команд" },
			{ name: ".botlink", value: "ссылка добавление бота на свой сервер" },
			{ name: ".price", value: "Показать курс обмена артефактов" },
			{ name: ".calc 8 7 6 5 4", value: 'Рассчитать стоимость артов кз9. Вместо 8 7 6 5 4 ввести количество артов с кз8, кз7 и т.д. При продаже 3шт кз8 и 10шт кз6 вводить ".calc 3 0 10 0 0". Последние нули можно не вводить, т.е. ввести ".calc 3 0 10"'},
			{ name: ".ver", value: "Здесь вы можете узнать текущую версию бота." },
			{ name: ".botstat", value: "Список серверов Discord, подключенных к боту." },
			{ name: ".Rs s X", value: "Присвоение роли @кз7-@кз10. Вместо Х вписать цифру от 7 до 10." },
			{ name: ".Rs u X", value: "Удаление роли @кз7-@кз10. Вместо Х вписать цифру от 7 до 10." },
			{ name: "%help", value: "Помощь по боту от Hades Star Compendium" }
		]
	}});
}
	
// список серверов бота
if(message.content.toLowerCase()=='.botstat'){
    var listserver = 'Бот подключен к ' + allservers.length + ' серверам:';
    allservers.forEach(function(i){
      server = client.guilds.cache.get(i).name;
      listserver = listserver + '\n' + server;
    });
    message.channel.send(listserver);
  };

// Показать ссылку на бота
if(message.content.toLowerCase()==config.prefix + "botlink"){
	message.channel.send('https://discordapp.com/oauth2/authorize?&client_id=710207840056508536&scope=bot&permissions=8');
}
	
//Показ ценника
if(message.content.toLowerCase()==config.prefix + "price"){
	message.channel.send({embed:{
		color: 3447003,
		title: "Текущий курс обмена артефактов",
		description: "корпоративный бонус не менее +10%\nне более 50% артефактов одного вида",
		fields:[{
			name: "RS9",
			value: "RS8 . . . . 2.0\nRS7 . . . . 2.5\nRS6 . . . . 3.0\nRS5 . . . . 4.5\nRS4 . . . . 5.5"
		}]}});
}

// Выдача ролей
if(message.content.toLowerCase()==".rs s 10"){let user = message.author.id;message.guild.member(user).roles.add("722351148463292436");message.reply('вам присвоена роль <@&722351148463292436>');}
if(message.content.toLowerCase()==".rs s 9"){let user = message.author.id;message.guild.member(user).roles.add("722351369662627850");message.reply('вам присвоена роль <@&722351369662627850>');}
if(message.content.toLowerCase()==".rs s 8"){let user = message.author.id;message.guild.member(user).roles.add("722351414096953354");message.reply('вам присвоена роль <@&722351414096953354>');}
if(message.content.toLowerCase()==".rs s 7"){let user = message.author.id;message.guild.member(user).roles.add("722351455666831410");message.reply('вам присвоена роль <@&722351455666831410>');}

// Удаление ролей
if(message.content.toLowerCase()==".rs u 10"){let user = message.author.id;message.guild.member(user).roles.remove("722351148463292436");message.reply('у вас больше нет роли <@&722351148463292436>');}
if(message.content.toLowerCase()==".rs u 9"){let user = message.author.id;message.guild.member(user).roles.remove("722351369662627850");message.reply('у вас больше нет роли <@&722351369662627850>');}
if(message.content.toLowerCase()==".rs u 8"){let user = message.author.id;message.guild.member(user).roles.remove("722351414096953354");message.reply('у вас больше нет роли <@&722351414096953354>');}
if(message.content.toLowerCase()==".rs u 7"){let user = message.author.id;message.guild.member(user).roles.remove("722351455666831410");message.reply('у вас больше нет роли <@&722351455666831410>');}

//Калькулятор продажи т9
//если сообщение начинается с ".calc"
if(message.content.startsWith(config.prefix+'calc')){
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
if(message.content.toLowerCase()==config.prefix + "ver") {message.channel.send("Release v429");}

//Запись в очередь на кз////////////////////////////////////////

// Начинаем обрабатывать сообщение начинающееся с ".9+"
if(message.content.toLowerCase().startsWith(config.prefix + "9+")){
   // Ищем в массиве id юзера, есть ли уже юзер в очереди, если есть - то функция возвращает положение, если нет - то возвращает "-1"
   var place = q.find(item=>item.id==message.author.id);
   place = q.indexOf(place);
   // Если функция вернула местоположение в массиве - значит юзер уже в очереди
   if(place >= 0){return message.reply(' вы уже в очереди')};
   //Отрезаем из сообщения ".9+"(три знака) и лишние пробелы вначале и в конце
   var cooldown = Number(message.content.slice(3).trim()); // в минутах
   //Если не задано, по умолчанию - 30 минут
   if(!cooldown){cooldown=30};
   //Записываем данные в конец массива
   q[q.length] = {
      id: message.author.id, //id юзера
      name: message.author.username, // просто имя для отображения
      time: new Date(), //текущее время
      cooldown: cooldown //время ожидания (в минутах)
   }; 
   // Можно включить дополнительное сообщение о входе в очередь, но так то потом ещё список очереди ещё будет
   // message.reply('готово');
   // Здесь вызывается отдельная функция clearq спустя время cooldown'a
   setTimeout(clearq,cooldown*60000);
   // Инициализируем строку для вывода простого списка очереди
   var rsq = new String();
   // Перебираем весь массив очереди
   for (var i=1; i <= q.length; i++ ){
      //Сколько прошло времени
      var time1 = new Date() - q[i-1].time;
      // Сколько времени осталось
      var timeleft = q[i-1].cooldown - time1/60000;
      //Округляем до 0.1мин
      timeleft = timeleft.toFixed(1);
      //И собираем всё в одну строку
      rsq = rsq + i + '. ' + q[i-1].name + ' - ' + timeleft +'min\n';
   }
// И печатаем эту строку (список)
message.channel.send(rsq);

// Если очередь полна
if(q.length==4){
   // отправляем в канал сообщение о готовой очереди
		message.channel.send('<@&722351369662627850> in game:\n<@' + q[0].id + '>, <@' + q[1].id + '>, <@' + q[2].id + '>, <@' + q[3].id + '>');
		// очищаем очередь
q.length=0;
	}

}

// Тест
if(message.content.toLowerCase()==config.prefix + "rs q")
{
//Если длина массива очереди равна нулю, значит очередь пуста
if (q.length==0) {return message.reply(` жаль, но очередь на кз9 пуста`);}
//Инициализируем строку для списка очереди на кз
var rsq = new String();
//Опять перебираем
for (var i=1; i <= q.length; i++ ){
   var time1 = new Date() - q[i-1].time;
   var timeleft = q[i-1].cooldown - time1/60000;
   timeleft = timeleft.toFixed(1);
   rsq = rsq + i + '. ' + q[i-1].name + ' - ' + timeleft +'min\n';
}
message.channel.send(rsq); //и отправляем в канал
}

// Для удаления из очереди использовать q.splice

if(message.content.toLowerCase()==config.prefix + "9-"){
var place = q.find(item=>item.id==message.author.id);
   place = q.indexOf(place);
if(place<0){return message.reply(' вас нет очереди на кз9')};
q.splice(place, 1);
message.reply(' вы удалены с очереди на кз9');
}


}); // это остатки от client.on("message", message => { 

// Сюда засунем функцию удаления из очереди кз для таймера
// Кстати, вне зависимости от того, в каком канале подписались на кз, уведомление об удалении будет отправлено в канал кз
function clearq(){
channel = client.channels.cache.get("706109108348125205");
for (var i=0; i < q.length; i++ ){
   var time1 = new Date() - q[i].time;
   var timeleft = q[i].cooldown - time1/60000;
   if(timeleft<0){
      channel.send('<@' + q[i].id + '>, время ожидания закончилось, вы удалены из очереди на кз9');
      q.splice(i, 1);
      }
   };
};



client.login(config.token); //Где token уже был взят из config.json


