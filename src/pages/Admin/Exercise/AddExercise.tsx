/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, FC, useRef } from "react";
import { Button, Card, Col, Collapse, notification, Input, Space, Select, Row, Upload } from "antd";
import { ActionButton, BackButton, Container, EditorArea, ExerciseArea, ExerciseGrid, Header, LessonGrid, NextButton, TypeGrid } from "./Exercise.styled";
import { getListCourses } from "@/services/courseAPI";
import { getTopicCourse } from "@/services/topicAPI";
import { getLessonByTopic, getLessonDetail } from "@/services/lessonAPI";
import { createExercise, updateExercise } from "@/services/exerciseAPI";
import type { CreateExercise } from "@/services/exerciseAPI";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { uploadImage } from "@/services/uploadAPI";

const ALLOWED_FORMATS = [
  "fill_in_blank",
  // "match",
  "reorder",
  "image_select",
  "multiple_choice",
  "true_false",
];

interface ImageOption { image: string; value: string; }

const AddExercise: FC<{ onBack: () => void }> = ({ onBack }) => {
  // Course and topic selection
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [topics, setTopics] = useState<Array<{ _id: string; title: string }>>([]);

  // Lesson and exercise states
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [lessons, setLessons] = useState<Record<string, any[]>>({});
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  // Editor states
  const hasErrorNotified = useRef(false);
  const [creatingExercise, setCreatingExercise] = useState(false);
  const [editorData, setEditorData] = useState<Partial<CreateExercise>>({});
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingExistingExercise, setIsEditingExistingExercise] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);

  const isReadyToNext = !!editorData.type && !!editorData.question_format;

  // Fetch all courses on mount
  useEffect(() => { fetchCourses(); }, []);
  const fetchCourses = async () => {
    try {
      const res = await getListCourses(1, 10);
      setCourses(res.data.courses || []);
    } catch {
      if (!hasErrorNotified.current) {
        notification.error({ message: 'Error fetching courses' });
        hasErrorNotified.current = true;
      }
    }
  };

  // When user selects a course, fetch topics
  const onCourseClick = async (course: any) => {
    setSelectedCourse(course);
    setTopics([]);
    setSelectedLesson(null);
    setExercises([]);
    try {
      const res = await getTopicCourse(course._id);
      setTopics(res.data.data);
    } catch {
      notification.error({ message: 'Error fetching topics' });
    }
  };

  // Handle topic collapse and fetch lessons by topic
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

  // When user selects a lesson, fetch exercises and use lesson's types
  const onLessonClick = async (lesson: any) => {
    setSelectedLesson(lesson);
    try {
      const res = await getLessonDetail(lesson._id);
      setExercises(res.data.exercises);
    } catch {
      notification.error({ message: 'Error fetching exercises' });
    }
  };

  // Initialize creating new exercise
  const startCreate = () => {
    const defaultOptions = editorData.question_format === 'image_select'
      ? [{ image: '', value: '' }] as ImageOption[]
      : [{ value: '' }];
    setEditorData({
      lesson: selectedLesson._id,
      options: defaultOptions,
      type: undefined,
      question_format: undefined,
    });
    setCreatingExercise(true);
  };

  // Reset editor
  const resetEditor = () => {
    setEditorData({});
    setIsEditingContent(false);
    setCreatingExercise(false);
    setIsEditingExistingExercise(false);
    setEditingExerciseId(null);
  };

  const handleBack = () => {
    if (isEditingContent) {
      setIsEditingContent(false);
    } else {
      setCreatingExercise(false);
    }
  };

  // Derive type options from the selected lesson's type array
  const typeOptions: string[] = selectedLesson?.type?.length > 0
    ? selectedLesson.type
    : ["vocabulary", "grammar", "listening", "reading", "speaking"];

  // Handle editor data changes
  const handleChange = (field: string, value: any) => setEditorData(prev => ({ ...prev, [field]: value }));

  const handleAddOption = () => {
    const opts = editorData.options as any[] || [];
    const newOpt = editorData.question_format === 'image_select' ? { image: '', value: '' } : '';
    setEditorData(prev => ({ ...prev, options: [...opts, newOpt] }));
  };

  const handleOptionChange = (index: number, key: string, value: string) => {
    const opts = [...(editorData.options as any[])];
    (opts[index] as any)[key] = value;
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
      resetEditor();
    } catch {
      notification.error({ message: isEditingExistingExercise ? "Error updating exercise" : "Error creating exercise" });
    }
  };

  // Edit existing exercise
  const onEditExercise = (exercise: any) => {
    // setEditorData({
    //   lesson: selectedLesson._id,
    //   type: exercise.type,
    //   question_format: exercise.question_format,
    //   question: exercise.question,
    //   options: exercise.options || [],
    //   correct_answer: exercise.correct_answer || "",
    //   audio_url: exercise.audio_url || "",
    // });
    setEditorData({ lesson: selectedLesson._id, ...exercise });
    setEditingExerciseId(exercise._id);
    setIsEditingExistingExercise(true);
    setIsEditingContent(true);
    setCreatingExercise(true);
  };

  // Render editor UI
  const renderEditor = () => (
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
            {typeOptions.map((t) => (
              <Col span={6} key={t}>
                <Card
                  hoverable
                  onClick={() => handleChange("type", t)}
                  style={{ backgroundColor: editorData.type === t ? "#e6f7ff" : undefined }}
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
                  style={{ backgroundColor: editorData.question_format === f ? "#e6f7ff" : undefined }}
                >
                  {f}
                </Card>
              </Col>
            ))}
          </TypeGrid>
        </Space>
      )}

{isEditingContent && (
        <Space direction="vertical" style={{ width: "100%", marginTop: 24 }}>
          <TextArea rows={2} placeholder="Enter your question" value={editorData.question} onChange={(e:any)=>handleChange('question',e.target.value)} />

          {editorData.question_format==='image_select' ? (
            <>
              { (editorData.options as ImageOption[]||[]).map((opt,i)=>(
                <Space key={i} align="start">
                  <Upload
  listType="picture-card"
  showUploadList={false}
  customRequest={async ({ file, onSuccess, onError }) => {
    const f = file as File;
    try {
      const { url } = await uploadImage({ image: f, folder: 'exercise-options' });
      handleOptionChange(i, 'image', url);
      onSuccess?.(null, f);
    } catch (e) {
      onError?.(e as Error);
    }
  }}
>
  {opt.image
    ? <img src={opt.image} alt="opt" style={{ width: 80 }} />
    : <PlusOutlined />
  }
</Upload>

                  <Input placeholder="Value" value={opt.value} onChange={e=>handleOptionChange(i,'value',e.target.value)} />
                </Space>
              ))}
              <Button onClick={handleAddOption}>+ Add Option</Button>
              <Select placeholder="Correct Answer (value)" value={editorData.correct_answer} onChange={v=>handleChange('correct_answer',v)} options={(editorData.options as ImageOption[]||[]).map(o=>({value:o.value,label:o.value}))} />
            </>
          ) : (
            // other formats
            <>
              {(editorData.question_format==='multiple_choice' || editorData.question_format==='fill_in_blank' || editorData.question_format==='reorder' || editorData.question_format==='true_false') && (
                <>
                  <Input placeholder="Correct Answer" value={editorData.correct_answer} onChange={e=>handleChange('correct_answer',e.target.value)} style={{border:'1px solid rgb(9,175,45)'}} />
                  {(editorData.options||[] as any[]).map((opt,i)=><Input key={i} placeholder={`Option ${i+1}`} value={opt as string} onChange={e=>handleOptionChange(i,'value',e.target.value)} style={{border:'1px solid rgb(12,46,238)'}} />)}
                  <Button onClick={handleAddOption}>+ Add Option</Button>
                </>
              )}
              {editorData.question_format==='true_false' && <Select placeholder="Correct Answer" value={editorData.correct_answer} onChange={v=>handleChange('correct_answer',v)} options={[{value:'true',label:'True'},{value:'false',label:'False'}]} />}
              {editorData.question_format==='listening' && <Input placeholder="Audio URL" value={editorData.audio_url} onChange={e=>handleChange('audio_url',e.target.value)} />}
            </>
          )}
        </Space>
      )}
    </EditorArea>
  );

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>Back</BackButton>
        <h2>Select Course</h2>
      </Header>
      <Row gutter={[16, 16]}>
        {courses.map(c => (
          <Col span={6} key={c._id}>
            <Card hoverable onClick={() => onCourseClick(c)}>
              {c.title}
            </Card>
          </Col>
        ))}
      </Row>

      {selectedCourse && (
        <>
          <Header style={{ marginTop: 24 }}>
            <BackButton onClick={() => setSelectedCourse(null)}>Back</BackButton>
            <h2>Topics of {selectedCourse.title}</h2>
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
        </>
      )}

      {selectedLesson && (
        <ExerciseArea>
          <h2>Exercises of {selectedLesson.title}</h2>
          {creatingExercise ? renderEditor() : (
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
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {ex.question || "(no question)"}
                    </div>
                  </Card>
                </Col>
              ))}
            </ExerciseGrid>
          )}
        </ExerciseArea>
      )}
    </Container>
  );
};

export default AddExercise;
