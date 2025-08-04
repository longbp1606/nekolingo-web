"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import {
  Form,
  notification,
  Tag,
} from "antd";
import dayjs from "dayjs";
import CTable from "@/components/CustomedTable/CTable";
import InputSearch from "@/components/InputSearch/InputSearch";
import CAddButton from "@/components/AddButton/AddButton";
import { ContentCard, FilterArea, StatisticArea, StatisticCard } from "./Transaction.styled";
import SelectLabel from "@/components/SelectLabel/SelectLabel";
import { getTransactionDetail, getTransactionTotal } from "@/services/transactionAPI";
import { getListUsers } from "@/services/usersAPI";
import { theme } from "@/themes";

export type TransactionItem = {
  _id: string;
  user: string; // sẽ giữ tên người dùng sau khi mapping
  vnd_amount: number;
  gem_amount: number;
  status: string;
  transaction_code: string;
  message: string;
  createdAt: string;
};

const Transaction = () => {
  const [data, setData] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const hasErrorNotified = useRef(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [total, setTotal] = useState<{ totalVnd: number; totalGem: number }>({
    totalVnd: 0,
    totalGem: 0,
  });

  const fetchAll = async (statusValue: string, typeValue: string) => {
    setLoading(true);
    try {
      const [txRes, userRes, totalRes] = await Promise.all([
        getTransactionDetail(statusValue, typeValue),
        getListUsers(),
        getTransactionTotal(typeValue),
      ]);
      const usersMap: Record<string, string> = {};
      userRes.data.data.forEach((u: any) => {
        usersMap[u._id] = u.username || u.email;
      });
      const mapped = (txRes.data.transactions || []).map((tx: any) => ({
        ...tx,
        user: usersMap[tx.user] || tx.user,
      }));
      setData(mapped);
      setTotal({
        totalVnd: totalRes.data.totalVnd,
        totalGem: totalRes.data.totalGem,
      });
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: "fetch-transaction-error",
          message: "Lỗi",
          description: error?.response?.data?.message || "Không thể tải dữ liệu giao dịch",
        });
        hasErrorNotified.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = () => {
    fetchAll(selectedStatus, selectedType);
  };

  const columns = [
    { title: "Mã giao dịch", dataIndex: "transaction_code", key: "transaction_code" },
    { title: "Người dùng", dataIndex: "user", key: "user" },
    {
      title: "Số tiền (VND)",
      dataIndex: "vnd_amount",
      key: "vnd_amount",
      render: (value: string) => value.toLocaleString(),
    },
    {
      title: "Số gem",
      dataIndex: "gem_amount",
      key: "gem_amount",
      render: (value: string) => value.toLocaleString(),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_: any, record: TransactionItem) => (
        <Tag color={record.status === "SUCCESS" ? "green" : "red"}>
          {record.status === "SUCCESS" ? "Thành công" : "Thất bại"}
        </Tag>
      ),
    },
    { title: "Tin nhắn", dataIndex: "message", key: "message" },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  const filteredData = data.filter((row) => {
    if (!searchText) return true;
    const lower = searchText.toLowerCase();
    return [
      row.user,
      row.status,
      row.transaction_code,
      row.message,
    ].some((val) => val.toLowerCase().includes(lower));
  });

  const tableData = filteredData.map((item) => ({ ...item, key: item._id }));

  return (
    <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
      <ContentCard style={{ flex: 2 }}>
        <FilterArea>
          <InputSearch
            placeholder="Tìm kiếm giao dịch..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Form
            form={form}
            onFinish={onFinish}
            style={{ display: "flex", gap: 16, width: "max-content" }}
          >
            <Form.Item name="status">
              <SelectLabel
                label="Trạng thái"
                options={[
                  { value: "SUCCESS", label: "Thành công" },
                  { value: "FAILED", label: "Thất bại" },
                ]}
                showSearch
                allowClear
                onChange={(val) => {
                  setSelectedStatus(val);
                }}
                style={{ width: "150px" }}
              />
            </Form.Item>
            <Form.Item name="type">
              <SelectLabel
                label="Thời gian"
                options={[
                  { value: "day", label: "Ngày" },
                  { value: "week", label: "Tuần" },
                  { value: "month", label: "Tháng" },
                  { value: "year", label: "Năm" },
                ]}
                showSearch
                allowClear
                onChange={(val) => {
                  setSelectedType(val);
                }}
                style={{ width: "200px" }}
              />
            </Form.Item>
            <CAddButton htmlType="submit">Tìm kiếm</CAddButton>
          </Form>
        </FilterArea>

        <StatisticArea>
          <StatisticCard
            style={{
              background: `linear-gradient(150deg, #ffffff 0%, ${theme.color.primary}55 100%)`,
            }}
          >
            <h3>Tổng tiền (VND)</h3>
            <p style={{ color: `${theme.color.darkPrimary}` }}>{total.totalVnd.toLocaleString()} VND</p>
          </StatisticCard>
          <StatisticCard
            style={{
              background: `linear-gradient(150deg, #ffffff 0%, ${theme.color.lightPurple}55 90%)`,
            }}
          >
            <h3>Tổng gem</h3>
            <p style={{ color: `${theme.color.darkPurple}` }}>{total.totalGem.toLocaleString()} Gems</p>
          </StatisticCard>
        </StatisticArea>
        <CTable<TransactionItem & { key: React.Key }>
          columns={columns}
          dataSource={tableData}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 8, showSizeChanger: false }}
        />
      </ContentCard>
    </div>
  );
};

export default Transaction;
