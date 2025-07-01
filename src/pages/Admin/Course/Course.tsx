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
import {
  getListGrammars,
  getGrammarDetail,
  createGrammar,
  updateGrammar,
  deleteGrammar,
} from "@/services/grammarAPI";  // hãy chắc path đúng
import { ContentCard, FilterArea, LangFromTo } from "./Course.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import { getListLanguages } from "@/services/languageAPI";
import ReactQuill from "react-quill";

export type GrammarItem = {
  id: string;
  name: string;
  description: string;
  condition: string;
};

const Course = () => {
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
  const [languageOptions, setLanguageOptions] = useState<string[]>([]);

  const fetchOptions = useCallback(async () => {
    try {
      const res = await getListLanguages(1, 10);
      const options = res.data.languages.map((item: any) => item.name);
      setLanguageOptions([...options]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

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
          description: error?.response?.data?.message || "Error fetching languages",
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
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "From language", dataIndex: "language_from", key: "language_from" },
    { title: "To language", dataIndex: "language_to", key: "language_to" },
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
            Add Language
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
        title={selectedRecord ? "Edit Course" : "Add Course"}
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
          <LangFromTo>
          <Form.Item
            name="language_from"
            label="From language"
            rules={[{ required: true, message: "Please choose from language" }]}
            style={{ width: "100%"}}
          >
            <Select
              style={{
                width: "100%",
                height: 32,
                borderRadius: 12,
              }}
              options={[languageOptions]}
            />
          </Form.Item>
          <Form.Item
            name="language_to"
            label="To language"
            rules={[{ required: true, message: "Please choose to language" }]}
            style={{ width: "100%"}}
          >
            <Select
              style={{
                width: "100%",
                height: 32,
                borderRadius: 12,
              }}
              options={[languageOptions]}
            />
          </Form.Item>
          </LangFromTo>
        </Form>
      </Modal>
    </div>
  );
};

export default Course;
