import storeImg from "@/assets/store.png";

export const sampleData = {
  topics: [
    {
      topic_id: 1,
      title: "Cơ bản 1",
      lessons: [
        {
          lesson_id: 1,
          title: "Bài 1: Chào hỏi",
          questions_count: 5,
          description: "Học cách chào hỏi bằng tiếng Anh cơ bản.",
          status: "completed",
        },
        {
          lesson_id: 2,
          title: "Bài 2: Giới thiệu bản thân",
          questions_count: 4,
          description: "Giới thiệu tên, nghề nghiệp và nơi sống.",
          status: "current",
        },
        {
          lesson_id: 21,
          title: "Bài 3: Ngữ âm cơ bản",
          questions_count: 3,
          description: "Luyện phát âm các âm cơ bản trong tiếng Anh.",
          status: "locked",
        },
      ],
    },
    {
      topic_id: 2,
      title: "Đồ ăn & Uống",
      lessons: [
        {
          lesson_id: 3,
          title: "Bài 1: Các loại thức ăn",
          questions_count: 6,
          description: "Học từ vựng về các loại thực phẩm thường gặp.",
          status: "locked",
        },
        {
          lesson_id: 4,
          title: "Bài 2: Đồ uống",
          questions_count: 5,
          description: "Học từ vựng và mẫu câu về đồ uống.",
          status: "locked",
        },
        {
          lesson_id: 22,
          title: "Bài 3: Gọi món",
          questions_count: 4,
          description: "Thực hành hội thoại khi gọi món tại nhà hàng.",
          status: "locked",
        },
      ],
    },
  ],

  lessons: [
    {
      lesson_id: 1,
      topic_id: 1,
      title: "Bài 1: Xin chào & Tạm biệt",
      questions: [
        {
          question_id: 1,
          type: "select_image",
          prompt: 'Đâu là "trà"?',
          options: [
            {
              image_url:
                "https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fmilk.png?alt=media&token=9fbdcc66-ed60-435d-a213-b252e5546e26",
              value: "sữa",
            },
            {
              image_url:
                "https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Ftea.png?alt=media&token=ae8c05e7-ee1b-4b82-a099-61916187102b",
              value: "trà",
            },
            {
              image_url:
                "https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fcoffee-cup.png?alt=media&token=ed69ac36-cbb8-4930-afef-56617715aaa3",
              value: "cà phê",
            },
          ],
          answer: "trà",
        },
        {
          question_id: 2,
          type: "multiple_choice",
          prompt: "'Goodbye' có nghĩa là gì?",
          options: ["Chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"],
          answer: "Tạm biệt",
        },
        {
          question_id: 3,
          type: "match_pairs",
          prompt: "Nối từ với nghĩa của nó.",
          pairs: [
            { id: 0, left: "sữa", right: "milk" },
            { id: 1, left: "xin chào", right: "hello" },
            { id: 2, left: "cà phê", right: "coffee" },
            { id: 3, left: "đường", right: "sugar" },
            { id: 4, left: "trà", right: "tea" },
          ],
        },
        {
          question_id: 4,
          type: "sort_sentence",
          prompt: "Viết lại bằng Tiếng Anh",
          sample_sentence: "Đây là một cửa hàng mới.",
          words: [
            "store",
            "is",
            "laptops",
            "This",
            "taller",
            "coworkers",
            "new",
            "whiter",
            "a",
            "fast",
            "window",
            "friendly",
            "blue",
            "smart",
            "strong",
          ],
          answer: "This is a new store",
        },
        {
          question_id: 5,
          type: "listening",
          prompt: "Nghe và chọn câu đúng (audio đọc: 'Goodbye').",
          audio_url: "https://audio.com/goodbye.mp3",
          options: ["Hello", "Goodbye", "Thank you"],
          answer: "Goodbye",
        },
      ],
    },

    {
      lesson_id: 2,
      topic_id: 1,
      title: "Bài 2: Bạn khỏe không?",
      questions: [
        {
          question_id: 6,
          type: "listening",
          prompt: "Nghe và chọn đúng câu (audio đọc: 'How are you?').",
          audio_url: "https://audio.com/how_are_you.mp3",
          options: ["What is your name?", "How are you?", "I am fine"],
          answer: "How are you?",
        },
        {
          question_id: 7,
          type: "complete_sentences",
          prompt: "Điền vào chỗ trống",
          sample_sentence: "Đây là một cửa hàng mới.",
          image: storeImg,
          sentence: { before: "This is a ", after: " store." },
          options: [
            "store",
            "is",
            "laptops",
            "This",
            "taller",
            "coworkers",
            "new",
            "whiter",
            "a",
            "fast",
            "window",
            "friendly",
            "blue",
            "smart",
            "strong",
          ],
          answer: "new",
        },
        {
          question_id: 8,
          type: "multiple_choice",
          prompt: "'How are you?' có nghĩa là gì?",
          options: ["Bạn là ai?", "Bạn khỏe không?", "Tên bạn là gì?", "Tạm biệt"],
          answer: "Bạn khỏe không?"
        },
        {
          question_id: 9,
          type: "match_pairs",
          prompt: "Nối câu với nghĩa đúng.",
          pairs: [
            { id: 0, left: "How are you?", right: "Bạn khỏe không?" },
            { id: 1, left: "I am fine", right: "Tôi khỏe" }
          ]
        }
      ],
    },

    {
      lesson_id: 3,
      topic_id: 2,
      title: "Bài 1: Tôi tên là...",
      questions: [
        {
          question_id: 10,
          type: "complete_sentences",
          prompt: "Điền từ còn thiếu: My name ____ Linh.",
          blank: "",
          answer: "is",
        },
        {
          question_id: 11,
          type: "multiple_choice",
          prompt: "Chọn phiên âm gần đúng của 'My name is Linh'.",
          options: ["Mai nem is Linh", "Mai nêm is Linh", "Mai nam is Linh"],
          answer: "Mai nem is Linh",
        },
        {
          question_id: 12,
          type: "select_image",
          prompt: "Chọn hình cho câu: 'My name is Linh'.",
          options: [
            {
              image_url: "https://images.com/linh.png",
              value: "My name is Linh",
            },
            {
              image_url: "https://images.com/teacher.png",
              value: "I am a teacher",
            },
          ],
          answer: "My name is Linh",
        },
        {
          question_id: 13,
          type: "sort_sentence",
          prompt: "Sắp xếp thành câu: [My, name, is, Nam].",
          words: ["My", "name", "is", "Nam"],
          answer: "My name is Nam",
        },
        {
          question_id: 14,
          type: "match_pairs",
          prompt: "Nối câu với nghĩa của nó.",
          pairs: [
            { left: "My name is Mai", right: "Tôi tên là Mai" },
            { left: "Nice to meet you", right: "Rất vui được gặp bạn" },
          ],
        },
      ],
    },

    {
      lesson_id: 4,
      topic_id: 2,
      title: "Bài 2: Nghề nghiệp & Nơi ở",
      questions: [
        {
          question_id: 15,
          type: "multiple_choice",
          prompt: "'I am a teacher' có nghĩa là gì?",
          options: [
            "Tôi là học sinh",
            "Tôi là giáo viên",
            "Tôi là bác sĩ",
            "Tôi sống ở Hà Nội",
          ],
          answer: "Tôi là giáo viên",
        },
        {
          question_id: 16,
          type: "complete_sentences",
          prompt: "Điền từ còn thiếu: I ____ in Ho Chi Minh City.",
          blank: "",
          answer: "live",
        },
        {
          question_id: 17,
          type: "select_image",
          prompt: "Chọn hình cho câu: 'I am a student'.",
          options: [
            {
              image_url: "https://images.com/student.png",
              value: "I am a student",
            },
            {
              image_url: "https://images.com/doctor.png",
              value: "I am a doctor",
            },
          ],
          answer: "I am a student",
        },
        {
          question_id: 18,
          type: "match_pairs",
          prompt: "Nối nghề nghiệp với tiếng Anh.",
          pairs: [
            { left: "Giáo viên", right: "Teacher" },
            { left: "Bác sĩ", right: "Doctor" },
            { left: "Học sinh", right: "Student" },
          ],
        },
        {
          question_id: 19,
          type: "sort_sentence",
          prompt: "Sắp xếp thành câu: [I, live, in, Hanoi].",
          words: ["I", "live", "in", "Hanoi"],
          answer: "I live in Hanoi",
        },
      ],
    },
  ],
};
