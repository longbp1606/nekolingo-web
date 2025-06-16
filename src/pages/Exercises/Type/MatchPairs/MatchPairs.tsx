import React, { useState, useEffect } from 'react';
// import { StarTwoTone } from '@ant-design/icons';
import { Content, LeftOption, MatchArea, RightOption, Title, Wrapper } from './MatchPairs.styled';
import ProgressBar from '@/components/ProgressBar';
import BottomBar from '@/components/BottomBar/BottomBar';
import GameOver from '@/components/ProgressBar/GameOver/GameOver';

interface WordPair {
    id: number;
    left: string;
    right: string;
}

interface MatchPairsProps {
    data: {
        question_id: number;
        type: string;
        prompt: string;
        pairs: WordPair[];
    };
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
    const { pairs, prompt } = data;
    // Tổng số cặp (5)
    const totalPairs = pairs.length;
    // ID của từ TIẾNG VIỆT và TIẾNG ANH đang chọn tạm
    const [selectedVi, setSelectedVi] = useState<number | null>(null);
    const [selectedEn, setSelectedEn] = useState<number | null>(null);

    // matchedIds: lưu ID (tiếng Việt) của những cặp “thực sự” đã nối đúng (sau khi nháy xanh)
    const [matchedIds, setMatchedIds] = useState<number[]>([]);
    // matchedPairs: lưu chi tiết các cặp đúng (viId, enId) tương ứng với matchedIds
    const [matchedPairs, setMatchedPairs] = useState<{ viId: number; enId: number }[]>([]);

    // wrongPair: nếu user chọn sai, lưu tạm để highlight đỏ rồi reset
    const [wrongPair, setWrongPair] = useState<{ viId: number; enId: number } | null>(null);

    // recentMatchedPair: cặp vừa match đúng, dùng để nháy xanh và hiện sao trong 800 ms
    const [recentMatchedPair, setRecentMatchedPair] = useState<{ viId: number; enId: number } | null>(null);

    // Danh sách tiếng Anh đã shuffle 1 lần khi mount
    const [shuffledEnPairs, setShuffledEnPairs] = useState<WordPair[]>([]);
    const [hasAutoChecked, setHasAutoChecked] = useState(false);
    const [lives, setLives] = useState(3);
    const [showGameOver, setShowGameOver] = useState(false);
    const [isCheckedBar, setIsCheckedBar] = useState(false);
    const [isCorrectBar, setIsCorrectBar] = useState(false);

    useEffect(() => {
        const shuffled = [...pairs].sort(() => Math.random() - 0.5);
        setShuffledEnPairs(shuffled);
    }, []);

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

    // Khi user click một ô TIẾNG VIỆT
    const handleClickVi = (id: number) => {
        if (matchedIds.includes(id)) return;      // Đã nối thành công rồi
        if (wrongPair) return;                    // Đang highlight sai, chờ reset
        if (matchedIds.length === totalPairs) return; // Đã nối đủ 5 cặp, chờ auto-check

        setSelectedVi(id);
        if (selectedEn !== null) {
            checkPair(id, selectedEn);
        }
    };

    // Khi user click một ô TIẾNG ANH
    const handleClickEn = (id: number) => {
        if (matchedPairs.some(pair => pair.enId === id)) return;  // Đã nối thành công
        if (wrongPair) return;
        if (matchedIds.length === totalPairs) return;

        setSelectedEn(id);
        if (selectedVi !== null) {
            checkPair(selectedVi, id);
        }
    };

    // Hàm kiểm tra cặp (viId, enId)
    const checkPair = (viId: number, enId: number) => {
        const pairVi = pairs.find(p => p.id === viId)!;
        const pairEn = pairs.find(p => p.id === enId)!;

        const isMatch = pairVi.left === pairEn.left;

        if (isMatch) {
            // 1. Gán recentMatchedPair để “nháy xanh + hiển thị sao” 800 ms
            setRecentMatchedPair({ viId, enId });

            // 2. Sau 800 ms, reset recentMatchedPair và mới add vào matchedIds/matchedPairs (disabled)
            setTimeout(() => {
                setRecentMatchedPair(null);
                setMatchedIds(prev => [...prev, viId]);
                setMatchedPairs(prev => [...prev, { viId, enId }]);
            }, 800);

            // 3. Reset selection để user chọn cặp tiếp theo
            setSelectedVi(null);
            setSelectedEn(null);
        } else {
            // Nếu sai ⇒ highlight đỏ 800 ms rồi reset
            setWrongPair({ viId, enId });
            setTimeout(() => {
                setWrongPair(null);
                setSelectedVi(null);
                setSelectedEn(null);
            }, 800);
        }
    };

    // Khi user “KIỂM TRA” (auto-called khi đủ 5 cặp)
    const handleCheckBar = () => {
        // Vì nối đủ 5 cặp ⇒ đúng
        setIsCorrectBar(true);
        setIsCheckedBar(true);

        // Tăng progress
        // setAnswered(prev => prev + 1);
        if (!isCorrectBar) setLives((prev) => prev - 1);
    };

    // Khi user bấm “TIẾP TỤC”
    const handleNextBar = () => {
        onAnswered(isCorrectBar); // thông báo lên cha là câu này đã trả lời
    };

    // BottomBar: enable “KIỂM TRA” chỉ khi matchedIds.length === totalPairs
    const bottomBarSelectedIndex = matchedIds.length === totalPairs ? 1 : null;

    // Helper để render button:
    const renderButton = (
        text: string,
        id: number,
        isViColumn: boolean,
        // idx: number,
    ) => {
        // 1) isMatched: cặp đã “kết thúc” (đã ghi vào matchedIds)
        const isMatched = isViColumn
            ? matchedIds.includes(id)
            : matchedPairs.some(pair => pair.enId === id);

        // 2) isRecentMatch: cặp vừa nối đúng (trong 800 ms đầu)
        const isRecentMatch = recentMatchedPair
            ? isViColumn
                ? recentMatchedPair.viId === id
                : recentMatchedPair.enId === id
            : false;

        // 3) isWrong: cặp vừa nối sai (trong 800 ms)
        const isWrong = wrongPair
            ? isViColumn
                ? wrongPair.viId === id
                : wrongPair.enId === id
            : false;

        // 4) isSelected: đang được chọn (nhưng chưa finalize match/sai)
        const isSelected =
            isViColumn
                ? selectedVi === id && !isWrong
                : selectedEn === id && !isWrong;

        // Thiết lập màu nền (bgColor) và viền (borderColor)
        let bgColor = '#fff';
        let borderColor = '#ccc';

        if (isMatched) {
            // → màu xám nhạt (disabled)
            bgColor = '#f0f0f0';
            borderColor = '#d9d9d9';
        } else if (isRecentMatch) {
            // → màu xanh nhạt + viền xanh, show sao
            bgColor = '#c8f7c5';
            borderColor = '#4caf50';
        } else if (isWrong) {
            // → màu đỏ nhạt + viền đỏ
            bgColor = '#f8d7da';
            borderColor = '#ff4d4f';
        } else if (isSelected) {
            // → màu xanh dương nhạt + viền xanh dương
            bgColor = '#dfe6e9';
            borderColor = '#0984e3';
        }

        return (
            <div
                key={id.toString() + (isViColumn ? 'left' : 'right')}
                style={{ position: 'relative', marginBottom: 12 }}
            >
                <button
                    onClick={() => (isViColumn ? handleClickVi(id) : handleClickEn(id))}
                    // Chỉ disable nếu “kết thúc match” hoặc đang highlight sai hoặc đã nối đủ 5 cặp
                    disabled={isMatched || Boolean(wrongPair) || matchedIds.length === totalPairs}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '12px',
                        backgroundColor: bgColor,
                        border: `2px solid ${borderColor}`,
                        cursor: isMatched || matchedIds.length === totalPairs ? 'not-allowed' : 'pointer',
                        opacity: isMatched ? 0.6 : 1,
                        fontSize: '19px',
                        color: '${theme.color.title}',
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

    return (
        <Wrapper>
            {showGameOver && (
                <GameOver
                    onCancel={() => setShowGameOver(false)}
                    onRecover={() => {
                        setLives(1);
                        setShowGameOver(false);
                    }}
                />
            )}
            <ProgressBar
                totalQuestions={totalQuestions}
                answeredQuestions={answeredQuestions}
                lives={lives}
                onClose
            />

            <Content>
                <Title style={{ margin: '16px 0' }}>{prompt}</Title>

                <MatchArea
                >
                    {/* Cột tiếng Việt */}
                    <LeftOption>
                        {pairs.map((pair) =>
                            // renderButton(pair.vi, pair.id, true, idx)
                            renderButton(pair.left, pair.id, true)
                        )}
                    </LeftOption>

                    {/* Cột tiếng Anh */}
                    <RightOption>
                        {shuffledEnPairs.map((pair) =>
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
        </Wrapper>
    );
};

export default MatchPairs;
