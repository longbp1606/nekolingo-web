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
} from "antd";
import type { TablePaginationConfig } from "antd";
import { ContentCard, FilterArea, LangFromTo } from "./Course.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import { getListLanguages } from "@/services/languageAPI";
import ReactQuill from "react-quill";
import {
  createCourse,
  deleteCourse,
  getCourseDetail,
  getListCourses,
  updateCourse,
} from "@/services/courseAPI";

type TableRecord = CourseItem & { key: string };

export type CourseItem = {
  _id: string;
  title: string;
  description?: string;
  language_from: {
    _id: string;
    name: string;
    code: string;
  };
  language_to: {
    _id: string;
    name: string;
    code: string;
  };
};

const Course = () => {
  const [data, setData] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState<CourseItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);
  const [languageOptions, setLanguageOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const fetchOptions = useCallback(async () => {
    try {
      const res = await getListLanguages(1, 10);
      setLanguageOptions(
        res.data.languages.map((item: any) => ({
          label: item.name,
          value: item._id,
        }))
      );
    } catch (error) {
      console.error("Lỗi khi tải danh sách ngôn ngữ:", error);
    }
  }, []);

  const fetchAll = async (page = 1, take = 5) => {
    setLoading(true);
    try {
      const res = await getListCourses(page, take);
      const list: CourseItem[] = res.data.courses || [];
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
          key: "fetch-course-error",
          message: "Lỗi",
          description:
            error?.response?.data?.message || "Lỗi khi tải danh sách khóa học",
        });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
    fetchAll(pagination.current as number, pagination.pageSize as number);
  }, [fetchOptions]);

  const handleTableChange = (pag: TablePaginationConfig) => {
    fetchAll(pag.current as number, pag.pageSize as number);
  };

  const handleRowClick = async (record: CourseItem) => {
    setLoading(true);
    try {
      const res = await getCourseDetail(record._id);
      const detail: CourseItem = res.data;
      setSelectedRecord(detail);
      form.setFieldsValue({
        title: detail.title,
        description: detail.description,
        language_from: detail.language_from._id,
        language_to: detail.language_to._id,
      });
      setPanelVisible(true);
    } catch {
      message.error("Tải chi tiết thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteCourse(id);
      message.success("Xóa thành công");
      await fetchAll();
    } catch {
      message.error("Xóa thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      if (selectedRecord) {
        await updateCourse(selectedRecord._id, values);
        message.success("Cập nhật thành công");
      } else {
        await createCourse(values);
        message.success("Tạo mới thành công");
      }
      setPanelVisible(false);
      form.resetFields();
      setSelectedRecord(null);
      await fetchAll();
    } catch {
      message.error("Gửi dữ liệu thất bại");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Ngôn ngữ gốc",
      dataIndex: "language_from",
      key: "language_from",
      render: (lang: any) => lang.name || "",
    },
    {
      title: "Ngôn ngữ đích",
      dataIndex: "language_to",
      key: "language_to",
      render: (lang: any) => lang.name || "",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: CourseItem) => (
        <div onClick={(e) => e.stopPropagation()}>
          {/* Popconfirm xóa */}
          <Popconfirm
            title="Bạn có chắc muốn xóa khóa học này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              danger
              size="small"
              onClick={(e) => e.stopPropagation()}
            >
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

  const tableData: TableRecord[] = filteredData.map((item) => ({
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
            Thêm khóa học
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
        title={selectedRecord ? "Chỉnh sửa khóa học" : "Thêm khóa học"}
        visible={panelVisible}
        onCancel={() => setPanelVisible(false)}
        onOk={handleFormSubmit}
        okText="Lưu"
        cancelText="Hủy"
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
            <ReactQuill theme="snow" style={{ height: "100%" }} />
          </Form.Item>
          <LangFromTo>
            <Form.Item
              name="language_from"
              label="Ngôn ngữ gốc"
              rules={[
                { required: true, message: "Vui lòng chọn ngôn ngữ gốc" },
              ]}
              style={{ width: "100%" }}
            >
              <Select
                style={{
                  width: "100%",
                  height: 32,
                  borderRadius: 12,
                }}
                options={languageOptions}
              />
            </Form.Item>
            <Form.Item
              name="language_to"
              label="Ngôn ngữ đích"
              rules={[
                { required: true, message: "Vui lòng chọn ngôn ngữ đích" },
              ]}
              style={{ width: "100%" }}
            >
              <Select
                style={{
                  width: "100%",
                  height: 32,
                  borderRadius: 12,
                }}
                options={languageOptions}
              />
            </Form.Item>
          </LangFromTo>
        </Form>
      </Modal>
    </div>
  );
};

export default Course;
