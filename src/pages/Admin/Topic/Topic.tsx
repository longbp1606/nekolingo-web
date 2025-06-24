/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, InputNumber, Space, Popconfirm, message, Select } from "antd";
import axios from "axios";
import { getListTopics, updateTopic } from "@/services/topicAPI";
import { getListCourses } from "@/services/courseAPI";
import { ContentCard } from "./Topic.styled";

// const { Option } = Select;

const Topic = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();

  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>();

  // fetch courses
  const fetchCourses = async () => {
    try {
      const res = await getListCourses(1, 10);
      setCourses(res.data?.data || []);
    } catch {
      message.error("Failed to load courses");
    }
  };

  // fetch topics based on selectedCourse, page, take
  const fetchData = async (page = 1, take = 5, courseId?: string) => {
    if (!courseId) return;
    setLoading(true);
    try {
      const res = await getListTopics(page, take, courseId);
      setData(res.data?.data || []);
      setPagination((prev) => ({ ...prev, total: res.data?.total || 0 }));
    } catch {
      message.error("Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    // reset pagination when course changes
    setPagination((p) => ({ ...p, current: 1 }));
    fetchData(1, pagination.pageSize, selectedCourse);
  }, [selectedCourse]);

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, selectedCourse);
  }, [pagination.current, pagination.pageSize]);

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    setPanelVisible(false);
    setSelectedRecord(null);
    form.resetFields();
  };

  const handleRowClick = (record: any) => {
    setSelectedRecord(record);
    setPanelVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/topic/${id}`);
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
        await updateTopic(selectedRecord.id, values);
        message.success("Updated successfully");
      } else {
        await axios.post("/api/topic", { ...values, course: selectedCourse });
        message.success("Created successfully");
      }
      setPanelVisible(false);
      setSelectedRecord(null);
      form.resetFields();
      fetchData(pagination.current, pagination.pageSize, selectedCourse);
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
        <Popconfirm title="Delete this topic?" onConfirm={() => handleDelete(record.id)}>
          <Button danger size="small">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ContentCard style={{ flex: 2 }}>
        <Space style={{ marginBottom: 16 }}>
          <Select
            placeholder="Select Course"
            style={{ width: 240 }}
            value={selectedCourse}
            onChange={handleCourseChange}
            options={courses.map((c) => ({ label: c.title, value: c._id.$oid }))}
          />
          <Button
            type="primary"
            disabled={!selectedCourse}
            onClick={() => {
              setSelectedRecord(null);
              form.resetFields();
              setPanelVisible(true);
            }}
          >
            Add Topic
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={(pag: any) => setPagination(pag)}
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
        />
      </ContentCard>

      {panelVisible && (
        <div style={{ flex: 1, padding: 16, border: '1px solid #f0f0f0', borderRadius: 4 }}>
          <h3>{selectedRecord ? 'Edit Topic' : 'Add Topic'}</h3>
          <Button type="text" onClick={() => setPanelVisible(false)} style={{ position: 'absolute', right: 16, top: 16 }}>Close</Button>
          <Form layout="vertical" form={form} onFinish={handleFormSubmit} style={{ marginTop: 32 }}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}> <Input /> </Form.Item>
            <Form.Item name="order" label="Order" rules={[{ required: true }]}> <InputNumber style={{ width: "100%" }} /> </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}> <Input.TextArea rows={4} /> </Form.Item>
            <Space style={{ marginTop: 24 }}>
              <Button onClick={() => setPanelVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save</Button>
            </Space>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Topic;
