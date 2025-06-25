/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps, TablePaginationConfig } from "antd/es/table";
import "./CTable.styled";
import { CustomTableTitle, TableArea } from "./CTable.styled";

export interface CTableProps<T> extends Omit<TableProps<T>, 'pagination'> {
  columns: ColumnsType<T>;
  dataSource: T[];
  selectedKey?: React.Key | null;
  pagination?: TablePaginationConfig;
}

function CTable<T extends { key: React.Key }>({
  columns,
  dataSource,
  selectedKey,
  pagination,
  ...rest
}: CTableProps<T>) {
  // Default pagination if none provided
  const defaultPagination: TablePaginationConfig = { pageSize: 10 };

  return (
    <TableArea>
    <Table
      columns={columns.map((col: any) => ({
        ...col,
        title: <CustomTableTitle>{col.title}</CustomTableTitle>,
      }))}
      dataSource={dataSource}
      pagination={pagination ?? defaultPagination}
      rowClassName={(_, index) => {
        const isEven = index % 2 === 0;
        return [
          isEven ? "even-row" : "odd-row",
          selectedKey === dataSource[index].key ? "selected-row" : "",
        ].join(" ");
      }}
      {...rest}
    />
    </TableArea>
  );
}

export default CTable;
