
// подключаем конфиг с паролями , токеном и префиксом
const config = require('./config.json'); // в конфиге прописан токен и префикс

// подключаем discord.js для дальнейшего использования
// справка discord.js.org
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN); // коннектимся к дискорду (хотя эту строчку обычно в конце пишут)

// подключаем Яндекс.Диск
// смотри хелп тут npmjs.com/package/yandex-disk
var YandexDisk = require('yandex-disk').YandexDisk;
var disk = new YandexDisk(process.env.YANDEX_LOGIN, process.env.YANDEX_PASSWORD); // доступ по логину и паролю

// Говорят, что это важный пункт, чтобы бот обрабатывал события только после этого пункта.
// Заодно бот отписывается в админском канале о рестарте. Так, на всякий случай.
client.on('ready', () => {
    console.log('BrainBot started!');
    // отправляем в админский канал уведомление о рестарте бота
    client.channels.cache.get('749988555459395776').send('BrainBot restarted');
    
    // возвращает массив ключей - ID серверов, подключенных к боту
    const allservers = Array.from(client.guilds.cache.keys());
    // в каждый канал (берется из массива) отправляется сообщение о рестарте бота
    allservers.forEach(function(i){
        // для каждого сервера выбирается основной канал системных сообщений
		let channel = client.guilds.cache.get(i).systemChannel;
		// если канал выбран - туда отправляется сообщение о рестарте бота
		if(channel){channel.send('BrainBot restarted!\nПо всем вопросам работы бота обращаться к <@605817048337219597>');};
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
	channel.send(`**${member.user.tag}** покинул наш сервер. Жаль, самое интересное только начиналось...`);
}); // Остатки от guildMemberRemove

// Пришло сообщение
client.on("message", message => { 

// проверка сообщения    
if(message.author.bot){ // ингорируем сообщения ботов
        return;
    } else {
        if(message.channel.type=='dm'){ // игнорируем сообщения из DM-канала
            return message.channel.send('Бот не поддерживает личную переписку');
    }
};
    
// Хелпер
// Если текст сообщения равен префиксу плюс help, то происходит код в {} Часть кода .toLowerCase() превращает текст в строчный.
if(message.content.toLowerCase()==config.prefix + "help"){
	message.channel.send({embed:{
		color: 3447003,
		title: "Список поддерживаемых комманд:",
		description: "Дополняется по мере обновления бота. В связи с особенностями хостинга бот перезапускается ~ раз в сутки. Боту стыдно за это.",
		fields:[
			{ name: ".help", value: "Выводит список всех команд." },
			{ name: ".botstat", value: "Список серверов Discord, подключенных к боту." },
           		{ name: ".botlink", value: "ссылка для добавления бота на свой сервер." },
			{ name: ".ver", value: "Здесь вы можете узнать текущую версию бота." },
			{ name: ".test", value: "Тестовая команда. Зарезервирована для miniBot"}
		]
	}});
}

// лишняя болтовня
if(message.content.toLowerCase()=="тупой бот") //реакция на тупого бота
{ message.reply("кожаный ублюдок"); }
if(message.content.toLowerCase()=="бот извинись") //реакция на тупого бота
{ message.reply('простите, пожалуйста.'); }
if(message.content.toLowerCase()=="хороший бот") //реакция на тупого бота
{ message.reply("спасибо"); }

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
  message.channel.send('На этих серверах ' + count + ' участник(а).');
};

// показать ссылку на бота
if(message.content.toLowerCase()==config.prefix + "botlink"){
	message.channel.send('https://discordapp.com/oauth2/authorize?&client_id=710207840056508536&scope=bot&permissions=8');
}

// Выдача ролей
if(message.content.toLowerCase()=='.role add'){
        role = message.guild.roles.cache.find(role => role.name == 'test');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.add(role);
            message.reply('Вам присвоена роль @test')
        }
}

// Удаление ролей
if(message.content.toLowerCase()=='.role remove'){
        role = message.guild.roles.cache.find(role => role.name == 'test');
        if(!role){
            message.reply('правильная роль не найдена. Обратитесь к администраторам сервера.');
        } else {
            message.guild.member(message.author.id).roles.remove(role);
            message.reply('у вас больше нет роли @test')
        }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//Текущая версия
if(message.content.toLowerCase()==config.prefix + "ver") {message.channel.send("build 475");}

}); // это остатки от client.on("message", message => { 










