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
  InputNumber,
  Select,
} from "antd";
import { ContentCard, FilterArea, RowField } from "./Users.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import { CreateUser, deleteUser, getListUsers, getUserDetail, updateUser } from "@/services/usersAPI";
import moment from "moment";
import { register } from "@/services/authAPI";
import { getListLanguages } from "@/services/languageAPI";
// import { uploadImage } from "@/services/uploadAPI";
// import { PlusOutlined } from "@ant-design/icons";
type TableRecord = LanguageItem & { key: string };

export type LanguageItem = {
  _id: string;
  email: string;
  password: string;
  role?: number;
  username?: string;
  avatar_url?: string;
  current_level?: number;
  xp?: number;
  weekly_xp?: number;
  hearts?: number;
  streak_days?: number;
  is_freeze?: boolean;
  last_active_date?: Date;
  freeze_count?: number;
  language_from?: string;
  language_to?: string;
  is_premiere?: boolean;
};

const roleOptions = [
  { label: "Người học", value: 0 },
  { label: "Admin", value: 1 },
  { label: "Giáo sư", value: 2 },
];

const Users = () => {
  const [data, setData] = useState<LanguageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<LanguageItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);
  const [languageOptions, setLanguageOptions] = useState<{ label: string; value: string }[]>([]);
  // const [avatarUrl, setAvatarUrl] = useState("");

  const fetchOptions = useCallback(async () => {
    try {
      const res = await getListLanguages(1, 10);
      setLanguageOptions(res.data.languages.map((item: any) => ({
        label: item.name,
        value: item._id,
      }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getListUsers();
      const list: LanguageItem[] = res.data.data || [];
      setData(list);
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
    fetchOptions();
  }, []);

  const handleRowClick = async (record: LanguageItem) => {
    setLoading(true);
    try {
      const res = await getUserDetail(record._id);
      const detail: LanguageItem = res.data.data.user;

      setSelectedRecord(detail);
      form.setFieldsValue({
        _id: detail._id,
        email: detail.email,
        role: detail.role,
        username: detail.username,
        password: detail.password,
        avatar_url: detail.avatar_url,
        current_level: detail.current_level,
        xp: detail.xp,
        weekly_xp: detail.weekly_xp,
        hearts: detail.hearts,
        streak_days: detail.streak_days,
        is_freeze: detail.is_freeze,
        last_active_date: detail.last_active_date ? moment(detail.last_active_date) : undefined,
        freeze_count: detail.freeze_count,
        language_from: detail.language_from,
        language_to: detail.language_to,
        is_premiere: detail.is_premiere,
      });
      // setAvatarUrl(detail.avatar_url || '');
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
      await deleteUser(id);
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
      const payload: CreateUser = {
        email: values.email,
        password: values.password,
        role: values.role,
        username: values.username,
        avatar_url: values.avatar_url,
        current_level: 0,
        xp: values.xp,
        weekly_xp: values.weekly_xp,
        hearts: values.hearts,
        streak_days: values.streak_days,
        is_freeze: values.is_freeze,
        last_active_date: values.last_active_date?.toDate(),
        freeze_count: values.freeze_count,
        language_from: values.language_from,
        language_to: values.language_to,
        is_premiere: values.is_premiere,
      };

      if (selectedRecord?._id) {
        await updateUser(selectedRecord._id, payload);
        message.success("Updated successfully");
      } else {
        // await createUser(payload);
        await register(payload);
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
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (r: number) => roleOptions.find(o => o.value === r)?.label
    },
    { title: "Email", dataIndex: "email", key: "email" },
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
            // style={{display: "none"}}
          >
            Add User
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
        title={selectedRecord ? "Edit User" : "Add User"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <RowField>
            <Form.Item name="email" label="Email" rules={[{ required: true }]} style={{ width: "100%" }}>
              <Input />
            </Form.Item>

            {/* {!selectedRecord && ( */}
              <Form.Item name="password" label="Password" rules={[{ required: true }]} style={{ width: "100%" }}>
                <Input.Password />
              </Form.Item>
            {/* )} */}
          </RowField>
          <Form.Item name="username" label="Username" style={{ width: "100%" }}>
              <Input />
            </Form.Item>
          <Form.Item name="current_level" label="Current Level">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <RowField>
            <Form.Item name="language_from" label="Language From" style={{ width: "100%" }}>
              <Select options={languageOptions} />
            </Form.Item>
            <Form.Item name="language_to" label="Language To" style={{ width: "100%" }}>
              <Select options={languageOptions} />
            </Form.Item>
          </RowField>
          {/* <RowField>
            <Form.Item name="role" label="Role" style={{ width: "100%" }}>
              <Select options={roleOptions} />
            </Form.Item>
            
          </RowField>
          
          
          
          <RowField>
          <Form.Item name="xp" label="XP" style={{ width: "100%" }}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="weekly_xp" label="Weekly XP" style={{ width: "100%" }}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          </RowField>
          <RowField>
          <Form.Item name="hearts" label="Hearts" style={{ width: "100%" }}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="streak_days" label="Streak Days" style={{ width: "100%" }}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          </RowField>
          <RowField>
          <Form.Item name="is_freeze" label="Is Freeze" valuePropName="checked" style={{ width: "100%" }}>
            <Switch />
          </Form.Item>
          <Form.Item name="freeze_count" label="Freeze Count" style={{ width: "100%" }}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          </RowField>
          <RowField>
          <Form.Item name="last_active_date" label="Last Active Date" style={{ width: "100%" }}>
            <DatePicker showTime style={{ width: "100%" }} disabled />
          </Form.Item>
          <Form.Item name="is_premiere" label="Is Premiere" valuePropName="checked" style={{ width: "100%" }}>
            <Switch />
          </Form.Item>
          </RowField>
          <Form.Item name="avatar_url" label="Avatar URL" getValueFromEvent={() => avatarUrl}>
            <Upload
              listType="picture-card"
              showUploadList={false}
              accept="image/*"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const res = await uploadImage({ file: file as File, folder: 'flags' });
                  const url = res.url;  // lấy đúng từ response
                  // gán URL vào Form-field ẩn
                  form.setFieldsValue({ flag_url: url });
                  setAvatarUrl(url);
                  onSuccess?.(null, file as File);
                } catch (err) {
                  onError?.(err as Error);
                }
              }}
            >
              {avatarUrl ? (
                <Image src={avatarUrl} width={80} preview={false} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
