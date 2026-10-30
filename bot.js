// Telegram Bot для запуска "ЧЁ ЗА МЕМ?" на Node.js (Zero external dependencies)

const https = require('https');

const BOT_TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://savok132.github.io/guess-the-meme-twa/';
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

function apiRequest(method, payload = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_BASE}/${method}`);
    const data = payload ? JSON.stringify(payload) : null;

    const options = {
      method: payload ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function sendWelcome(chatId, firstName) {
  const text = `🗿 Здорово, ${firstName}!\n\nГотов проверить свой уровень мемологии?\nЖми на кнопку ниже, чтобы запустить игру! 👇`;
  await apiRequest('sendMessage', {
    chat_id: chatId,
    text: text,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 Играть в "Чё за мем?"',
            web_app: { url: WEB_APP_URL }
          }
        ]
      ]
    }
  });
}

async function start() {
  if (BOT_TOKEN === 'ТВОЙ_ТОКЕН_БОТА') {
    console.log('Внимание: укажи свой токен BOT_TOKEN в bot.js или через переменные окружения!');
  }

  try {
    const me = await apiRequest('getMe');
    if (!me.ok) {
      console.error('Ошибка подключения к Bot API:', me);
      return;
    }
    console.log(`[+] Бот @${me.result.username} запущен на Node.js!`);
    console.log(`[+] WebApp URL: ${WEB_APP_URL}`);

    // Настройка кнопки меню
    await apiRequest('setChatMenuButton', {
      menu_button: {
        type: 'web_app',
        text: '🎮 Чё за мем?',
        web_app: { url: WEB_APP_URL }
      }
    });

    let offset = 0;
    while (true) {
      try {
        const updates = await apiRequest('getUpdates', { offset, timeout: 25 });
        if (updates && updates.ok) {
          for (const upd of updates.result) {
            offset = upd.update_id + 1;
            if (upd.message) {
              const chatId = upd.message.chat.id;
              const firstName = upd.message.from.first_name || 'Бро';
              await sendWelcome(chatId, firstName);
            }
          }
        }
      } catch (err) {
        console.error('Ошибка в цикле:', err.message);
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  } catch (e) {
    console.error('Фатальная ошибка:', e);
  }
}

start();
