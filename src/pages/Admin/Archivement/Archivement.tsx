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
  Image,
  Upload,
  AutoComplete,
  InputNumber
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import {
  getArchivement,
  getArchivementDetail,
  createArchivement,
  updateArchivement,
  deleteArchivement,
  ArchiveConditionDto,
} from "@/services/archivementAPI";
import { ContentCard, FilterArea } from "./Archivement.styled";
import { uploadImage } from "@/services/uploadAPI";

export type ArchivementItem = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  condition: ArchiveConditionDto;
};

const CONDITION_TYPES = [
  "streak_days",
  "total_xp",
  "weekly_xp",
  "complete_lessons",
  "complete_courses"
];

const Archivement = () => {
  const [data, setData] = useState<ArchivementItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ArchivementItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const hasErrorNotified = useRef(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getArchivement();
      setData(res.data?.data || []);
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        message.error(
          error?.response?.data?.message ||
          "Lỗi khi tải danh sách thành tích"
        );
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleRowClick = async (record: ArchivementItem) => {
    setLoading(true);
    try {
      const res = await getArchivementDetail(record._id);
      const detail: ArchivementItem = res.data?.data;
      setSelectedRecord(detail);
      form.setFieldsValue({
        title: detail.title,
        description: detail.description,
        icon: detail.icon,
        condition: detail.condition,
      });
      setIconUrl(detail.icon);
      setPanelVisible(true);
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Lỗi khi tải chi tiết thành tích"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteArchivement(id);
      message.success("Xóa thành công");
      fetchAll();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Không thể xóa thành tích này"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      const payload = {
        title: values.title,
        description: values.description,
        icon: values.icon,
        condition: values.condition,
      };
      if (selectedRecord) {
        await updateArchivement(selectedRecord._id, payload);
        message.success("Cập nhật thành công");
      } else {
        await createArchivement(payload);
        message.success("Tạo mới thành công");
      }
      setPanelVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      setIconUrl("");
      fetchAll();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Gửi dữ liệu thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "STT", dataIndex: undefined, key: "index", render: (_: any, __: any, index: number) => index + 1 },
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Biểu tượng",
      dataIndex: "icon",
      key: "icon",
      render: (url: string) => url ? <Image width={50} src={url} preview={false} /> : null,
    },
    {
      title: "Điều kiện",
      dataIndex: ["condition", "type"],
      key: "condition",
      render: (_: any, record: ArchivementItem) =>
        `${record.condition.type}${record.condition.value ? `: ${record.condition.value}` : ""}`,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: ArchivementItem) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
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
      [row.title, row.description, row.condition.type].some((val) =>
        val.toLowerCase().includes(lower)
      )
    );
  }, [data, searchText]);

  const tableData = filteredData.map((item) => ({ ...item, key: item._id }));

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ContentCard style={{ flex: 2 }}>
        <FilterArea>
          <InputSearch
            placeholder="Tìm thành tích..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <CAddButton
            type="primary"
            onClick={() => { setSelectedRecord(null); form.resetFields(); setIconUrl(""); setPanelVisible(true); }}
          >
            Thêm thành tích
          </CAddButton>
        </FilterArea>

        <CTable<ArchivementItem & { key: React.Key }>
          columns={columns}
          dataSource={tableData}
          rowKey="_id"
          loading={loading}
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
          pagination={{ pageSize: 8, showSizeChanger: false }}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Chỉnh sửa thành tích" : "Thêm thành tích"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="icon"
            label="Icon"
            rules={[{ required: true, message: "Vui lòng tải ảnh" }]}
            getValueFromEvent={() => iconUrl}
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              accept="image/*"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const res = await uploadImage({ file: file as File, folder: 'profile-pictures' });
                  const url = res.url;
                  form.setFieldsValue({ icon: url });
                  setIconUrl(url);
                  onSuccess?.(null, file as File);
                } catch (err) {
                  onError?.(err as Error);
                }
              }}
            >
              {iconUrl ? (
                <Image src={iconUrl} width={80} preview={false} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name={["condition", "type"]}
            label="Condition Type"
            rules={[{ required: true, message: "Vui lòng chọn loại điều kiện" }]}
          >
            <AutoComplete options={CONDITION_TYPES.map(c => ({ value: c }))} />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prev, cur) => prev.condition?.type !== cur.condition?.type}
          >
            {() =>
              form.getFieldValue(["condition", "type"]) && (
                <Form.Item
                  name={["condition", "value"]}
                  label="Giá trị điều kiện"
                  rules={[{ type: 'number', min: 1 }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Archivement;
