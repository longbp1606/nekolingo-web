"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, InputNumber, Popconfirm, message, notification, Modal } from "antd";
import { createTopic, deleteTopic, getListTopics, getTopicDetail, updateTopic } from "@/services/topicAPI";
import { ContentCard, FilterArea } from "./Topic.styled";
import InputCourse from "@/components/InputCourse/InputCourse";
import CTable from "@/components/CustomedTable/CTable";
import CAddButton from "@/components/AddButton/AddButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export type TopicItem = {
  _id: string;
  title: string;
  order: number;
  description?: string;
  course: string;
};

const Topic = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();
  const [form] = Form.useForm();
  const hasErrorNotified = useRef(false);
  const [panelVisible, setPanelVisible] = useState(false);

  const fetchData = async (page = 1, take = 5, courseId?: string) => {
    setLoading(true);
    try {
      if (!courseId) {
        setData([]);
        setPagination(p => ({ ...p, total: 0 }));
        return;
      }
      const res = await getListTopics(page, take, courseId);
      setData(res.data?.data || []);
      setPagination(prev => ({ ...prev, total: res.data?.total || 0 }));
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: "fetch-grammar-error",
          message: "Error",
          description: error?.response?.data?.message || "Error fetching topics",
        });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  // Khi course thay đổi hoặc pageSize thay đổi
  useEffect(() => {
    setPagination(p => ({ ...p, current: 1 }));
    fetchData(1, pagination.pageSize, selectedCourse);
  }, [selectedCourse, pagination.pageSize]);

  // Khi pagination.current hoặc selectedCourse thay đổi
  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, selectedCourse);
  }, [pagination.current, pagination.pageSize, selectedCourse]);

  const handleRowClick = async (record: TopicItem) => {
    try {
      // Optionally fetch detail if you need more fields:
      const res = await getTopicDetail(record._id);
      const detail: TopicItem = res.data.data;
      setSelectedRecord(detail);
      form.setFieldsValue({
        title: detail.title,
        order: detail.order,
        description: detail.description,
      });
      setPanelVisible(true);
    } catch {
      message.error("Failed to load detail");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTopic(id); /* <-- gọi API xóa tương ứng */
      message.success("Deleted successfully");
      fetchData(pagination.current, pagination.pageSize, selectedCourse);
    } catch {
      message.error("Delete failed");
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (selectedRecord) {
        await updateTopic(selectedRecord._id, values);
        message.success("Updated successfully");
      } else {
        await createTopic({ ...values, course: selectedCourse });
        message.success("Created successfully");
      }
      setPanelVisible(false);
      setSelectedRecord(null);
      form.resetFields();
      await fetchData(pagination.current, pagination.pageSize, selectedCourse);
    } catch {
      message.error("Submit failed");
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Order", dataIndex: "order", key: "order" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div onClick={(e) => e.stopPropagation()}> {/* ✅ Chặn click toàn vùng actions */}
          <Popconfirm title="Delete this topic?" onConfirm={() => handleDelete(record._id)}>
            <Button danger size="small"
              onClick={(e) => e.stopPropagation()} // ✅ Ngăn click lan lên hàng
            >Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ContentCard style={{ flex: 2 }}>
        <FilterArea>
          <InputCourse
            onSelectCourse={(course) => {
              setSelectedCourse(course._id);
              setSelectedRecord(null);
            }}
          />
          <CAddButton
            type="primary"
            disabled={!selectedCourse}
            onClick={() => {
              setSelectedRecord(null);
              form.resetFields();
              setPanelVisible(true);
            }}
          >
            Add Topic
          </CAddButton>
        </FilterArea>

        <CTable
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={(pag: any) => setPagination(pag)}
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Edit Topic" : "Add Topic"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter title" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="order" label="Order" rules={[{ required: true, message: "Please enter order" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <ReactQuill theme="snow" style={{ height: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Topic;
