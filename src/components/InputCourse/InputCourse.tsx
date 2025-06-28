/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Input, Modal, Tabs } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineBook } from "react-icons/ai";
import dayjs from "dayjs";
import CTable from "../CustomedTable/CTable";
import type { ColumnsType } from "antd/es/table";
import { notification } from "antd";
import { getListCourses } from "@/services/courseAPI";

interface InputCourseProps {
  onSelectCourse?: (course: any) => void;
}

const InputCourse: React.FC<InputCourseProps> = ({ onSelectCourse }) => {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getListCourses(1, 10);
      setRowData(res.data.courses);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message || "Error fetching course list",
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Khi click đúp hoặc click hàng thì chọn luôn, đóng modal, cập nhật input và đẩy lên parent
  const handleRowClick = (record: any) => {
    const label = `${record.title} (${record.language_from.name} → ${record.language_to.name})`;
    setInputValue(label);
    setSelectedRowKey(record._id);
    setIsModalOpen(false);
    if (onSelectCourse) onSelectCourse(record);
  };

  // Khi nhấn nút Choose
  const handleOk = () => {
    const selected = rowData.find((item) => item._id === selectedRowKey);
    if (selected) {
      const label = `${selected.title} (${selected.language_from.name} → ${selected.language_to.name})`;
      setInputValue(label);
      if (onSelectCourse) onSelectCourse(selected);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => setIsModalOpen(false);

  const columnDefs: ColumnsType<any> = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "From", key: "language_from", render: (_, r) => r.language_from.name },
    { title: "To", key: "language_to", render: (_, r) => r.language_to.name },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => dayjs(val).format("YYYY-MM-DD HH:mm"),
    },
  ];

  return (
    <>
      <Input
        placeholder="Select course"
        value={inputValue}
        onClick={() => setIsModalOpen(true)}
        prefix={<AiOutlineBook style={{ color: "#00C2D1" }} />}
        readOnly
        style={{width: "200px"}}
      />

      <Modal
        title="Select Course"
        open={isModalOpen}
        width={1000}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" onClick={handleOk}>Choose</Button>,
          <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
        ]}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Course List",
              children: (
                <>
                  <CTable
                    dataSource={rowData.map((item) => ({ ...item, key: item._id }))}
                    columns={columnDefs}
                    loading={loading}
                    onRow={(record) => ({ onClick: () => handleRowClick(record) })}
                    selectedKey={selectedRowKey}
                  />
                </>
              ),
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default InputCourse;
