import React, { useState, useEffect } from 'react';
// import { StarTwoTone } from '@ant-design/icons';
import { Content, LeftOption, MatchArea, RightOption, Title, Wrapper } from './MatchPairs.styled';
import ProgressBar from '@/components/ProgressBar';
import BottomBar from '@/components/BottomBar/BottomBar';
import GameOver from '@/components/ProgressBar/GameOver/GameOver';
import { theme } from '@/themes';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ExerciseProgressState, setExercisesProgress } from '@/store/userProgress.slice';
import config from '@/config';
import { explainAnswer, submitExercise, SubmitExerciseType } from '@/services/userProgressAPI';
import { Flex, FloatButton, Spin } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface WordPair {
    id: string;
    left: string;
    right: string;
}

interface MatchPairsProps {
    data: any;
    totalQuestions: number;
    answeredQuestions: number;
    onAnswered: (correct: boolean) => void;
}

const MatchPairs: React.FC<MatchPairsProps> = ({
    data,
    totalQuestions,
    answeredQuestions,
    onAnswered
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.user_id);
    const hearts = useSelector((state: RootState) => state.user.hearts);
    const exercises = useSelector((state: RootState) => state.userProgress.exercises);

    const { options, question, correct_answer } = data;
    // Tổng số cặp (5)
    const totalPairs = options?.length;
    // ID của từ TIẾNG VIỆT và TIẾNG ANH đang chọn tạm
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [selectedRight, setSelectedRight] = useState<string | null>(null);

    // matchedIds: lưu ID (tiếng Việt) của những cặp "thực sự" đã nối đúng (sau khi nháy xanh)
    const [matchedIds, setMatchedIds] = useState<string[]>([]);
    // matchedPairs: lưu chi tiết các cặp đúng (viId, enId) tương ứng với matchedIds
    const [matchedPairs, setMatchedPairs] = useState<WordPair[]>([]);

    // wrongPair: nếu user chọn sai, lưu tạm để highlight đỏ rồi reset
    const [wrongPair, setWrongPair] = useState<WordPair | null>(null);

    // recentMatchedPair: cặp vừa match đúng, dùng để nháy xanh và hiện sao trong 800 ms
    const [recentMatchedPair, setRecentMatchedPair] = useState<WordPair | null>(null);

    // Danh sách tiếng Anh đã shuffle 1 lần khi mount
    const [shuffledRightPairs, setShuffledRightPairs] = useState<WordPair[]>([]);
    const [hasAutoChecked, setHasAutoChecked] = useState(false);
    const lives = hearts;
    const [showGameOver, setShowGameOver] = useState(false);
    const [isCheckedBar, setIsCheckedBar] = useState(false);
    const [isCorrectBar, setIsCorrectBar] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [explainAI, setExplainAI] = useState("");
    const [answerLoading, setAnswerLoading] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        const shuffled = [...options].sort(() => Math.random() - 0.5);
        setShuffledRightPairs(shuffled);
    }, []);

    useEffect(() => {
        if (lives <= 0) {
            setShowGameOver(true);
        }
    }, [lives]);

    // Mỗi khi matchedIds thay đổi, nếu đủ 5 cặp, auto-check
    useEffect(() => {
        if (matchedIds.length === totalPairs && !hasAutoChecked) {
            // Delay 200 ms để user kịp nhìn cặp cuối nháy xanh rồi mới auto-check
            setTimeout(() => {
                handleCheckBar();
                setHasAutoChecked(true);
            }, 200);
        }
    }, [matchedIds, hasAutoChecked, totalPairs]);

    // Khi user click một ô BÊN TRÁI
    const handleClickLeft = (id: string, left: string) => {
        if (matchedIds.includes(id)) return;      // Đã nối thành công rồi
        if (wrongPair) return;                    // Đang highlight sai, chờ reset
        if (matchedIds.length === totalPairs) return; // Đã nối đủ 5 cặp, chờ auto-check

        setSelectedLeft(left);
        if (selectedRight !== null) {
            checkPair(id, left, selectedRight);
        }
    };

    // Khi user click một ô TIẾNG ANH
    const handleClickRight = (id: string, right: string) => {
        if (matchedPairs.some(pair => pair.right === right)) return;  // Đã nối thành công
        if (wrongPair) return;
        if (matchedIds.length === totalPairs) return;

        setSelectedRight(id);
        if (selectedLeft !== null) {
            checkPair(id, selectedLeft, right);
        }
    };

    // Hàm kiểm tra cặp (viId, enId)
    const checkPair = (id: string, left: string, right: string) => {

        const correctPair = correct_answer.find((pair: any) => pair.id === id);
        const userPair = { id, left, right };

        const isFind = JSON.stringify(correctPair).toLowerCase() === JSON.stringify(userPair).toLowerCase();

        if (isFind) {
            // 1. Gán recentMatchedPair để "nháy xanh + hiển thị sao" 800 ms
            setRecentMatchedPair({ id, left, right });

            // 2. Sau 800 ms, reset recentMatchedPair và mới add vào matchedIds/matchedPairs (disabled)
            setTimeout(() => {
                setRecentMatchedPair(null);
                setMatchedIds(prev => [...prev, id]);
                setMatchedPairs(prev => [...prev, userPair]);
            }, 800);

            // 3. Reset selection để user chọn cặp tiếp theo
            setSelectedLeft(null);
            setSelectedRight(null);
        } else {
            // Nếu sai ⇒ highlight đỏ 800 ms rồi reset
            setWrongPair({ id, left, right });
            setTimeout(() => {
                setWrongPair(null);
                setSelectedLeft(null);
                setSelectedRight(null);
            }, 800);
        }
    };

    // Khi user "KIỂM TRA" (auto-called khi đủ 5 cặp)
    const handleCheckBar = async () => {
        // Vì nối đủ 5 cặp ⇒ đúng
        setIsRunning(false);
        setIsCorrectBar(true);
        setIsCheckedBar(true);
        setIsSubmitted(true);

        const userExerciseSubmit: SubmitExerciseType = {
            user_id: userId,
            exercise_id: data._id,
            user_answer: matchedPairs,
            answer_time: seconds,
        }
        await submitExercise(userExerciseSubmit);

        if (matchedPairs) {
            const exercisesResult: ExerciseProgressState = {
                exercise_id: data._id ? data._id : "",
                user_answer: matchedPairs,
                answer_time: seconds,
                is_correct: true,
                question: data.question,
                question_format: data.question_format,
            }
            const updatedExercises = [...exercises, exercisesResult];
            dispatch(setExercisesProgress(updatedExercises));
        } else {
            const exercisesResult: ExerciseProgressState = {
                exercise_id: data._id ? data._id : "",
                user_answer: matchedPairs,
                answer_time: seconds,
                is_correct: false,
                correct_answer: data.correct_answer,
                question: data.question,
                question_format: data.question_format,
            }
            const updatedExercises = [...exercises, exercisesResult];
            dispatch(setExercisesProgress(updatedExercises));
        }

        // Tăng progress
        // setAnswered(prev => prev + 1);
        // if (!isCorrectBar) setLives((prev) => prev - 1);
    };

    // Khi user bấm "TIẾP TỤC"
    const handleNextBar = () => {
        onAnswered(isCorrectBar); // thông báo lên cha là câu này đã trả lời
    };

    // BottomBar: enable "KIỂM TRA" chỉ khi matchedIds.length === totalPairs
    const bottomBarSelectedIndex = matchedIds.length === totalPairs ? 1 : null;

    // Helper để render button:
    const renderButton = (
        text: string,
        id: string,
        isLeftColumn: boolean,
        // idx: number,
    ) => {
        // 1) isMatched: cặp đã "kết thúc" (đã ghi vào matchedIds)
        const isMatched = isLeftColumn
            ? matchedIds.includes(id)
            : matchedPairs.some(pair => pair.id === id);

        // 2) isRecentMatch: cặp vừa nối đúng (trong 800 ms đầu)
        const isRecentMatch = recentMatchedPair
            ? isLeftColumn
                ? recentMatchedPair.left === text
                : recentMatchedPair.right === text
            : false;

        // 3) isWrong: cặp vừa nối sai (trong 800 ms)
        const isWrong = wrongPair
            ? isLeftColumn
                ? wrongPair.left === text
                : wrongPair.right === text
            : false;

        // 4) isSelected: đang được chọn (nhưng chưa finalize match/sai)
        const isSelected =
            isLeftColumn
                ? selectedLeft === text && !isWrong
                : selectedRight === text && !isWrong;

        // Thiết lập màu nền (bgColor) và viền (borderColor)
        let bgColor = '#fff';
        let borderColor = '2px solid #e5e5e5';
        let borderBottom = '4px solid #e5e5e5';

        if (isMatched) {
            // → màu xám nhạt (disabled)
            bgColor = '#f0f0f0';
            borderColor = '2px solid #d9d9d9';
            borderBottom = '4px solid #d9d9d9';
        } else if (isRecentMatch) {
            // → màu xanh nhạt + viền xanh (correct)
            bgColor = `${theme.color.bgGreen}`;
            borderColor = `2px solid ${theme.color.green}`;
            borderBottom = `4px solid ${theme.color.green}`;
        } else if (isWrong) {
            // → màu đỏ nhạt + viền đỏ (wrong)
            bgColor = `${theme.color.bgRed}`;
            borderColor = `2px solid ${theme.color.red}`;
            borderBottom = `4px solid ${theme.color.red}`;
        } else if (isSelected) {
            // → màu xanh dương nhạt + viền xanh dương (hover/selected)
            bgColor = `${theme.color.bgBlue}`;
            borderColor = `2px solid ${theme.color.primary}`;
            borderBottom = `4px solid ${theme.color.primary}`;
        }

        return (
            <div
                key={id.toString() + (isLeftColumn ? 'left' : 'right')}
                style={{ position: 'relative', marginBottom: 12 }}
            >
                <button
                    onClick={() => (isLeftColumn ? handleClickLeft(id, text) : handleClickRight(id, text))}
                    // Chỉ disable nếu "kết thúc match" hoặc đang highlight sai hoặc đã nối đủ 5 cặp
                    disabled={isMatched || Boolean(wrongPair) || matchedIds.length === totalPairs}
                    style={{
                        width: '100%',
                        padding: '11px 8px',
                        borderRadius: '10px',
                        backgroundColor: bgColor,
                        border: borderColor,
                        borderBottom: borderBottom,
                        cursor: isMatched || matchedIds.length === totalPairs ? 'not-allowed' : 'pointer',
                        opacity: isMatched ? 0.6 : 1,
                        fontSize: '16px',
                        color: `${theme.color.title}`,
                        transition: 'all 0.2s ease',
                        outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                        if (!isMatched && !wrongPair && matchedIds.length !== totalPairs && !isSelected && !isRecentMatch) {
                            e.currentTarget.style.backgroundColor = `${theme.color.bgBlue}`;
                            e.currentTarget.style.border = `2px solid ${theme.color.primary}`;
                            e.currentTarget.style.borderBottom = `4px solid ${theme.color.primary}`;
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isMatched && !wrongPair && matchedIds.length !== totalPairs && !isSelected && !isRecentMatch) {
                            e.currentTarget.style.backgroundColor = '#fff';
                            e.currentTarget.style.border = '2px solid #e5e5e5';
                            e.currentTarget.style.borderBottom = '4px solid #e5e5e5';
                        }
                    }}
                >
                    {/* <span className="option-number">{idx + 1}</span> */}
                    {text}
                </button>

                {/* Nếu là recentMatchedMatch → show Star */}
                {/* {isRecentMatch && (
                    <StarTwoTone
                        twoToneColor="#faad14"
                        style={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            fontSize: 20,
                        }}
                    />
                )} */}
            </div>
        );
    };

    const getAIExplaiation = async () => {
        setAnswerLoading(true);
        const payload = {
            user_id: userId,
            exercise_id: data._id,
        }

        const res = await explainAnswer(payload);
        if (res.status === 201) {
            setExplainAI(res.data.explanation);
        }
        setAnswerLoading(false);
    }

    return (
        <Wrapper>
            {showGameOver && (
                <GameOver
                    onCancel={() => navigate("/")}
                    onRecover={() => navigate(config.routes.user.shop)}
                />
            )}
            <ProgressBar
                totalQuestions={totalQuestions}
                answeredQuestions={answeredQuestions}
                lives={lives}
                onClose
            />

            <Content>
                <Title style={{ margin: '16px 0' }}>{question}</Title>

                <MatchArea
                >
                    {/* Cột trái */}
                    <LeftOption>
                        {options?.map((option: any) =>
                            // renderButton(pair.vi, pair.id, true, idx)
                            renderButton(option.left, option.id, true)
                        )}
                    </LeftOption>

                    {/* Cột phải */}
                    <RightOption>
                        {shuffledRightPairs.map((pair) =>
                            // renderButton(pair.en, pair.id, false, idx)
                            renderButton(pair.right, pair.id, false)
                        )}
                    </RightOption>
                </MatchArea>
            </Content>

            {/* BottomBar luôn luôn hiển thị. */}
            <BottomBar
                isChecked={isCheckedBar}
                isCorrect={isCorrectBar}
                selectedIndex={bottomBarSelectedIndex}
                handleCheck={handleCheckBar}
                handleReset={() => { }}
                handleNext={handleNextBar}
            />

            {isSubmitted && (
                <FloatButton.Group
                    trigger="click"
                    placement="left"
                    icon={<QuestionCircleOutlined />}
                    type="primary"
                    onClick={getAIExplaiation}
                >

                    {answerLoading ? <Spin /> : (
                        <Flex vertical className="w-80 bg-white rounded p-4 mb-60 border" align="flex-end" >
                            {explainAI ? explainAI : 'Không có phản hồi'}
                        </Flex>
                    )}
                </FloatButton.Group>
            )}
        </Wrapper>
    );
};

export default MatchPairs;