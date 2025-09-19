// const token = '6528258746:AAEsydh5SSPLSXs5CzmEcutNyFO352SqZ2c';
// let TelegramBot = require('node-telegram-bot-api');
// let bot = new TelegramBot(token, { polling: true });
// 
// // Matches "/echo [whatever]"
// bot.onText(/\/echo(.+)/, (msg, match) => {
// 
// 	// The 'msg' is the received Message from Telegram
// 	// and 'match' is the result of executing the regexp
// 	// above on the text content of the message
// 
// 	let chatId = msg.chat.id;
// 
// 	// The captured "whatever"
// 	let resp = match[1];
// 
// 	// send back the matched "whatever" to the chat
// 	bot.sendMessage(chatId, resp);
// });


const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
const request = require('request');
const botToken = '6528258746:AAEsydh5SSPLSXs5CzmEcutNyFO352SqZ2c'; // Замените на токен вашего бота

const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Добро пожаловать! Отправьте мне сообщение, и я передам его администратору.');
});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	const message = msg.text;
	
	bot.sendMessage(chatId, 'Ваше сообщение успешно отправлено администратору.');
});
