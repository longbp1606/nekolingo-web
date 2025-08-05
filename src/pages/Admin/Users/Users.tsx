"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
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
  Upload,
  Image,
  Segmented,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ContentCard, FilterArea, RowField } from "./Users.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import {
  CreateUser,
  createUser,
  deleteUser,
  getIsActiveListUsers,
  getListUsers,
  getUserDetail,
  updateUser,
} from "@/services/usersAPI";
import { getListLanguages } from "@/services/languageAPI";
import moment from "moment";
import { uploadImage } from "@/services/uploadAPI";
import { useWatch } from "antd/es/form/Form";

export type UserItem = {
  _id: string;
  email: string;
  password?: string;
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
  is_active?: boolean;
};

const roleOptions = [
  { label: "Người học", value: 0 },
  { label: "Quản trị viên", value: 1 },
  { label: "Giáo sư", value: 2 },
];

const Users = () => {
  const [activeUsers, setActiveUsers] = useState<UserItem[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<UserItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [languageOptions, setLanguageOptions] = useState<{ label: string; value: string }[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive">("active");
  const [form] = Form.useForm();
  const roleValue = useWatch("role", form);
  const hasErrorNotified = useRef(false);

  const fetchOptions = useCallback(async () => {
    try {
      const res = await getListLanguages(1, 10);
      setLanguageOptions(
        res.data.languages.map((item: any) => ({ label: item.name, value: item._id }))
      );
    } catch (e) {
      console.error(e);
    }
  }, []);

  const fetchActiveUsers = async () => {
    setLoading(true);
    try {
      const res = await getListUsers();
      const list: UserItem[] = res.data.data || [];
      setActiveUsers(list.filter((u) => (u.role === 0 || u.role === 2) && u.is_active !== false));
    } catch (err: any) {
      if (!hasErrorNotified.current) {
        notification.error({ message: err.response?.data?.message || "Error fetching active users" });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchInactiveUsers = async () => {
    setLoading(true);
    try {
      const res = await getIsActiveListUsers();
      const list: UserItem[] = res.data.data || [];
      setInactiveUsers(list.filter((u) => (u.role === 0 || u.role === 2) && u.is_active === false));
    } catch (err: any) {
      if (!hasErrorNotified.current) {
        notification.error({ message: err.response?.data?.message || "Error fetching inactive users" });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  useEffect(() => {
    if (statusFilter === "active") fetchActiveUsers();
    else fetchInactiveUsers();
  }, [statusFilter]);

  const isEditMode = Boolean(selectedRecord);

  const handleRowClick = async (record: UserItem) => {
    if (!isEditMode && statusFilter !== "active") return;
    setLoading(true);
    try {
      const res = await getUserDetail(record._id);
      const detail: UserItem = res.data.data.user;
      setSelectedRecord(detail);
      form.setFieldsValue({
        email: detail.email,
        role: detail.role,
        username: detail.username,
        password: undefined,
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
        avatar_url: detail.avatar_url,
      });
      setAvatarUrl(detail.avatar_url || "");
      setPanelVisible(true);
    } catch (e: any) {
      message.error(e.response?.data?.message || "Failed to load user detail");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      message.success("User banned successfully");
      fetchActiveUsers();
    } catch {
      message.error("Ban failed");
    }
  };

  const handleUnban = async (id: string) => {
    setLoading(true);
    try {
      await updateUser(id, { is_active: true });
      message.success("User unbanned successfully");
      fetchInactiveUsers();
    } catch {
      message.error("Unban failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    const values = await form.validateFields();
    setLoading(true);
    const payload: CreateUser = {
      email: values.email,
      password: values.password,
      role: values.role,
      username: values.username,
      avatar_url: values.avatar_url,
      current_level: values.current_level,
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
    try {
      if (isEditMode) await updateUser(selectedRecord!._id, payload);
      else await createUser(payload);
      message.success("Submit successful");
      setPanelVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      fetchActiveUsers();
    } catch {
      message.error("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  const sourceData = statusFilter === "active" ? activeUsers : inactiveUsers;
  const filteredData = useMemo(() => {
    if (!searchText) return sourceData;
    const lower = searchText.toLowerCase();
    return sourceData.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(lower))
    );
  }, [sourceData, searchText]);

  const columnsActive = [
    { title: "STT", key: "index", render: (_: any, __: any, idx: number) => idx + 1 },
    { title: "Vai trò", dataIndex: "role", key: "role", render: (r: number) => roleOptions.find(o => o.value === r)?.label },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Thao tác", key: "actions", render: (_: any, rec: UserItem) => (
      <div onClick={e => e.stopPropagation()}>
        <Popconfirm title="Bạn có chắc muốn cấm người dùng này?" onConfirm={() => handleDelete(rec._id)} okText="Xác nhận" cancelText="Hủy">
          <Button danger size="small" onClick={e => e.stopPropagation()}>Cấm</Button>
        </Popconfirm>
      </div>
    )},
  ];
  const columnsInactive = [
    { title: "STT", key: "index", render: (_: any, __: any, idx: number) => idx + 1 },
    { title: "Vai trò", dataIndex: "role", key: "role", render: (r: number) => roleOptions.find(o => o.value === r)?.label },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Thao tác", key: "actions", render: (_: any, rec: UserItem) => (
      <Popconfirm title="Bạn có chắc muốn hủy cấm người dùng này?" onConfirm={() => handleUnban(rec._id)} okText="Xác nhận" cancelText="Hủy">
        <Button size="small">Hủy cấm</Button>
      </Popconfirm>
    )},
  ];
  const columns = statusFilter === "active" ? columnsActive : columnsInactive;

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ContentCard style={{ flex: 2 }}>
        <FilterArea>
          <InputSearch placeholder="Tìm kiếm..." value={searchText} onChange={e => setSearchText(e.target.value)} />
          <Segmented
            options={[{ label: "Hoạt động", value: "active" }, { label: "Bị cấm", value: "inactive" }]}
            value={statusFilter}
            onChange={val => setStatusFilter(val as "active" | "inactive")}
            style={{ height: 32 }}
          />
          <CAddButton type="primary" onClick={() => { setSelectedRecord(null); form.resetFields(); setPanelVisible(true); }}>
            Thêm người dùng
          </CAddButton>
        </FilterArea>
        <CTable
          columns={columns}
          dataSource={filteredData.map(r => ({ ...r, key: r._id }))}
          rowKey="_id"
          loading={loading}
          onRow={r => ({ onClick: () => statusFilter === "active" && handleRowClick(r) })}
          pagination={{ pageSize: 8, showSizeChanger: false }}
        />
      </ContentCard>
      <Modal
        title={isEditMode ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        destroyOnClose
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <RowField>
            <Form.Item name="email" label="Email" rules={[{ required: true }]} style={{ width: "100%" }}>
              <Input disabled={isEditMode && (roleValue === 0 || roleValue === 2)} />
            </Form.Item>
            {!isEditMode && (
              <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]} style={{ width: "100%" }}>
                <Input.Password />
              </Form.Item>
            )}
          </RowField>
          <Form.Item name="username" label="Tên người dùng" style={{ width: "100%" }}>
            <Input disabled={isEditMode && (roleValue === 0 || roleValue === 2)} />
          </Form.Item>
          <RowField>
            <Form.Item name="role" label="Vai trò" style={{ width: "100%" }}>
              <Select options={roleOptions} disabled={isEditMode && (roleValue === 0 || roleValue === 2)} />
            </Form.Item>
            <Form.Item name="current_level" label="Cấp độ hiện tại" style={{ width: "100%" }}>
              <InputNumber disabled={isEditMode && (roleValue === 0 || roleValue === 2)} style={{ width: "100%" }} />
            </Form.Item>
          </RowField>
          <RowField>
            <Form.Item name="language_from" label="Ngôn ngữ gốc" style={{ width: "100%" }}>
              <Select options={languageOptions} disabled={isEditMode && (roleValue === 0 || roleValue === 2)} />
            </Form.Item>
            <Form.Item name="language_to" label="Ngôn ngữ học" style={{ width: "100%" }}>
              <Select options={languageOptions} disabled={isEditMode && (roleValue === 0 || roleValue === 2)} />
            </Form.Item>
          </RowField>
          <Form.Item name="avatar_url" label="Ảnh đại diện" getValueFromEvent={() => avatarUrl}>
            <Upload
              listType="picture-card"
              showUploadList={false}
              accept="image/*"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const res = await uploadImage({ file: file as File, folder: 'flags' });
                  const url = res.url;
                  form.setFieldsValue({ avatar_url: url });
                  setAvatarUrl(url);
                  onSuccess?.(null, file as File);
                } catch (err) {
                  onError?.(err as Error);
                }
              }}
              disabled={isEditMode && (roleValue === 0 || roleValue === 2)}
            >
              {avatarUrl ? (
                <Image src={avatarUrl} width={80} preview={false} />
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

export default Users;
