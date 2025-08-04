"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  message,
  Modal,
  notification,
  Select,
} from "antd";
import type { TablePaginationConfig } from "antd";
import { ContentCard, FilterArea } from "./Lesson.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import ReactQuill from "react-quill";
import { getTopicCourse, getTopicsAll } from "@/services/topicAPI";
import { createLesson, deleteLesson, getLessonDetail, getListLessons, updateLesson } from "@/services/lessonAPI";
import { useOutletContext } from "react-router-dom";
type TableRecord = LessonItem & { key: string };

export type LessonItem = {
  _id: string;
  title: string;
  order: number;
  xp_reward: number;
  mode: "normal" | "test";
  description?: string;
  type: ("vocabulary" | "grammar" | "listening" | "reading" | "speaking")[];
  topic: {
    _id: string;
    title: string;
  };
};

interface OutletCtx { selectedCourse: string | null }

const Lesson = () => {
  const [data, setData] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<LessonItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);
  const [topicOptions, setTopicOptions] = useState<{ label: string; value: string }[]>([]);
  const { selectedCourse } = useOutletContext<OutletCtx>();
  const [topics, setTopics] = useState<{ _id: string; title: string }[]>([]);  

  const fetchTopics = useCallback(async () => {
    if (!selectedCourse) { setTopics([]); return; }
    try {
      const res = await getTopicCourse(selectedCourse);
      setTopics(res.data.data || []);
      fetchAll(1, pagination.pageSize as number);
    } catch {
      notification.error({ message: "Lỗi khi tải chủ đề" });
      setTopics([]);
    }
  }, [selectedCourse]);


  const fetchOptions = useCallback(async () => {
    try {
      const res = await getTopicsAll();
      setTopicOptions(
        res.data.data.map((item: any) => ({
          label: item.title,
          value: item._id,
        }))
      );
    } catch (error) {
      console.error("Lỗi khi tải tùy chọn chủ đề:", error);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
    fetchOptions();
  }, [fetchTopics, fetchOptions]);

  const fetchAll = async (page = 1, take = 10) => {
    setLoading(true);
    try {
      const res = await getListLessons(page, take);
      const list: LessonItem[] = res.data.lessons || [];
      const { totalRecord } = res.data.pagination;
      const topicIds = topics.map((t) => t._id);
      const filtered = list.filter((lesson) => topicIds.includes(lesson.topic._id));
      setData(filtered);
      setPagination({
        current: page,
        pageSize: take,
        total: totalRecord,
      });       
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({ key: "fetch-lesson-error", message: "Error", description: error?.response?.data?.message || "Error fetching lessons" });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (topics.length > 0) {
      fetchAll(pagination.current as number, pagination.pageSize as number);
    }  }, [topics]);

   const handleTableChange = (pag: TablePaginationConfig) => {
      fetchAll(pag.current as number, pag.pageSize as number);
    };

  const handleRowClick = async (record: LessonItem) => {
    setLoading(true);
    try {
      await fetchOptions(); // 👈 đảm bảo có options
      const res = await getLessonDetail(record._id);
      const detail: LessonItem = res.data;
  
      setSelectedRecord(detail);
      form.setFieldsValue({
        title: detail.title,
        description: detail.description,
        topic: detail.topic._id,
        type: Array.isArray(detail.type) ? detail.type : [detail.type],
        order: Number(detail.order),
        xp_reward: Number(detail.xp_reward),
        mode: detail.mode,
      });
  
      setPanelVisible(true);
    } catch {
      notification.error({ message: "Tải chi tiết thất bại" });
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteLesson(id);
      message.success("Xóa thành công");
      await fetchAll();
    } catch {
      message.error("Xóa thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      if (selectedRecord) {
        await updateLesson(selectedRecord._id, values);
        message.success("Cập nhật thành công");
      } else {
        await createLesson(values);
        message.success("Tạo mới thành công");
      }
      setPanelVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      await fetchAll();
    } catch {
      message.error("Gửi dữ liệu thất bại");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Loại", dataIndex: "type", key: "type" },
    { title: "Chủ đề", dataIndex: "topic", key: "topic.title" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <div onClick={(e) => e.stopPropagation()}> {/* ✅ Chặn click toàn vùng actions */}
          <Popconfirm
            title="Bạn có chắc muốn xóa bài học này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger size="small"
              onClick={(e) => e.stopPropagation()} // ✅ Ngăn click lan lên hàng
            >
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Lọc dữ liệu: tìm trên tất cả các cột (stringify mọi giá trị)
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    const lower = searchText.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(lower)
      )
    );
  }, [data, searchText]);

  const tableData: TableRecord[] = filteredData.map(item => ({
    ...item,          // _id, name, condition, description
    key: item._id,    // AntD cần field `key`
  }));

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ContentCard style={{ flex: 2 }}>
        <FilterArea>
          <InputSearch
            placeholder="Tìm kiếm..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <CAddButton
            type="primary"
            onClick={() => {
              setSelectedRecord(null);
              form.resetFields();
              setPanelVisible(true);
            }}
          >
            Thêm bài học
          </CAddButton>
        </FilterArea>

        <CTable
          columns={columns}
          dataSource={tableData}
          rowKey="_id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Chỉnh sửa bài học" : "Thêm bài học"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <ReactQuill theme="snow" style={{ height: '100%' }} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại"
            rules={[{ required: true, message: "Vui lòng chọn ít nhất một loại" }]}
            style={{ width: "100%" }}
          >
            <Select
              style={{
                width: "100%",
                height: 32,
                borderRadius: 12,
              }}
              mode="multiple"
              options={[
                { value: "vocabulary", label: "Từ vựng" },
                { value: "grammar", label: "Ngữ pháp" },
                { value: "listening", label: "Nghe" },
                { value: "speaking", label: "Nói" },
                { value: "reading", label: "Đọc" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="topic"
            label="Chủ đề"
            rules={[{ required: true, message: "Vui lòng chọn chủ đề" }]}
            style={{ width: "100%" }}
          >
            <Select
              style={{
                width: "100%",
                height: 32,
                borderRadius: 12,
              }}
              options={topicOptions}
            />
          </Form.Item>
          <Form.Item
            name="order"
            label="Thứ tự"
            normalize={(value) => Number(value)}

            rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="xp_reward"
            label="Phần thưởng XP"
            normalize={(value) => Number(value)}
            rules={[{ required: true, message: "Vui lòng nhập XP thưởng" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="mode"
            label="Chế độ"
            rules={[{ required: true, message: "Vui lòng chọn chế độ" }]}
          >
            <Select
              options={[
                { label: "Normal", value: "Bình thường" },
                { label: "Test", value: "Kiểm tra" },
              ]}
            />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default Lesson;
