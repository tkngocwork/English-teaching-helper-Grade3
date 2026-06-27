// Mô-đun Vòng quay may mắn (Lucky Wheel Name Picker)
class LuckyWheel {
  constructor(canvasId, names, onSelected) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.names = names || [];
    this.onSelected = onSelected;

    this.currentRotation = 0;
    this.isSpinning = false;
    this.spinSpeed = 0;
    this.friction = 0.985; // ma sát để vòng quay chậm lại từ từ
    this.colors = [
      '#FF7676', '#FFB562', '#F9F871', '#9BDE7E', 
      '#4D96FF', '#6BCB77', '#FFD93D', '#FF6B6B',
      '#A85CF9', '#55D8C1', '#FC997C', '#D1512D'
    ];

    // Khởi tạo Web Audio Context cho âm thanh tích tắc vui nhộn
    this.audioCtx = null;
    this.lastTickAngle = 0;

    this.init();
  }

  init() {
    this.draw();
  }

  updateNames(newNames) {
    this.names = newNames;
    this.draw();
  }

  // Tạo tiếng click cơ học bằng Web Audio API
  playTickSound() {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime); // Âm bíp tần số 600Hz
      osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch (e) {
      console.warn("Không khởi tạo được âm thanh:", e);
    }
  }

  draw() {
    const ctx = this.ctx;
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const cx = cw / 2;
    const cy = ch / 2;
    const radius = Math.min(cw, ch) / 2 - 20;

    ctx.clearRect(0, 0, cw, ch);

    if (this.names.length === 0) {
      ctx.fillStyle = '#666';
      ctx.font = '20px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Hãy nhập danh sách học sinh', cx, cy);
      return;
    }

    const arcSize = (2 * Math.PI) / this.names.length;

    // Vẽ các lát của vòng quay
    for (let i = 0; i < this.names.length; i++) {
      const angle = this.currentRotation + i * arcSize;
      ctx.beginPath();
      ctx.fillStyle = this.colors[i % this.colors.length];
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + arcSize);
      ctx.lineTo(cx, cy);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Vẽ tên học sinh
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle + arcSize / 2);
      ctx.fillStyle = '#2c3e50';
      ctx.font = 'bold 16px Nunito, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      
      // Giới hạn chữ dài
      let name = this.names[i];
      if (name.length > 10) name = name.substring(0, 8) + '...';
      
      ctx.fillText(name, radius - 20, 0);
      ctx.restore();
    }

    // Vẽ vòng tròn trung tâm
    ctx.beginPath();
    ctx.arc(cx, cy, 35, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Vẽ chữ "SPIN" hoặc "QUAY" ở giữa
    ctx.fillStyle = '#FF6B6B';
    ctx.font = 'bold 16px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('QUAY', cx, cy);

    // Vẽ kim chỉ (Pointer) ở góc phải (0 radian, tức là hướng Đông)
    ctx.beginPath();
    ctx.moveTo(cx + radius + 10, cy);
    ctx.lineTo(cx + radius - 15, cy - 15);
    ctx.lineTo(cx + radius - 15, cy + 15);
    ctx.closePath();
    ctx.fillStyle = '#FF4A4A';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  spin() {
    if (this.isSpinning || this.names.length === 0) return;

    this.isSpinning = true;
    // Tốc độ ban đầu ngẫu nhiên lớn
    this.spinSpeed = Math.random() * 0.3 + 0.4; // 0.4 - 0.7 rad/frame
    this.lastTickAngle = this.currentRotation;
    
    this.animate();
  }

  animate() {
    if (!this.isSpinning) return;

    this.currentRotation += this.spinSpeed;
    this.spinSpeed *= this.friction;

    // Phát tiếng tích tắc khi đi qua mỗi góc phân đoạn
    const arcSize = (2 * Math.PI) / this.names.length;
    const oldSegment = Math.floor((this.lastTickAngle) / arcSize);
    const newSegment = Math.floor((this.currentRotation) / arcSize);
    
    if (newSegment !== oldSegment) {
      this.playTickSound();
      this.lastTickAngle = this.currentRotation;
    }

    this.draw();

    if (this.spinSpeed < 0.002) {
      this.isSpinning = false;
      this.spinSpeed = 0;
      this.determineWinner();
    } else {
      requestAnimationFrame(() => this.animate());
    }
  }

  determineWinner() {
    // Tính toán góc kim chỉ (ở góc 0 radian)
    // Người thắng cuộc là người ở góc 0 radian (sau khi chuẩn hóa góc hiện tại)
    const arcSize = (2 * Math.PI) / this.names.length;
    
    // Chuẩn hóa góc quay về khoảng [0, 2*PI] ngược lại chiều quay
    let normalizedRotation = (2 * Math.PI) - (this.currentRotation % (2 * Math.PI));
    if (normalizedRotation === 2 * Math.PI) normalizedRotation = 0;

    // Tìm index chứa góc 0 (hướng kim chỉ)
    const winnerIndex = Math.floor(normalizedRotation / arcSize);
    const winner = this.names[winnerIndex];

    if (this.onSelected) {
      this.onSelected(winner);
    }
  }
}

// Xuất module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LuckyWheel;
}
