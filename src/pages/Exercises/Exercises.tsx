/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";

import SelectImage from "./Type/SelectImage/SelectImage";
import MultipleChoice from "./Type/MultipleChoice/MultipleChoice";
import MatchPairs from "./Type/MatchPairs/MatchPairs";
import SortSentence from "./Type/SortSentence/SortSentence";
import Listening from "./Type/Listening/Listening";
import CompleteSentences from "./Type/CompleteSentences/CompleteSentences";
import { sampleData } from "../sampleData";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonDetail } from "@/services/lessonAPI";
import { useDocumentTitle } from "@/hooks";

const Exercise = () => {
  useDocumentTitle("Exercise");
  
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [metadata, setMetadata] = useState<any>({});

  const shuffleArray = (array: any) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await getLessonDetail(lessonId ? lessonId : "");
      console.log("✅ Metadata: ", res.data);

      // Shuffle chỉ lần đầu tiên khi load
      // if (!shuffled) {
      //   res.data = shuffleArray(res.data);
      //   setShuffled(true);
      // }

      setMetadata(res.data);
      setQuestions(res.data.exercises);
    } catch (error) {
      console.error("Lỗi khi fetch questions:", error);
    }
  }, [lessonId, shuffled]);

  // Khi mount hoặc lessonId thay đổi
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Khi user trả lời xong 1 câu (callback từ component con)
  const handleAnswered = () => {
    setAnsweredCount((prev) => prev + 1);

    // 1s sau (hoặc bạn có thể gọi ngay), chuyển sang câu tiếp theo
    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        navigate('/exercise/result');
      }
    }, 500);
  };

  // Nếu chưa load xong
  if (!questions || questions.length === 0) {
    return <div>Đang tải bài tập...</div>;
  }

  // Lấy question hiện tại
  const currentQuestion = questions[currentIdx];

  // Hiển thị component phụ theo type
  const renderQuestionComponent = () => {
    const { question_format } = currentQuestion;

    switch (question_format) {
      case "select_image":
        return (
          <SelectImage
            data={currentQuestion}
            totalQuestions={questions.length}
            answeredQuestions={answeredCount}
            onAnswered={handleAnswered}
          />
        );

      case "multiple_choice":
        return (
          <MultipleChoice
            data={currentQuestion}
            totalQuestions={questions.length}
            answeredQuestions={answeredCount}
            onAnswered={handleAnswered}
          />
        );

      case "match_pairs":
        return (
          <MatchPairs
            data={currentQuestion}
            totalQuestions={questions.length}
            answeredQuestions={answeredCount}
            onAnswered={handleAnswered}
          />
        );

      case "sort_sentence":
        return (
          <SortSentence
            data={currentQuestion}
            totalQuestions={questions.length}
            answeredQuestions={answeredCount}
            onAnswered={handleAnswered}
          />
        );

      case "listening":
        return (
          <Listening
            data={currentQuestion}
            totalQuestions={questions.length}
            answeredQuestions={answeredCount}
            onAnswered={handleAnswered}
          />
        );

      case "complete_sentences":
        return (
          <CompleteSentences
            data={currentQuestion}
            totalQuestions={questions.length}
            answeredQuestions={answeredCount}
            onAnswered={handleAnswered}
          />
        );

      default:
        return <div>Loại câu hỏi "{question_format}" chưa được hỗ trợ.</div>;
    }
  };

  return (
    <div className="exercise-container">
      {renderQuestionComponent()}
    </div>
  );
};

export default Exercise;
