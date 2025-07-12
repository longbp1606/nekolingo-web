/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";

import SelectImage from "./Type/SelectImage/SelectImage";
import MultipleChoice from "./Type/MultipleChoice/MultipleChoice";
import MatchPairs from "./Type/MatchPairs/MatchPairs";
import SortSentence from "./Type/SortSentence/SortSentence";
import Listening from "./Type/Listening/Listening";
import CompleteSentences from "./Type/CompleteSentences/CompleteSentences";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonDetail } from "@/services/lessonAPI";
import { useAuth, useDocumentTitle } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setLessonMetadata } from "@/store/metadata.slice";
import { ExerciseProgressState, setUserProgress } from "@/store/userProgress.slice";
import { completeFullLesson } from "@/services/userProgressAPI";
import { message } from "antd";
import { RootState } from "@/store";

const Exercise = () => {
  useDocumentTitle("Exercise");

  const { profile } = useAuth();
  const exercises = useSelector((state: RootState) => state.userProgress.exercises);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [metadata, setMetadata] = useState<any>({});
  const [messageApi, contextHolder] = message.useMessage();
  const [apiLoading, setApiLoading] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setApiLoading(true);
    try {
      const res = await getLessonDetail(lessonId ? lessonId : "");

      dispatch(setLessonMetadata(res.data));
      setMetadata(res.data);
      setQuestions(res.data.exercises);
    } catch (error) {
      console.error("Lỗi khi fetch questions:", error);
    } finally {
      setApiLoading(false);
    }
  }, [lessonId]);

  // Khi mount hoặc lessonId thay đổi
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Khi user trả lời xong 1 câu (callback từ component con)
  const handleAnswered = () => {
    setAnsweredCount((prev) => prev + 1);

    // 1s sau (hoặc bạn có thể gọi ngay), chuyển sang câu tiếp theo
    setTimeout(async () => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        dispatch(setUserProgress({
          lesson_id: metadata._id,
          user_id: profile ? profile.id : "",
          exercises
        }))
        const res = await completeFullLesson({
          lesson_id: metadata._id,
          user_id: profile ? profile.id : "",
          exercises: exercises.map((exercise: ExerciseProgressState) => {
            return {
              exercise_id: exercise.exercise_id,
              user_answer: exercise.user_answer,
              answer_time: exercise.answer_time,
            };
          }),
        })

        if (res.status !== 201) {
          messageApi.error(res.data.message);
        } else {
          navigate('/exercise/result');
        }
      }
    }, 500);
  };

  // Nếu chưa load xong
  if (!questions || questions.length === 0 || apiLoading) {
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
    <>
      {contextHolder}
      <div className="exercise-container">
        {renderQuestionComponent()}
      </div>
    </>
  );
};

export default Exercise;
