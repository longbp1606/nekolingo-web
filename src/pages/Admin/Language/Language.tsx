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
  Image,
  Upload,
  Input,
} from "antd";
import type { TablePaginationConfig } from "antd";
import { ContentCard, FilterArea } from "./Language.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import { createLanguage, deleteLanguage, getLanguageDetail, getListLanguages, updateLanguage } from "@/services/languageAPI";
import { uploadImage } from "@/services/uploadAPI";
import { PlusOutlined } from "@ant-design/icons";

export type LanguageItem = {
  _id: string;
  name: string;
  code: string;
  flag_url?: string;
};
type TableRecord = LanguageItem & { key: string };

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
  const [flagUrl, setFlagUrl] = useState("");

  const fetchAll = async (page = 1, take = 10) => {
    setLoading(true);
    try {
      const res = await getListLanguages(page, take);
      const list: LanguageItem[] = res.data.languages || [];
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
          key: "fetch-language-error",
          message: "Lỗi",
          description: error?.response?.data?.message || "Lỗi khi tải danh sách ngôn ngữ",
        });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll(pagination.current as number, pagination.pageSize as number);
  }, []);

  const handleTableChange = (pag: TablePaginationConfig) => {
    fetchAll(pag.current as number, pag.pageSize as number);
  };

  const handleRowClick = async (record: LanguageItem) => {
    setLoading(true);
    try {
      const res = await getLanguageDetail(record._id);
      const detail: LanguageItem = res.data;

      setSelectedRecord(detail);
      form.setFieldsValue({
        name: detail.name,
        code: detail.code,
        flag_url: detail.flag_url,
      });
      setFlagUrl(detail.flag_url || "");
      setPanelVisible(true);
    } catch {
      message.error("Tải chi tiết thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLanguage(id);
      message.success("Xóa thành công");
      await fetchAll();
    } catch {
      message.error("Không thể xóa ngôn ngữ này vì đang được sử dụng.");
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
        message.success("Cập nhật thành công");
      } else {
        await createLanguage(values);
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
    { title: "Mã", dataIndex: "code", key: "code" },
    {
      title: "Quốc kỳ",
      dataIndex: "flag_url",
      key: "flag_url",
      render: (url: string) => url ? <Image width={50} src={url} preview={false} /> : null,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: LanguageItem) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Bạn có chắc muốn xóa ngôn ngữ này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger size="small" onClick={(e) => e.stopPropagation()}>
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

  const tableData: TableRecord[] = filteredData.map(item => ({
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
            Thêm ngôn ngữ
          </CAddButton>
        </FilterArea>

        <CTable
          columns={columns}
          dataSource={tableData}
          rowKey="_id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Chỉnh sửa ngôn ngữ" : "Thêm ngôn ngữ"}
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
            name="code"
            label="Mã"
            rules={[{ required: true, message: "Vui lòng nhập mã" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="flag_url"
            label="Quốc kỳ"
            getValueFromEvent={() => flagUrl}
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              accept="image/*"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const res = await uploadImage({ file: file as File, folder: 'flags' });
                  const url = res.url;
                  form.setFieldsValue({ flag_url: url });
                  setFlagUrl(url);
                  onSuccess?.(null, file as File);
                } catch (err) {
                  onError?.(err as Error);
                }
              }}
            >
              {flagUrl ? (
                <Image src={flagUrl} width={80} preview={false} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Language;
