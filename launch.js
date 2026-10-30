// All-in-one launcher: локальный веб-сервер + Cloudflare Tunnel + Telegram бот @Mememoqizolog_bot
// Без каких-либо заглушек и предупреждений! Прямой чистый доступ в Telegram Web App.

const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { spawn } = require('child_process');

const BOT_TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const PORT = 3000;
const PUBLIC_DIR = __dirname;
const CLOUDFLARED_PATH = path.join(__dirname, 'bin', 'cloudflared.exe');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg'
};

// 1. Статический веб-сервер
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(PUBLIC_DIR, reqPath);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

// Telegram API Helper
function callTg(method, payload = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`);
    const data = payload ? JSON.stringify(payload) : null;
    const req = https.request(url, {
      method: payload ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { resolve({ ok: false, error: e.message }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function sendWelcome(chatId, firstName, webAppUrl) {
  const text = 
    `🗿 Здорово, ${firstName}!\n\n` +
    `Добро пожаловать в игру **«ЧЁ ЗА МЕМ? (Мемология 2026)»**!\n\n` +
    `🎮 **Доступны ВСЕ 5 режимов игры**:\n` +
    `⚡ 1. Классическая викторина с комбо-очками\n` +
    `🔊 2. Угадай мем по культовому звуку / треку\n` +
    `🔤 3. Собери название мема из рассыпанных букв\n` +
    `💀 4. Выживание Скуфа (до 3 ошибок)\n` +
    `🌀 5. Мемный Микс (чередование всех режимов)\n\n` +
    `Жми кнопку ниже, чтобы начать! Чистый запуск без предупреждений! 👇`;

  await callTg('sendMessage', {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 Играть в "Чё за мем?" (Все режимы)',
            web_app: { url: webAppUrl }
          }
        ],
        [
          {
            text: '📖 Мемопедия (Справочник)',
            web_app: { url: webAppUrl }
          }
        ]
      ]
    }
  });
}

function startCloudflareTunnel(port) {
  return new Promise((resolve, reject) => {
    console.log(`[2/3] Запуск Cloudflare Tunnel (чистый HTTPS без заглушек)...`);
    
    if (!fs.existsSync(CLOUDFLARED_PATH)) {
      return reject(new Error(`Не найден файл ${CLOUDFLARED_PATH}`));
    }

    const proc = spawn(CLOUDFLARED_PATH, ['tunnel', '--url', `http://localhost:${port}`]);
    let resolved = false;

    const onData = (data) => {
      const output = data.toString();
      // Ищем trycloudflare.com
      const match = output.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
      if (match && !resolved) {
        resolved = true;
        const tunnelUrl = match[0];
        resolve({ url: tunnelUrl, process: proc });
      }
    };

    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);

    proc.on('error', (err) => {
      if (!resolved) reject(err);
    });

    proc.on('exit', (code) => {
      if (!resolved) reject(new Error(`Cloudflared exited with code ${code}`));
    });

    // Таймаут 25 сек
    setTimeout(() => {
      if (!resolved) {
        reject(new Error('Превышено время ожидания ссылки Cloudflare Tunnel'));
      }
    }, 25000);
  });
}

async function main() {
  server.listen(PORT, async () => {
    console.log(`[1/3] Локальный сервер запущен на http://localhost:${PORT}`);

    try {
      const tunnel = await startCloudflareTunnel(PORT);
      const webAppUrl = tunnel.url;

      console.log(`\n======================================================`);
      console.log(`🎉 ЧИСТАЯ HTTPS ССЫЛКА (Cloudflare Tunnel):`);
      console.log(`👉 ${webAppUrl}`);
      console.log(`🤖 БОТ: @Mememoqizolog_bot (Memaquiz)`);
      console.log(`======================================================\n`);

      // Настройка кнопки меню чата Telegram
      const menuRes = await callTg('setChatMenuButton', {
        menu_button: {
          type: 'web_app',
          text: '🎮 Чё за мем?',
          web_app: { url: webAppUrl }
        }
      });
      console.log(`[3/3] Кнопка меню в Telegram настроена:`, menuRes.ok ? 'УСПЕШНО ✅' : menuRes);

      console.log(`\n✅ ВСЁ ГОТОВО! Теперь при открытии в Telegram:`);
      console.log(`https://t.me/Mememoqizolog_bot`);
      console.log(`Игра загрузится НАПРЯМУЮ БЕЗ всяких экранов предупреждений!\n`);

      // Long polling для бота
      let offset = 0;
      while (true) {
        try {
          const updates = await callTg('getUpdates', { offset, timeout: 20 });
          if (updates && updates.ok) {
            for (const upd of updates.result) {
              offset = upd.update_id + 1;
              if (upd.message) {
                const chatId = upd.message.chat.id;
                const firstName = upd.message.from?.first_name || 'Бро';
                await sendWelcome(chatId, firstName, webAppUrl);
              }
            }
          }
        } catch (err) {
          console.error('Ошибка поллинга:', err.message);
          await new Promise(r => setTimeout(r, 2000));
        }
      }
    } catch (e) {
      console.error('Ошибка Cloudflare Tunnel:', e);
    }
  });
}

main();
