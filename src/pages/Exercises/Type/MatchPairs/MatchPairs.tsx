import React, { useState, useEffect } from 'react';

interface WordPair {
    id: number;
    vi: string;
    en: string;
}

const wordPairs: WordPair[] = [
    { id: 0, vi: 'sữa', en: 'milk' },
    { id: 1, vi: 'xin chào', en: 'hello' },
    { id: 2, vi: 'cà phê', en: 'coffee' },
    { id: 3, vi: 'đường', en: 'sugar' },
    { id: 4, vi: 'trà', en: 'tea' },
];

const MatchPairs: React.FC = () => {
    const [selectedVi, setSelectedVi] = useState<number | null>(null);
    const [selectedEn, setSelectedEn] = useState<number | null>(null);
    const [matchedIds, setMatchedIds] = useState<number[]>([]);
    const [shuffledEnPairs, setShuffledEnPairs] = useState<WordPair[]>([]);

    useEffect(() => {
        // Shuffle English words once on mount
        const shuffled = [...wordPairs].sort(() => Math.random() - 0.5);
        setShuffledEnPairs(shuffled);
    }, []);

    const handleClickVi = (id: number) => {
        if (matchedIds.includes(id)) return;
        setSelectedVi(id);
        if (selectedEn !== null) checkMatch(id, selectedEn);
    };

    const handleClickEn = (id: number) => {
        if (matchedIds.includes(id)) return;
        setSelectedEn(id);
        if (selectedVi !== null) checkMatch(selectedVi, id);
    };

    const checkMatch = (viId: number, enId: number) => {
        const pairVi = wordPairs.find(p => p.id === viId);
        const pairEn = wordPairs.find(p => p.id === enId);
        if (pairVi && pairEn && pairVi.en === pairEn.en) {
            setMatchedIds(prev => [...prev, viId]);
        }

        setTimeout(() => {
            setSelectedVi(null);
            setSelectedEn(null);
        }, 300);
    };

    const renderButton = (
        text: string,
        id: number,
        isSelected: boolean,
        isDisabled: boolean,
        onClick: () => void
    ) => (
        <button
            onClick={onClick}
            disabled={isDisabled}
            style={{
                width: '120px',
                padding: '8px',
                margin: '6px 0',
                borderRadius: '8px',
                border: isSelected ? '2px solid #0984e3' : '1px solid #ccc',
                backgroundColor: isDisabled ? '#f1f2f6' : isSelected ? '#dfe6e9' : '#fff',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
            }}
        >
            {text}
        </button>
    );

    return (
        <div>
            <h2>Chọn cặp từ</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 300 }}>
                {/* Cột tiếng Việt giữ nguyên */}
                <div>
                    {wordPairs.map((pair) =>
                        renderButton(
                            pair.vi,
                            pair.id,
                            selectedVi === pair.id,
                            matchedIds.includes(pair.id),
                            () => handleClickVi(pair.id)
                        )
                    )}
                </div>

                {/* Cột tiếng Anh đã được shuffle */}
                <div>
                    {shuffledEnPairs.map((pair) =>
                        renderButton(
                            pair.en,
                            pair.id,
                            selectedEn === pair.id,
                            matchedIds.includes(pair.id),
                            () => handleClickEn(pair.id)
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchPairs;
