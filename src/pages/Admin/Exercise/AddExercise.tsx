"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, FC } from "react";
import styled from "styled-components";
import { Button, Card } from "antd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const LessonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
`;

const TypeGrid = styled(LessonGrid)`
  background: #ffffff;
  padding: 16px;
  border-radius: 8px;
`;

const SlideList = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const SlideItem = styled.div<{ active?: boolean }>`
  flex: 1;
  padding: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  border: ${props => (props.active ? '2px solid #1890ff' : 'none')};
`;

const EditorArea = styled.div`
  flex: 1;
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

// Hard-coded lessons and types
const MOCK_LESSONS = ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"];
const QUESTION_TYPES = [
  { key: 'select_image', label: 'Select Image' },
  { key: 'multiple_choice', label: 'Multiple Choice' },
  { key: 'match_pairs', label: 'Match Pairs' },
  { key: 'sort_sentence', label: 'Sort Sentence' },
  { key: 'listening', label: 'Listening' },
  { key: 'complete_sentences', label: 'Complete Sentences' }
];

const AddExercise: FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState<'selectLesson'|'editSlides'>('selectLesson');
//   const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [slides, setSlides] = useState<Array<{ type: string; data: any }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // fetch lessons if needed
  }, []);

  const startEditing = (lesson: string) => {
    // setSelectedLesson(lesson);
    setStep('editSlides');
    setSlides([]);
    console.log(lesson);
    
  };

  const addSlide = (type: string) => {
    const newSlide = { type, data: {} };
    setSlides(prev => [...prev, newSlide]);
    setCurrentIndex(slides.length);
  };

//   const updateSlideData = (index: number, data: any) => {
//     setSlides(prev => {
//       const copy = [...prev];
//       copy[index].data = data;
//       return copy;
//     });
//   };

  if (step === 'selectLesson') {
    return (
      <Container>
        <h2>Select Lesson</h2>
        <LessonGrid>
          {MOCK_LESSONS.map(les => (
            <Card key={les} hoverable onClick={() => startEditing(les)}>
              {les}
            </Card>
          ))}
        </LessonGrid>
      </Container>
    );
  }

  // Editor view
  const currentSlide = slides[currentIndex];
  return (
    <Container>
      <Button onClick={onBack}>Back</Button>
      <EditorArea>
        {currentSlide ? (
          <div>
            <h3>{QUESTION_TYPES.find(t => t.key === currentSlide.type)?.label}</h3>
            {/* render question content here based on type and data */}
          </div>
        ) : (
          <TypeGrid>
            {QUESTION_TYPES.map(t => (
              <Card key={t.key} onClick={() => addSlide(t.key)} hoverable>
                {t.label}
              </Card>
            ))}
          </TypeGrid>
        )}
      </EditorArea>

      <SlideList>
        {slides.map((slide, idx) => (
          <SlideItem
            key={idx}
            active={idx === currentIndex}
            onClick={() => setCurrentIndex(idx)}
          >
            {idx + 1}. {QUESTION_TYPES.find(t => t.key === slide.type)?.label}
          </SlideItem>
        ))}
        <Button type="dashed" onClick={() => setCurrentIndex(slides.length)}>
          +
        </Button>
      </SlideList>

      <BottomControls>
        <Button>Review</Button>
        <Button type="primary">Done</Button>
      </BottomControls>
    </Container>
  );
};

export default AddExercise;
