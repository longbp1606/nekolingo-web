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
  // "first_mistake",
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
        notification.error({
          key: "fetch-archivement-error",
          message: "Error",
          description: error?.response?.data?.message || "Error fetching archivements",
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
    } catch {
      message.error("Failed to load detail");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteArchivement(id);
      message.success("Deleted successfully");
      fetchAll();
    } catch {
      message.error("Cannot delete this archivement.");
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
        message.success("Updated successfully");
      } else {
        await createArchivement(payload);
        message.success("Created successfully");
      }
      setPanelVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      setIconUrl("");
      fetchAll();
    } catch {
      message.error("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (url: string) => url ? <Image width={50} src={url} preview={false} /> : null,
    },
    {
      title: "Condition",
      dataIndex: ["condition", "type"],
      key: "condition",
      render: (_: any, record: ArchivementItem) =>
        `${record.condition.type}${record.condition.value ? `: ${record.condition.value}` : ""}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ArchivementItem) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Delete this archivement?"
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

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    const lower = searchText.toLowerCase();
    return data.filter((row) =>
      [row.title, row.description, row.condition.type]
        .some((val) => val.toLowerCase().includes(lower))
    );
  }, [data, searchText]);

  const tableData = filteredData.map((item) => ({ ...item, key: item._id }));

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ContentCard style={{ flex: 2 }}>
        <FilterArea>
          <InputSearch
            placeholder="Search archivement..."
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
            Add Archivement
          </CAddButton>
        </FilterArea>

        <CTable<ArchivementItem & { key: React.Key }>
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
        title={selectedRecord ? "Edit Archivement" : "Add Archivement"}
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
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="icon"
            label="Icon"
            getValueFromEvent={() => iconUrl}
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              accept="image/*"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  // emoji or image upload
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
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name={["condition", "type"]}
            label="Condition Type"
            rules={[{ required: true }]}
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
                  label="Condition Value"
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
