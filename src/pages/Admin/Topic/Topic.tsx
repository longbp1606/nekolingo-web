"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Popconfirm, message, notification, Modal } from "antd";
import { createTopic, deleteTopic, getListTopics, updateTopic } from "@/services/topicAPI";
import { ContentCard, FilterArea } from "./Topic.styled";
import InputCourse from "@/components/InputCourse/InputCourse";
import CTable from "@/components/CustomedTable/CTable";
import CAddButton from "@/components/AddButton/AddButton";

const Topic = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  // const [panelVisible, setPanelVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

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
      notification.error({
        message: "Error",
        description: error?.response?.data?.message || "Error fetching topics",
        placement: "topRight",
      });
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

  const handleRowClick = (record: any) => {
    setSelectedRecord(record);
    form.setFieldsValue(record);
    setModalVisible(true);
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

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedRecord) {
        await updateTopic(selectedRecord.id, values);
        message.success("Updated successfully");
      } else {
        await createTopic({ ...values, course: selectedCourse });
        message.success("Created successfully");
      }
      setModalVisible(false);
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

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedRecord(null);
    form.resetFields();
  };

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ContentCard style={{ flex: 2 }}>
        <FilterArea>
          <InputCourse
            onSelectCourse={(course) => {
              setSelectedCourse(course._id);
              setSelectedRecord(null);
              // setPanelVisible(false);
            }}
          />
          <CAddButton
            type="primary"
            disabled={!selectedCourse}
            onClick={() => {
              setSelectedRecord(null);
              form.resetFields();
              // setPanelVisible(true);
              setModalVisible(true);
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

      {/* {panelVisible && (
        <div style={{ flex: 1, padding: 16, border: '1px solid #f0f0f0', borderRadius: 4 }}>
          <h3>{selectedRecord ? 'Edit Topic' : 'Add Topic'}</h3>
          <Button type="text" onClick={() => setPanelVisible(false)} style={{ position: 'absolute', right: 16, top: 16 }}>Close</Button>
          <Form layout="vertical" form={form} onFinish={handleFormSubmit} style={{ marginTop: 32 }}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="order" label="Order" rules={[{ required: true }]}><InputNumber style={{ width: "100%" }} /></Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
            <Space style={{ marginTop: 24 }}>
              <Button onClick={() => setPanelVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save</Button>
            </Space>
          </Form>
        </div>
      )} */}
      <Modal
        title={selectedRecord ? "Edit Topic" : "Add Topic"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
        confirmLoading={loading}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="order" label="Order" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Topic;
