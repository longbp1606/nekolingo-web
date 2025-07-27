"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  message,
  Modal,
  notification,
} from "antd";
import {
  getListGrammars,
  getGrammarDetail,
  createGrammar,
  updateGrammar,
  deleteGrammar,
} from "@/services/grammarAPI";  // hãy chắc path đúng
import { ContentCard, FilterArea } from "./Grammar.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type TableRecord = GrammarItem & { key: string };

export type GrammarItem = {
  _id: string;
  name: string;
  description: string;
  condition: string;
};

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
          message: "Error",
          description: error?.response?.data?.message || "Error fetching grammars",
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
      // Optionally fetch detail if you need more fields:
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
      message.error("Failed to load detail");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    // setLoading(true);
    try {
      await deleteGrammar(id);
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
        await updateGrammar(selectedRecord._id, values);
        message.success("Updated successfully");
      } else {
        await createGrammar(values);
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
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Condition", dataIndex: "condition", key: "condition" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: GrammarItem) => (
        <div onClick={(e) => e.stopPropagation()}> {/* ✅ Chặn click toàn vùng actions */}
        <Popconfirm
          title="Delete this grammar?"
          onConfirm={() => handleDelete(record._id)}
        >
          <Button danger size="small"
                        onClick={(e) => e.stopPropagation()} // ✅ Ngăn click lan lên hàng
          >
            Delete
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
            Add Grammar
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
            pageSize: 8,       // mỗi trang 5 item
            showSizeChanger: false, // ẩn dropdown chọn số dòng/page (tuỳ chọn)
          }}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Edit Grammar" : "Add Grammar"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, message: "Please enter condition" }]}
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
        </Form>
      </Modal>
    </div>
  );
};

export default Grammar;
