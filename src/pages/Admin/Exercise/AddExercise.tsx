/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, FC, useRef, useCallback } from "react";
import { Button, Card, Col, notification, Input, Space, Select, Upload, Steps, Menu, Row, Popconfirm, message, Modal, Tag } from "antd";
import { BackButton, Container, ContentBody, ContentColumn, EditorArea, ExerciseArea, ExerciseGrid, Header, MidHeader, NextButton, TypeGrid } from "./Exercise.styled";
import { getTopicCourse } from "@/services/topicAPI";
import { getLessonByTopic, getLessonDetail } from "@/services/lessonAPI";
import { createExercise, deleteExercise, updateExercise } from "@/services/exerciseAPI";
import type { CreateExercise } from "@/services/exerciseAPI";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadImage } from "@/services/uploadAPI";
import { useOutletContext } from "react-router-dom";
import { getListVocabs } from "@/services/vocabularyAPI";
import { getListGrammars } from "@/services/grammarAPI";

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
  vocabulary?: string;
  grammar?: string;
}

const AddExercise: FC<{ onBack: () => void }> = ({ onBack }) => {
  const [topics, setTopics] = useState<Array<{ _id: string; title: string }>>([]);
  const [lessons, setLessons] = useState<Record<string, any[]>>({});
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const hasErrorNotified = useRef(false);
  const [creatingExercise, setCreatingExercise] = useState(false);
  const [editorData, setEditorData] = useState<EditorData>({});
  const [isEditingExistingExercise, setIsEditingExistingExercise] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);
  const { selectedCourse } = useOutletContext<OutletCtx>();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showExercise, setShowExercise] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"none" | "vocab" | "grammar">("none");
  const [vocabList, setVocabList] = useState<Array<{ _id: string; word: string }>>([]);
  const [grammarList, setGrammarList] = useState<Array<{ _id: string; condition: string }>>([]);
  const [selectedVocab, setSelectedVocab] = useState<{ id: string; name: string } | null>(null);
  const [selectedGrammar, setSelectedGrammar] = useState<{ id: string; name: string } | null>(null);

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
        notification.error({ message: 'Lỗi khi lấy chủ đề!' });
        hasErrorNotified.current = true;
      }
      setTopics([]);
    }
  }, [selectedCourse]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  useEffect(() => {
    if (modalType === "vocab") {
      getListVocabs(1, 100).then(res => setVocabList(res.data.data)).catch(() => { });
    }
    if (modalType === "grammar") {
      getListGrammars().then(r => setGrammarList(r.data.data)).catch(() => { });
    }
  }, [modalType]);


  // Handle topic collapse and fetch lessons by topic
  const onTopicChange = async (keys: string[]) => {
    // setOpenKeys(keys);
    const topicId = keys[keys.length - 1];
    if (topicId && !lessons[topicId]) {
      try {
        const res = await getLessonByTopic(topicId);
        setLessons(prev => ({ ...prev, [topicId]: res.data }));
      } catch {
        notification.error({ message: 'Lỗi khi lấy bài học!' });
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
      notification.error({ message: 'Lỗi khi lấy danh sách câu hỏi!' });
    }
  };

  const onCreateClick = () => {
    setModalType("none");
    setModalVisible(true);
  }

  // Initialize creating new exercise
  const startCreate = () => {
    setModalVisible(false);

    let defaultOptions: ExerciseOptions;
    if (editorData.question_format === 'image_select') {
      defaultOptions = [{ image: '', value: '' }];
    } else if (editorData.question_format === 'match') {
      defaultOptions = [];
    } else {
      defaultOptions = [''] as TextOption[];
    }

    setEditorData(prev => ({
      ...prev,
      lesson: selectedLesson._id,
      options: defaultOptions,
      type: undefined,
      question_format: undefined,
      vocabulary: prev.vocabulary, 
      grammar: prev.grammar,
    }));
    setCreatingExercise(true);
    setCurrentStep(1);
  };

  // Reset editor
  const resetEditor = () => {
    setEditorData({});
    setCurrentStep(currentStep - 1);
    setCreatingExercise(false);
    setIsEditingExistingExercise(false);
    setEditingExerciseId(null);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
    if (currentStep === 1) {
      setCreatingExercise(false);
      setIsEditingExistingExercise(false);
      setEditingExerciseId(null);
      setShowExercise(false);
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
      const keywordVocab = selectedVocab?.name ?? null;

      // Tập hợp nội dung để kiểm tra
      const haystack = [
        editorData.question,
        JSON.stringify(editorData.options),
        editorData.correct_answer
      ]
        .join(" ")
        .toLowerCase();
  
      // Nếu đã chọn vocab nhưng không dùng từ đó, báo lỗi
      if (keywordVocab && !haystack.includes(keywordVocab.toLowerCase())) {
        notification.warning({
          message: `Bạn chưa sử dụng từ "${keywordVocab}" trong câu hỏi, đáp án hoặc lựa chọn.`
        });
        return;
      }

      // ==== Bổ sung: với fill_in_blank, phải có option === correct_answer ====
    if (
      editorData.question_format === 'fill_in_blank' &&
      Array.isArray(editorData.options) &&
      !((editorData.options as string[]).includes(editorData.correct_answer as string))
    ) {
      notification.warning({
        message: 'Với định dạng Fill in Blank, bạn phải thêm lựa chọn trùng khớp với đáp án đúng.'
      });
      return;
    }
  
      // Xây dựng payload từ editorData + chỉ ID của vocab/grammar
      const payload: any = {
        ...editorData,
        // chỉ gán ID, không gán cả object
        vocabulary: selectedVocab?.id,
        grammar: selectedGrammar?.id,
      };

      // Với format 'match'
      if (payload.question_format === "match") {
        payload.correct_answer = payload.options;
      }

      // Xóa các field không cần thiết
      delete payload._id;
      delete payload.__v;
      delete payload.answer;
      delete payload.completed_at;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.isMistake;

      // Gửi lên API
      if (isEditingExistingExercise && editingExerciseId) {
        await updateExercise(editingExerciseId, payload);
        notification.success({ message: "Cập nhật bài tập thành công!" });
      } else {
        await createExercise(payload as CreateExercise);
        notification.success({ message: "Tạo bài tập thành công!" });
      }

      // Reload và reset
      await onLessonClick(selectedLesson);
      setSelectedVocab(null);
      setSelectedGrammar(null);
      resetEditor();

    } catch {
      notification.error({
        message: isEditingExistingExercise
          ? "Lỗi khi cập nhật!"
          : "Lỗi khi tạo!",
      });
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

    // 2. Nếu exercise.vocabulary tồn tại, setSelectedVocab
    if (exercise.vocabulary) {
      // exercise.vocabulary có thể là object {_id, word} hoặc string id
      if (typeof exercise.vocabulary === 'object') {
        setSelectedVocab({
          id: exercise.vocabulary._id,
          name: exercise.vocabulary.word,
        });
      } else {
        // fetch từ list vocabList nếu cần, hoặc chỉ set id 
        const found = vocabList.find(v => v._id === exercise.vocabulary);
        setSelectedVocab(found
          ? { id: found._id, name: found.word }
          : { id: exercise.vocabulary, name: exercise.vocabulary });
      }
    } else {
      setSelectedVocab(null);
    }

    // 3. Tương tự với grammar
    if (exercise.grammar) {
      if (typeof exercise.grammar === 'object') {
        setSelectedGrammar({
          id: exercise.grammar._id,
          name: exercise.grammar.name,
        });
      } else {
        const foundG = grammarList.find(g => g._id === exercise.grammar);
        setSelectedGrammar(foundG
          ? { id: foundG._id, name: foundG.condition }
          : { id: exercise.grammar, name: exercise.grammar });
      }
    } else {
      setSelectedGrammar(null);
    }

    // setEditorData({ lesson: selectedLesson._id, ...exercise });
    setEditingExerciseId(exercise._id);
    setIsEditingExistingExercise(true);
    // setIsEditingContent(true);
    setCreatingExercise(true);
    setCurrentStep(2);
  };

  const handleRemoveOption = (index: number) => {
    setEditorData(prev => {
      if (!prev.options) return prev;
      const opts = [...(prev.options as any[])];
      opts.splice(index, 1);
      return { ...prev, options: opts as ExerciseOptions };
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExercise(id);
      message.success("Xóa thành công");
      await onLessonClick(selectedLesson);
    } catch {
      message.error("Xóa thất bại");
    }
  };

  // render tags in header of editor
  const renderHeaderTags = () => (
    <Space size="middle" style={{ marginBottom: 16 }}>
      {selectedVocab && <Tag color="blue">Từ vựng: {selectedVocab.name}</Tag>}
      {selectedGrammar && <Tag color="purple">Ngữ pháp: {selectedGrammar.name}</Tag>}
    </Space>
  );

  // Render editor UI
  const renderEditor = () => (
    <EditorArea>
      <Header>
        <BackButton onClick={handleBack}>Quay lại</BackButton>
        <MidHeader>
        <h2><b>Câu hỏi của bài học {selectedLesson.title}</b></h2>
        {renderHeaderTags()}
        </MidHeader>
        {currentStep !== 2 && (
          <NextButton
            type="primary"
            disabled={!editorData.type || !editorData.question_format}
            onClick={() => setCurrentStep(2)} // NEXT TO STEP 3
          >
            Tiếp tục
          </NextButton>
        )}
        {/* {isEditingContent && ( */}
        {currentStep === 2 && (
          <NextButton type="primary" onClick={handleDone}>
            Hoàn thành
          </NextButton>
        )}
      </Header>

      {/* {!isEditingContent && ( */}
      {currentStep === 1 && (
        <Space direction="vertical" style={{ width: "100%", marginTop: 24 }}>
          <h3>Chọn loại:</h3>
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

          <h3>Chọn định dạng:</h3>
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

      {/* {isEditingContent && ( */}
      {currentStep === 2 && (
        <Space direction="vertical" style={{ width: "100%", marginTop: 24 }}>
          <TextArea rows={2} placeholder="Nhập câu hỏi của bạn" value={editorData.question} onChange={(e: any) => handleChange('question', e.target.value)} />
          {editorData.question_format === 'match' ? (
            <>
              {(editorData.options as MatchOption[])?.map((opt: any, i: number) => (
                <div key={i} style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
                  <Input placeholder="Bên trái" value={opt.left} onChange={e => handleOptionChange(i, 'left', e.target.value)} />
                  <Input placeholder="Bên phải" value={opt.right} onChange={e => handleOptionChange(i, 'right', e.target.value)} />
                  <CloseOutlined onClick={() => handleRemoveOption(i)} style={{ color: "red" }} />
                </div>
              ))}
              <Button onClick={handleAddOption}>+ Thêm cặp</Button>
            </>
          ) : editorData.question_format === 'image_select' ? (
            <>
              {(editorData.options as ImageSelectOption[])?.map((opt, i) => (
                <div key={i} style={{ marginBottom: 8, display: 'flex', gap: 8 }}>

                  {/* <Space key={i} align="start"> */}
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

                  <Input placeholder="Giá trị" value={opt.value} onChange={e => handleOptionChange(i, 'value', e.target.value)} />
                  <CloseOutlined onClick={() => handleRemoveOption(i)} style={{ color: "red" }} />
                </div>
              ))}
              <Button onClick={handleAddOption}>+ Add Option</Button>
              <Select placeholder="Đáp án đúng (value)" value={editorData.correct_answer} onChange={v => handleChange('correct_answer', v)} options={(editorData.options as ImageOption[] || []).map(o => ({ value: o.value, label: o.value }))} />
            </>
          ) : (
            <>
              {(editorData.question_format === 'multiple_choice' || editorData.question_format === 'fill_in_blank' || editorData.question_format === 'reorder') && (
                <>
                  <Input
                    placeholder="Đáp án đúng"
                    value={editorData.correct_answer ?? ''}
                    onChange={e => handleChange('correct_answer', e.target.value)}
                    style={{ border: '1px solid rgb(9,175,45)' }}
                  />
                  {(editorData.options as TextOption[] || []).map((opt, i) => (
                    <div key={i} style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
                      <Input
                        key={i}
                        placeholder={`Lựa chọn ${i + 1}`}
                        value={typeof opt === 'string' ? opt : ''}
                        onChange={e => handleOptionChange(i, '', e.target.value)}
                      />
                      <CloseOutlined onClick={() => handleRemoveOption(i)} style={{ color: "red" }} />

                    </div>
                  ))}

                  <Button onClick={handleAddOption}>+ Thêm lựa chọn</Button>
                </>
              )}
              {editorData.question_format === 'listening' && (
                <>
                  <Input
                    placeholder="Đáp án đúng"
                    value={editorData.correct_answer ?? ''}
                    onChange={e => handleChange('correct_answer', e.target.value)}
                    style={{ border: '1px solid rgb(9,175,45)' }}
                  />
                  {(editorData.options || []).map((opt, i) => (
                    <div key={i} style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
                      <Input
                        key={i}
                        placeholder={`Lựa chọn ${i + 1}`}
                        value={typeof opt === 'string' ? opt : ''}
                        onChange={e => handleOptionChange(i, 'value', e.target.value)}
                        style={{ border: '1px solid rgb(12,46,238)' }}
                      />
                      <CloseOutlined onClick={() => handleRemoveOption(i)} style={{ color: "red" }} />

                    </div>
                  ))}

                  <Button onClick={handleAddOption}>+ Thêm lựa chọn</Button>

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
                      <Button icon={<PlusOutlined />}>Tải lên âm thanh</Button>
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
      <Steps current={currentStep} style={{ marginBottom: 24 }}>
        <Steps.Step title="Chọn chủ đề & bài học" />
        <Steps.Step title="Chọn loại & định dạng" />
        <Steps.Step title="Nhập nội dung câu hỏi" />
      </Steps>

      {currentStep === 0 && selectedCourse && (
        <>

          <Header style={{ marginTop: 24 }}>
            <BackButton onClick={onBack}>Back</BackButton>
          </Header>
          <ContentBody>
            <ContentColumn>
              <h2>Danh sách chủ đề</h2>
              <Menu
                mode="inline"
                selectedKeys={[selectedTopic!]}
                onClick={({ key }) => { setSelectedTopic(key); onTopicChange([key]) }}
                items={topics.map(t => ({ key: t._id, label: t.title }))}
                style={{ width: "100%" }}
              />
            </ContentColumn>

            <ContentColumn>
              <h2>Danh sách bài học</h2>
              <Row gutter={[16, 16]}>
                {lessons[selectedTopic!]?.map(les => (
                  <Col key={les._id} span={24} style={{ height: "48px" }}>
                    <Card onClick={() => {
                      onLessonClick(les);
                      setCurrentStep(1); // NEXT TO STEP 2
                    }}>
                      {les.title}
                    </Card>
                  </Col>
                ))}
              </Row>
            </ContentColumn>
          </ContentBody>
        </>
      )}

      {selectedLesson && currentStep > 0 && (
        <ExerciseArea>
          {!showExercise && (
            <Header style={{ marginTop: 24 }}>
              <BackButton onClick={() => {
                handleBack();
                setShowExercise(false);   // reset lại
              }}>
                Back
              </BackButton>
              <h2>Câu hỏi của bài học {selectedLesson.title}</h2>
            </Header>
          )}
          {creatingExercise ? renderEditor() : (
            <ExerciseGrid gutter={[16, 16]}>
              <Col span={6}>
                <Card
                  hoverable
                  onClick={() => {
                    // startCreate();
                    onCreateClick();
                    setShowExercise(true);
                  }}
                  style={{ textAlign: 'center' }}
                >
                  ➕ Tạo mới câu hỏi
                </Card>
              </Col>
              {exercises.map((ex) => (
                <Col span={6} key={ex._id}>
                  <Card
                    hoverable
                    onClick={() => {
                      onEditExercise(ex);
                      setShowExercise(true);
                    }}
                    title={<b>{ex.type} - {ex.question_format}</b>}
                    size="small"
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ex.question || "(no question)"}
                      </div>

                      <div onClick={(e) => e.stopPropagation()}> {/* ✅ Chặn click toàn vùng actions */}

                        <Popconfirm
                          title="Bạn muốn xóa câu hỏi này?"
                          onConfirm={() => handleDelete(ex._id)}
                        >
                          <Button danger size="small"
                            onClick={(e) => e.stopPropagation()} // ✅ Ngăn click lan lên hàng
                          >
                            <DeleteOutlined style={{ color: "red" }} />
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </ExerciseGrid>
          )}
        </ExerciseArea>
      )}

      <Modal
        title="Chọn chế độ tạo"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={startCreate}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {["none", "vocab", "grammar"].map(t => (
            <Card
              key={t}
              hoverable
              style={{
                border: modalType === t ? "2px solid #1890ff" : "1px solid #ddd"
              }}
              onClick={() => setModalType(t as any)}
            >
              {t === "none" ? "None" : t === "vocab" ? "Vocabulary" : "Grammar"}
            </Card>
          ))}
        </div>
        {modalType === "vocab" && (
          <Select
            labelInValue
            placeholder="Chọn từ vựng"
            options={vocabList.map(v => ({ label: v.word, value: v._id }))}
            onChange={({ value, label }) => {
              setSelectedVocab({ id: value, name: label });
              setEditorData(prev => ({ ...prev, vocabulary: value }));
              setSelectedGrammar(null);
            }}
            style={{ width: "100%", marginTop: 16 }}
          />
        )}
        {modalType === "grammar" && (
          <Select
            labelInValue
            placeholder="Chọn ngữ pháp"
            options={grammarList.map(g => ({ label: g.condition, value: g._id }))}
            onChange={({ value, label }) => {
              setSelectedGrammar({ id: value, name: label });
              setEditorData(prev => ({ ...prev, grammar: value }));
              setSelectedVocab(null);
            }}
            style={{ width: '100%', marginTop: 16 }}
          />
        )}
      </Modal>

    </Container>
  );
};

export default AddExercise;
