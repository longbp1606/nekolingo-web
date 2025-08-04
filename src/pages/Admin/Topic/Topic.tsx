"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, Input, InputNumber, Popconfirm, message, notification, Modal, TablePaginationConfig } from "antd";
import { createTopic, deleteTopic, getListTopics, getTopicDetail, updateTopic } from "@/services/topicAPI";
import { ContentCard, FilterArea } from "./Topic.styled";
import CTable from "@/components/CustomedTable/CTable";
import CAddButton from "@/components/AddButton/AddButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useOutletContext } from "react-router-dom";
import InputSearch from "@/components/InputSearch/InputSearch";

export type TopicItem = {
  _id: string;
  title: string;
  order: number;
  description?: string;
  course: string;
};
type TableRecord = TopicItem & { key: string };

interface OutletCtx { selectedCourse: string | null }

const Topic: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });  
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [form] = Form.useForm();
  const hasErrorNotified = useRef(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const { selectedCourse } = useOutletContext<OutletCtx>();
  const [searchText, setSearchText] = useState("");

  const fetchData = async (page = 1, take = 5, courseId?: string) => {
    setLoading(true);
    try {
      if (!courseId) {
        setData([]);
        setPagination(p => ({ ...p, total: 0 }));
        return;
      }
      const res = await getListTopics(page, take, courseId);
      const { totalRecord } = res.data.pagination;

      setData(res.data?.data || []);
      setPagination({
        current: page,
        pageSize: take,
        total: totalRecord,
      });
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: "fetch-grammar-error",
          message: "Lỗi",
          description: error?.response?.data?.message || "Lỗi khi tải danh sách chủ đề",
        });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current as number, pagination.pageSize as number, selectedCourse ?? undefined);
  }, [pagination.current, pagination.pageSize, selectedCourse]);

  const handleTableChange = (pag: TablePaginationConfig) => {
    fetchData(pag.current as number, pag.pageSize as number);
  };

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
    } catch (error: any) {
      message.error(
            error?.response?.data?.message ||
            "Không tải được chi tiết chủ đề"
          );
      // message.error("Không tải được chi tiết chủ đề");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTopic(id); 
      message.success("Xóa thành công");
      fetchData(pagination.current, pagination.pageSize, selectedCourse ?? undefined);
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Xóa thất bại"
      );
      message.error("Xóa thất bại");
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (selectedRecord) {
        await updateTopic(selectedRecord._id, values);
        message.success("Cập nhật thành công");
      } else {
        await createTopic({ ...values, course: selectedCourse });
        message.success("Tạo chủ đề mới thành công");
      }
      setPanelVisible(false);
      setSelectedRecord(null);
      form.resetFields();
      await fetchData(pagination.current, pagination.pageSize, selectedCourse ?? undefined);
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Lưu thất bại"
      );
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    { title: "Thứ tự", dataIndex: "order", key: "order" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <div onClick={(e) => e.stopPropagation()}> {/* ✅ Chặn click toàn vùng actions */}
          <Popconfirm title="Bạn có chắc muốn xóa phần này?" onConfirm={() => handleDelete(record._id)}>
            <Button danger size="small"
              onClick={(e) => e.stopPropagation()} // ✅ Ngăn click lan lên hàng
            >Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

    const filteredData = useMemo(() => {
      if (!searchText) return data;
      const lower = searchText.toLowerCase();
      return data.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(lower)
        )
      );
    }, [data, searchText]);
  
    const tableData: TableRecord[] = filteredData.map((item) => ({
      ...item,
      key: item._id,
    }));

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ContentCard style={{ flex: 2 }}>
        <FilterArea>
          <InputSearch
                      placeholder="Tìm kiếm chủ đề..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
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
            Thêm chủ đề
          </CAddButton>
        </FilterArea>

        <CTable
          columns={columns}
          dataSource={tableData}
          rowKey="_id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Chỉnh sửa phần" : "Thêm phần mới"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: "Please enter title" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="order" label="Thứ tự" rules={[{ required: true, message: "Please enter order" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <ReactQuill theme="snow" style={{ height: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Topic;
