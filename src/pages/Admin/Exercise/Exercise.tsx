"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Form,
  Popconfirm,
  message,
  notification,
} from "antd";
import { ContentCard, FilterArea } from "./Exercise.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import "react-quill/dist/quill.snow.css";
import AddExercise from "./AddExercise";
import { deleteExercise, getAllExercises, getExerciseDetail } from "@/services/exerciseAPI";
import { useOutletContext } from "react-router-dom";
import { getTopicCourse } from "@/services/topicAPI";
import { getListLessons } from "@/services/lessonAPI";
import { LessonItem } from "../Lesson/Lesson";

interface OutletCtx { selectedCourse: string | null }

const Exercise = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);
  const [creating, setCreating] = useState(false);
  const { selectedCourse } = useOutletContext<OutletCtx>();
  const [topics, setTopics] = useState<{ _id: string; title: string }[]>([]);
  const [lessons, setLessons] = useState<{ _id: string; title: string }[]>([]);

  const fetchTopics = useCallback(async () => {
    if (!selectedCourse) return setTopics([]);
    const res = await getTopicCourse(selectedCourse);
    setTopics(res.data.data || []);
  }, [selectedCourse]);

  const fetchLessons = useCallback(async () => {
    if (!topics.length) return setLessons([]);
    const res = await getListLessons(1, 100);
    const all: LessonItem[] = res.data.lessons || [];
    const topicIds = new Set(topics.map(t => t._id));
    setLessons(all.filter(l => topicIds.has(l.topic._id)));
  }, [topics]);

  useEffect(() => { fetchTopics(); }, [fetchTopics]);
  useEffect(() => { fetchLessons(); }, [fetchLessons]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllExercises();
      const list: any[] = res.data || [];
      const lessonIds = new Set(lessons.map(l => l._id));
      const filtered = list.filter(ex => ex.lesson && lessonIds.has(ex.lesson._id));
      setData(filtered);
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: "fetch-exercise-error",
          message: "Lỗi",
          description: error?.response?.data?.message || "Lỗi khi tải danh sách bài tập",
        });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  }, [lessons]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleRowClick = async (record: any) => {
    setLoading(true);
    try {
      const res = await getExerciseDetail(record._id);
      form.setFieldsValue(res.data);
      setCreating(true);
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
          "Tải chi tiết thất bại"
      );
      // message.error("Tải chi tiết thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteExercise(id);
      message.success("Xóa thành công");
      fetchAll();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
          "Xóa thất bại"
      );
      // message.error("Xóa thất bại");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Định dạng câu hỏi",
      dataIndex: "question_format",
      key: "question_format",
    },
    { title: "Câu hỏi", dataIndex: "question", key: "question" },
    {
      title: "Đáp án đúng",
      dataIndex: "correct_answer",
      key: "correct_answer",
      render: (opts: any) => {
        if (!Array.isArray(opts)) return String(opts ?? "");
        return opts
          .map((o: any) => `${o.left} ↔ ${o.right}`)
          .join("; ");
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <div onClick={e => e.stopPropagation()}>
          <Popconfirm
            title="Bạn có chắc muốn xóa bài tập này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger size="small" onClick={e => e.stopPropagation()}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    const lower = searchText.toLowerCase();
    return data.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(lower)
      )
    );
  }, [data, searchText]);

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {creating ? (
        <AddExercise onBack={() => { setCreating(false); fetchAll(); }} />
      ) : (
        <ContentCard style={{ flex: 2 }}>
          <FilterArea>
            <InputSearch
              placeholder="Tìm kiếm..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <CAddButton type="primary" onClick={() => setCreating(true)}>
              Thêm bài tập
            </CAddButton>
          </FilterArea>

          <CTable
            columns={columns}
            dataSource={filteredData.map(item => ({ ...item, key: item._id }))}
            rowKey="_id"
            loading={loading}
            onRow={record => ({
              onClick: () => handleRowClick(record),
            })}
            pagination={{
              pageSize: 8,
              showSizeChanger: false,
            }}
          />
        </ContentCard>
      )}
    </div>
  );
};

export default Exercise;
