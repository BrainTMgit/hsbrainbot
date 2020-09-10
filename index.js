
// подключаем конфиг с паролями , токеном и префиксом
const config = require('./config.json'); // в конфиге прописан токен и префикс

// подключаем discord.js для дальнейшего использования
// справка discord.js.org
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(config.token); // коннектимся к дискорду (хотя эту строчку обычно в конце пишут)

// подключаем Яндекс.Диск
// смотри хелп тут npmjs.com/package/yandex-disk
var YandexDisk = require('yandex-disk').YandexDisk;
var disk = new YandexDisk(config.yalogin, config.yapass); // доступ по логину и паролю

// Говорят, что это важный пункт, чтобы бот обрабатывал события только после этого пункта.
// Заодно бот отписывается в админском канале о рестарте. Так, на всякий случай.
client.on('ready', () => {
	console.log('BrainBot started!');
	// отправляем в админский канал Рикардии уведомление о рестарте бота
	client.channels.cache.get('706060221126017054').send('BrainBot restarted');
	// возвращает массив ключей - ID серверов, подключенных к боту
	const allservers = Array.from(client.guilds.cache.keys());
	// в каждый канал (берется из массива) отправляется сообщение о рестарте бота
	allservers.forEach(function(i){
		// для каждого сервера выбирается основной канал системных сообщений
		let channel = client.guilds.cache.get(i).systemChannel;
		// если канал выбран - туда отправляется сообщение о рестарте бота
		if(channel){channel.send('BrainBot restarted!');};
	});
}); // остаток от client.on('ready', () => {

// реакция на приход нового юзера на сервер
client.on('guildMemberAdd', member => {
	// отправляется сообщение в основной канал
	let channel = member.guild.systemChannel;
 	// ничего не делать если канал не найден
	if (!channel) return;
 	// отправляем сообщение с упоминанием пользователя
	channel.send(`Привет, ${member}. Добро пожаловать на сервер ${member.guild.name}. Узнать все, что я умею можно командой .help`);
}); // Закрыли client.on('guildMemberAdd'

// реакция на уход юзера
client.on('guildMemberRemove', member => {
	// отправляется сообщение в основной канал
	let channel = member.guild.systemChannel;
 	// ничего не делать если канал не найден
	if (!channel) return;
 	// отправляем сообщение с упоминанием пользователя
	channel.send(`${member.user.username}#${member.user.discriminator} покинул наш сервер. Жаль, самое интересное только начиналось...`);
}); // Остатки от guildMemberRemove

//Инициализируем массивы для очередей кз
var q11 = [];
var q10 = [];
var q9 = [];
var q9 = [];
var q7 = [];

// Пришло сообщение
client.on("message", message => { 

// возврат, если сообщение отправил бот
if (message.author.bot) return;

// Хелпер
// Если текст сообщения равен префиксу плюс help, то происходит код в {} Часть кода .toLowerCase() превращает текст в строчный.
if(message.content.toLowerCase()==config.prefix + "help"){
	message.channel.send({embed:{
		color: 3447003,
		title: "Список поддерживаемых комманд:",
		description: "Дополняется по мере обновления бота. В связи с особенностями хостинга бот перезапускается ~ раз в сутки. Боту стыдно.",
		fields:[
			{ name: ".help", value: "Выводит список всех команд." }, // +
			{ name: ".botstat", value: "Список серверов Discord, подключенных к боту." }, //+
            { name: ".botlink", value: "ссылка для добавления бота на свой сервер." }, //+
			{ name: ".price", value: "Показать курс обмена артефактов." }, //-
			{ name: ".calc 8 7 6 5 4", value: 'Рассчитать стоимость артов кз9. Вместо 8 7 6 5 4 ввести количество артов с кз8, кз7 и т.д. При продаже 3шт кз8 и 10шт кз6 вводить ".calc 3 0 10 0 0". Последние нули можно не вводить, т.е. ввести ".calc 3 0 10"'}, //-
			{ name: ".require", value: "Список обязательных требований к организации сервера для корректной работы очереди КЗ." }, //-
			{ name: ".Rs s X", value: "Присвоение роли @rs7-@rs11. Вместо Х вписать цифру от 7 до 11." }, //+
			{ name: ".Rs u X", value: "Удаление роли @rs7-@rs11. Вместо Х вписать цифру от 7 до 11." }, //+
            { name: ".X+Time", value: "Встать в очередь на КЗ уровня Х. Вмсето Time указывается количество минут ожидания. Если параметр не указан - ставится время по умолчанию 30 мин. В любое время можно продлить вписав команду заново. По истечение этого времени вы будете автоматом удалены из очереди." }, //-
			{ name: ".X-", value: "Удалить себя из очереди на КЗ уровня Х." }, //-
			{ name: ".Rs q X", value: "Проверка очереди на КЗ уровня Х. Вместо Х вписать цифру от 7 до 11." }, //-
            // { name: ".ver", value: "Здесь вы можете узнать текущую версию бота." },
			// { name: ".test", value: "Тестовая команда. Зарезеовирована для miniBot",
		]
	}});
}

// лишняя болтовня
if(message.content.toLowerCase()=="тупой бот") //реакция на тупого бота
{ message.reply("кожаный ублюдок"); }
if(message.content.toLowerCase()=="бот, извинись") //реакция на тупого бота
{ message.reply('простите, пожалуйста.'); }

// список серверов бота
if(message.content.toLowerCase()=='.botstat'){
  // возвращает массив ключей - ID серверов, подключенных к боту
  const allservers = Array.from(client.guilds.cache.keys());
  // создаем строку сообщения
  var listserver = 'BrainBot подключен к ' + allservers.length + ' серверам:';
  var count = 0; // будущий счетчик участников
  allservers.forEach(function(i){
    server = client.guilds.cache.get(i).name; // получаем имя сервера
    listserver = listserver + '\n' + server; // дописываем его в строку
    count = count + client.guilds.cache.get(i).memberCount; // прибавляем количество участников к счетчику
  });
  message.channel.send(listserver);
  message.channel.send('На этих серверах ' + count + ' участников.');
};

// показать ссылку на бота
if(message.content.toLowerCase()==config.prefix + "botlink"){
	message.channel.send('https://discordapp.com/oauth2/authorize?&client_id=710207840056508536&scope=bot&permissions=8');
}

// показать ценник
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
if(message.content.toLowerCase()=='.rs s 11'){
        role = message.guild.roles.cache.find(role => role.name == 'rs11');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.add(role);
            message.reply('Вам присвоена роль @rs11')
        }
}
if(message.content.toLowerCase()=='.rs s 10'){
        role = message.guild.roles.cache.find(role => role.name == 'rs10');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.add(role);
            message.reply('Вам присвоена роль @rs10')
        }
}
if(message.content.toLowerCase()=='.rs s 9'){
        role = message.guild.roles.cache.find(role => role.name == 'rs9');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.add(role);
            message.reply('Вам присвоена роль @rs9')
        }
}
if(message.content.toLowerCase()=='.rs s 8'){
        role = message.guild.roles.cache.find(role => role.name == 'rs8');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.add(role);
            message.reply('Вам присвоена роль @rs8')
        }
}
if(message.content.toLowerCase()=='.rs s 7'){
        role = message.guild.roles.cache.find(role => role.name == 'rs7');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.add(role);
            message.reply('Вам присвоена роль @rs7')
        }
}

// Удаление ролей
if(message.content.toLowerCase()=='.rs u 11'){
        role = message.guild.roles.cache.find(role => role.name == 'rs11');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.remove(role);
            message.reply('у вас больше нет роли @rs11')
        }
}
if(message.content.toLowerCase()=='.rs u 10'){
        role = message.guild.roles.cache.find(role => role.name == 'rs10');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.remove(role);
            message.reply('у вас больше нет роли @rs10')
        }
}
if(message.content.toLowerCase()=='.rs u 9'){
        role = message.guild.roles.cache.find(role => role.name == 'rs9')
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.remove(role);
            message.reply('у вас больше нет роли @rs9')
        }
}
if(message.content.toLowerCase()=='.rs u 8'){
        role = message.guild.roles.cache.find(role => role.name == 'rs8');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.remove(role);
            message.reply('у вас больше нет роли @rs8')
        }
}
if(message.content.toLowerCase()=='.rs u 7'){
        role = message.guild.roles.cache.find(role => role.name == 'rs7');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.remove(role);
            message.reply('у вас больше нет роли @rs7')
        }
}







//Калькулятор продажи т9
//если сообщение начинается с ".calc"
if(message.content.startsWith(config.prefix+'calc')){
	//Создаётся массив, slice отрезает префикс, trim удаляет лишние пробелы вначале и конце сообщения (на всякий случай), split разбивает строку на массив данных разделенный пробелами
	var args = message.content.slice(config.prefix.length).trim().split(' ');
	//Удаляется первый элемент массива, т.е. "calc"
	args.shift();
	//Если массив окажется пустой, или больше необходимого - отмена цикла и сообщение в канал
	if (!args.length || args.length > 5) {return message.reply(`Некорректно введена дополнительная информация. Для справки введите команду .help`);}
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
if(message.content.toLowerCase()==config.prefix + "ver") {message.channel.send("Release v449");}

//Запись в очередь на кз////////////////////////////////////////
// Начинаем обрабатывать сообщение начинающееся с ".9+"
if(message.content.toLowerCase().startsWith(config.prefix + "9+")){
   // Ищем в массиве id юзера, есть ли уже юзер в очереди, если есть - то функция возвращает положение, если нет - то возвращает "-1"
   var place = q9.find(item=>item.id==message.author.id);
   place = q9.indexOf(place);
   // Если функция вернула местоположение в массиве - значит юзер уже в очереди
   if(place >= 0){return message.reply(' вы уже в очереди')};
   //Отрезаем из сообщения ".9+"(три знака) и лишние пробелы вначале и в конце
   var cooldown = Number(message.content.slice(3).trim()); // в минутах
   //Если не задано, по умолчанию - 30 минут
   if(!cooldown){cooldown=30};
   //Записываем данные в конец массива
   q9[q9.length] = {
      id: message.author.id, //id юзера
      name: message.author.username, // просто имя для отображения
      time: new Date(), //текущее время
      cooldown: cooldown //время ожидания (в минутах)
   }; 
   // Можно включить дополнительное сообщение о входе в очередь, но так то потом ещё список очереди ещё будет
   // message.reply('готово');
   // Здесь вызывается отдельная функция clearq спустя время cooldown'a
   setTimeout(clearq9,cooldown*60000);
   // Инициализируем строку для вывода простого списка очереди
   var rsq9 = new String();
   // Перебираем весь массив очереди
   for (var i=1; i <= q9.length; i++ ){
      //Сколько прошло времени
      var time1 = new Date() - q9[i-1].time;
      // Сколько времени осталось
      var timeleft = q9[i-1].cooldown - time1/60000;
      //Округляем до 0.1мин
      timeleft = timeleft.toFixed(1);
      //И собираем всё в одну строку
      rsq9 = rsq9 + i + '. ' + q9[i-1].name + ' - ' + timeleft +'min\n';
   }
// И печатаем эту строку (список)
message.channel.send(rsq9);
// Если очередь полна
if(q9.length==4){
   // отправляем в канал сообщение о готовой очереди
		message.channel.send('<@&722351369662627850> in game:\n<@' + q9[0].id + '>, <@' + q9[1].id + '>, <@' + q9[2].id + '>, <@' + q9[3].id + '>');
		// очищаем очередь
q9.length=0;
	}
}
// Проверка очереди кз9
if(message.content.toLowerCase()==config.prefix + "rs q 9")
{
//Если длина массива очереди равна нулю, значит очередь пуста
if (q9.length==0) {return message.reply(` жаль, но очередь на кз9 пуста`);}
//Инициализируем строку для списка очереди на кз
var rsq9 = new String();
//Опять перебираем
for (var i=1; i <= q9.length; i++ ){
   var time1 = new Date() - q9[i-1].time;
   var timeleft = q9[i-1].cooldown - time1/60000;
   timeleft = timeleft.toFixed(1);
   rsq9 = rsq9 + i + '. ' + q9[i-1].name + ' - ' + timeleft +'min\n';
}
message.channel.send(rsq9); //и отправляем в канал
}
// Для удаления из очереди использовать q.splice
if(message.content.toLowerCase()==config.prefix + "9-"){
var place = q9.find(item=>item.id==message.author.id);
   place = q9.indexOf(place);
if(place<0){return message.reply(' вас нет очереди на кз9')};
q9.splice(place, 1);
message.reply(' вы удалены с очереди на кз9');
}


}); // это остатки от client.on("message", message => { 

// Сюда засунем функцию удаления из очереди кз для таймера
// Кстати, вне зависимости от того, в каком канале подписались на кз, уведомление об удалении будет отправлено в канал кз
function clearq9(){
channel = client.channels.cache.get("706109108348125205");
for (var i=0; i < q9.length; i++ ){
   var time1 = new Date() - q9[i].time;
   var timeleft = q9[i].cooldown - time1/60000;
   if(timeleft<0){
      channel.send('<@' + q9[i].id + '>, время ожидания закончилось, вы удалены из очереди на кз9');
      q9.splice(i, 1);
      }
   };
};





