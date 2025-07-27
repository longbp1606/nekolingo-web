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
      // API returns an array of quests
      setData(res.data || []);
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: "fetch-quest-error",
          message: "Error",
          description: error?.response?.data?.message || "Error fetching quests",
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
      // Optionally fetch detail if you need more fields:
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
      setIconUrl(detail.icon || '');
      setPanelVisible(true);
    } catch {
      message.error("Failed to load detail");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuest(id);
      message.success("Deleted successfully");
      await fetchAll();
    } catch {
      message.error("Cannot delete this quest.");
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
        message.success("Updated successfully");
      } else {
        await createQuest(payload);
        message.success("Created successfully");
      }
      setPanelVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      setIconUrl("");
      await fetchAll();
    } catch {
      message.error("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (url: string) => url ? <Image width={50} src={url} preview={false} /> : null,
    },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Condition", dataIndex: "condition", key: "condition" },
    { title: "Score", dataIndex: "score", key: "score" },
    {
      title: "Reward",
      dataIndex: "reward",
      key: "reward",
      render: (r: any) => `${r.amount} ${r.type}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: QuestItem) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Delete this quest?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger size="small" onClick={(e) => e.stopPropagation()}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Search filter
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
            placeholder="Search quests..."
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
            Add Quest
          </CAddButton>
        </FilterArea>

        <CTable
          columns={columns}
          dataSource={tableData}
          rowKey="_id"
          loading={loading}
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
          pagination={{
            pageSize: 8,       // mỗi trang 5 item
            showSizeChanger: false, // ẩn dropdown chọn số dòng/page (tuỳ chọn)
          }}
        />
      </ContentCard>

      <Modal
        title={selectedRecord ? "Edit Quest" : "Add Quest"}
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
            name="icon"
            label="Icon URL"
            getValueFromEvent={() => iconUrl}

          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              accept="image/*"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const res = await uploadImage({ file: file as File, folder: 'flags' });
                  const url = res.url;  // lấy đúng từ response
                  // gán URL vào Form-field ẩn
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
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name={["reward", "type"]}
            label="Reward Type"
            rules={[{ required: true }]}
          >
            <Select options={Object.values(RewardType).map(val => ({ label: val, value: val }))} />
          </Form.Item>
          <Form.Item
            name={["reward", "amount"]}
            label="Reward Amount"
            rules={[{ required: true, type: 'number' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Quest Type"
            rules={[{ required: true }]}
          >
            <Select options={Object.values(QuestType).map(val => ({ label: val, value: val }))} />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, type: 'number' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
          {form.getFieldValue('type') === QuestType.Result && (
            <Form.Item
              name="score"
              label="Score (%)"
              rules={[{ required: true, type: 'number', min: 0, max: 100 }]}
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
