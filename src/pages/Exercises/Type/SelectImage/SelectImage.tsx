import React, { useState } from 'react';
import { MeanText, OptionsContainer, Question, SelectWrapper, SubTitle } from './SelectImage.styled';

interface Option {
    label: string;
    image: string;
    value: string;
}

const options: Option[] = [
    {
        label: 'milk',
        image: 'https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fmilk.png?alt=media&token=9fbdcc66-ed60-435d-a213-b252e5546e26',
        value: 'milk',
    },
    {
        label: 'tea',
        image: 'https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Ftea.png?alt=media&token=ae8c05e7-ee1b-4b82-a099-61916187102b',
        value: 'tea',
    },
    {
        label: 'coffee',
        image: 'https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fcoffee-cup.png?alt=media&token=ed69ac36-cbb8-4930-afef-56617715aaa3',
        value: 'coffee',
    }
];

const SelectImage: React.FC = () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <SelectWrapper>
            <SubTitle>TỪ VỰNG MỚI</SubTitle>
            <Question>Đâu là "trà"?</Question>
            <OptionsContainer>
                {options.map((opt, idx) => (
                    <div
                        key={idx}
                        className={`option-card ${selected === opt.value ? 'selected' : ''}`}
                        onClick={() => setSelected(opt.value)}
                    >
                        <img src={opt.image} alt={opt.label} />
                        <MeanText>
                            <p>{opt.label}</p>
                            <span className="option-number">{idx + 1}</span>
                        </MeanText>

                    </div>
                ))}
            </OptionsContainer>
        </SelectWrapper>
    );
};

export default SelectImage;
