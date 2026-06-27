// Bộ dịch vụ âm thanh: Phát âm (Text-to-Speech) và Nhận dạng giọng nói (Speech-to-Text)
const SpeechService = {
  recognition: null,
  isListening: false,
  activeUtterance: null,

  // Phát âm văn bản (Hỗ trợ đa dạng giọng đọc Anh-Anh & Chế độ phép thuật Harry Potter)
  speak: function(text, speaker = 'general', onEndCallback = null) {
    if (!('speechSynthesis' in window)) {
      console.warn("Trình duyệt không hỗ trợ Text-to-Speech.");
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      // Dừng âm thanh hiện tại và khôi phục hàng đợi để tránh kẹt tiếng
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      if (!text || text.trim() === "") {
        if (onEndCallback) onEndCallback();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB'; // Thiết lập ngôn ngữ chuẩn Anh-Anh cho luồng đọc
      SpeechService.activeUtterance = utterance; // Ngăn Garbage Collector của Chrome dọn dẹp nhầm
      
      const voices = window.speechSynthesis.getVoices();
      
      // Lọc giọng tiếng Anh (Ưu tiên giọng Anh - Anh 'en-GB' chuẩn của SGK)
      const ukVoices = voices.filter(v => v && v.lang && (v.lang.toLowerCase() === "en-gb" || v.lang.toLowerCase().startsWith("en-gb")));
      const englishVoices = voices.filter(v => v && v.lang && v.lang.toLowerCase().startsWith("en"));
      const baseVoices = ukVoices.length > 0 ? ukVoices : (englishVoices.length > 0 ? englishVoices : voices);

      // Phân loại giọng nam và nữ an toàn
      const maleVoices = baseVoices.filter(v => 
        v && v.name && (
          v.name.toLowerCase().includes("david") || 
          v.name.toLowerCase().includes("george") || 
          v.name.toLowerCase().includes("mark") || 
          v.name.toLowerCase().includes("male") ||
          v.name.toLowerCase().includes("james") ||
          v.name.toLowerCase().includes("harry")
        )
      );
      const femaleVoices = baseVoices.filter(v => 
        v && v.name && (
          v.name.toLowerCase().includes("zira") || 
          v.name.toLowerCase().includes("hazel") || 
          v.name.toLowerCase().includes("susan") || 
          v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("ira") ||
          v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("google") ||
          v.name.toLowerCase().includes("amy")
        )
      );

      let selectedVoice = null;
      let pitch = 1.5; 
      let rate = 0.8; 

      // Chuẩn hóa tên speaker
      let spKey = 'general';
      if (typeof speaker === 'string') {
        spKey = speaker.toLowerCase().trim();
      }

      // Thiết lập cấu hình giọng đọc chi tiết theo vai/nhân vật phép thuật
      if (spKey === 'harry') {
        // Giọng nam trẻ em, thông minh, nhanh nhẹn
        selectedVoice = maleVoices.length > 0 ? maleVoices[0] : baseVoices[0];
        pitch = 1.3;
        rate = 0.85;
      } else if (spKey === 'hermione') {
        // Giọng nữ trẻ em, rõ ràng, tự tin
        selectedVoice = femaleVoices.length > 0 ? femaleVoices[0] : baseVoices[0];
        pitch = 1.45;
        rate = 0.82;
      } else if (spKey === 'ron') {
        // Giọng nam trẻ em, hơi rụt rè
        selectedVoice = maleVoices.length > 0 ? maleVoices[0] : baseVoices[0];
        pitch = 1.2;
        rate = 0.88;
      } else if (spKey === 'dumbledore') {
        // Giọng cụ già ấm áp, chậm rãi, thông thái
        selectedVoice = maleVoices.length > 0 ? maleVoices[0] : baseVoices[0];
        pitch = 0.75;
        rate = 0.75;
      } else if (spKey === 'snape') {
        // Giọng trầm, lạnh lùng, chậm rãi
        selectedVoice = maleVoices.length > 0 ? maleVoices[0] : baseVoices[0];
        pitch = 0.8;
        rate = 0.72;
      } else if (spKey === 'voldemort') {
        // Giọng thì thầm, bí hiểm, chậm rãi
        selectedVoice = maleVoices.length > 0 ? maleVoices[0] : baseVoices[0];
        pitch = 0.65;
        rate = 0.7;
      } else {
        // Nhóm vai học sinh / giáo viên trong sách giáo khoa
        const boys = ['ben', 'bill', 'tony', 'nam', 'boy'];
        const girls = ['mai', 'linh', 'mary', 'lucy', 'girl'];
        const teachers = ['teacher', 'ms. hoa', 'mr. brown'];

        if (boys.includes(spKey)) {
          selectedVoice = maleVoices.length > 0 ? maleVoices[0] : baseVoices[0];
          pitch = 1.35; 
          rate = 0.82;
        } else if (girls.includes(spKey)) {
          selectedVoice = femaleVoices.length > 0 ? femaleVoices[0] : baseVoices[0];
          pitch = 1.65; 
          rate = 0.8;
        } else if (teachers.includes(spKey)) {
          if (spKey.includes('mr.')) {
            selectedVoice = maleVoices.length > 0 ? maleVoices[0] : baseVoices[0];
          } else {
            selectedVoice = femaleVoices.length > 0 ? femaleVoices[0] : baseVoices[0];
          }
          pitch = 1.05; 
          rate = 0.82;
        } else {
          // Giọng mặc định: Trẻ em Anh-Anh cao, đáng yêu
          selectedVoice = baseVoices[0];
          pitch = 1.5; 
          rate = 0.8; 
        }
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.pitch = pitch;
      utterance.rate = rate;

      if (onEndCallback) {
        utterance.onend = onEndCallback;
        utterance.onerror = onEndCallback;
      }

      // Cho phép một khoảng trễ cực ngắn 60ms để trình duyệt dọn dẹp hàng đợi
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 60);

    } catch (error) {
      console.error("Lỗi khi phát âm:", error);
      if (onEndCallback) onEndCallback();
    }
  },

  // Khởi tạo bộ nhận diện giọng nói (Speech-to-Text)
  initRecognition: function() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Trình duyệt không hỗ trợ nhận diện giọng nói (Speech Recognition).");
      return false;
    }
    
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = 'en-US'; // Nhận dạng tiếng Anh
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    
    return true;
  },

  // Bắt đầu lắng nghe học sinh phát âm
  listenAndCheck: function(expectedText, onStart, onResult, onError) {
    if (!this.recognition && !this.initRecognition()) {
      if (onError) onError("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. Hãy dùng Google Chrome để có trải nghiệm tốt nhất.");
      return;
    }

    if (this.isListening) {
      this.recognition.abort();
    }

    this.recognition.onstart = () => {
      this.isListening = true;
      if (onStart) onStart();
    };

    this.recognition.onresult = (event) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      const confidence = event.results[0][0].confidence;
      
      // Làm sạch chuỗi để so sánh (bỏ dấu câu)
      const cleanExpected = expectedText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
      const cleanActual = transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
      
      // So sánh
      const isCorrect = cleanActual === cleanExpected || cleanActual.includes(cleanExpected) || cleanExpected.includes(cleanActual);
      
      if (onResult) {
        onResult({
          correct: isCorrect,
          heard: transcript,
          confidence: confidence
        });
      }
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      console.error("Lỗi nhận diện giọng nói:", event.error);
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.error(e);
      if (onError) onError("Không thể khởi động micro.");
    }
  },

  // Dừng lắng nghe
  stopListening: function() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
};

// Đảm bảo voices được tải trước trong trình duyệt Chrome
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }
}

// Xuất module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpeechService;
}
