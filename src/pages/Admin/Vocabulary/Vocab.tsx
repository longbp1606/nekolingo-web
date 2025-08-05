/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
  Spin,
} from "antd";
import type { TablePaginationConfig } from "antd";
import { ContentCard, FilterArea, LangFromTo } from "./Vocab.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import { getListLanguages } from "@/services/languageAPI";
import { createVocab, deleteVocab, getListVocabs, getVocabDetail, updateVocab } from "@/services/vocabularyAPI";
type TableRecord = LessonItem & { key: string };

export type LessonItem = {
  _id: string;
  word: string;
  meaning: string;
  language_from?: {
    _id: string;
    name: string;
    code: string;
  };
  language_to?: {
    _id: string;
    name: string;
    code: string;
  };
  type?: string;
};

const Vocab = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 9,
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);
  const [languageOptions, setLanguageOptions] = useState<{ label: string; value: string }[]>([]);

  const fetchOptions = useCallback(async () => {
    try {
      const res = await getListLanguages(1, 10);
      setLanguageOptions(res.data?.languages.map((item: any) => ({
        label: item.name,
        value: item._id,
      })));
    } catch (error) {
      console.error("Lỗi khi tải ngôn ngữ:", error);
    }
  }, []);

  const fetchAll = async (page = 1, take = 9) => {
    setLoading(true);
    try {
      const res = await getListVocabs(page, take);
      const list: any[] = res.data?.data?.map((item: any) => ({
        ...item,
        id: item._id,
      }));
      const { totalRecord } = res.data.pagination;

      setData(list);
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
          description: error?.response?.data?.message || "Không thể tải danh sách từ vựng",
        });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
    fetchAll(pagination?.current as number, pagination?.pageSize as number);
  }, [fetchOptions]);

  const handleTableChange = (pag: TablePaginationConfig) => {
    fetchAll(pag.current as number, pag.pageSize as number);
  };

  const handleRowClick = async (record: LessonItem) => {
    setLoading(true);
    try {
      const res = await getVocabDetail(record._id);
      const detail: LessonItem = res.data?.data;
      setSelectedRecord(detail);
      form.setFieldsValue({
        word: detail.word,
        meaning: detail.meaning,
        language_from: detail.language_from?._id || undefined,
        language_to: detail.language_to?._id || undefined,
        type: detail.type,
      });
      setPanelVisible(true);
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Không thể tải chi tiết từ vựng"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteVocab(id);
      message.success("Xoá thành công");
      await fetchAll();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Không thể tải chi tiết từ vựng"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      if (selectedRecord) {
        await updateVocab(selectedRecord._id, values);
        message.success("Cập nhật thành công");
      } else {
        await createVocab(values);
        message.success("Thêm mới thành công");
      }
      setPanelVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      await fetchAll();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Không thể tải chi tiết từ vựng"
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Từ vựng", dataIndex: "word", key: "word" },
    { title: "Nghĩa", dataIndex: "meaning", key: "meaning" },
    { title: "Loại", dataIndex: "type", key: "type" },
    {
      title: "Ngôn ngữ gốc", dataIndex: "language_from", key: "language_from",
      render: (language: any) => language.name || ""
    },
    {
      title: "Ngôn ngữ đích", dataIndex: "language_to", key: "language_to",
      render: (language: any) => language.name || ""
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: any) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Bạn có chắc muốn xoá từ vựng này?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger size="small"
              onClick={(e) => e.stopPropagation()}
            >
              Xoá
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

  const tableData: TableRecord[] = filteredData.map(item => ({
    ...item,
    key: item._id,
  }));

  return (
    <Spin spinning={loading}>
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
            Thêm từ vựng
          </CAddButton>
        </FilterArea>

        <CTable
          columns={columns}
          dataSource={tableData}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Chỉnh sửa từ vựng" : "Thêm từ vựng"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="word"
            label="Từ vựng"
            rules={[{ required: true, message: "Vui lòng nhập từ vựng" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="meaning"
            label="Nghĩa"
            rules={[{ required: true, message: "Vui lòng nhập nghĩa" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại"
          >
            <Input />
          </Form.Item>
          <LangFromTo>
            <Form.Item
              name="language_from"
              label="Ngôn ngữ gốc"
              style={{ width: "100%" }}
            >
              <Select
                style={{
                  width: "100%",
                  height: 32,
                  borderRadius: 12,
                }}
                options={languageOptions}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="language_to"
              label="Ngôn ngữ đích"
              style={{ width: "100%" }}
            >
              <Select
                style={{
                  width: "100%",
                  height: 32,
                  borderRadius: 12,
                }}
                options={languageOptions}
                allowClear
              />
            </Form.Item>
          </LangFromTo>
        </Form>
      </Modal>
    </Spin>
  );
};

export default Vocab;
