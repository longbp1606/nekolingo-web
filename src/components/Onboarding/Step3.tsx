import React, { useEffect, useState } from 'react';
import { OptionGrid, OptionCard, Footer, Step2Container, Step2ContentWrapper, FlagImage, CatImage, CatAsk } from './Onboarding.styled';
import NextButton from './NextButton/NextButton';
import { getListLanguages, LanguageItem } from '@/services/languageAPI';
import { useDispatch } from 'react-redux';
import { setLanguageTo } from '@/store/register.slice';

interface Step3Props {
  onNext: (language: string) => void;
}

const Step3: React.FC<Step3Props> = ({ onNext }) => {
  const dispatch = useDispatch();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [languages, setLanguages] = useState<LanguageItem[]>([]);

  const fetchLanguages = async () => {
    try {
      const response = await getListLanguages(1, 10);
      if (response.status === 200) {
        // Extract the languages array from the nested data structure
        const languageList = response.data.languages || [];
        setLanguages(languageList);
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  }

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
  };

  return (
    <Step2Container>
      <Step2ContentWrapper>
        <CatAsk>
          <CatImage src="/src/assets/cat-writing.png" alt="Languages" />
          <h2>Bạn muốn học ngôn ngữ nào?</h2>
        </CatAsk>
        <OptionGrid>
          {Array.isArray(languages) && languages.length > 0 ? languages.filter((language) => language.code !== 'vi')
          .map((language) => (
            <OptionCard
              key={language._id}
              onClick={() => handleSelect(language._id)}
              style={{ borderColor: selectedLang === language._id ? '#00C2D1' : '#ddd' }}
            >
              <FlagImage src={language.flag_url || `/src/assets/flag/${language.code}.png`} alt={language.name} />
              {language.name}
            </OptionCard>
          )) : null}
        </OptionGrid>
      </Step2ContentWrapper>
      <Footer>
        <NextButton
          onClick={() => {
            dispatch(setLanguageTo(selectedLang));
            selectedLang && onNext(selectedLang);
          }} />
      </Footer>
    </Step2Container>
  );
};

export default Step3;
