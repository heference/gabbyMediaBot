// scraping JS start -> to be moduled
var request = require("request");
var cheerio = require("cheerio");
//var scrapper = require('./scraping');
//scraping JS end -> to be moduled


const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '379712249:AAGz1IiLF8FT_ROqE0VG0yq0UOp7wnx-a-g';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

//https://api.telegram.org/bot<token>/METHOD_NAME
//http://115.22.213.62:3000/bot79712249:AAGz1IiLF8FT_ROqE0VG0yq0UOp7wnx-a-g
// bot.setWebHook('https://api.telegram.org/bot79712249:AAGz1IiLF8FT_ROqE0VG0yq0UOp7wnx-a-g', {
//   certificate: '/home/node/gabrielMediaBot/cert/crt.pem'
// });

//bot.setWebHook('https://api.telegram.org/bot79712249:AAGz1IiLF8FT_ROqE0VG0yq0UOp7wnx-a-g')


// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/disk/, function(msg) {
  const chatId = msg.chat.id;
  //NOT WORKING
  var storageAmount = getStorageAmount();
  console.log("DISK COMMAND : " + storageAmount);
  bot.sendMessage(chatId, storageAmount);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  //scraping JS start -> to be moduled
  var searchKeyword = msg.text;
  console.log(searchKeyword);
  var searchUrl = "https://torrentkim5.net/bbs/s.php?k="+encodeURI(encodeURIComponent(searchKeyword))+"&b=";

  bot.sendMessage(chatId, 'GabbyBot Searching.....');
  request(searchUrl, function(error, response, body) {
    if (error) throw error;
      //console.log(body);

      var $ = cheerio.load(body);
      var listElements = $('tr.bg1');
      var resultArray = [];

      listElements.each(function(i) {
          var title = $(this).find('a').text();
          var magnet = $(this).find('a').attr('href');

          // title = title.replace('TV', i+'. ');
          title = title.replace(/\n/gi,'');
          title = title.replace(/\t/gi,'');

          magnet = magnet.replace('javascript:Mag_dn(\'','');
          magnet = magnet.replace('\')','');

          var keyboardArrayObject = [{text: title, callback_data: magnet }];
          resultArray.push(keyboardArrayObject);
      });

      console.log(resultArray);

      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          // keyboard:
          inline_keyboard:
          // [
            resultArray
          // ]
          // inline_keyboard:
          // [
                // [{text: 'Some button text 1', callback_data: '1'}], // Clicking will send "1"
                // [{text: 'Some button text 2', callback_data: '2'}], // Clicking will send "2"
                // [{text: 'Some button text 3', callback_data: '3'}],  // Clicking will send "3"
                // resultArray
          // ]
        })
      };

      bot.sendMessage(chatId, "다운로드 할 항목을 선택해 주세요", opts);
  });

  //scraping JS end -> to be moduled

});

bot.on('callback_query', function(msg) {
  var user = msg.from.id;
  console.log(msg.data);
  var magnet = msg.data;
  executeTransmission(magnet);
  bot.sendMessage(msg.from.id, "다운로드 시작 - Magnet : " + magnet);
});

var exec = require('child_process').exec, child;

function executeTransmission(magnet) {
  var magnetAddress = "magnet:?xt=urn:btih:" + magnet
  child = exec("sh ./transmission.sh "+magnetAddress, function (error, stdout, stderr) {
    console.log('start transmission ' + magnetAddress);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}

function getStorageAmount() {
  var storageAmount = "";
  child = exec("sh ./storageCheck.sh", function (error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ' + error);
    }
    console.log("Shell Script result : " + stdout);
    storageAmount = stdout;
  });
  return storageAmount;
}

function torrentCrawler(genre, keyword) {

}
