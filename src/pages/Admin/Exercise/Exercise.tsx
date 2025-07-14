"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Form,
  Popconfirm,
  message,
  notification,
} from "antd";
import type { TablePaginationConfig } from "antd";
import { ContentCard, FilterArea } from "./Exercise.styled";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import "react-quill/dist/quill.snow.css";
import AddExercise from "./AddExercise";
import { deleteExercise, getExerciseDetail, getListExercises } from "@/services/exerciseAPI";

const Exercise = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  // const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);
  const [creating, setCreating] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getListExercises(pagination.current || 1, pagination.pageSize || 10);
      const list: any[] = res.data.exercises || [];
      setData(list);
      setPagination((p) => ({ ...p, total: list.length }));
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: "fetch-grammar-error",
          message: "Error",
          description: error?.response?.data?.message || "Error fetching grammars",
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

  const handleRowClick = async (record: any) => {
    setLoading(true);
    try {
      // Optionally fetch detail if you need more fields:
      const res = await getExerciseDetail(record._id);
      // setSelectedRecord(res.data);
      form.setFieldsValue(res.data);
      setCreating(true);
    } catch {
      message.error("Failed to load detail");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteExercise(id);
      message.success("Deleted successfully");
      await fetchAll();
    } catch {
      message.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };


  const columns = [
    { title: 'Question format', dataIndex: 'question_format', key: 'question_format' },
    { title: 'Question', dataIndex: 'question', key: 'question' },
    { title: 'Correct answer', dataIndex: 'correct_answer', key: 'correct_answer' },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div onClick={(e) => e.stopPropagation()}> {/* ✅ Chặn click toàn vùng actions */}

          <Popconfirm
            title="Delete this exercise?"
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

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {creating ? (
        <AddExercise onBack={() => {
          setCreating(false);
          fetchAll();
        }} />
      ) : (
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
                setCreating(true); // thay vì mở modal
              }}
            >
              Add Exercise
            </CAddButton>
          </FilterArea>

          <CTable
            columns={columns}
            dataSource={filteredData.map((item) => ({ ...item, key: item._id }))}
            rowKey="_id"
            loading={loading}
            pagination={pagination}
            onChange={(pag) => setPagination(pag)}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </ContentCard>
      )}
    </div>
  );
};

export default Exercise;
