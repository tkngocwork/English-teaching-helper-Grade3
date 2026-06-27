// Bộ trò chơi tương tác (Interactive Mini-Games)
const GameCenter = {
  activeUnit: null,
  score: 0,
  
  // ==========================================
  // GAME 1: MATCHING GAME (Trò chơi ghép cặp)
  // ==========================================
  MatchingGame: {
    container: null,
    selectedCard: null,
    matchedCount: 0,
    totalPairs: 0,

    init: function(containerId, unitData, onWinCallback) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;
      this.selectedCard = null;
      this.matchedCount = 0;
      
      const vocab = unitData.vocab;
      this.totalPairs = vocab.length;
      
      // Tạo danh sách thẻ tiếng Anh và nghĩa tiếng Việt
      let cards = [];
      vocab.forEach((item, index) => {
        cards.push({ id: index, type: 'english', text: item.word, symbol: item.image });
        cards.push({ id: index, type: 'vietnamese', text: item.meaning, symbol: '' });
      });

      // Trộn thẻ ngẫu nhiên
      cards.sort(() => Math.random() - 0.5);

      // Render
      this.container.innerHTML = `
        <div class="game-matching-grid">
          ${cards.map(card => `
            <div class="game-card" data-id="${card.id}" data-type="${card.type}">
              <span class="game-card-icon">${card.symbol}</span>
              <span class="game-card-text">${card.text}</span>
            </div>
          `).join('')}
        </div>
      `;

      // Gắn sự kiện click
      const cardElements = this.container.querySelectorAll('.game-card');
      cardElements.forEach(cardEl => {
        cardEl.addEventListener('click', () => this.handleCardClick(cardEl, onWinCallback));
      });
    },

    handleCardClick: function(cardEl, onWinCallback) {
      if (cardEl.classList.contains('matched') || cardEl.classList.contains('selected')) return;

      // Phát tiếng click nhỏ
      SpeechService.speak("", true); // Đánh thức tiếng nói nếu cần

      if (!this.selectedCard) {
        // Chọn thẻ thứ nhất
        this.selectedCard = cardEl;
        cardEl.classList.add('selected');
      } else {
        // Chọn thẻ thứ hai
        const firstCard = this.selectedCard;
        const secondCard = cardEl;

        firstCard.classList.remove('selected');
        
        const firstId = firstCard.getAttribute('data-id');
        const secondId = secondCard.getAttribute('data-id');
        const firstType = firstCard.getAttribute('data-type');
        const secondType = secondCard.getAttribute('data-type');

        if (firstId === secondId && firstType !== secondType) {
          // Đúng!
          firstCard.classList.add('matched');
          secondCard.classList.add('matched');
          this.matchedCount++;

          // Phát âm từ tiếng Anh vừa chọn
          const englishText = firstType === 'english' ? firstCard.querySelector('.game-card-text').innerText : secondCard.querySelector('.game-card-text').innerText;
          SpeechService.speak(englishText, true);

          if (this.matchedCount === this.totalPairs) {
            setTimeout(() => {
              if (onWinCallback) onWinCallback();
            }, 600);
          }
        } else {
          // Sai! Lắc thẻ và đặt lại
          firstCard.classList.add('incorrect');
          secondCard.classList.add('incorrect');
          setTimeout(() => {
            firstCard.classList.remove('incorrect');
            secondCard.classList.remove('incorrect');
          }, 500);
        }
        this.selectedCard = null;
      }
    }
  },

  // ==========================================
  // GAME 2: WORD BUILDER (Trò chơi xếp chữ)
  // ==========================================
  WordBuilder: {
    container: null,
    currentWordIndex: 0,
    vocabList: [],
    currentWordObj: null,
    userSpelling: [],
    
    init: function(containerId, unitData, onWinCallback) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;
      
      this.vocabList = [...unitData.vocab].sort(() => Math.random() - 0.5); // Trộn từ
      this.currentWordIndex = 0;
      this.onWin = onWinCallback;

      this.loadWord();
    },

    loadWord: function() {
      if (this.currentWordIndex >= this.vocabList.length) {
        if (this.onWin) this.onWin();
        return;
      }

      this.currentWordObj = this.vocabList[this.currentWordIndex];
      this.userSpelling = [];

      const word = this.currentWordObj.word.toUpperCase();
      // Chia các chữ cái
      let letters = word.replace(/\s+/g, '').split(''); // Bỏ khoảng trắng nếu có cụm từ
      
      // Trộn chữ cái
      letters.sort(() => Math.random() - 0.5);

      // Thiết lập giao diện
      this.container.innerHTML = `
        <div class="word-builder-layout">
          <div class="game-instruction">Hãy xếp chữ cái để tạo từ đúng với hình ảnh/nghĩa dưới đây:</div>
          <div class="word-builder-hint-card">
            <span class="hint-emoji">${this.currentWordObj.image}</span>
            <span class="hint-text">${this.currentWordObj.meaning.toUpperCase()}</span>
          </div>
          
          <!-- Các ô trống để điền chữ -->
          <div class="word-slots-container">
            ${word.split('').map(char => {
              if (char === ' ') return '<div class="letter-slot space"></div>';
              return '<div class="letter-slot empty">?</div>';
            }).join('')}
          </div>

          <!-- Các nút chữ cái có sẵn để học sinh nhấn -->
          <div class="letters-pool">
            ${letters.map((char, index) => `
              <button class="letter-btn" data-char="${char}" data-index="${index}">${char}</button>
            `).join('')}
          </div>

          <div class="word-builder-actions">
            <button class="btn btn-secondary" id="wb-reset-btn">Làm lại</button>
            <button class="btn btn-primary" id="wb-speak-btn">Nghe gợi ý 🔊</button>
          </div>
        </div>
      `;

      // Phát âm từ ngay khi tải để gợi ý
      SpeechService.speak(this.currentWordObj.word, true);

      // Gắn sự kiện cho các chữ cái
      const letterBtns = this.container.querySelectorAll('.letter-btn');
      letterBtns.forEach(btn => {
        btn.addEventListener('click', () => this.handleLetterClick(btn));
      });

      // Sự kiện nút
      document.getElementById('wb-reset-btn').addEventListener('click', () => this.loadWord());
      document.getElementById('wb-speak-btn').addEventListener('click', () => {
        SpeechService.speak(this.currentWordObj.word, true);
      });
    },

    handleLetterClick: function(btn) {
      if (btn.disabled) return;
      
      const char = btn.getAttribute('data-char');
      btn.disabled = true;
      btn.classList.add('used');

      // Điền vào ô trống tiếp theo
      const slots = this.container.querySelectorAll('.letter-slot.empty');
      if (slots.length > 0) {
        const firstSlot = slots[0];
        firstSlot.innerText = char;
        firstSlot.classList.remove('empty');
        firstSlot.classList.add('filled');
        this.userSpelling.push({ char: char, btnIndex: btn.getAttribute('data-index') });
      }

      // Kiểm tra xem đã điền đủ chưa
      const remainingSlots = this.container.querySelectorAll('.letter-slot.empty');
      if (remainingSlots.length === 0) {
        // So sánh chuỗi ghép được với từ gốc
        const targetWord = this.currentWordObj.word.toUpperCase().replace(/\s+/g, '');
        const currentSpelled = this.userSpelling.map(x => x.char).join('');

        if (currentSpelled === targetWord) {
          // Đúng!
          const slotsContainer = this.container.querySelector('.word-slots-container');
          slotsContainer.classList.add('correct');
          
          // Phát âm từ đó
          SpeechService.speak(this.currentWordObj.word, true);

          setTimeout(() => {
            this.currentWordIndex++;
            this.loadWord();
          }, 1200);
        } else {
          // Sai! Rung đỏ và tự động reset sau 1 giây
          const slotsContainer = this.container.querySelector('.word-slots-container');
          slotsContainer.classList.add('incorrect');
          setTimeout(() => {
            this.loadWord(); // nạp lại từ hiện tại
          }, 1000);
        }
      }
    }
  },

  // ==========================================
  // GAME 3: LISTEN & PICK (Nghe và Chọn)
  // ==========================================
  ListenAndPick: {
    container: null,
    vocabList: [],
    correctWordObj: null,
    currentQuestionIndex: 0,
    maxQuestions: 5,
    score: 0,
    onWin: null,

    init: function(containerId, unitData, onWinCallback) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;
      
      this.vocabList = unitData.vocab;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.onWin = onWinCallback;

      this.loadQuestion();
    },

    loadQuestion: function() {
      if (this.currentQuestionIndex >= Math.min(this.maxQuestions, this.vocabList.length)) {
        if (this.onWin) this.onWin(this.score, Math.min(this.maxQuestions, this.vocabList.length));
        return;
      }

      // Chọn từ đúng
      const pool = [...this.vocabList];
      // Xáo trộn pool
      pool.sort(() => Math.random() - 0.5);
      
      this.correctWordObj = pool[0];
      
      // Chọn 3 phương án nhiễu khác
      let options = [this.correctWordObj];
      for (let i = 1; i < pool.length; i++) {
        if (options.length < 3) {
          options.push(pool[i]);
        }
      }
      
      // Trộn các lựa chọn
      options.sort(() => Math.random() - 0.5);

      this.container.innerHTML = `
        <div class="listen-pick-layout">
          <div class="question-progress">Câu ${this.currentQuestionIndex + 1} / ${Math.min(this.maxQuestions, this.vocabList.length)}</div>
          
          <button class="speaker-giant-btn" id="lp-speaker-btn">
            <span class="speaker-icon">🔊</span>
            <span class="speaker-label">Bấm để nghe</span>
          </button>

          <div class="options-grid">
            ${options.map(opt => `
              <div class="opt-card" data-word="${opt.word}">
                <span class="opt-emoji">${opt.image}</span>
                <span class="opt-meaning">${opt.meaning}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      // Tự động phát âm ngay
      setTimeout(() => {
        SpeechService.speak(this.correctWordObj.word, true);
      }, 300);

      // Gắn sự kiện phát lại loa
      document.getElementById('lp-speaker-btn').addEventListener('click', () => {
        SpeechService.speak(this.correctWordObj.word, true);
      });

      // Gắn sự kiện chọn đáp án
      const optCards = this.container.querySelectorAll('.opt-card');
      optCards.forEach(card => {
        card.addEventListener('click', () => this.handleOptionClick(card));
      });
    },

    handleOptionClick: function(card) {
      const selectedWord = card.getAttribute('data-word');
      const correctWord = this.correctWordObj.word;

      const allCards = this.container.querySelectorAll('.opt-card');
      allCards.forEach(c => c.style.pointerEvents = 'none'); // khóa bấm tiếp

      if (selectedWord === correctWord) {
        card.classList.add('correct');
        this.score++;
        SpeechService.speak("Well done!", true);
      } else {
        card.classList.add('incorrect');
        // highlight thẻ đúng
        allCards.forEach(c => {
          if (c.getAttribute('data-word') === correctWord) {
            c.classList.add('correct');
          }
        });
        SpeechService.speak("Oops!", true);
      }

      setTimeout(() => {
        this.currentQuestionIndex++;
        this.loadQuestion();
      }, 1500);
    }
  },

  // ==========================================
  // GAME 4: TPR CAMERA GAME (Ngôn ngữ cơ thể)
  // ==========================================
  TPRGame: {
    container: null,
    videoElement: null,
    videoStream: null,
    canvas: null,
    ctx: null,
    isStreaming: false,
    actionsList: [],
    currentAction: null,
    countdown: 5,
    countdownInterval: null,
    drawLoopId: null,
    onScoreChange: null,

    init: function(containerId, unitData, onScoreChangeCallback) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;
      
      this.actionsList = unitData.tprActions || [
        { command: "Stand up! 🧍", text: "đứng lên", voiceCommand: "Stand up" },
        { command: "Sit down! 🧎", text: "ngồi xuống", voiceCommand: "Sit down" }
      ];
      this.onScoreChange = onScoreChangeCallback;
      this.stop(); // Dừng camera cũ nếu đang chạy

      this.container.innerHTML = `
        <div class="tpr-layout">
          <div class="game-instruction">Hãy nhìn camera và làm theo khẩu lệnh vận động của AI nhé!</div>
          
          <div class="tpr-camera-box">
            <canvas id="tpr-canvas" width="640" height="480"></canvas>
            
            <!-- Khung hiển thị hành động khẩu lệnh -->
            <div class="tpr-overlay-card" id="tpr-action-card" style="display: none;">
              <div class="tpr-overlay-title">Học sinh làm theo hành động:</div>
              <div class="tpr-overlay-command" id="tpr-cmd-text">Touch your nose! 👃</div>
              <div class="tpr-overlay-vietnamese" id="tpr-trans-text">Chạm tay vào mũi</div>
            </div>

            <!-- Khung đếm ngược khổng lồ -->
            <div class="tpr-countdown-overlay" id="tpr-countdown-val" style="display: none;">5</div>
          </div>

          <!-- Khu vực điều khiển -->
          <div class="tpr-actions-container" id="tpr-init-controls">
            <button class="btn btn-primary" id="tpr-btn-start">Bật Camera & Chơi Ngay 📸</button>
          </div>

          <div class="tpr-actions-container" id="tpr-play-controls" style="display: none;">
            <div class="tpr-score-award-card red">
              <span class="tpr-score-award-title">Đội Đỏ (Red Team)</span>
              <button class="btn btn-primary" id="tpr-btn-award-red" style="background:#FF6B8B; box-shadow:0 4px 0 #C0392B;">+1 Điểm 👍</button>
            </div>
            
            <button class="btn btn-secondary" id="tpr-btn-next" style="align-self: center; height: fit-content; margin: 0 10px;">Bỏ qua ⏭️</button>
            
            <div class="tpr-score-award-card blue">
              <span class="tpr-score-award-title">Đội Xanh (Blue Team)</span>
              <button class="btn btn-primary" id="tpr-btn-award-blue" style="background:#4D96FF; box-shadow:0 4px 0 #3385FF;">+1 Điểm 👍</button>
            </div>
          </div>
        </div>
      `;

      // Tạo đối tượng video ẩn để hứng luồng từ camera
      this.videoElement = document.createElement('video');
      this.videoElement.setAttribute('autoplay', '');
      this.videoElement.setAttribute('playsinline', '');

      this.canvas = document.getElementById('tpr-canvas');
      this.ctx = this.canvas.getContext('2d');

      // Vẽ màn hình chờ màu tối ban đầu
      this.drawPlaceholder();

      // Bắt đầu sự kiện
      document.getElementById('tpr-btn-start').addEventListener('click', () => this.startCamera());
      
      document.getElementById('tpr-btn-award-red').addEventListener('click', () => {
        if (this.onScoreChange) this.onScoreChange('red', 1);
        this.nextAction();
      });
      document.getElementById('tpr-btn-award-blue').addEventListener('click', () => {
        if (this.onScoreChange) this.onScoreChange('blue', 1);
        this.nextAction();
      });
      document.getElementById('tpr-btn-next').addEventListener('click', () => this.nextAction());
    },

    drawPlaceholder: function() {
      const w = this.canvas.width;
      const h = this.canvas.height;
      this.ctx.fillStyle = '#2C3E50';
      this.ctx.fillRect(0, 0, w, h);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = 'bold 20px Nunito, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Camera chưa hoạt động', w / 2, h / 2 - 10);
      this.ctx.font = '14px Nunito, sans-serif';
      this.ctx.fillStyle = '#BDC3C7';
      this.ctx.fillText('Nhấn nút bên dưới để cấp quyền và mở camera', w / 2, h / 2 + 20);
    },

    startCamera: async function() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 }
        });
        
        this.videoStream = stream;
        this.videoElement.srcObject = stream;
        this.isStreaming = true;

        // Ẩn nút khởi chạy, hiện bảng chấm điểm
        document.getElementById('tpr-init-controls').style.display = 'none';
        document.getElementById('tpr-play-controls').style.display = 'flex';
        document.getElementById('tpr-action-card').style.display = 'block';

        // Bắt đầu vẽ khung hình camera
        this.startDrawLoop();

        // Bắt đầu chơi động tác đầu tiên
        this.nextAction();

      } catch (err) {
        console.error("Không truy cập được camera:", err);
        alert("Không thể mở camera. Bạn có cấp quyền camera cho trang web chưa?");
      }
    },

    startDrawLoop: function() {
      const draw = () => {
        if (!this.isStreaming) return;
        
        // Vẽ hình lật ngược gương (Mirrored) để học sinh thấy giống soi gương
        this.ctx.save();
        this.ctx.translate(this.canvas.width, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();

        // Nếu đang có sticker hoạt hình cho hành động, vẽ đè lên
        this.drawOverlayDecorations();

        this.drawLoopId = requestAnimationFrame(draw);
      };
      
      this.drawLoopId = requestAnimationFrame(draw);
    },

    drawOverlayDecorations: function() {
      // Có thể thêm sticker vui nhộn đè lên góc màn hình để thêm sinh động
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      this.ctx.strokeStyle = 'var(--color-primary)';
      this.ctx.lineWidth = 10;
      this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    },

    nextAction: function() {
      if (!this.isStreaming) return;

      // Chọn hành động ngẫu nhiên khác hành động cũ
      let nextAct;
      do {
        nextAct = this.actionsList[Math.floor(Math.random() * this.actionsList.length)];
      } while (this.actionsList.length > 1 && nextAct === this.currentAction);

      this.currentAction = nextAct;

      // Cập nhật thẻ lệnh
      document.getElementById('tpr-cmd-text').innerText = this.currentAction.command;
      document.getElementById('tpr-trans-text').innerText = this.currentAction.text.toUpperCase();
      
      // Phát âm câu lệnh
      SpeechService.speak(this.currentAction.voiceCommand, true);

      // Chạy đếm ngược 5 giây
      this.startCountdown();
    },

    startCountdown: function() {
      if (this.countdownInterval) clearInterval(this.countdownInterval);
      
      this.countdown = 5;
      const countEl = document.getElementById('tpr-countdown-val');
      countEl.innerText = this.countdown;
      countEl.style.display = 'block';

      this.countdownInterval = setInterval(() => {
        this.countdown--;
        countEl.innerText = this.countdown;

        if (this.countdown <= 0) {
          clearInterval(this.countdownInterval);
          countEl.style.display = 'none';
          
          // Phát chuông báo / nói kiểm tra bé đã làm chưa
          SpeechService.speak("Times up! Did you do it?", true);
        } else {
          // Tiếng tích tắc nhỏ
          // Phát tiếng bíp ngắn
          try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.value = 800;
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
          } catch(e) {}
        }
      }, 1000);
    },

    stop: function() {
      this.isStreaming = false;
      
      if (this.drawLoopId) {
        cancelAnimationFrame(this.drawLoopId);
        this.drawLoopId = null;
      }

      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }

      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => track.stop());
        this.videoStream = null;
      }
    }
  }
};

// Xuất module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameCenter;
}
