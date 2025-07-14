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
  Image,
} from "antd";
import type { TablePaginationConfig } from "antd";// hãy chắc path đúng
import { ContentCard, FilterArea } from "./Language.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import { createLanguage, deleteLanguage, getLanguageDetail, getListLanguages, updateLanguage } from "@/services/languageAPI";
type TableRecord = LanguageItem & { key: string };

export type LanguageItem = {
  _id: string;
  name: string;
  code: string;
  flag_url?: string;
};

const Language = () => {
  const [data, setData] = useState<LanguageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<LanguageItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getListLanguages(pagination.current || 1, pagination.pageSize || 10);
      const list: LanguageItem[] = res.data.languages || [];
      setData(list);
      setPagination((p) => ({ ...p, total: list.length }));
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: "fetch-language-error",
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
    fetchAll();
  }, []);

  const handleRowClick = async (record: LanguageItem) => {
    setLoading(true);
    try {
      // Optionally fetch detail if you need more fields:
      const res = await getLanguageDetail(record._id);
      const detail: LanguageItem = res.data;

      setSelectedRecord(detail);
      form.setFieldsValue({
        name: detail.name,
        code: detail.code,
        flag_url: detail.flag_url,
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
      await deleteLanguage(id);
      message.success("Deleted successfully");
      await fetchAll();
    } catch {
      message.error("Cannot delete this language because it is already in use.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      if (selectedRecord) {
        await updateLanguage(selectedRecord._id, values);
        message.success("Updated successfully");
      } else {
        await createLanguage(values);
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
    { title: "Code", dataIndex: "code", key: "code" },
    { 
      title: "Flag url", 
      dataIndex: "flag_url", 
      key: "flag_url",
      render: (url: string) => (
        <Image width={50} src={url} preview={false} />
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: LanguageItem) => (
        <div onClick={(e) => e.stopPropagation()}> {/* ✅ Chặn click toàn vùng actions */}
        <Popconfirm
          title="Delete this language?"
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
    ...item,
    key: item._id,
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
            Add Language
          </CAddButton>
        </FilterArea>

        <CTable
          columns={columns}
          dataSource={tableData}
          rowKey="_id"
          loading={loading}
          pagination={pagination}
          onChange={(pag) => setPagination(pag)}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Edit Language" : "Add Language"}
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
            name="code"
            label="Code"
            rules={[{ required: true, message: "Please enter code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="flag_url"
            label="Flag url"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Language;
