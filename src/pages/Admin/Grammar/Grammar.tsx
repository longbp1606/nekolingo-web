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
import type { TablePaginationConfig } from "antd";
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

export type GrammarItem = {
  id: string;
  name: string;
  description: string;
  condition: string;
};

const Grammar = () => {
  const [data, setData] = useState<GrammarItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<GrammarItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);

  // Load all grammars once
  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getListGrammars();
      const list: GrammarItem[] = res.data || [];
      setData(list);
      setPagination((p) => ({ ...p, total: list.length }));
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
      const res = await getGrammarDetail(record.id);
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
        await updateGrammar(selectedRecord.id, values);
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
            Add Grammar
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
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Grammar;
