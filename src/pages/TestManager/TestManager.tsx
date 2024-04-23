import DrawerSide from "@/components/Drawer/Drawer";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { StylesTestManager } from "@/pages/TestManager/index";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/reducers";
import { Button, Input, Select } from "antd";
import { Table } from "antd";
import type { TableProps } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routes from "@/config/routes";
import { deleteTestData, fetchTestData } from "@/redux/testSlice";

const { Search } = Input;

interface DataType {
  id: string;
  testName: string;
  time: number;
  start: number;
}

export default function TestManager() {
  const dispatch = useDispatch<AppDispatch>();
  const apiData = useSelector((state: IRootState) => state.test.testList);

  const [testData, setTestData] = useState(apiData);
  const [inputSearch, setInputSearch] = useState("");
  const [tableLength, setTableLength] = useState(4);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Start",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="item-action">
          <img src="/src/assets/images/pencil.svg" alt="" />
          <img
            src="/src/assets/images/remove.svg"
            alt=""
            onClick={() => {
              dispatch(deleteTestData(record.id));
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setTestData(apiData);
  }, [apiData]);

  useEffect(() => {
    dispatch(fetchTestData());
  }, [dispatch]);

  function handleInputSearch(e) {
    setInputSearch(e.target.value);
  }

  function handleChange(e) {
    setTableLength(e);
  }

  function handleSearchUser() {
    const listSearch = apiData.filter((item, index) => {
      return item.name
        .trim()
        .toLowerCase()
        .includes(inputSearch.trim().toLowerCase());
    });
    setTestData(listSearch);
  }

  return (
    <StylesTestManager>
      <div className="user-manager">
        <DrawerSide name="Test Manager">
          <UserNavbar classID={true} />
        </DrawerSide>
        <div className="manager-content">
          <h3 className="manager-heading">Test manager</h3>
          <h3>{"Home > Test quiz manager"}</h3>
          <div className="manager-action">
            <Search
              placeholder="Search"
              enterButton={
                <Button className="search-btn" onClick={handleSearchUser}>
                  <SearchOutlined />
                </Button>
              }
              value={inputSearch}
              className="manager-search"
              onChange={handleInputSearch}
            />
            <Link to={routes.newTest} className="manager-btn">
              <img src="/src/assets/images/add2.svg" alt="" />
              <p>New Test</p>
            </Link>
          </div>
          <div className="manager-detail">
            <div className="manager-list">
              <Table
                columns={columns}
                dataSource={testData}
                rowKey="key"
                pagination={{
                  position: ["bottomCenter"],
                  pageSize: tableLength,
                }}
                scroll={tableLength >= 6 ? { y: 300 } : undefined}
              />
              <Select
                defaultValue={4}
                style={{ width: 120 }}
                onChange={handleChange}
                className="select-table"
                options={[
                  { value: 4, label: "4" },
                  { value: 6, label: "6" },
                  { value: 8, label: "8" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </StylesTestManager>
  );
}
