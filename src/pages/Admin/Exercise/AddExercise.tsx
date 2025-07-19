/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, FC, useRef, useCallback } from "react";
import { Button, Card, Col, Collapse, notification, Input, Space, Select, Upload } from "antd";
import { ActionButton, BackButton, Container, EditorArea, ExerciseArea, ExerciseGrid, Header, LessonGrid, NextButton, TypeGrid } from "./Exercise.styled";
import { getTopicCourse } from "@/services/topicAPI";
import { getLessonByTopic, getLessonDetail } from "@/services/lessonAPI";
import { createExercise, updateExercise } from "@/services/exerciseAPI";
import type { CreateExercise } from "@/services/exerciseAPI";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { uploadImage } from "@/services/uploadAPI";
import { useOutletContext } from "react-router-dom";

const ALLOWED_FORMATS = [
  "fill_in_blank",
  "match",
  "reorder",
  "image_select",
  "multiple_choice",
  "listening"
];

interface ImageOption { image: string; value: string; }
interface OutletCtx { selectedCourse: string | null }

interface MatchOption {
  id: string;
  left: string;
  right: string;
}

interface ImageSelectOption {
  image: string;
  value: string;
}
type TextOption = string; // cho fill_in_blank, reorder, multiple_choice
type ExerciseOptions = MatchOption[] | ImageSelectOption[] | TextOption[];
interface EditorData extends Omit<Partial<CreateExercise>, 'options'> {
  options?: ExerciseOptions;
}

const AddExercise: FC<{ onBack: () => void }> = ({ onBack }) => {
  const [topics, setTopics] = useState<Array<{ _id: string; title: string }>>([]);

  // Lesson and exercise states
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [lessons, setLessons] = useState<Record<string, any[]>>({});
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  // Editor states
  const hasErrorNotified = useRef(false);
  const [creatingExercise, setCreatingExercise] = useState(false);
  const [editorData, setEditorData] = useState<EditorData>({});
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingExistingExercise, setIsEditingExistingExercise] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);

  const isReadyToNext = !!editorData.type && !!editorData.question_format;
  const { selectedCourse } = useOutletContext<OutletCtx>();

  const fetchTopics = useCallback(async () => {
    if (!selectedCourse) {
      setTopics([]);
      return;
    }
    try {
      const res = await getTopicCourse(selectedCourse);
      setTopics(res.data.data || []);
    } catch {
      if (!hasErrorNotified.current) {
        notification.error({ message: 'Error fetching topics' });
        hasErrorNotified.current = true;
      }
      setTopics([]);
    }
  }, [selectedCourse]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);


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
    let defaultOptions: ExerciseOptions;
    if (editorData.question_format === 'image_select') {
      defaultOptions = [{ image: '', value: '' }];
    } else if (editorData.question_format === 'match') {
      defaultOptions = [];
    } else {
      // tất cả formats text đều khởi tạo string[]
      defaultOptions = [''] as TextOption[];
    }
    // const defaultOptions: ExerciseOptions = editorData.question_format === 'image_select'
    //   ? [{ image: '', value: '' }] as ImageOption[]
    //   : [] as TextOption[];
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
    let newOpt: MatchOption | ImageSelectOption | TextOption;

    switch (editorData.question_format) {
      case 'match':
        newOpt = { id: crypto.randomUUID?.() || Date.now().toString(), left: '', right: '' };
        break;
      case 'image_select':
        newOpt = { image: '', value: '' };
        break;
      default:
        newOpt = '';
    }

    setEditorData(prev => ({
      ...prev,
      options: [...(prev.options || []), newOpt] as ExerciseOptions,
    }));
  };



  const handleOptionChange = (index: number, key: string, value: string) => {
    if (!editorData.options) return;

    const opts = [...editorData.options];

    switch (editorData.question_format) {
      case 'match':
        (opts as MatchOption[])[index] = { ...(opts as MatchOption[])[index], [key]: value };
        break;
      case 'image_select':
        (opts as ImageSelectOption[])[index] = { ...(opts as ImageSelectOption[])[index], [key]: value };
        break;
      default:
        (opts as TextOption[])[index] = value;
    }

    setEditorData(prev => ({
      ...prev,
      options: opts as ExerciseOptions, // Ensure type compatibility
    }));
  };


  const handleDone = async () => {
    try {
      const payload: any = { ...editorData };
      delete payload._id;
      delete payload.__v;
      delete payload.answer;
      delete payload.completed_at;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.isMistake;

      if (editorData.question_format === 'match') {
        payload.correct_answer = editorData.options;
      }


      if (isEditingExistingExercise && editingExerciseId) {
        await updateExercise(editingExerciseId, payload);
        notification.success({ message: "Exercise updated" });
      } else {
        await createExercise(payload as CreateExercise);
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
    let normalizedOptions: ExerciseOptions = [];
    switch (exercise.question_format) {
      case 'match':
        normalizedOptions = exercise.options || [];
        break;
      case 'image_select':
        normalizedOptions = exercise.options || [];
        break;
      default:
        // text formats => string[]
        normalizedOptions = (exercise.options || []).map((o: any) =>
          typeof o === 'string' ? o : o.value
        );
    }
    setEditorData({
      lesson: selectedLesson._id,
      ...exercise,
      options: normalizedOptions,
    });
    // setEditorData({ lesson: selectedLesson._id, ...exercise });
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
                  onClick={() => {
                    handleChange('question_format', f);
                    if (f === 'match') {
                      setEditorData(prev => ({
                        ...prev,
                        options: [{
                          id: crypto.randomUUID?.() || Date.now().toString(),
                          left: '',
                          right: '',
                        }],
                      }));
                    } else {
                      // text formats => mảng chuỗi
                      setEditorData(prev => ({ ...prev, options: [''] as TextOption[] }));
                    }
                  }}

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
          <TextArea rows={2} placeholder="Enter your question" value={editorData.question} onChange={(e: any) => handleChange('question', e.target.value)} />
          {editorData.question_format === 'match' ? (
            <>
              {(editorData.options as MatchOption[])?.map((opt: any, i: number) => (
                <Space key={i} style={{ marginBottom: 8 }}>
                  <Input placeholder="Left" value={opt.left} onChange={e => handleOptionChange(i, 'left', e.target.value)} />
                  <Input placeholder="Right" value={opt.right} onChange={e => handleOptionChange(i, 'right', e.target.value)} />
                </Space>
              ))}
              <Button onClick={handleAddOption}>+ Add Pair</Button>
            </>
          ) : editorData.question_format === 'image_select' ? (
            <>
              {(editorData.options as ImageSelectOption[])?.map((opt, i) => (
                <Space key={i} align="start">
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    customRequest={async ({ file, onSuccess, onError }) => {
                      const f = file as File;
                      try {
                        const data = await uploadImage({ file: f, folder: 'profile-pictures' });
                        const url = data.url;
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

                  <Input placeholder="Value" value={opt.value} onChange={e => handleOptionChange(i, 'value', e.target.value)} />
                </Space>
              ))}
              <Button onClick={handleAddOption}>+ Add Option</Button>
              <Select placeholder="Correct Answer (value)" value={editorData.correct_answer} onChange={v => handleChange('correct_answer', v)} options={(editorData.options as ImageOption[] || []).map(o => ({ value: o.value, label: o.value }))} />
            </>
          ) : (
            <>
              {(editorData.question_format === 'multiple_choice' || editorData.question_format === 'fill_in_blank' || editorData.question_format === 'reorder') && (
                <>
                  <Input
                    placeholder="Correct Answer"
                    value={editorData.correct_answer ?? ''}
                    onChange={e => handleChange('correct_answer', e.target.value)}
                    style={{ border: '1px solid rgb(9,175,45)' }}
                  />
                  {(editorData.options as TextOption[] || []).map((opt, i) => (
                    <Input
                      key={i}
                      placeholder={`Option ${i + 1}`}
                      // opt luôn là string
                      value={opt}
                      onChange={e => handleOptionChange(i, '', e.target.value)}
                    />
                  ))}

                  <Button onClick={handleAddOption}>+ Add Option</Button>
                </>
              )}
              {editorData.question_format === 'listening' && (
                <>
                  <Input
                    placeholder="Correct Answer"
                    value={editorData.correct_answer ?? ''}
                    onChange={e => handleChange('correct_answer', e.target.value)}
                    style={{ border: '1px solid rgb(9,175,45)' }}
                  />
                  {(editorData.options || []).map((opt, i) => (
                    <Input
                      key={i}
                      placeholder={`Option ${i + 1}`}
                      value={(opt as any).value}
                      onChange={e => handleOptionChange(i, 'value', e.target.value)}
                      style={{ border: '1px solid rgb(12,46,238)' }}
                    />
                  ))}

                  <Button onClick={handleAddOption}>+ Add Option</Button>

                  <Space direction="vertical">
                    <Upload
                      accept="audio/*"
                      showUploadList={false}
                      customRequest={async ({ file, onSuccess, onError }) => {
                        try {
                          // nếu bạn đã có api riêng cho audio thì đổi thành uploadAudio()
                          const data = await uploadImage({ file: file as File, folder: 'exercise-audio' });
                          handleChange('audio_url', data.url);
                          onSuccess?.(null, file as File);
                        } catch (err) {
                          onError?.(err as Error);
                        }
                      }}
                    >
                      <Button icon={<PlusOutlined />}>Upload Audio</Button>
                    </Upload>
                    {/* nếu đã có audio_url thì hiển thị audio preview */}
                    {editorData.audio_url && (
                      <audio controls style={{ marginTop: 8, width: '100%' }} src={editorData.audio_url} />
                    )}
                  </Space>
                </>
              )}
            </>
          )}
        </Space>
      )}
    </EditorArea>
  );

  return (
    <Container>
      {selectedCourse && (
        <>
          <Header style={{ marginTop: 24 }}>
            <BackButton onClick={onBack}>Back</BackButton>
            <h2>List of topics</h2>
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
