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
  Upload,
  Select,
  InputNumber
} from "antd";
import { ContentCard, FilterArea } from "./Quest.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import {
  createQuest,
  updateQuest,
  deleteQuest,
  getQuest,
  getQuestDetail
} from "@/services/questAPI";
import { PlusOutlined } from "@ant-design/icons";
import { QuestType, RewardType } from "@/services/questAPI";
import { uploadImage } from "@/services/uploadAPI";

export type QuestItem = {
  _id: string;
  title: string;
  icon: string;
  reward: {
    type: RewardType;
    amount: number;
  };
  type: QuestType;
  condition: number;
  score?: number;
};

const Quest = () => {
  const [data, setData] = useState<QuestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<QuestItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const hasErrorNotified = useRef(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getQuest();
      setData(res.data || []);
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: "fetch-quest-error",
          message: "Lỗi",
          description: error?.response?.data?.message || "Lỗi khi lấy danh sách thử thách",
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

  const handleRowClick = async (record: QuestItem) => {
    setLoading(true);
    try {
      const res = await getQuestDetail(record._id);
      const detail: QuestItem = res.data;
      setSelectedRecord(detail);
      form.setFieldsValue({
        title: detail.title,
        icon: detail.icon,
        reward: detail.reward,
        type: detail.type,
        condition: detail.condition,
        score: detail.score,
      });
      setIconUrl(detail.icon || "");
      setPanelVisible(true);
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Lưu thất bại"
      );
      message.error("Không tải được chi tiết thử thách");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuest(id);
      message.success("Xóa thành công");
      await fetchAll();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Lưu thất bại"
      );
      message.error("Không thể xóa thử thách này");
    }
  };

  const handleFormSubmit = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      const payload = {
        title: values.title,
        icon: values.icon,
        reward: values.reward,
        type: values.type,
        condition: values.condition,
        score: values.score,
      };
      if (selectedRecord) {
        await updateQuest(selectedRecord._id, payload);
        message.success("Cập nhật thành công");
      } else {
        await createQuest(payload);
        message.success("Tạo thử thách thành công");
      }
      setPanelVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      setIconUrl("");
      await fetchAll();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Lưu thất bại"
      );
      message.error("Lưu thất bại");
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
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    {
      title: "Biểu tượng",
      dataIndex: "icon",
      key: "icon",
      render: (url: string) => url ? <Image width={50} src={url} preview={false} /> : null,
    },
    { title: "Loại thử thách", dataIndex: "type", key: "type" },
    { title: "Điều kiện", dataIndex: "condition", key: "condition" },
    { title: "Điểm (%)", dataIndex: "score", key: "score" },
    {
      title: "Phần thưởng",
      dataIndex: "reward",
      key: "reward",
      render: (r: any) => `${r.amount} ${r.type}`,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: QuestItem) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Bạn có chắc muốn xóa thử thách này?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger size="small" onClick={(e) => e.stopPropagation()}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Bộ lọc tìm kiếm
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    const lower = searchText.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(lower)
      )
    );
  }, [data, searchText]);

  const tableData = filteredData.map(item => ({ ...item, key: item._id }));

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ContentCard style={{ flex: 2 }}>
        <FilterArea>
          <InputSearch
            placeholder="Tìm kiếm thử thách..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <CAddButton
            type="primary"
            onClick={() => {
              setSelectedRecord(null);
              form.resetFields();
              setIconUrl("");
              setPanelVisible(true);
            }}
          >
            Thêm thử thách
          </CAddButton>
        </FilterArea>

        <CTable
          columns={columns}
          dataSource={tableData}
          rowKey="_id"
          loading={loading}
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
          pagination={{
            pageSize: 8,
            showSizeChanger: false,
          }}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Chỉnh sửa thử thách" : "Thêm thử thách"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        destroyOnClose
        okText="Lưu"
        cancelText="Hủy"
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
            name="icon"
            label="Biểu tượng"
            rules={[{ required: true, message: "Vui lòng tải ảnh" }]}
            getValueFromEvent={() => iconUrl}
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              accept="image/*"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const res = await uploadImage({ file: file as File, folder: 'icons' });
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
            name={["reward", "type"]}
            label="Loại phần thưởng"
            rules={[{ required: true, message: "Chọn loại phần thưởng" }]}
          >
            <Select options={Object.values(RewardType).map(val => ({ label: val, value: val }))} />
          </Form.Item>
          <Form.Item
            name={["reward", "amount"]}
            label="Số lượng phần thưởng"
            rules={[{ required: true, type: 'number', message: "Nhập số lượng phần thưởng" }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại thử thách"
            rules={[{ required: true, message: "Chọn loại thử thách" }]}
          >
            <Select options={Object.values(QuestType).map(val => ({ label: val, value: val }))} />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Điều kiện"
            rules={[{ required: true, type: 'number', message: "Nhập điều kiện" }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
          {form.getFieldValue('type') === QuestType.Result && (
            <Form.Item
              name="score"
              label="Tỉ lệ điểm (%)"
              rules={[{ required: true, type: 'number', min: 0, max: 100, message: "Nhập tỉ lệ điểm" }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Quest;
