/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, FC, useRef } from "react";
import { Button, Card, Col, Collapse, notification, Input, Space, Select } from "antd";
import { ActionButton, BackButton, Container, EditorArea, ExerciseArea, ExerciseGrid, Header, LessonGrid, NextButton, TypeGrid } from "./Exercise.styled";
import { getTopicsAll } from "@/services/topicAPI";
import { getLessonByTopic, getLessonDetail } from "@/services/lessonAPI";
import { createExercise } from "@/services/exerciseAPI";
import type { CreateExercise } from "@/services/exerciseAPI";
import { updateExercise } from "@/services/exerciseAPI";

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
  const [creatingExercise, setCreatingExercise] = useState(false);
  const [editorData, setEditorData] = useState<Partial<CreateExercise>>({});
  const isReadyToNext = editorData.type && editorData.question_format;
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingExistingExercise, setIsEditingExistingExercise] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);

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
      // setStep('listExercises');
    } catch {
      notification.error({ message: 'Error fetching exercises' });
    }
  };

  const startCreate = () => {
    setEditorData({
      lesson: selectedLesson._id,
      options: [''],
      type: undefined,
      question_format: undefined,
    });
    setCreatingExercise(true);
  };

  const handleBack = () => {
    if (isEditingContent) {
      setIsEditingContent(false); // Quay lại phần chọn type/format
    } else {
      setCreatingExercise(false); // Quay về danh sách
    }
  };


  const handleAddOption = () => {
    setEditorData(prev => ({
      ...prev,
      options: [...(prev.options || []), ''],
    }));
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
      if (isEditingExistingExercise && editingExerciseId) {
        await updateExercise(editingExerciseId, editorData as any);
        notification.success({ message: "Exercise updated" });
      } else {
        await createExercise(editorData as CreateExercise);
        notification.success({ message: "Exercise created" });
      }
      await onLessonClick(selectedLesson);
      resetEditor(); // reset về trạng thái ban đầu
    } catch {
      notification.error({ message: isEditingExistingExercise ? "Error updating exercise" : "Error creating exercise" });
    }
  };

  const onEditExercise = (exercise: any) => {
    setEditorData({
      lesson: selectedLesson._id,
      type: exercise.type,
      question_format: exercise.question_format,
      question: exercise.question,
      options: exercise.options || [],
      correct_answer: exercise.correct_answer || "",
      audio_url: exercise.audio_url || "",
    });
    setEditingExerciseId(exercise._id);
    setIsEditingExistingExercise(true);
    setIsEditingContent(true);
    setCreatingExercise(true);
  };

  const resetEditor = () => {
    setEditorData({});
    setIsEditingContent(false);
    setCreatingExercise(false);
    setIsEditingExistingExercise(false);
    setEditingExerciseId(null);
  };



  const renderEditor = () => {
    return (
      <EditorArea>
        <ActionButton>
          <BackButton onClick={handleBack}>Back</BackButton>
          {!isEditingContent && isReadyToNext && (
            <NextButton onClick={() => setIsEditingContent(true)}>
              Next
            </NextButton>
          )}
          {isEditingContent && (
            <NextButton type="primary" onClick={handleDone}>
              Done
            </NextButton>
          )}
        </ActionButton>

        {!isEditingContent && (
          <Space direction="vertical" style={{ width: "100%", marginTop: 24 }}>
            <h3>Choose Type:</h3>
            <TypeGrid>
              {ALLOWED_TYPES.map((t) => (
                <Col span={6} key={t}>
                  <Card
                    hoverable
                    onClick={() => handleChange("type", t)}
                    style={{
                      backgroundColor: editorData.type === t ? "#e6f7ff" : undefined,
                    }}
                  >
                    {t}
                  </Card>
                </Col>
              ))}
            </TypeGrid>

            <h3>Choose Format:</h3>
            <TypeGrid>
              {ALLOWED_FORMATS.map((f) => (
                <Col span={6} key={f}>
                  <Card
                    hoverable
                    onClick={() => handleChange("question_format", f)}
                    style={{
                      backgroundColor: editorData.question_format === f ? "#e6f7ff" : undefined,
                    }}
                  >
                    {f}
                  </Card>
                </Col>
              ))}
            </TypeGrid>
          </Space>
        )}

        {isEditingContent && (
          <Space direction="vertical" style={{ width: "100%", marginTop: 24}}>
            <TextArea
              rows={2}
              placeholder="Enter your question"
              value={editorData.question}
              onChange={(e) => handleChange("question", e.target.value)}
            />

            {(editorData.question_format === "multiple_choice" ||
              editorData.question_format === "image_select") && (
                <>
                  <Input
                    placeholder="Correct Answer"
                    value={editorData.correct_answer}
                    onChange={(e) => handleChange("correct_answer", e.target.value)}
                    style={{ border: '1px solid rgb(9, 175, 45)' }}
                  />

                  {(editorData.options || []).map((opt, i) => (
                    <Input
                      key={i}
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      style={{ border: '1px solid rgb(12, 46, 238)' }}
                    />
                  ))}
                  <Button onClick={handleAddOption}>+ Add Option</Button>


                </>
              )}

            {editorData.question_format === "true_false" && (
              <Select
                placeholder="Correct Answer"
                value={editorData.correct_answer}
                onChange={(v) => handleChange("correct_answer", v)}
                options={[
                  { value: "true", label: "True" },
                  { value: "false", label: "False" },
                ]}
              />
            )}

            {editorData.question_format === "listening" && (
              <Input
                placeholder="Audio URL"
                value={editorData.audio_url}
                onChange={(e) => handleChange("audio_url", e.target.value)}
              />
            )}
          </Space>
        )}
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
              {(lessons[topic._id] || []).map(les => (
                <Col span={6} key={les._id}>
                  <Card hoverable onClick={() => onLessonClick(les)}>{les.title}</Card>
                </Col>
              ))}
            </LessonGrid>
          </Collapse.Panel>
        ))}
      </Collapse>

      {selectedLesson && (
        <ExerciseArea>
          <h2>Exercises of {selectedLesson.title}</h2>

          {creatingExercise
            ? renderEditor()
            : (
              <ExerciseGrid gutter={[16, 16]}>
                <Col span={6}>
                  <Card hoverable onClick={startCreate} style={{ textAlign: 'center' }}>
                    ➕ Create Exercise
                  </Card>
                </Col>
                {exercises.map((ex) => (
                  <Col span={6} key={ex._id}>
                    <Card
                      hoverable
                      onClick={() => onEditExercise(ex)}
                      title={<b>{ex.type} - {ex.question_format}</b>}
                      size="small"
                    >
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {ex.question || "(no question)"}
                      </div>
                    </Card>
                  </Col>
                ))}
              </ExerciseGrid>
            )
          }
        </ExerciseArea>
      )}

    </Container>
  );
};

export default AddExercise;