# 🎒 Grade 3 English Teaching Assistant (Global Success Helper)

![Project Cover Banner](cover_thumbnail.png)

An interactive, smart teaching assistant application specifically designed for the Grade 3 English curriculum (Vietnamese Educational Standard - Global Success). Developed as a Single Page Web Application (SPA), it features a bright, playful cartoon aesthetic, smooth animations, and interactive sound effects. It is optimized for interactive smartboards and projectors in classrooms.

---

## 🌐 Live Web App

You can access and use the application directly online without any installation:
👉 **[Launch English Teaching Helper Live!](https://tkngocwork.github.io/English-teaching-helper-Grade3/)**

*For the best interactive experience (speech recognition and webcam-based movement games), please use **Google Chrome** or **Microsoft Edge**.*

---

## 🌟 Key Features

### 1. 🗂️ Interactive Vocabulary & 3D Flashcards
- Supports all 20 units of the official textbook.
- **3D Flipping Flashcards**: Click to flip and view the Vietnamese meaning.
- **Standard British English Pronunciation (en-GB)**: Synthesized automatically using the browser's Web Speech API.
- **Speech Practice (🎙️ Speech-to-Text)**: Students can speak into the microphone, and the AI will evaluate their pronunciation in real-time, accompanied by a confetti celebration effect for correct answers.

### 2. 🧙‍♂️ Magical Harry Potter Mode
- When toggled, the app randomly assigns a wizard character voice for each vocabulary word:
  - `⚡ Harry Potter`: A young, fast, and intelligent boy's voice.
  - `📚 Hermione Granger`: A clear, confident, and articulate girl's voice.
  - `🐀 Ron Weasley`: A slightly hesitant and charming young boy's voice.
  - `🧙‍♂️ Professor Dumbledore`: A warm, slow, and wise old wizard's voice.
  - `🧪 Professor Snape`: A deep, slow, and monotonous voice.
  - `🐍 Lord Voldemort`: A dark, whispering, and mysterious voice.
- An interactive **magical badge** displays the current speaker's avatar and name below the flashcard (e.g., `⚡ Harry Potter` or `🐍 Voldemort`), which updates randomly after each pronunciation.

### 3. 💬 Conversation Studio (Dialogue Practice)
- Displays textbook conversations in clean, animated chat bubbles.
- Reads lines individually using gender/age-appropriate voice profiles (Ben, Mai, Bill, Teacher, etc.) or reads the entire dialogue automatically.

### 4. 📸 Interactive Camera Movement Game (TPR Game)
- Features a **Total Physical Response (TPR)** game that utilizes the classroom camera.
- The camera feed is displayed inside a cute cartoon TV frame.
- The AI randomly calls out movement commands based on the active unit (e.g., *"Stand up!"*, *"Touch your nose! 👃"*, *"Act like a monkey! 🐒"*).
- Students have a **5-second countdown** to perform the action.
- Teachers can award points directly to the Red Team or Blue Team with a confetti celebration.
- Automatically stops the camera feed when navigating away to protect privacy and optimize performance.

### 5. 🎡 Classroom Utilities
- **Lucky Wheel (Name Picker)**: Selects a random student to answer questions, complete with realistic mechanical clicking sound effects. Teachers can add or remove student names dynamically.
- **Scoreboard**: Track points for the Red Team and Blue Team with built-in confetti celebrations.
- **Countdown Timer**: Set time limits for classroom activities, featuring a subtle alert sound for the last 3 seconds and a final ring alarm.

---

## 🛠️ Technologies Used
- **Core**: HTML5.
- **Styling**: Vanilla CSS (Custom bright, pastel-colored cartoon theme with rounded Nunito & Fredoka typography).
- **Logic & APIs**: Vanilla JavaScript, Web Speech API (Text-to-Speech & Speech Recognition), WebRTC MediaDevices API (Camera access and Canvas overlay rendering).

---

## 🚀 How to Run 

### Option 1: Quick Launch on Windows (Recommended)
1. Press the **`Windows + R`** keys on your keyboard to open the Run dialog.
2. Paste the absolute path of your local `index.html` file into the box:
   ```text
   C:\Users\LENOVO\.gemini\antigravity\scratch\global-success-g3-helper\index.html
   ```
3. Click **`OK`**. The app will immediately launch in your default web browser.


---

## ⚠️ Important Notes & Troubleshooting
- **Recommended Browsers**: Use **Google Chrome** or **Microsoft Edge** for full compatibility with Speech Recognition, Camera utilities, and TTS voice mapping.
- **Device Permissions**: Please select **Allow** when the browser prompts for permission to use the **Microphone** and **Camera**.
- **No Sound / Silent Audio**: If the audio stops playing after clicking the pronunciation button repeatedly, press **`Ctrl + F5`** (or `Ctrl + Shift + R`) to force-reload the page and clear the browser's speech synthesis queue.
