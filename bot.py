"""
Telegram Bot для запуска игры "ЧЁ ЗА МЕМ? (Мемология)"
Работает на чистом Python 3 без сторонних библиотек (zero dependencies)!
"""

import sys
import os
import json
import time
import urllib.request
import urllib.error

# Токен твоего бота @Mememoqizolog_bot
BOT_TOKEN = os.environ.get("BOT_TOKEN", "9032470132:AAFD72TC9vO54SZL6rjR2XhA0qOfJp5oLNY")

# URL твоей веб-страницы (должен быть с HTTPS для Telegram!)
# Например: https://твой-логин.github.io/guess-the-meme-twa/ или https://xxxx.ngrok-free.app
WEB_APP_URL = os.environ.get("WEB_APP_URL", "https://example.com")

API_BASE = f"https://api.telegram.org/bot{BOT_TOKEN}"

def make_request(method: str, payload: dict = None):
    url = f"{API_BASE}/{method}"
    headers = {"Content-Type": "application/json"}
    data = json.dumps(payload).encode("utf-8") if payload else None
    req = urllib.request.Request(url, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        print(f"[-] Ошибка Telegram API ({e.code}): {err_body}")
        return None
    except Exception as e:
        print(f"[-] Ошибка сети: {e}")
        return None

def setup_menu_button():
    """Устанавливает кнопку 'Играть' в левый нижний угол чата Telegram"""
    payload = {
        "menu_button": {
            "type": "web_app",
            "text": "🎮 Чё за мем?",
            "web_app": {"url": WEB_APP_URL}
        }
    }
    res = make_request("setChatMenuButton", payload)
    if res and res.get("ok"):
        print("[+] Меню-кнопка WebApp успешно настроена!")

def send_welcome(chat_id: int, user_first_name: str):
    text = (
        f"🗿 Здорово, {user_first_name}!\n\n"
        "Готов проверить свой уровень мемологии?\n"
        "Отличишь скуфа от тюбика, а язя от капибары?\n\n"
        "Жми кнопку ниже, чтобы ворваться в мемную битву! 👇"
    )
    payload = {
        "chat_id": chat_id,
        "text": text,
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        "text": "🚀 Играть в 'Чё за мем?'",
                        "web_app": {"url": WEB_APP_URL}
                    }
                ],
                [
                    {
                        "text": "📖 Мемопедия (Справочник)",
                        "web_app": {"url": WEB_APP_URL}
                    }
                ]
            ]
        }
    }
    make_request("sendMessage", payload)

def main():
    if BOT_TOKEN == "ТВОЙ_ТОКЕН_БОТА":
        print("=" * 60)
        print("ВНИМАНИЕ: Укажи токен бота в скрипте bot.py или через BOT_TOKEN=...")
        print("Получить токен можно у официального бота: @BotFather в Telegram")
        print("=" * 60)

    # Проверка бота
    me = make_request("getMe")
    if not me or not me.get("ok"):
        print("[-] Не удалось подключиться к Telegram Bot API. Проверь токен!")
        return

    bot_info = me["result"]
    print(f"[+] Бот @{bot_info.get('username')} успешно запущен!")
    print(f"[+] URL Web App: {WEB_APP_URL}")
    print("[*] Ожидаем сообщений в Telegram (Long Polling)...")

    setup_menu_button()

    offset = 0
    while True:
        try:
            updates = make_request("getUpdates", {"offset": offset, "timeout": 20})
            if updates and updates.get("ok"):
                for upd in updates["result"]:
                    offset = upd["update_id"] + 1
                    msg = upd.get("message")
                    if not msg:
                        continue
                    chat_id = msg["chat"]["id"]
                    first_name = msg["from"].get("first_name", "Славный Рус")
                    text = msg.get("text", "")

                    if text.startswith("/start"):
                        send_welcome(chat_id, first_name)
                    else:
                        send_welcome(chat_id, first_name)
            time.sleep(0.5)
        except KeyboardInterrupt:
            print("\n[*] Бот остановлен.")
            break
        except Exception as e:
            print(f"[-] Цикл поллинга: {e}")
            time.sleep(2)

if __name__ == "__main__":
    main()
