"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Form,
  Popconfirm,
  message,
  Modal,
  notification,
  Input,
} from "antd";
import {
  getListGrammars,
  getGrammarDetail,
  createGrammar,
  updateGrammar,
  deleteGrammar,
} from "@/services/grammarAPI";
import { ContentCard, FilterArea } from "./Grammar.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export type GrammarItem = {
  _id: string;
  name: string;
  description: string;
  condition: string;
};

type TableRecord = GrammarItem & { key: string };

const Grammar = () => {
  const [data, setData] = useState<GrammarItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<GrammarItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getListGrammars();
      const list: GrammarItem[] = res.data.data || [];
      setData(list);
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: "fetch-grammar-error",
          message: "Lỗi",
          description:
            error?.response?.data?.message || "Lỗi khi tải danh sách ngữ pháp",
        });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleRowClick = async (record: GrammarItem) => {
    setLoading(true);
    try {
      const res = await getGrammarDetail(record._id);
      const detail: GrammarItem = res.data.data;
      setSelectedRecord(detail);
      form.setFieldsValue({
        name: detail.name,
        condition: detail.condition,
        description: detail.description,
      });
      setPanelVisible(true);
    } catch {
      message.error("Tải chi tiết thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGrammar(id);
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
        await updateGrammar(selectedRecord._id, values);
        message.success("Cập nhật thành công");
      } else {
        await createGrammar(values);
        message.success("Tạo thành công");
      }
      setPanelVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      await fetchAll();
    } catch {
      message.error("Lỗi khi gửi dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Điều kiện", dataIndex: "condition", key: "condition" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: GrammarItem) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Bạn có chắc muốn xóa ngữ pháp này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              danger
              size="small"
              onClick={(e) => e.stopPropagation()}
            >
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
            Thêm ngữ pháp
          </CAddButton>
        </FilterArea>

        <CTable
          columns={columns}
          dataSource={tableData}
          rowKey="_id"
          loading={loading}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{
            pageSize: 8,
            showSizeChanger: false,
          }}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Chỉnh sửa ngữ pháp" : "Thêm ngữ pháp"}
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
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Điều kiện"
            rules={[{ required: true, message: "Vui lòng nhập điều kiện" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <ReactQuill theme="snow" style={{ height: "200px" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Grammar;
