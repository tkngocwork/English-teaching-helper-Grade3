// Bộ điều khiển luồng chính của ứng dụng (Main App Controller)

// ==========================================
// 1. CONFETTI EFFECT (Hiệu ứng pháo hoa giấy)
// ==========================================
class ConfettiEffect {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.colors = ['#FF6B8B', '#4D96FF', '#6BCB77', '#FFD93D', '#A85CF9', '#55D8C1'];
    this.isActive = false;

    window.addEventListener('resize', () => this.resizeCanvas());
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    this.particles = [];
    const count = 120;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * -50 - 10,
        r: Math.random() * 6 + 4, // Bán kính hạt
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 5 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
      });
    }

    if (!this.isActive) {
      this.isActive = true;
      this.animate();
    }
  }

  animate() {
    if (!this.isActive) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let activeParticles = 0;
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y < this.canvas.height) {
        activeParticles++;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        // Vẽ một hình chữ nhật nhỏ đại diện cho mẩu giấy confetti
        this.ctx.fillRect(-p.r, -p.r/2, p.r * 2, p.r);
        this.ctx.restore();
      }
    });

    if (activeParticles > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.isActive = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ==========================================
// 2. MAIN APPLICATION STATE & LOGIC
// ==========================================
const App = {
  currentUnit: null,
  currentTab: 'vocab', // 'vocab' | 'dialogue' | 'games' | 'wheel'
  activeGame: 'matching', // 'matching' | 'builder' | 'listenpick'
  
  vocabIndex: 0,
  students: [],
  scores: { red: 0, blue: 0 },
  timer: {
    duration: 0,
    intervalId: null,
    isRunning: false
  },
  
  confetti: null,
  luckyWheel: null,
  harryPotterMode: false,
  currentHpSpeaker: 'harry',

  init: function() {
    // Khởi tạo pháo hoa giấy
    this.confetti = new ConfettiEffect('confetti-canvas');
    
    // Nạp học sinh mặc định từ data.js
    this.students = [...lessonData.defaultStudents];

    // Thiết lập Unit mặc định là Unit đầu tiên
    this.currentUnit = lessonData.units[0];

    // Render danh sách chọn bài bên Sidebar
    this.renderSidebarUnits();

    // Đồng bộ trạng thái checkbox Harry Potter
    const hpToggle = document.getElementById('hp-mode-toggle');
    if (hpToggle) {
      hpToggle.checked = this.harryPotterMode;
    }

    // Khởi tạo các sự kiện giao diện
    this.initEventListeners();

    // Hiển thị nội dung ban đầu
    this.changeUnit(this.currentUnit.id);
    
    // Khởi tạo vòng quay may mắn
    this.luckyWheel = new LuckyWheel('wheel-canvas', this.students, (winner) => {
      this.handleWheelWinner(winner);
    });

    this.renderStudentList();
  },

  // Render danh sách các bài học lên Sidebar
  renderSidebarUnits: function() {
    const listEl = document.getElementById('unit-nav-list');
    listEl.innerHTML = lessonData.units.map(unit => `
      <button class="unit-btn" data-id="${unit.id}">
        <span>📚</span> ${unit.title}
      </button>
    `).join('');
  },

  // Khởi động các sự kiện
  initEventListeners: function() {
    // 1. Chọn bài học ở Sidebar
    document.getElementById('unit-nav-list').addEventListener('click', (e) => {
      const btn = e.target.closest('.unit-btn');
      if (btn) {
        const id = parseInt(btn.getAttribute('data-id'));
        this.changeUnit(id);
      }
    });

    // 2. Bấm Vòng quay lớp học ở Sidebar
    document.getElementById('nav-wheel-btn').addEventListener('click', () => {
      this.changeTab('wheel');
    });

    // 3. Chọn Tab (Từ vựng, Hội thoại, Trò chơi)
    document.getElementById('lesson-tabs-bar').addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (btn) {
        const tab = btn.getAttribute('data-tab');
        this.changeTab(tab);
      }
    });

    // 4. Lật Flashcard từ vựng
    const cardEl = document.getElementById('vocab-flashcard');
    cardEl.addEventListener('click', () => {
      cardEl.classList.toggle('flipped');
    });

    // 5. Điều hướng Flashcards
    document.getElementById('card-prev-btn').addEventListener('click', () => {
      this.vocabIndex = (this.vocabIndex - 1 + this.currentUnit.vocab.length) % this.currentUnit.vocab.length;
      this.renderFlashcard();
    });
    document.getElementById('card-next-btn').addEventListener('click', () => {
      this.vocabIndex = (this.vocabIndex + 1) % this.currentUnit.vocab.length;
      this.renderFlashcard();
    });

    // 6. Phát âm từ vựng mặt thẻ & Học sinh luyện đọc
    document.getElementById('card-speak-btn').addEventListener('click', (e) => {
      e.stopPropagation(); // tránh lật thẻ khi bấm loa
      const vocab = this.currentUnit.vocab[this.vocabIndex];
      
      let speaker = 'general';
      if (this.harryPotterMode) {
        speaker = this.currentHpSpeaker;
        this.updateHarryPotterSpeaker();
      }
      SpeechService.speak(vocab.word, speaker);
    });

    document.getElementById('card-listen-btn').addEventListener('click', (e) => {
      e.stopPropagation(); // tránh lật thẻ
      this.startListeningPractice();
    });

    // 7. Hội thoại đọc toàn bộ
    document.getElementById('btn-play-all-dialogue').addEventListener('click', () => {
      this.dialogueReadingAll();
    });

    // 8. Chuyển đổi game
    document.querySelector('.game-tabs').addEventListener('click', (e) => {
      const btn = e.target.closest('.game-tab');
      if (btn) {
        this.changeGame(btn.getAttribute('data-game'));
      }
    });

    // 9. Bảng điểm (Scoreboard) cộng trừ điểm
    document.getElementById('score-red-plus').addEventListener('click', () => this.adjustScore('red', 1));
    document.getElementById('score-red-minus').addEventListener('click', () => this.adjustScore('red', -1));
    document.getElementById('score-blue-plus').addEventListener('click', () => this.adjustScore('blue', 1));
    document.getElementById('score-blue-minus').addEventListener('click', () => this.adjustScore('blue', -1));

    // 10. Đếm ngược (Timer)
    document.getElementById('global-timer').addEventListener('click', () => this.showTimerModal());
    document.getElementById('timer-modal-cancel').addEventListener('click', () => this.hideTimerModal());
    document.getElementById('timer-modal-start').addEventListener('click', () => this.startTimerFromModal());

    document.querySelectorAll('[data-time]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('custom-timer-input').value = btn.getAttribute('data-time');
      });
    });

    // 11. Vòng quay may mắn điều khiển
    document.getElementById('btn-spin-wheel-giant').addEventListener('click', () => this.luckyWheel.spin());
    document.getElementById('wheel-spin-trigger').addEventListener('click', () => this.luckyWheel.spin());

    // Thêm học sinh vào danh sách
    document.getElementById('add-student-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('input-student-name');
      const name = input.value.trim();
      if (name) {
        this.students.push(name);
        this.renderStudentList();
        this.luckyWheel.updateNames(this.students);
        input.value = "";
      }
    });

    // 12. Tắt Popups
    document.getElementById('celebration-close-btn').addEventListener('click', () => this.hideCelebrationModal());

    // 13. Bật tắt chế độ Harry Potter
    document.getElementById('hp-mode-toggle').addEventListener('change', (e) => {
      this.harryPotterMode = e.target.checked;
      this.updateHarryPotterUI();
    });
  },

  // Chuyển bài học hiện tại
  changeUnit: function(unitId) {
    const unit = lessonData.units.find(u => u.id === unitId);
    if (!unit) return;

    this.currentUnit = unit;
    this.vocabIndex = 0;

    // Cập nhật trạng thái active ở Sidebar
    document.querySelectorAll('.unit-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-id')) === unitId);
    });
    document.getElementById('nav-wheel-btn').classList.remove('active');

    // Hiện lại thanh tab chế độ học tập
    document.getElementById('lesson-tabs-bar').style.display = 'flex';

    // Cập nhật tiêu đề bài học
    document.getElementById('current-lesson-title').innerHTML = `<span>✨</span> ${unit.title}`;

    // Buộc quay lại tab 'vocab' khi đổi bài học
    this.changeTab('vocab');
  },

  // Chuyển tab bài học (Từ vựng, Hội thoại, Game, Vòng quay)
  changeTab: function(tabName) {
    // Dừng camera nếu đang chạy trò chơi TPR
    if (typeof GameCenter !== 'undefined' && GameCenter.TPRGame) {
      GameCenter.TPRGame.stop();
    }

    this.currentTab = tabName;

    // Cập nhật giao diện tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    // Ẩn tất cả views
    document.querySelectorAll('.module-view').forEach(view => {
      view.style.display = 'none';
    });

    if (tabName === 'wheel') {
      // Ẩn thanh tab bài học vì đây là Tiện ích lớp học
      document.getElementById('lesson-tabs-bar').style.display = 'none';
      document.getElementById('nav-wheel-btn').classList.add('active');
      document.getElementById('current-lesson-title').innerHTML = `<span>🎡</span> Vòng quay chọn học sinh`;
      
      document.getElementById('view-wheel').style.display = 'block';
      setTimeout(() => this.luckyWheel.draw(), 50); // vẽ lại canvas tránh lỗi kích thước
    } else {
      document.getElementById('lesson-tabs-bar').style.display = 'flex';
      document.getElementById('view-' + tabName).style.display = 'block';

      // Kích hoạt render tương ứng
      if (tabName === 'vocab') {
        this.renderFlashcard();
      } else if (tabName === 'dialogue') {
        this.renderDialogue();
      } else if (tabName === 'games') {
        this.changeGame(this.activeGame);
      }
    }
    
    // Cập nhật hiển thị Harry Potter UI khi đổi tab
    this.updateHarryPotterUI();
  },

  // ==========================================
  // VIEW: FLASHCARD (Từ vựng)
  // ==========================================
  renderFlashcard: function() {
    const vocab = this.currentUnit.vocab[this.vocabIndex];
    
    // Đặt lại trạng thái lật thẻ về mặt trước
    document.getElementById('vocab-flashcard').classList.remove('flipped');
    
    document.getElementById('card-front-emoji').innerText = vocab.image;
    document.getElementById('card-front-word').innerText = vocab.word;
    document.getElementById('card-front-ipa').innerText = vocab.ipa;
    document.getElementById('card-back-meaning').innerText = vocab.meaning.toUpperCase();
    
    document.getElementById('vocab-index-display').innerText = `${this.vocabIndex + 1} / ${this.currentUnit.vocab.length}`;
    
    // reset nhận dạng giọng nói cũ nếu có
    document.getElementById('speech-feedback').style.display = 'none';

    // Cập nhật Harry Potter UI cho thẻ từ vựng mới
    this.updateHarryPotterUI();
  },

  startListeningPractice: function() {
    const vocab = this.currentUnit.vocab[this.vocabIndex];
    const feedbackPanel = document.getElementById('speech-feedback');
    const listenBtn = document.getElementById('card-listen-btn');

    feedbackPanel.style.display = 'block';
    feedbackPanel.className = 'speech-feedback-panel';
    feedbackPanel.innerText = '🎧 Đang lắng nghe con phát âm... Hãy đọc to lên nhé!';

    listenBtn.classList.add('listening');

    SpeechService.listenAndCheck(
      vocab.word,
      // Khi bắt đầu lắng nghe
      () => {},
      // Khi có kết quả
      (result) => {
        listenBtn.classList.remove('listening');
        if (result.correct) {
          feedbackPanel.className = 'speech-feedback-panel success';
          feedbackPanel.innerHTML = `🎉 Tuyệt vời! Bé nói đúng: <strong>"${result.heard}"</strong>`;
          
          this.confetti.start();
          SpeechService.speak("Awesome!", true);
        } else {
          feedbackPanel.className = 'speech-feedback-panel fail';
          feedbackPanel.innerHTML = `😢 Gần đúng rồi! Bé nói: <strong>"${result.heard || '...'}"</strong>. Hãy thử lại xem!`;
        }
      },
      // Khi có lỗi
      (err) => {
        listenBtn.classList.remove('listening');
        feedbackPanel.className = 'speech-feedback-panel fail';
        feedbackPanel.innerText = '⚠️ Lỗi micro hoặc trình duyệt không nhận được tiếng. Thử lại nhé!';
      }
    );
  },

  // ==========================================
  // VIEW: CONVERSATION (Hội thoại)
  // ==========================================
  renderDialogue: function() {
    const listEl = document.getElementById('dialogue-list');
    
    listEl.innerHTML = this.currentUnit.dialogue.map((line, index) => {
      // Chọn ngẫu nhiên avatar phù hợp
      let avatar = '🧒';
      if (line.speaker.toLowerCase().includes('teacher')) avatar = '👩‍🏫';
      else if (line.speaker.toLowerCase().includes('mai')) avatar = '👧';
      else if (line.speaker.toLowerCase().includes('ben')) avatar = '👦';
      else if (line.speaker.toLowerCase().includes('bill')) avatar = '🧑';
      
      return `
        <div class="dialogue-bubble">
          <div class="avatar-bubble">${avatar}</div>
          <div class="dialogue-text-box">
            <div class="dialogue-speaker">${line.speaker}</div>
            <div class="dialogue-english">${line.text}</div>
            <div class="dialogue-vietnamese">${line.translation}</div>
            <button class="dialogue-audio-btn" data-index="${index}">🔊</button>
          </div>
        </div>
      `;
    }).join('');

    // Gắn sự kiện click nghe từng câu riêng biệt
    listEl.querySelectorAll('.dialogue-audio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        const line = this.currentUnit.dialogue[index];
        SpeechService.speak(line.text, line.speaker);
      });
    });
  },

  // Tự động phát âm toàn bộ bài nói từ trên xuống dưới
  dialogueReadingAll: function() {
    const lines = this.currentUnit.dialogue;
    let index = 0;

    const speakNext = () => {
      if (index >= lines.length) {
        // Hoàn thành phát toàn bộ
        this.showCelebrationModal('👏', 'Hoàn thành!', 'Thầy/Cô và các em vừa hoàn thành luyện nghe hội thoại.');
        return;
      }

      // Tô sáng câu đang đọc
      const bubbles = document.querySelectorAll('.dialogue-bubble');
      bubbles.forEach((b, idx) => {
        if (idx === index) {
          b.querySelector('.dialogue-text-box').style.borderColor = 'var(--color-primary)';
          b.querySelector('.dialogue-text-box').style.borderWidth = '2px';
          b.querySelector('.dialogue-text-box').style.borderStyle = 'solid';
          b.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          b.querySelector('.dialogue-text-box').style.border = 'none';
        }
      });

      SpeechService.speak(lines[index].text, lines[index].speaker, () => {
        index++;
        setTimeout(speakNext, 500); // nghỉ nửa giây giữa các câu
      });
    };

    speakNext();
  },

  // ==========================================
  // VIEW: TRÒ CHƠI (GAMES)
  // ==========================================
  changeGame: function(gameName) {
    // Dừng camera nếu đang chuyển từ trò chơi TPR sang game khác
    if (typeof GameCenter !== 'undefined' && GameCenter.TPRGame) {
      GameCenter.TPRGame.stop();
    }

    this.activeGame = gameName;
    
    // Cập nhật tab active của game
    document.querySelectorAll('.game-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-game') === gameName);
    });

    this.renderActiveGame();
  },

  renderActiveGame: function() {
    const vpId = 'game-active-viewport';
    
    if (this.activeGame === 'matching') {
      GameCenter.MatchingGame.init(vpId, this.currentUnit, () => {
        this.showCelebrationModal('🎉', 'Chiến thắng!', 'Các bé đã ghép đúng tất cả các cặp từ vựng rồi!');
        this.confetti.start();
        SpeechService.speak("Congratulations! You won the game!", true);
      });
    } else if (this.activeGame === 'builder') {
      GameCenter.WordBuilder.init(vpId, this.currentUnit, () => {
        this.showCelebrationModal('🏆', 'Hoàn thành xếp chữ!', 'Tuyệt vời! Tất cả từ vựng đều được sắp xếp chính xác.');
        this.confetti.start();
        SpeechService.speak("Awesome job!", true);
      });
    } else if (this.activeGame === 'listenpick') {
      GameCenter.ListenAndPick.init(vpId, this.currentUnit, (score, total) => {
        this.showCelebrationModal('🥇', 'Hoàn thành!', `Bé đã trả lời đúng ${score} trên tổng số ${total} câu!`);
        this.confetti.start();
        SpeechService.speak(`Excellent! You got ${score} points!`, true);
      });
    } else if (this.activeGame === 'tpr') {
      GameCenter.TPRGame.init(vpId, this.currentUnit, (team, amt) => {
        this.adjustScore(team, amt);
      });
    }
  },

  // ==========================================
  // TIỆN ÍCH LỚP HỌC: QUẢN LÝ ĐIỂM SỐ
  // ==========================================
  adjustScore: function(team, amount) {
    this.scores[team] = Math.max(0, this.scores[team] + amount);
    document.getElementById(`score-${team}`).innerText = this.scores[team];
    
    if (amount > 0) {
      // Ăn mừng nhỏ khi cộng điểm
      this.confetti.start();
      const teamLabel = team === 'red' ? 'ĐỘI ĐỎ' : 'ĐỘI XANH';
      this.showCelebrationModal('🔥', 'Ghi điểm!', `${teamLabel} vừa xuất sắc giành được 1 điểm!`);
      SpeechService.speak("One point for Team " + (team === 'red' ? "Red" : "Blue"), true);
    }
  },

  // ==========================================
  // TIỆN ÍCH LỚP HỌC: ĐỒNG HỒ ĐẾM NGƯỢC (TIMER)
  // ==========================================
  showTimerModal: function() {
    document.getElementById('timer-modal').classList.add('active');
  },

  hideTimerModal: function() {
    document.getElementById('timer-modal').classList.remove('active');
  },

  startTimerFromModal: function() {
    const inputVal = parseInt(document.getElementById('custom-timer-input').value);
    if (isNaN(inputVal) || inputVal <= 0) return;

    this.hideTimerModal();
    this.startCountdown(inputVal);
  },

  startCountdown: function(seconds) {
    if (this.timer.intervalId) {
      clearInterval(this.timer.intervalId);
    }

    this.timer.duration = seconds;
    this.timer.isRunning = true;
    
    this.updateTimerDisplay();

    this.timer.intervalId = setInterval(() => {
      this.timer.duration--;
      this.updateTimerDisplay();

      // Cảnh báo gần hết giờ (3 giây cuối phát bíp nhẹ)
      if (this.timer.duration <= 3 && this.timer.duration > 0) {
        this.luckyWheel.playTickSound(); 
      }

      if (this.timer.duration <= 0) {
        clearInterval(this.timer.intervalId);
        this.timer.isRunning = false;
        
        // Hết giờ! Chuông báo
        this.showCelebrationModal('⏰', 'HẾT GIỜ!', 'Thời gian hoạt động đã kết thúc.');
        SpeechService.speak("Time is up!", true);
      }
    }, 1000);
  },

  updateTimerDisplay: function() {
    const mins = Math.floor(this.timer.duration / 60);
    const secs = this.timer.duration % 60;
    
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    document.getElementById('timer-display').innerText = formatted;

    // Đổi màu cảnh báo nếu dưới 10 giây
    const timerWidget = document.getElementById('global-timer');
    if (this.timer.duration <= 10 && this.timer.isRunning) {
      timerWidget.style.backgroundColor = '#FADBD8';
      timerWidget.style.borderColor = '#E74C3C';
    } else {
      timerWidget.style.backgroundColor = '#FFF9E6';
      timerWidget.style.borderColor = 'var(--color-warning)';
    }
  },

  // ==========================================
  // TIỆN ÍCH LỚP HỌC: QUẢN LÝ DANH SÁCH LỚP
  // ==========================================
  renderStudentList: function() {
    const container = document.getElementById('student-list-container');
    document.getElementById('student-count').innerText = `(${this.students.length})`;
    
    container.innerHTML = this.students.map((student, idx) => `
      <div class="student-list-item">
        <span>${idx + 1}. ${student}</span>
        <button class="delete-student-btn" data-index="${idx}">×</button>
      </div>
    `).join('');

    // Sự kiện xóa học sinh
    container.querySelectorAll('.delete-student-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        this.students.splice(index, 1);
        this.renderStudentList();
        this.luckyWheel.updateNames(this.students);
      });
    });
  },

  handleWheelWinner: function(winnerName) {
    this.confetti.start();
    this.showCelebrationModal('🎉', 'Chúc mừng!', `Học sinh may mắn được chọn trả lời là:\n\n⭐ ${winnerName} ⭐`);
    SpeechService.speak(`Please answer, ${winnerName}`, true);
  },

  // ==========================================
  // POPUP THÔNG BÁO / ĂN MỪNG
  // ==========================================
  showCelebrationModal: function(emoji, title, body) {
    document.getElementById('celebration-emoji').innerText = emoji;
    document.getElementById('celebration-title').innerText = title;
    document.getElementById('celebration-body').innerText = body;
    
    document.getElementById('celebration-modal').classList.add('active');
  },

  hideCelebrationModal: function() {
    document.getElementById('celebration-modal').classList.remove('active');
  },

  // Cập nhật giao diện chế độ phép thuật Harry Potter
  updateHarryPotterUI: function() {
    const badge = document.getElementById('hp-speaker-badge');
    if (!badge) return;
    
    if (this.harryPotterMode && this.currentTab === 'vocab') {
      badge.style.display = 'block';
      this.updateHarryPotterSpeaker();
    } else {
      badge.style.display = 'none';
    }
  },

  // Chọn ngẫu nhiên một nhân vật Harry Potter làm giọng đọc tiếp theo
  updateHarryPotterSpeaker: function() {
    if (!this.harryPotterMode) return;
    
    const hpCharacters = ['harry', 'hermione', 'ron', 'dumbledore', 'snape', 'voldemort'];
    this.currentHpSpeaker = hpCharacters[Math.floor(Math.random() * hpCharacters.length)];
    
    const nameEl = document.getElementById('hp-speaker-name');
    if (nameEl) {
      // Hiển thị tên nhân vật đẹp đẽ kèm icon phù hợp
      let displayName = this.currentHpSpeaker;
      if (this.currentHpSpeaker === 'harry') displayName = '⚡ Harry Potter';
      else if (this.currentHpSpeaker === 'hermione') displayName = '📚 Hermione';
      else if (this.currentHpSpeaker === 'ron') displayName = '🐀 Ron Weasley';
      else if (this.currentHpSpeaker === 'dumbledore') displayName = '🧙‍♂️ Thầy Dumbledore';
      else if (this.currentHpSpeaker === 'snape') displayName = '🧪 Thầy Snape';
      else if (this.currentHpSpeaker === 'voldemort') displayName = '🐍 Voldemort';
      
      nameEl.innerText = displayName;
    }
  }
};

// Khởi chạy khi tài liệu đã tải xong
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
