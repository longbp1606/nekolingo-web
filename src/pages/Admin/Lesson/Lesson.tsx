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
import { getTopicsAll } from "@/services/topicAPI";
import { createLesson, deleteLesson, getLessonDetail, getListLessons, updateLesson } from "@/services/lessonAPI";

const Lesson = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);
  const [topicOptions, setTopicOptions] = useState<{ label: string; value: string }[]>([]);

  const fetchOptions = useCallback(async () => {
    try {
      const res = await getTopicsAll();
      setTopicOptions(res.data.languages.map((item: any) => // Dạng 2
      ({
        label: item.description,
        value: item.code,
      })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getListLessons(pagination.current || 1, pagination.pageSize || 10);
      const list: any[] = res.data.lessons || [];
      setData(list);
      setPagination((p) => ({ ...p, total: list.length }));
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: "fetch-grammar-error",
          message: "Error",
          description: error?.response?.data?.message || "Error fetching lessons",
        });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
    fetchAll();
  }, [fetchOptions]);

  const handleRowClick = async (record: any) => {
    setLoading(true);
    try {
      // Optionally fetch detail if you need more fields:
      const res = await getLessonDetail(record.id);
      setSelectedRecord(res.data);
      form.setFieldsValue(res.data);
      setPanelVisible(true);
    } catch {
      message.error("Failed to load detail");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteLesson(id);
      message.success("Deleted successfully");
      await fetchAll();
    } catch {
      message.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      if (selectedRecord) {
        await updateLesson(selectedRecord.id, values);
        message.success("Updated successfully");
      } else {
        await createLesson(values);
        message.success("Created successfully");
      }
      setPanelVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      await fetchAll();
    } catch {
      message.error("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Topic", dataIndex: "topic", key: "topic.title" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Delete this grammar?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger size="small">
            Delete
          </Button>
        </Popconfirm>
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

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ContentCard style={{ flex: 2 }}>
        <FilterArea>
          <InputSearch
            placeholder="Search..."
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
            Add Lesson
          </CAddButton>
        </FilterArea>

        <CTable
          columns={columns}
          dataSource={filteredData.map((item) => ({ ...item, key: item.id }))}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={(pag) => setPagination(pag)}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Edit Lesson" : "Add Lesson"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <ReactQuill theme="snow" style={{ height: '100%' }} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please choose from language" }]}
            style={{ width: "100%" }}
          >
            <Select
              style={{
                width: "100%",
                height: 32,
                borderRadius: 12,
              }}
              options={[
                { value: "vocabulary", label: "Vocabulary" },
                { value: "grammar", label: "Grammar" },
                { value: "listening", label: "Listening" },
                { value: "speaking", label: "Speaking" },
                { value: "reading", label: "Reading" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="topic"
            label="Topic"
            rules={[{ required: true, message: "Please choose to topic" }]}
            style={{ width: "100%" }}
          >
            <Select
              style={{
                width: "100%",
                height: 32,
                borderRadius: 12,
              }}
              options={[topicOptions]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Lesson;
