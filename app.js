// Главная логика Telegram Web App: "ЧЁ ЗА МЕМ? (Мемология 2026)"
// Поддержка всех 5 версий игры: Классика, Аудио, Буквы, Выживание, Микс

(function () {
  'use strict';

  // Telegram SDK
  const tg = window.Telegram?.WebApp;
  if (tg) {
    try {
      tg.ready();
      tg.expand();
      if (tg.enableClosingConfirmation) {
        tg.enableClosingConfirmation();
      }
    } catch (e) {
      console.log('Telegram SDK warning:', e);
    }
  }

  // Состояние игры
  const state = {
    mode: 'classic', // 'classic' | 'audio' | 'word' | 'survival' | 'mix'
    currentQuestions: [],
    questionIndex: 0,
    currentRoundType: 'classic', // 'classic' | 'audio' | 'word'
    score: 0,
    streak: 0,
    maxStreak: 0,
    correctCount: 0,
    lives: 3,
    timer: null,
    timeLeft: 12,
    maxTime: 12,
    isAnswered: false,

    // Для буквенного режима
    wordTarget: '',
    wordSlots: [],
    wordKeyboard: [],

    stats: {
      highScore: parseInt(localStorage.getItem('meme_high_score') || '0', 10),
      gamesPlayed: parseInt(localStorage.getItem('meme_games_played') || '0', 10),
      totalCorrect: parseInt(localStorage.getItem('meme_total_correct') || '0', 10),
      totalAnswered: parseInt(localStorage.getItem('meme_total_answered') || '0', 10)
    }
  };

  // DOM Элементы
  const screens = {
    welcome: document.getElementById('screen-welcome'),
    quiz: document.getElementById('screen-quiz'),
    result: document.getElementById('screen-result'),
    memopedia: document.getElementById('screen-memopedia')
  };

  const el = {
    soundBtn: document.getElementById('sound-toggle-btn'),
    memopediaNavBtn: document.getElementById('memopedia-nav-btn'),
    statHighScore: document.getElementById('stat-high-score'),
    statGamesPlayed: document.getElementById('stat-games-played'),
    statAccuracy: document.getElementById('stat-accuracy'),

    quizLives: document.getElementById('quiz-lives'),
    quizStreak: document.getElementById('quiz-streak'),
    quizScore: document.getElementById('quiz-score'),
    progressBarFill: document.getElementById('progress-bar-fill'),
    timerBarWrapper: document.getElementById('timer-bar-wrapper'),
    timerBarFill: document.getElementById('timer-bar-fill'),

    memeCard: document.getElementById('meme-card'),
    memeCategoryBadge: document.getElementById('meme-category-badge'),
    memeVisualBox: document.getElementById('meme-visual-box'),
    audioRoundBox: document.getElementById('audio-round-box'),
    audioPlayBigBtn: document.getElementById('audio-play-big-btn'),
    memeCaption: document.getElementById('meme-caption'),
    memeQuestion: document.getElementById('meme-question'),

    optionsGrid: document.getElementById('options-grid'),

    wordPuzzleContainer: document.getElementById('word-puzzle-container'),
    wordSlotsWrapper: document.getElementById('word-slots-wrapper'),
    letterTilesKeyboard: document.getElementById('letter-tiles-keyboard'),
    wordBackspaceBtn: document.getElementById('word-backspace-btn'),
    wordClearBtn: document.getElementById('word-clear-btn'),
    wordSubmitBtn: document.getElementById('word-submit-btn'),

    feedbackBox: document.getElementById('feedback-box'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackFact: document.getElementById('feedback-fact'),
    feedbackPunchline: document.getElementById('feedback-punchline'),
    nextQuestionBtn: document.getElementById('next-question-btn'),

    rankCard: document.getElementById('rank-card'),
    rankBadge: document.getElementById('rank-badge'),
    rankTitle: document.getElementById('rank-title'),
    rankDesc: document.getElementById('rank-desc'),
    rankAdvice: document.getElementById('rank-advice'),
    resultFinalScore: document.getElementById('result-final-score'),
    resultCorrectCount: document.getElementById('result-correct-count'),
    shareTelegramBtn: document.getElementById('share-telegram-btn'),
    playAgainBtn: document.getElementById('play-again-btn'),
    openMemopediaFromResult: document.getElementById('open-memopedia-from-result'),

    memopediaTabs: document.querySelectorAll('.memopedia-tabs .tab-pill'),
    memopediaList: document.getElementById('memopedia-list'),
    backToMenuBtn: document.getElementById('back-to-menu-btn'),

    confettiCanvas: document.getElementById('confetti-canvas')
  };

  // Переключение экранов
  function showScreen(screenName) {
    Object.keys(screens).forEach(key => {
      screens[key].classList.remove('active');
    });
    if (screens[screenName]) {
      screens[screenName].classList.add('active');
    }

    if (tg?.BackButton) {
      if (screenName === 'welcome') {
        tg.BackButton.hide();
      } else {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
          if (screenName === 'quiz') {
            if (confirm('Прервать мемную битву и выйти в меню?')) {
              stopTimer();
              showScreen('welcome');
              updateWelcomeStats();
            }
          } else {
            showScreen('welcome');
            updateWelcomeStats();
          }
        });
      }
    }
  }

  function updateWelcomeStats() {
    el.statHighScore.textContent = state.stats.highScore;
    el.statGamesPlayed.textContent = state.stats.gamesPlayed;
    const acc = state.stats.totalAnswered > 0
      ? Math.round((state.stats.totalCorrect / state.stats.totalAnswered) * 100)
      : 0;
    el.statAccuracy.textContent = acc + '%';
  }

  function updateSoundIcon() {
    el.soundBtn.textContent = window.memeAudio.isMuted ? '🔇' : '🔊';
  }

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // СТАРТ ИГРЫ
  function startGame(mode) {
    state.mode = mode;
    state.score = 0;
    state.streak = 0;
    state.maxStreak = 0;
    state.correctCount = 0;
    state.questionIndex = 0;
    state.lives = 3;

    let pool = shuffle(MEME_DATABASE);

    if (mode === 'survival') {
      state.currentQuestions = pool;
    } else {
      state.currentQuestions = pool.slice(0, 10);
    }

    showScreen('quiz');
    renderQuestion();
  }

  // ОПРЕДЕЛЕНИЕ ТИПА ТЕКУЩЕГО РАУНДА
  function getCurrentRoundType() {
    if (state.mode === 'classic') return 'classic';
    if (state.mode === 'audio') return 'audio';
    if (state.mode === 'word') return 'word';
    if (state.mode === 'survival') {
      // В выживании миксуем классику и аудио
      return state.questionIndex % 2 === 0 ? 'classic' : 'audio';
    }
    if (state.mode === 'mix') {
      // В миксе чередуем: классика -> аудио -> буквы
      const cycle = state.questionIndex % 3;
      if (cycle === 0) return 'classic';
      if (cycle === 1) return 'audio';
      return 'word';
    }
    return 'classic';
  }

  // ОТОБРАЖЕНИЕ ВОПРОСА
  function renderQuestion() {
    state.isAnswered = false;
    el.feedbackBox.classList.remove('active');

    const totalQuestions = state.mode === 'survival' ? '∞' : state.currentQuestions.length;
    const currentNum = state.questionIndex + 1;
    const meme = state.currentQuestions[state.questionIndex];

    if (!meme) {
      endGame();
      return;
    }

    const roundType = getCurrentRoundType();
    state.currentRoundType = roundType;

    // Шапка
    el.quizScore.textContent = state.score;
    if (state.mode === 'survival') {
      el.quizLives.textContent = '❤️'.repeat(Math.max(0, state.lives));
    } else {
      el.quizLives.textContent = `Вопрос ${currentNum} / ${totalQuestions}`;
    }

    if (state.streak >= 2) {
      el.quizStreak.style.display = 'inline-flex';
      el.quizStreak.textContent = `🔥 x${state.streak}`;
    } else {
      el.quizStreak.style.display = 'none';
    }

    if (state.mode === 'survival') {
      el.progressBarFill.style.width = '100%';
    } else {
      const pct = (state.questionIndex / state.currentQuestions.length) * 100;
      el.progressBarFill.style.width = `${pct}%`;
    }

    // Категория бейдж
    const catMap = {
      brainrot: '🤯 БРЕЙНРОТ',
      zoomer: '💅 ЗУМЕРСКОЕ',
      classic: '👴 ЗОЛОТАЯ КЛАССИКА'
    };
    el.memeCategoryBadge.textContent = catMap[meme.category] || '🔥 МЕМ';

    // В зависимости от типа раунда настраиваем интерфейс:
    if (roundType === 'audio') {
      // ЗВУКОВОЙ РАУНД
      el.memeVisualBox.style.display = 'none';
      el.audioRoundBox.style.display = 'flex';
      el.optionsGrid.style.display = 'flex';
      el.wordPuzzleContainer.style.display = 'none';

      el.memeCaption.textContent = meme.audioPrompt || 'Нажми кнопку и послушай фрагмент!';
      el.memeQuestion.textContent = '🔊 Какому мему принадлежит этот звук?';

      // Авто-воспроизведение звука при старте раунда
      window.memeAudio.playSoundPreset(meme.audioPreset);

      // Клик по большой кнопке повторно играет звук
      el.audioPlayBigBtn.onclick = () => {
        window.memeAudio.playSoundPreset(meme.audioPreset);
      };

      render4Options(meme, true); // варианты ответов - названия мемов

    } else if (roundType === 'word') {
      // СЛОВЕСНЫЙ РАУНД (СОБЕРИ ИЗ БУКВ)
      el.memeVisualBox.style.display = 'flex';
      el.audioRoundBox.style.display = 'none';
      el.optionsGrid.style.display = 'none';
      el.wordPuzzleContainer.style.display = 'flex';

      el.memeVisualBox.style.background = meme.visual.bgGradient || '#1e293b';
      el.memeVisualBox.innerHTML = meme.visual.art || `<div style="font-size:72px;">${meme.visual.emoji}</div>`;
      el.memeCaption.textContent = meme.visual.caption ? `«${meme.visual.caption}»` : '';
      el.memeQuestion.textContent = `🔤 Собери название мема (${meme.word.length} букв):`;

      renderWordPuzzle(meme);

    } else {
      // КЛАССИЧЕСКАЯ ВИКТОРИНА
      el.memeVisualBox.style.display = 'flex';
      el.audioRoundBox.style.display = 'none';
      el.optionsGrid.style.display = 'flex';
      el.wordPuzzleContainer.style.display = 'none';

      el.memeVisualBox.style.background = meme.visual.bgGradient || '#1e293b';
      el.memeVisualBox.innerHTML = meme.visual.art || `<div style="font-size:72px;">${meme.visual.emoji}</div>`;
      el.memeCaption.textContent = meme.visual.caption ? `«${meme.visual.caption}»` : '';
      el.memeQuestion.textContent = meme.question;

      render4Options(meme, false);
    }

    startTimer(roundType === 'word' ? 20 : 12);
  }

  // РЕНДЕР 4 ВАРИАНТОВ ОТВЕТА (Классика и Звук)
  function render4Options(meme, isAudioMode = false) {
    el.optionsGrid.innerHTML = '';
    const letters = ['А', 'Б', 'В', 'Г'];

    let optionsToUse = [];
    let correctText = '';

    if (isAudioMode) {
      // В звуковом раунде угадываем название мема
      correctText = meme.title;
      // Берем 3 случайных неправильных названия
      const otherTitles = MEME_DATABASE.filter(m => m.id !== meme.id).map(m => m.title);
      const wrong = shuffle(otherTitles).slice(0, 3);
      optionsToUse = shuffle([correctText, ...wrong]);
    } else {
      correctText = meme.options[meme.correctIndex];
      optionsToUse = shuffle(meme.options);
    }

    optionsToUse.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-letter">${letters[idx]}</span>
        <span class="option-text">${optText}</span>
      `;
      btn.addEventListener('click', () => {
        handleOptionSelect(btn, optText === correctText, correctText, meme);
      });
      el.optionsGrid.appendChild(btn);
    });
  }

  // РЕНДЕР СЛОВЕСНОГО ПАЗЛА (Сбор слова из букв)
  function renderWordPuzzle(meme) {
    const word = meme.word.toUpperCase();
    state.wordTarget = word;
    state.wordSlots = new Array(word.length).fill(null);

    // Добавляем 3-4 случайные буквы для интереса
    const extraAlphabet = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ';
    const extras = [];
    for (let i = 0; i < 3; i++) {
      extras.push(extraAlphabet[Math.floor(Math.random() * extraAlphabet.length)]);
    }

    const allLetters = shuffle([...word.split(''), ...extras]);
    state.wordKeyboard = allLetters.map((char, index) => ({
      id: index,
      char: char,
      isUsed: false
    }));

    updateWordUI();
  }

  function updateWordUI() {
    // 1. Отрисовка слотов
    el.wordSlotsWrapper.innerHTML = '';
    state.wordSlots.forEach((slotChar, idx) => {
      const slotEl = document.createElement('div');
      slotEl.className = 'letter-slot' + (slotChar ? ' filled' : '');
      slotEl.textContent = slotChar ? slotChar.char : '';

      slotEl.addEventListener('click', () => {
        if (state.isAnswered || !slotChar) return;
        window.memeAudio.playPop();
        // Возвращаем букву на клавиатуру
        const kbItem = state.wordKeyboard.find(k => k.id === slotChar.id);
        if (kbItem) kbItem.isUsed = false;
        state.wordSlots[idx] = null;
        updateWordUI();
      });

      el.wordSlotsWrapper.appendChild(slotEl);
    });

    // 2. Отрисовка буквенной клавиатуры
    el.letterTilesKeyboard.innerHTML = '';
    state.wordKeyboard.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'letter-tile' + (item.isUsed ? ' used' : '');
      btn.textContent = item.char;

      btn.addEventListener('click', () => {
        if (state.isAnswered || item.isUsed) return;
        window.memeAudio.playPop();

        // Находим первый пустой слот
        const emptyIdx = state.wordSlots.findIndex(s => s === null);
        if (emptyIdx !== -1) {
          item.isUsed = true;
          state.wordSlots[emptyIdx] = { id: item.id, char: item.char };
          updateWordUI();

          // Если все слоты заполнены — автоматически проверяем!
          if (state.wordSlots.every(s => s !== null)) {
            checkWordSolution();
          }
        }
      });

      el.letterTilesKeyboard.appendChild(btn);
    });
  }

  // Кнопки управления словом
  el.wordBackspaceBtn.onclick = () => {
    if (state.isAnswered) return;
    window.memeAudio.playPop();
    for (let i = state.wordSlots.length - 1; i >= 0; i--) {
      if (state.wordSlots[i] !== null) {
        const item = state.wordSlots[i];
        const kb = state.wordKeyboard.find(k => k.id === item.id);
        if (kb) kb.isUsed = false;
        state.wordSlots[i] = null;
        break;
      }
    }
    updateWordUI();
  };

  el.wordClearBtn.onclick = () => {
    if (state.isAnswered) return;
    window.memeAudio.playPop();
    state.wordSlots.fill(null);
    state.wordKeyboard.forEach(k => k.isUsed = false);
    updateWordUI();
  };

  el.wordSubmitBtn.onclick = () => {
    if (state.isAnswered) return;
    checkWordSolution();
  };

  function checkWordSolution() {
    const assembled = state.wordSlots.map(s => s ? s.char : '').join('');
    const meme = state.currentQuestions[state.questionIndex];
    const isCorrect = (assembled === state.wordTarget);
    handleOptionSelect(null, isCorrect, state.wordTarget, meme);
  }

  // ТАЙМЕР
  function startTimer(seconds = 12) {
    stopTimer();
    state.timeLeft = seconds;
    state.maxTime = seconds;
    el.timerBarWrapper.style.display = 'block';
    updateTimerUI();

    state.timer = setInterval(() => {
      state.timeLeft -= 0.1;
      if (state.timeLeft <= 0) {
        state.timeLeft = 0;
        updateTimerUI();
        stopTimer();
        handleTimeOut();
      } else {
        updateTimerUI();
      }
    }, 100);
  }

  function stopTimer() {
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
  }

  function updateTimerUI() {
    const pct = (state.timeLeft / state.maxTime) * 100;
    el.timerBarFill.style.width = `${pct}%`;
    el.timerBarFill.classList.remove('warning', 'danger');
    if (pct < 28) {
      el.timerBarFill.classList.add('danger');
    } else if (pct < 55) {
      el.timerBarFill.classList.add('warning');
    }
  }

  function handleTimeOut() {
    if (state.isAnswered) return;
    const meme = state.currentQuestions[state.questionIndex];
    const correctText = (state.currentRoundType === 'word')
      ? meme.word
      : (state.currentRoundType === 'audio')
      ? meme.title
      : meme.options[meme.correctIndex];

    handleOptionSelect(null, false, correctText, meme, true);
  }

  // ОБРАБОТКА ВЫБОРА / ОТВЕТА
  function handleOptionSelect(selectedBtn, isCorrect, correctText, meme, isTimeout = false) {
    if (state.isAnswered) return;
    state.isAnswered = true;
    stopTimer();

    state.stats.totalAnswered++;

    // Блокируем варианты ответов, если они есть
    const allBtns = el.optionsGrid.querySelectorAll('.option-btn');
    allBtns.forEach(btn => {
      btn.disabled = true;
      const text = btn.querySelector('.option-text')?.textContent;
      if (text === correctText) {
        btn.classList.add('correct');
      }
    });

    if (isCorrect) {
      state.correctCount++;
      state.stats.totalCorrect++;
      state.streak++;
      if (state.streak > state.maxStreak) {
        state.maxStreak = state.streak;
      }

      const speedBonus = Math.round((state.timeLeft / state.maxTime) * 60);
      const comboMult = state.streak >= 4 ? 2.5 : state.streak >= 2 ? 1.5 : 1.0;
      const roundScore = Math.round((100 + speedBonus) * comboMult);
      state.score += roundScore;

      if (state.streak >= 3) {
        window.memeAudio.playStreak(state.streak);
      } else {
        window.memeAudio.playCorrect();
      }

      const randomWin = WIN_TAUNTS[Math.floor(Math.random() * WIN_TAUNTS.length)];
      el.feedbackTitle.className = 'feedback-title win';
      el.feedbackTitle.innerHTML = `<span>✅</span> ${randomWin} (+${roundScore} pts)`;
    } else {
      if (selectedBtn) {
        selectedBtn.classList.add('wrong');
      }
      state.streak = 0;
      if (state.mode === 'survival') {
        state.lives--;
      }

      window.memeAudio.playVineBoom();

      const randomLose = LOSE_TAUNTS[Math.floor(Math.random() * LOSE_TAUNTS.length)];
      el.feedbackTitle.className = 'feedback-title lose';
      el.feedbackTitle.innerHTML = `<span>❌</span> ${isTimeout ? 'ВРЕМЯ ВЫШЛО! Скуф заснул ⏰' : randomLose}`;
    }

    el.quizScore.textContent = state.score;
    el.feedbackFact.textContent = meme.fact;
    el.feedbackPunchline.textContent = meme.punchline ? `💡 ${meme.punchline}` : '';
    el.feedbackBox.classList.add('active');

    if (state.mode === 'survival' && state.lives <= 0) {
      el.nextQuestionBtn.textContent = '💀 Завершить выживание';
    } else if (state.questionIndex + 1 >= state.currentQuestions.length) {
      el.nextQuestionBtn.textContent = '🏆 Узнать мемный ранг!';
    } else {
      el.nextQuestionBtn.textContent = 'Дальше ➔';
    }
  }

  // КНОПКА ДАЛЬШЕ
  el.nextQuestionBtn.addEventListener('click', () => {
    window.memeAudio.playPop();

    if (state.mode === 'survival' && state.lives <= 0) {
      endGame();
      return;
    }

    state.questionIndex++;
    if (state.questionIndex >= state.currentQuestions.length) {
      endGame();
    } else {
      renderQuestion();
    }
  });

  // ЗАВЕРШЕНИЕ ИГРЫ
  function endGame() {
    stopTimer();

    state.stats.gamesPlayed++;
    if (state.score > state.stats.highScore) {
      state.stats.highScore = state.score;
    }
    localStorage.setItem('meme_high_score', state.stats.highScore.toString());
    localStorage.setItem('meme_games_played', state.stats.gamesPlayed.toString());
    localStorage.setItem('meme_total_correct', state.stats.totalCorrect.toString());
    localStorage.setItem('meme_total_answered', state.stats.totalAnswered.toString());

    const correct = state.correctCount;
    let rank = MEME_RANKS[0];
    for (let i = MEME_RANKS.length - 1; i >= 0; i--) {
      if (correct >= MEME_RANKS[i].minScore) {
        rank = MEME_RANKS[i];
        break;
      }
    }

    el.rankCard.style.setProperty('--rank-color', rank.color);
    el.rankBadge.textContent = rank.badge;
    el.rankBadge.style.background = rank.color + '33';
    el.rankBadge.style.borderColor = rank.color;
    el.rankTitle.textContent = rank.title;
    el.rankDesc.textContent = rank.description;
    el.rankAdvice.textContent = `🎯 Совет: ${rank.advice}`;

    el.resultFinalScore.textContent = state.score;
    const totalQ = state.mode === 'survival' ? state.questionIndex + 1 : state.currentQuestions.length;
    el.resultCorrectCount.textContent = `${state.correctCount} / ${totalQ}`;

    showScreen('result');

    if (correct >= 5) {
      window.memeAudio.playVictory();
      triggerConfetti();
    } else {
      window.memeAudio.playWrong();
    }
  }

  // ПОДЕЛИТЬСЯ В TELEGRAM
  el.shareTelegramBtn.addEventListener('click', () => {
    window.memeAudio.playPop();
    const correct = state.correctCount;
    let rank = MEME_RANKS[0];
    for (let i = MEME_RANKS.length - 1; i >= 0; i--) {
      if (correct >= MEME_RANKS[i].minScore) {
        rank = MEME_RANKS[i];
        break;
      }
    }

    const shareText = `🗿 Я набрал ${state.score} очков в "ЧЁ ЗА МЕМ?" (режим: ${state.mode}) и получил статус: ${rank.title}!\n\nА ты сможешь лучше или ты скуф? Залетай играть! 👇`;
    const shareUrl = 'https://t.me/share/url?url=' + encodeURIComponent('https://t.me/Mememoqizolog_bot') + '&text=' + encodeURIComponent(shareText);

    if (tg?.openTelegramLink) {
      tg.openTelegramLink(shareUrl);
    } else {
      window.open(shareUrl, '_blank');
    }
  });

  el.playAgainBtn.addEventListener('click', () => {
    window.memeAudio.playPop();
    showScreen('welcome');
    updateWelcomeStats();
  });

  el.openMemopediaFromResult.addEventListener('click', () => {
    window.memeAudio.playPop();
    openMemopedia();
  });

  // МЕМОПЕДИЯ
  function openMemopedia(filterCategory = 'all') {
    showScreen('memopedia');
    renderMemopedia(filterCategory);
  }

  function renderMemopedia(category = 'all') {
    el.memopediaList.innerHTML = '';
    const filtered = category === 'all'
      ? MEME_DATABASE
      : MEME_DATABASE.filter(m => m.category === category);

    filtered.forEach(meme => {
      const item = document.createElement('div');
      item.className = 'memopedia-item';
      item.innerHTML = `
        <div class="memopedia-item-top">
          <span class="memopedia-item-title">${meme.title}</span>
          <button class="vine-boom-test-btn" data-preset="${meme.audioPreset || 'vineBoom'}">🔊 Звук</button>
        </div>
        <div style="font-size: 13px; font-weight: 600; color: #38bdf8;">
          «${meme.visual.caption || meme.question}»
        </div>
        <p class="memopedia-item-desc">${meme.fact}</p>
        <div style="font-size: 12px; font-weight: 700; color: #f59e0b;">
          ${meme.punchline || ''}
        </div>
      `;

      item.querySelector('.vine-boom-test-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const preset = e.target.dataset.preset;
        window.memeAudio.playSoundPreset(preset);
      });

      el.memopediaList.appendChild(item);
    });
  }

  el.memopediaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      window.memeAudio.playPop();
      el.memopediaTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMemopedia(tab.dataset.tab);
    });
  });

  el.memopediaNavBtn.addEventListener('click', () => {
    window.memeAudio.playPop();
    openMemopedia();
  });

  el.backToMenuBtn.addEventListener('click', () => {
    window.memeAudio.playPop();
    showScreen('welcome');
    updateWelcomeStats();
  });

  // ВЫБОР РЕЖИМА В МЕНЮ
  document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => {
      window.memeAudio.playPop();
      const mode = card.dataset.mode;
      startGame(mode);
    });
  });

  // ЗВУК
  el.soundBtn.addEventListener('click', () => {
    window.memeAudio.toggleMute();
    updateSoundIcon();
    window.memeAudio.playPop();
  });

  // КОНФЕТТИ
  function triggerConfetti() {
    const canvas = el.confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#10b981', '#ffffff'];
    const particles = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        alpha: 1
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.rotation += p.vRot;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    render();
  }

  // ЗАПУСК
  window.addEventListener('DOMContentLoaded', () => {
    updateWelcomeStats();
    updateSoundIcon();
  });

})();
