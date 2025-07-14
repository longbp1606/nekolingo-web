/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, FC, useRef } from "react";
import { Button, Card, Col, Collapse, notification, Input, Space, Select } from "antd";
import { BackButton, Container, EditorArea, ExerciseGrid, Header, LessonGrid, TypeGrid } from "./Exercise.styled";
import { getTopicsAll } from "@/services/topicAPI";
import { getLessonByTopic, getLessonDetail } from "@/services/lessonAPI";
import { createExercise } from "@/services/exerciseAPI";
import type { CreateExercise } from "@/services/exerciseAPI";

const { TextArea } = Input;

const ALLOWED_TYPES = [
  "vocabulary",
  "grammar",
  "listening",
  "reading",
  "speaking",
];
const ALLOWED_FORMATS = [
  "fill_in_blank",
  "match",
  "reorder",
  "image_select",
  "multiple_choice",
  "true_false",
];

const AddExercise: FC<{ onBack: () => void }> = ({ onBack }) => {
  const [topics, setTopics] = useState<Array<{ _id: string; title: string }>>([]);
  const hasErrorNotified = useRef(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [lessons, setLessons] = useState<Record<string, any[]>>({});
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  // selection flow
  const [step, setStep] = useState<'listExercises'|'chooseCategory'|'chooseFormat'|'editExercise'>('listExercises');
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [editorData, setEditorData] = useState<Partial<CreateExercise>>({});

  useEffect(() => { fetchTopic(); }, []);
  const fetchTopic = async () => {
    try {
      const res = await getTopicsAll();
      setTopics(res.data.data);
    } catch {
      if (!hasErrorNotified.current) {
        notification.error({ message: 'Error fetching topics' });
        hasErrorNotified.current = true;
      }
    }
  };

  const onTopicChange = async (keys: string[]) => {
    setOpenKeys(keys);
    const topicId = keys[keys.length - 1];
    if (topicId && !lessons[topicId]) {
      try {
        const res = await getLessonByTopic(topicId);
        setLessons(prev => ({ ...prev, [topicId]: res.data }));
      } catch {
        notification.error({ message: 'Error fetching lessons' });
      }
    }
  };

  const onLessonClick = async (lesson: any) => {
    setSelectedLesson(lesson);
    try {
      const res = await getLessonDetail(lesson._id);
      setExercises(res.data.exercises);
      setStep('listExercises');
    } catch {
      notification.error({ message: 'Error fetching exercises' });
    }
  };

  const startCreate = () => {
    setEditorData({ lesson: selectedLesson._id, options: ['', '', ''] });
    setSelectedFormat(null);
    setStep('chooseCategory');
  };

  const handleCategory = (cat: string) => {
    // setSelectedCategory(cat);
    setEditorData(prev => ({ ...prev, type: cat }));
    setStep('chooseFormat');
  };
  const handleFormat = (fmt: string) => {
    setSelectedFormat(fmt);
    setEditorData(prev => ({ ...prev, question_format: fmt }));
    setStep('editExercise');
  };

  const handleChange = (field: string, value: any) => {
    setEditorData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const opts = [...(editorData.options || [])];
    opts[index] = value;
    setEditorData(prev => ({ ...prev, options: opts }));
  };

  const handleDone = async () => {
    try {
      await createExercise(editorData as CreateExercise);
      notification.success({ message: 'Exercise created' });
      onLessonClick(selectedLesson);
    } catch {
      notification.error({ message: 'Error creating exercise' });
    }
  };

  const renderEditor = () => {
    return (
      <EditorArea>
        <Space direction="vertical" style={{ width: '100%' }}>
          <TextArea
            rows={2}
            placeholder="Question"
            value={editorData.question}
            onChange={e => handleChange('question', e.target.value)}
          />

          {(selectedFormat === 'multiple_choice' || selectedFormat === 'image_select') && (
            <>          
            { (editorData.options || []).map((opt, i) => (
              <Input
                key={i}
                placeholder={`Option ${i+1}`}
                value={opt}
                onChange={e => handleOptionChange(i, e.target.value)}
              />
            ))}

            <Input
              placeholder="Correct Answer"
              value={editorData.correct_answer}
              onChange={e => handleChange('correct_answer', e.target.value)}
            />
            </>
          )}

          {selectedFormat === 'true_false' && (
            <Select
              placeholder="Correct Answer"
              value={editorData.correct_answer}
              onChange={v => handleChange('correct_answer', v)}
              options={[{ value: 'true', label: 'True' }, { value: 'false', label: 'False' }]}
            />
          )}

          {selectedFormat === 'listening' && (
            <Input
              placeholder="Audio URL"
              value={editorData.audio_url}
              onChange={e => handleChange('audio_url', e.target.value)}
            />
          )}

          {/* Add more fields for match, reorder, fill_in_blank, etc. */}

          <Button type="primary" onClick={handleDone}>Done</Button>
        </Space>
      </EditorArea>
    );
  };

  return (
    <Container>
      <Header>
      <BackButton onClick={onBack}>Back</BackButton>
      <h2>Select Topic & Lesson</h2>
      </Header>
      
      <Collapse activeKey={openKeys} onChange={onTopicChange}>
        {topics.map(topic => (
          <Collapse.Panel header={topic.title} key={topic._id}>
            <LessonGrid>
              {(lessons[topic._id]||[]).map(les => (
                <Col span={6} key={les._id}>
                  <Card hoverable onClick={() => onLessonClick(les)}>{les.title}</Card>
                </Col>
              ))}
            </LessonGrid>
          </Collapse.Panel>
        ))}
      </Collapse>

      {selectedLesson && (
        <>  <h2>Exercises of {selectedLesson.title}</h2>
          {step === 'listExercises' && (
            <ExerciseGrid gutter={[16,16]}>
              <Col span={6}>
                <Card hoverable onClick={startCreate} style={{ textAlign: 'center' }}>
                  Create Exercise
                </Card>
              </Col>
              {exercises.map(ex => (
                <Col span={6} key={ex._id}>
                  <Card hoverable title={`${ex.type} - ${ex.question_format}`}>...</Card>
                </Col>
              ))}
            </ExerciseGrid>
          )}
          {step === 'chooseCategory' && (
            <TypeGrid>
              {ALLOWED_TYPES.map(t => (
                <Col span={6} key={t}>
                  <Card hoverable onClick={() => handleCategory(t)}>{t}</Card>
                </Col>
              ))}
            </TypeGrid>
          )}
          {step === 'chooseFormat' && (
            <TypeGrid>
              {ALLOWED_FORMATS.map(f => (
                <Col span={6} key={f}>
                  <Card hoverable onClick={() => handleFormat(f)}>{f}</Card>
                </Col>
              ))}
            </TypeGrid>
          )}
          {step === 'editExercise' && renderEditor()}
        </>
      )}
    </Container>
  );
};

export default AddExercise;