// Cơ sở dữ liệu đầy đủ học tiếng Anh lớp 3 Global Success (Tích hợp khẩu lệnh TPR)
const lessonData = {
  units: [
    {
      id: 1,
      title: "Unit 1: Hello",
      vocab: [
        { word: "hello", meaning: "xin chào", ipa: "/həˈləʊ/", image: "👋" },
        { word: "hi", meaning: "chào (thân mật)", ipa: "/haɪ/", image: "🙋" },
        { word: "fine", meaning: "khỏe, tốt", ipa: "/faɪn/", image: "😊" },
        { word: "thank you", meaning: "cảm ơn bạn", ipa: "/θæŋk juː/", image: "🙏" },
        { word: "goodbye", meaning: "tạm biệt", ipa: "/ˌɡʊdˈbaɪ/", image: "👋" },
        { word: "bye", meaning: "tạm biệt (ngắn)", ipa: "/baɪ/", image: "🚶" }
      ],
      dialogue: [
        { speaker: "Ben", text: "Hello, I'm Ben.", translation: "Xin chào, mình là Ben." },
        { speaker: "Mai", text: "Hi, Ben. I'm Mai.", translation: "Chào Ben. Mình là Mai." },
        { speaker: "Teacher", text: "How are you?", translation: "Thầy/Cô khỏe không?" },
        { speaker: "Class", text: "Fine, thank you.", translation: "Chúng em khỏe, em cảm ơn ạ." }
      ],
      tprActions: [
        { command: "Wave your hand! 👋", text: "vẫy tay chào", voiceCommand: "Wave your hand" },
        { command: "Say Hello! 🙋", text: "nói xin chào", voiceCommand: "Say hello" },
        { command: "Smile friendly! 😊", text: "cười thân thiện", voiceCommand: "Smile friendly" }
      ]
    },
    {
      id: 2,
      title: "Unit 2: Our Names",
      vocab: [
        { word: "name", meaning: "tên", ipa: "/neɪm/", image: "📛" },
        { word: "what", meaning: "cái gì / gì", ipa: "/wɒt/", image: "❓" },
        { word: "old", meaning: "tuổi / cũ", ipa: "/əʊld/", image: "🎂" },
        { word: "eight", meaning: "số 8", ipa: "/eɪt/", image: "8️⃣" },
        { word: "nine", meaning: "số 9", ipa: "/naɪn/", image: "9️⃣" },
        { word: "ten", meaning: "số 10", ipa: "/ten/", image: "🔟" }
      ],
      dialogue: [
        { speaker: "Teacher", text: "What's your name?", translation: "Tên của em là gì?" },
        { speaker: "Linh", text: "My name's Linh.", translation: "Tên của em là Linh." },
        { speaker: "Teacher", text: "How old are you?", translation: "Em bao nhiêu tuổi?" },
        { speaker: "Linh", text: "I'm eight years old.", translation: "Em 8 tuổi rồi ạ." }
      ],
      tprActions: [
        { command: "Show your name tag! 📛", text: "giơ bảng tên", voiceCommand: "Show your name tag" },
        { command: "Count to eight! 8️⃣", text: "đếm đến số 8", voiceCommand: "Count to eight" },
        { command: "Count to ten! 🔟", text: "đếm đến số 10", voiceCommand: "Count to ten" }
      ]
    },
    {
      id: 3,
      title: "Unit 3: Our Friends",
      vocab: [
        { word: "friend", meaning: "bạn bè", ipa: "/frend/", image: "🧑‍🤝‍🧑" },
        { word: "classmate", meaning: "bạn cùng lớp", ipa: "/ˈklɑːsmeɪt/", image: "🎒" },
        { word: "this", meaning: "đây / cái này", ipa: "/ðɪs/", image: "👉" },
        { word: "that", meaning: "kia / cái kia", ipa: "/ðæt/", image: "👈" },
        { word: "teacher", meaning: "giáo viên", ipa: "/ˈtiːtʃə(r)/", image: "👩‍🏫" },
        { word: "yes", meaning: "vâng / đúng", ipa: "/jes/", image: "✅" },
        { word: "no", meaning: "không", ipa: "/nəʊ/", image: "❌" }
      ],
      dialogue: [
        { speaker: "Nam", text: "This is my friend, Bill.", translation: "Đây là bạn của mình, Bill." },
        { speaker: "Mai", text: "Hi, Bill. Nice to meet you.", translation: "Chào Bill. Rất vui được gặp bạn." },
        { speaker: "Linh", text: "Is that Mary?", translation: "Kia có phải là Mary không?" },
        { speaker: "Tony", text: "Yes, it is.", translation: "Đúng thế, cô ấy đó." }
      ],
      tprActions: [
        { command: "Shake hands with a friend! 🤝", text: "bắt tay một người bạn", voiceCommand: "Shake hands with a friend" },
        { command: "Wave to your classmates! 👋", text: "vẫy tay chào các bạn cùng lớp", voiceCommand: "Wave to your classmates" },
        { command: "Point to the teacher! 👩‍🏫", text: "chỉ tay về phía giáo viên", voiceCommand: "Point to the teacher" }
      ]
    },
    {
      id: 4,
      title: "Unit 4: Our Bodies",
      vocab: [
        { word: "eye", meaning: "mắt", ipa: "/aɪ/", image: "👁️" },
        { word: "ear", meaning: "tai", ipa: "/ɪə(r)/", image: "👂" },
        { word: "nose", meaning: "mũi", ipa: "/nəʊz/", image: "👃" },
        { word: "mouth", meaning: "miệng", ipa: "/maʊθ/", image: "👄" },
        { word: "hand", meaning: "bàn tay", ipa: "/hænd/", image: "✋" },
        { word: "face", meaning: "khuôn mặt", ipa: "/feɪs/", image: "😊" },
        { word: "head", meaning: "cái đầu", ipa: "/hed/", image: "👤" },
        { word: "hair", meaning: "tóc", ipa: "/heə(r)/", image: "💇" }
      ],
      dialogue: [
        { speaker: "Teacher", text: "Touch your face, please.", translation: "Vui lòng chạm tay vào mặt em." },
        { speaker: "Class", text: "Yes, teacher.", translation: "Dạ thưa thầy/cô." },
        { speaker: "Teacher", text: "Touch your hair, please.", translation: "Vui lòng chạm tay vào tóc em." },
        { speaker: "Class", text: "We touch our hair.", translation: "Chúng em chạm tay vào tóc." }
      ],
      tprActions: [
        { command: "Touch your nose! 👃", text: "chạm tay vào mũi", voiceCommand: "Touch your nose" },
        { command: "Touch your ears! 👂", text: "chạm tay vào tai", voiceCommand: "Touch your ears" },
        { command: "Touch your hair! 💇", text: "chạm tay vào tóc", voiceCommand: "Touch your hair" },
        { command: "Touch your eyes! 👁️", text: "chạm tay vào mắt", voiceCommand: "Touch your eyes" },
        { command: "Touch your mouth! 👄", text: "chạm tay vào miệng", voiceCommand: "Touch your mouth" },
        { command: "Clap your hands! 👏", text: "vỗ tay hai cái", voiceCommand: "Clap your hands" }
      ]
    },
    {
      id: 5,
      title: "Unit 5: My Hobbies",
      vocab: [
        { word: "singing", meaning: "ca hát", ipa: "/ˈsɪŋɪŋ/", image: "🎤" },
        { word: "dancing", meaning: "nhảy múa", ipa: "/ˈdɑːnsɪŋ/", image: "💃" },
        { word: "drawing", meaning: "vẽ tranh", ipa: "/ˈdrɔːɪŋ/", image: "🎨" },
        { word: "swimming", meaning: "bơi lội", ipa: "/ˈswɪmɪŋ/", image: "🏊" },
        { word: "running", meaning: "chạy bộ", ipa: "/ˈrʌnɪŋ/", image: "🏃" },
        { word: "cooking", meaning: "nấu ăn", ipa: "/ˈkʊkɪŋ/", image: "🍳" }
      ],
      dialogue: [
        { speaker: "Nam", text: "What is your hobby?", translation: "Sở thích của bạn là gì?" },
        { speaker: "Mai", text: "It's singing.", translation: "Đó là ca hát." },
        { speaker: "Tony", text: "I like swimming.", translation: "Mình thích bơi lội." },
        { speaker: "Bill", text: "Me too!", translation: "Mình cũng vậy!" }
      ],
      tprActions: [
        { command: "Act like you are swimming! 🏊", text: "làm động tác đang bơi", voiceCommand: "Act like you are swimming" },
        { command: "Act like you are drawing! 🎨", text: "làm động tác vẽ tranh", voiceCommand: "Act like you are drawing" },
        { command: "Act like you are dancing! 💃", text: "làm động tác khiêu vũ", voiceCommand: "Act like you are dancing" },
        { command: "Run on the spot! 🏃", text: "chạy bộ tại chỗ", voiceCommand: "Run on the spot" }
      ]
    },
    {
      id: 6,
      title: "Unit 6: Our School",
      vocab: [
        { word: "school", meaning: "trường học", ipa: "/skuːl/", image: "🏫" },
        { word: "classroom", meaning: "phòng học", ipa: "/ˈklɑːsruːm/", image: "🚪" },
        { word: "library", meaning: "thư viện", ipa: "/ˈlaɪbrəri/", image: "📚" },
        { word: "gym", meaning: "phòng thể chất", ipa: "/dʒɪm/", image: "🏀" },
        { word: "playground", meaning: "sân chơi", ipa: "/ˈpleɪɡraʊnd/", image: "🛝" },
        { word: "computer room", meaning: "phòng máy tính", ipa: "/kəmˈpjuːtə(r) ruːm/", image: "💻" }
      ],
      dialogue: [
        { speaker: "Mai", text: "This is my school.", translation: "Đây là trường học của mình." },
        { speaker: "Bill", text: "Wow, it's big!", translation: "Oa, nó to thật đấy!" },
        { speaker: "Nam", text: "Let's go to the library.", translation: "Chúng mình cùng đi đến thư viện nhé." },
        { speaker: "Lucy", text: "Okay, let's go.", translation: "Đồng ý, đi nào." }
      ],
      tprActions: [
        { command: "Open your school bag! 🎒", text: "mở cặp sách ra", voiceCommand: "Open your school bag" },
        { command: "Open a notebook! 📓", text: "mở một cuốn vở ra", voiceCommand: "Open a notebook" },
        { command: "Point to the classroom door! 🚪", text: "chỉ tay vào cửa lớp học", voiceCommand: "Point to the classroom door" }
      ]
    },
    {
      id: 7,
      title: "Unit 7: Classroom Instructions",
      vocab: [
        { word: "open", meaning: "mở", ipa: "/ˈəʊpən/", image: "📖" },
        { word: "close", meaning: "đóng", ipa: "/kləʊz/", image: "📕" },
        { word: "stand up", meaning: "đứng lên", ipa: "/stænd ʌp/", image: "🧍" },
        { word: "sit down", meaning: "ngồi xuống", ipa: "/sɪt daʊn/", image: "🧎" },
        { word: "come in", meaning: "đi vào", ipa: "/kʌm ɪn/", image: "🚪" },
        { word: "go out", meaning: "đi ra ngoài", ipa: "/ɡəʊ aʊt/", image: "🚶" }
      ],
      dialogue: [
        { speaker: "Teacher", text: "Good morning class. Sit down, please.", translation: "Chào cả lớp. Mời các em ngồi xuống." },
        { speaker: "Nam", text: "May I come in, teacher?", translation: "Em xin phép vào lớp ạ thưa thầy/cô?" },
        { speaker: "Teacher", text: "Yes, you can.", translation: "Được chứ, em vào đi." },
        { speaker: "Linh", text: "May I go out, teacher?", translation: "Em xin phép ra ngoài ạ thưa thầy/cô?" }
      ],
      tprActions: [
        { command: "Stand up, please! 🧍", text: "đứng lên", voiceCommand: "Stand up please" },
        { command: "Sit down, please! 🧎", text: "ngồi xuống", voiceCommand: "Sit down please" },
        { command: "Put your hands up! 🙌", text: "giơ hai tay lên cao", voiceCommand: "Put your hands up" },
        { command: "Be quiet, please! 🤫", text: "đặt tay lên miệng và giữ trật tự", voiceCommand: "Be quiet please" }
      ]
    },
    {
      id: 8,
      title: "Unit 8: My School Things",
      vocab: [
        { word: "pen", meaning: "bút mực", ipa: "/pen/", image: "✒️" },
        { word: "pencil", meaning: "bút chì", ipa: "/ˈpensl/", image: "✏️" },
        { word: "ruler", meaning: "thước kẻ", ipa: "/ˈruːlə(r)/", image: "📏" },
        { word: "book", meaning: "sách", ipa: "/bʊk/", image: "📖" },
        { word: "notebook", meaning: "vở viết", ipa: "/ˈnəʊtbʊk/", image: "📓" },
        { word: "pencil case", meaning: "hộp bút", ipa: "/ˈpensl keɪs/", image: "👝" },
        { word: "rubber", meaning: "cục tẩy", ipa: "/ˈrʌbə(r)/", image: "🧽" },
        { word: "school bag", meaning: "cặp học sinh", ipa: "/ˈskuːl bæɡ/", image: "🎒" }
      ],
      dialogue: [
        { speaker: "Nam", text: "Look! I have a pen.", translation: "Nhìn này! Mình có một chiếc bút mực." },
        { speaker: "Mai", text: "Oh, it's nice.", translation: "Ồ, nó đẹp quá." },
        { speaker: "Bill", text: "Do you have a ruler?", translation: "Bạn có thước kẻ không?" },
        { speaker: "Mary", text: "Yes, I do.", translation: "Có, mình có." }
      ],
      tprActions: [
        { command: "Hold up a pen! ✒️", text: "giơ một cái bút mực lên", voiceCommand: "Hold up a pen" },
        { command: "Hold up a pencil! ✏️", text: "giơ một cái bút chì lên", voiceCommand: "Hold up a pencil" },
        { command: "Hold up a ruler! 📏", text: "giơ một cái thước kẻ lên", voiceCommand: "Hold up a ruler" },
        { command: "Show your book! 📖", text: "giơ cuốn sách của bạn lên", voiceCommand: "Show your book" }
      ]
    },
    {
      id: 9,
      title: "Unit 9: Colours",
      vocab: [
        { word: "red", meaning: "màu đỏ", ipa: "/red/", image: "🔴" },
        { word: "blue", meaning: "màu xanh dương", ipa: "/bluː/", image: "🔵" },
        { word: "green", meaning: "màu xanh lá", ipa: "/ɡriːn/", image: "🟢" },
        { word: "yellow", meaning: "màu vàng", ipa: "/ˈjeləʊ/", image: "🟡" },
        { word: "orange", meaning: "màu cam", ipa: "/ˈɒrɪndʒ/", image: "🟠" },
        { word: "pink", meaning: "màu hồng", ipa: "/pɪŋk/", image: "🌸" },
        { word: "black", meaning: "màu đen", ipa: "/blæk/", image: "⚫" },
        { word: "white", meaning: "màu trắng", ipa: "/waɪ/", image: "⚪" }
      ],
      dialogue: [
        { speaker: "Mai", text: "What colour is your bag?", translation: "Cặp sách của bạn màu gì?" },
        { speaker: "Linh", text: "It's blue.", translation: "Nó màu xanh dương." },
        { speaker: "Nam", text: "I have a new pencil case.", translation: "Mình có hộp bút mới." },
        { speaker: "Ben", text: "What colour is it? - It's red.", translation: "Nó màu gì thế? - Nó màu đỏ." }
      ],
      tprActions: [
        { command: "Point to something red! 🔴", text: "chỉ vào một vật màu đỏ", voiceCommand: "Point to something red" },
        { command: "Point to something yellow! 🟡", text: "chỉ vào một vật màu vàng", voiceCommand: "Point to something yellow" },
        { command: "Point to something green! 🟢", text: "chỉ vào một vật màu xanh lá", voiceCommand: "Point to something green" }
      ]
    },
    {
      id: 10,
      title: "Unit 10: Break Time Activities",
      vocab: [
        { word: "football", meaning: "bóng đá", ipa: "/ˈfʊtbɔːl/", image: "⚽" },
        { word: "chess", meaning: "cờ vua", ipa: "/tʃes/", image: "♟️" },
        { word: "badminton", meaning: "cầu lông", ipa: "/ˈbædmɪntən/", image: "🏸" },
        { word: "basketball", meaning: "bóng rổ", ipa: "/ˈbɑːskɪtbɔːl/", image: "🏀" },
        { word: "table tennis", meaning: "bóng bàn", ipa: "/ˈteɪbl tenɪs/", image: "🏓" },
        { word: "word puzzles", meaning: "trò chơi ô chữ", ipa: "/wɜːd ˈpʌzlz/", image: "🧩" }
      ],
      dialogue: [
        { speaker: "Nam", text: "What do you do at break time?", translation: "Bạn thường làm gì vào giờ giải lao?" },
        { speaker: "Tony", text: "I play football.", translation: "Mình chơi đá bóng." },
        { speaker: "Bill", text: "Do you play chess? - No, I don't.", translation: "Bạn có chơi cờ vua không? - Không, mình không." },
        { speaker: "Linh", text: "I play badminton.", translation: "Mình chơi cầu lông." }
      ],
      tprActions: [
        { command: "Act like kicking a football! ⚽", text: "làm động tác sút bóng", voiceCommand: "Act like kicking a football" },
        { command: "Act like playing table tennis! 🏓", text: "làm động tác đánh bóng bàn", voiceCommand: "Act like playing table tennis" },
        { command: "Act like playing badminton! 🏸", text: "làm động tác đánh cầu lông", voiceCommand: "Act like playing badminton" }
      ]
    },
    {
      id: 11,
      title: "Unit 11: My Family",
      vocab: [
        { word: "father", meaning: "bố / cha", ipa: "/ˈfɑːðə(r)/", image: "👨" },
        { word: "mother", meaning: "mẹ", ipa: "/ˈmʌðə(r)/", image: "👩" },
        { word: "brother", meaning: "anh / em trai", ipa: "/ˈbrʌðə(r)/", image: "👦" },
        { word: "sister", meaning: "chị / em gái", ipa: "/ˈsɪstə(r)/", image: "👧" },
        { word: "grandfather", meaning: "ông nội/ngoại", ipa: "/ˈɡrænfɑːðə(r)/", image: "👴" },
        { word: "grandmother", meaning: "bà nội/ngoại", ipa: "/ˈɡrændmʌðə(r)/", image: "👵" }
      ],
      dialogue: [
        { speaker: "Linh", text: "Who is that man?", translation: "Người đàn ông kia là ai thế?" },
        { speaker: "Mai", text: "He's my father.", translation: "Ông ấy là bố của mình." },
        { speaker: "Bill", text: "Who is that woman?", translation: "Người phụ nữ kia là ai thế?" },
        { speaker: "Lucy", text: "She's my grandmother.", translation: "Bà ấy là bà của mình." }
      ],
      tprActions: [
        { command: "Hold up a family photo! 🖼️", text: "giơ tấm ảnh gia đình (tưởng tượng) lên", voiceCommand: "Hold up a family photo" },
        { command: "Act like a grandfather! 👴", text: "làm điệu bộ của người ông chống gậy", voiceCommand: "Act like a grandfather" },
        { command: "Give a classmate a hug! 🤗", text: "ôm nhẹ người bạn bên cạnh", voiceCommand: "Give a classmate a hug" }
      ]
    },
    {
      id: 12,
      title: "Unit 12: Jobs",
      vocab: [
        { word: "teacher", meaning: "giáo viên", ipa: "/ˈtiːtʃə(r)/", image: "👩‍🏫" },
        { word: "pupil", meaning: "học sinh", ipa: "/ˈpjuːpl/", image: "🧑‍🎓" },
        { word: "doctor", meaning: "bác sĩ", ipa: "/ˈdɒktə(r)/", image: "🧑‍⚕️" },
        { word: "nurse", meaning: "y tá", ipa: "/nɜːs/", image: "🧑‍⚕️" },
        { word: "worker", meaning: "công nhân", ipa: "/ˈwɜːkə(r)/", image: "👷" },
        { word: "farmer", meaning: "nông dân", ipa: "/ˈfɑːmə(r)/", image: "👨‍🌾" }
      ],
      dialogue: [
        { speaker: "Nam", text: "What is your father's job?", translation: "Công việc của bố bạn là gì?" },
        { speaker: "Tony", text: "He's a doctor.", translation: "Bố mình là bác sĩ." },
        { speaker: "Mary", text: "What is your mother's job?", translation: "Công việc của mẹ bạn là gì?" },
        { speaker: "Mai", text: "She's a teacher.", translation: "Mẹ mình là giáo viên." }
      ],
      tprActions: [
        { command: "Act like a doctor checking heartbeat! 🧑‍⚕️", text: "làm động tác bác sĩ khám bệnh", voiceCommand: "Act like a doctor checking heartbeat" },
        { command: "Act like a farmer digging! 👨‍🌾", text: "làm động tác cuốc đất gieo hạt", voiceCommand: "Act like a farmer digging" },
        { command: "Act like a worker building! 👷", text: "làm động tác công nhân đặt gạch xây nhà", voiceCommand: "Act like a worker building" }
      ]
    },
    {
      id: 13,
      title: "Unit 13: My House",
      vocab: [
        { word: "house", meaning: "ngôi nhà", ipa: "/haʊs/", image: "🏠" },
        { word: "living room", meaning: "phòng khách", ipa: "/ˈlɪvɪŋ ruːm/", image: "🛋️" },
        { word: "bedroom", meaning: "phòng ngủ", ipa: "/ˈbedruːm/", image: "🛏️" },
        { word: "bathroom", meaning: "phòng tắm", ipa: "/ˈbɑːθruːm/", image: "🚿" },
        { word: "kitchen", meaning: "nhà bếp", ipa: "/ˈkɪtʃɪn/", image: "🍳" },
        { word: "garden", meaning: "khu vườn", ipa: "/ˈɡɑːdn/", image: "🏡" }
      ],
      dialogue: [
        { speaker: "Nam", text: "Come in and see my house.", translation: "Mời vào xem nhà của mình nhé." },
        { speaker: "Ben", text: "Wow, there is a living room.", translation: "Oa, có cả một phòng khách." },
        { speaker: "Bill", text: "Is there a garden? - Yes, there is.", translation: "Có khu vườn nào không? - Có chứ." },
        { speaker: "Lucy", text: "It's so beautiful!", translation: "Nó đẹp quá!" }
      ],
      tprActions: [
        { command: "Draw a house in the air! 🏠", text: "vẽ hình ngôi nhà trong không khí", voiceCommand: "Draw a house in the air" },
        { command: "Knock on an imaginary door! 🚪", text: "làm động tác gõ cửa", voiceCommand: "Knock on an imaginary door" },
        { command: "Pretend to water the garden! 🏡", text: "làm động tác tưới cây trong vườn", voiceCommand: "Pretend to water the garden" }
      ]
    },
    {
      id: 14,
      title: "Unit 14: My Bedroom",
      vocab: [
        { word: "bed", meaning: "cái giường", ipa: "/bed/", image: "🛏️" },
        { word: "desk", meaning: "bàn học", ipa: "/desk/", image: "✍️" },
        { word: "chair", meaning: "cái ghế", ipa: "/tʃeə(r)/", image: "🪑" },
        { word: "wardrobe", meaning: "tủ quần áo", ipa: "/ˈwɔːdrəʊb/", image: "🚪" },
        { word: "door", meaning: "cửa ra vào", ipa: "/dɔː(r)/", image: "🚪" },
        { word: "window", meaning: "cửa sổ", ipa: "/ˈwɪndəʊ/", image: "🪟" }
      ],
      dialogue: [
        { speaker: "Tony", text: "Where is the desk?", translation: "Bàn học nằm ở đâu thế?" },
        { speaker: "Linh", text: "It's here, next to the bed.", translation: "Nó ở đây này, cạnh cái giường." },
        { speaker: "Bill", text: "Where are the chairs?", translation: "Những cái ghế ở đâu vậy?" },
        { speaker: "Nam", text: "They are under the table.", translation: "Chúng ở dưới gầm bàn." }
      ],
      tprActions: [
        { command: "Pretend to sleep in bed! 😴", text: "áp hai tay vào má nhắm mắt ngủ", voiceCommand: "Pretend to sleep in bed" },
        { command: "Sit nicely at your desk! ✍️", text: "ngồi ngay ngắn khoanh tay trên bàn", voiceCommand: "Sit nicely at your desk" },
        { command: "Open an imaginary window! 🪟", text: "làm động tác đẩy cửa sổ mở ra", voiceCommand: "Open an imaginary window" }
      ]
    },
    {
      id: 15,
      title: "Unit 15: At the Dining Table",
      vocab: [
        { word: "juice", meaning: "nước hoa quả", ipa: "/dʒuːs/", image: "🧃" },
        { word: "water", meaning: "nước lọc", ipa: "/ˈwɔːtə(r)/", image: "🥛" },
        { word: "milk", meaning: "sữa", ipa: "/mɪlk/", image: "🥛" },
        { word: "rice", meaning: "cơm / gạo", ipa: "/raɪ/", image: "🍚" },
        { word: "meat", meaning: "thịt", ipa: "/miːt/", image: "🥩" },
        { word: "fish", meaning: "cá", ipa: "/fɪʃ/", image: "🐟" }
      ],
      dialogue: [
        { speaker: "Mother", text: "Would you like some rice?", translation: "Con có muốn ăn một ít cơm không?" },
        { speaker: "Nam", text: "Yes, please. I like rice.", translation: "Dạ có ạ. Con thích cơm." },
        { speaker: "Mother", text: "Would you like some juice?", translation: "Con uống nước hoa quả nhé?" },
        { speaker: "Linh", text: "No, thanks.", translation: "Dạ thôi con cảm ơn." }
      ],
      tprActions: [
        { command: "Pretend to drink milk! 🥛", text: "cầm cốc sữa tưởng tượng và uống", voiceCommand: "Pretend to drink milk" },
        { command: "Pretend to eat rice with chopsticks! 🍚", text: "làm động tác gắp cơm ăn", voiceCommand: "Pretend to eat rice" },
        { command: "Pretend to eat fish! 🐟", text: "làm động tác dùng dĩa ăn cá", voiceCommand: "Pretend to eat fish" }
      ]
    },
    {
      id: 16,
      title: "Unit 16: My Pets",
      vocab: [
        { word: "dog", meaning: "con chó", ipa: "/dɒɡ/", image: "🐶" },
        { word: "cat", meaning: "con mèo", ipa: "/kæt/", image: "🐱" },
        { word: "bird", meaning: "con chim", ipa: "/bɜːd/", image: "🐦" },
        { word: "parrot", meaning: "con vẹt", ipa: "/ˈpærət/", image: "🦜" },
        { word: "rabbit", meaning: "con thỏ", ipa: "/ˈræbɪt/", image: "🐰" },
        { word: "goldfish", meaning: "cá vàng", ipa: "/ˈɡəʊldfɪʃ/", image: "🐠" }
      ],
      dialogue: [
        { speaker: "Mai", text: "Do you have any pets?", translation: "Bạn có nuôi thú cưng nào không?" },
        { speaker: "Tony", text: "Yes, I do. I have a dog.", translation: "Có chứ. Mình có một chú chó." },
        { speaker: "Lucy", text: "How many cats do you have?", translation: "Bạn có mấy chú mèo?" },
        { speaker: "Linh", text: "I have two cats.", translation: "Mình có hai chú mèo." }
      ],
      tprActions: [
        { command: "Act like a cat: Meow! 🐱", text: "làm tai mèo bằng tay và kêu Meow", voiceCommand: "Act like a cat" },
        { command: "Act like a jumping rabbit! 🐰", text: "đặt hai tay lên đầu làm tai thỏ nhảy lên", voiceCommand: "Act like a jumping rabbit" },
        { command: "Flap your wings like a bird! 🐦", text: "vẫy hai cánh tay làm động tác chim bay", voiceCommand: "Flap your wings like a bird" }
      ]
    },
    {
      id: 17,
      title: "Unit 17: Our Toys",
      vocab: [
        { word: "doll", meaning: "búp bê", ipa: "/dɒl/", image: "🪆" },
        { word: "ball", meaning: "quả bóng", ipa: "/bɔːl/", image: "⚽" },
        { word: "robot", meaning: "người máy", ipa: "/ˈrəʊbɒt/", image: "🤖" },
        { word: "car", meaning: "ô tô đồ chơi", ipa: "/kɑː(r)/", image: "🚗" },
        { word: "kite", meaning: "cái diều", ipa: "/kaɪt/", image: "🪁" },
        { word: "yo-yo", meaning: "con yô-yô", ipa: "/ˈjəʊ jəʊ/", image: "🪀" }
      ],
      dialogue: [
        { speaker: "Bill", text: "Where is my robot?", translation: "Người máy của mình đâu rồi?" },
        { speaker: "Nam", text: "It's on the shelf.", translation: "Nó ở trên kệ đó." },
        { speaker: "Mai", text: "Do you have any dolls?", translation: "Bạn có búp bê nào không?" },
        { speaker: "Mary", text: "Yes, I have three dolls.", translation: "Có, mình có tận ba con búp bê." }
      ],
      tprActions: [
        { command: "Walk like a robot! 🤖", text: "đi lại cứng cáp kiểu robot", voiceCommand: "Walk like a robot" },
        { command: "Pretend to fly a kite! 🪁", text: "làm động tác kéo dây thả diều", voiceCommand: "Pretend to fly a kite" },
        { command: "Pretend to drive a car! 🚗", text: "xoay vô lăng giả vờ lái ô tô", voiceCommand: "Pretend to drive a car" }
      ]
    },
    {
      id: 18,
      title: "Unit 18: Playing and Doing",
      vocab: [
        { word: "playing", meaning: "đang chơi", ipa: "/ˈpleɪɪŋ/", image: "🎲" },
        { word: "reading", meaning: "đang đọc sách", ipa: "/ˈriːdɪŋ/", image: "📖" },
        { word: "drawing", meaning: "đang vẽ", ipa: "/ˈdrɔːɪŋ/", image: "🎨" },
        { word: "singing", meaning: "đang hát", ipa: "/ˈsɪŋɪŋ/", image: "🎤" },
        { word: "skating", meaning: "đang trượt patin", ipa: "/ˈskeɪtɪŋ/", image: "🛼" },
        { word: "cycling", meaning: "đang đạp xe", ipa: "/ˈsaɪklɪŋ/", image: "🚴" }
      ],
      dialogue: [
        { speaker: "Tony", text: "What is Nam doing?", translation: "Nam đang làm gì thế?" },
        { speaker: "Mai", text: "He is drawing a picture.", translation: "Bạn ấy đang vẽ một bức tranh." },
        { speaker: "Bill", text: "What is Mary doing?", translation: "Mary đang làm gì vậy?" },
        { speaker: "Linh", text: "She is cycling in the park.", translation: "Bạn ấy đang đạp xe trong công viên." }
      ],
      tprActions: [
        { command: "Act like you are cycling! 🚴", text: "làm động tác lái ghi đông xe đạp", voiceCommand: "Act like you are cycling" },
        { command: "Act like you are skating! 🛼", text: "làm động tác lắc người trượt patin", voiceCommand: "Act like you are skating" },
        { command: "Act like you are singing! 🎤", text: "cầm mic tưởng tượng và giả vờ hát", voiceCommand: "Act like you are singing" }
      ]
    },
    {
      id: 19,
      title: "Unit 19: Outdoor Activities",
      vocab: [
        { word: "park", meaning: "công viên", ipa: "/pɑːk/", image: "🏞️" },
        { word: "slide", meaning: "cầu trượt", ipa: "/slaɪd/", image: "🛝" },
        { word: "swing", meaning: "xích đu", ipa: "/swɪŋ/", image: "🎡" },
        { word: "see-saw", meaning: "bập bênh", ipa: "/ˈsiː sɔː/", image: "🪵" },
        { word: "fly a kite", meaning: "thả diều", ipa: "/flaɪ ə kaɪt/", image: "🪁" },
        { word: "ride a bike", meaning: "đạp xe", ipa: "/ride a bike/", image: "🚴" }
      ],
      dialogue: [
        { speaker: "Nam", text: "Where are they? - They are in the park.", translation: "Họ đang ở đâu thế? - Họ đang ở trong công viên." },
        { speaker: "Lucy", text: "What are they doing?", translation: "Họ đang làm gì thế?" },
        { speaker: "Bill", text: "They are flying a kite.", translation: "Họ đang thả diều." },
        { speaker: "Linh", text: "Some girls are on the swings.", translation: "Một vài bạn nữ đang chơi xích đu." }
      ],
      tprActions: [
        { command: "Pretend to sit on a swing! 🎡", text: "làm động tác lắc lư như đang chơi xích đu", voiceCommand: "Pretend to sit on a swing" },
        { command: "Pretend to play see-saw! 🪵", text: "lên xuống nhịp nhàng như chơi bập bênh", voiceCommand: "Pretend to play see-saw" }
      ]
    },
    {
      id: 20,
      title: "Unit 20: At the Zoo",
      vocab: [
        { word: "monkey", meaning: "con khỉ", ipa: "/ˈmʌŋki/", image: "🐒" },
        { word: "tiger", meaning: "con hổ", ipa: "/ˈtaɪɡə(r)/", image: "🐅" },
        { word: "elephant", meaning: "con voi", ipa: "/ˈelɪfənt/", image: "🐘" },
        { word: "peacock", meaning: "con công", ipa: "/ˈpiːkɒk/", image: "🦚" },
        { word: "kangaroo", meaning: "con chuột túi", ipa: "/ˌkæŋɡəˈruː/", image: "🦘" },
        { word: "crocodile", meaning: "con cá sấu", ipa: "/ˈkrɒkədaɪl/", image: "🐊" }
      ],
      dialogue: [
        { speaker: "Mai", text: "I like monkeys.", translation: "Mình thích những chú khỉ." },
        { speaker: "Nam", text: "Why do you like them?", translation: "Tại sao bạn thích chúng?" },
        { speaker: "Mai", text: "Because they are funny.", translation: "Bởi vì chúng rất vui nhộn." },
        { speaker: "Bill", text: "Look at that elephant!", translation: "Hãy nhìn chú voi kia kìa!" }
      ],
      tprActions: [
        { command: "Act like a funny monkey! 🐒", text: "gãi đầu gãi tai kêu cành cạch như khỉ", voiceCommand: "Act like a funny monkey" },
        { command: "Act like a roaring tiger! 🐅", text: "giơ vuốt cọp và gầm to", voiceCommand: "Act like a roaring tiger" },
        { command: "Pretend to have an elephant trunk! 🐘", text: "khoanh tay một bên làm vòi voi đung đưa", voiceCommand: "Pretend to have an elephant trunk" }
      ]
    }
  ],
  defaultStudents: [
    "An", "Bình", "Cường", "Dũng", "Giang", "Hương", 
    "Khánh", "Linh", "Minh", "Nam", "Phong", "Quỳnh", 
    "Sơn", "Trang", "Vy", "Yến"
  ]
};

// Xuất dữ liệu nếu chạy trong môi trường Node.js (dành cho kiểm thử), nếu không thì lưu ở biến toàn cục
if (typeof module !== 'undefined' && module.exports) {
  module.exports = lessonData;
}
