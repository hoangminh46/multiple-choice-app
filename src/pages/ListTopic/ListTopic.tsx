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
import { Bounce, toast } from "react-toastify";
import { deleteTopicData, fetchTopicData } from "@/redux/topicSlice";

const { Search } = Input;

interface DataType {
  id: string;
  name: string;
  difficult: number;
  description: string;
  questions: object[];
}

const { Option } = Select;

export default function ListTopic() {
  const dispatch = useDispatch<AppDispatch>();
  const apiTopicData = useSelector(
    (state: IRootState) => state.topic.topicList
  );

  const [inputSearch, setInputSearch] = useState("");
  const [tableLength, setTableLength] = useState(4);
  const [topicData, setTopicData] = useState([]);

  const [current, setCurrent] = useState(1);

  const calculateIndex = (index) => (current - 1) * tableLength + index + 1;

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => calculateIndex(index),
    },
    {
      title: "Topic Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Difficult",
      key: "difficult",
      render: (text, record) => (
        <p>
          {record.difficult == 1 ? "Dễ" : record.difficult == 2 ? "Vừa" : "Khó"}
        </p>
      ),
    },
    {
      title: "Total Question",
      key: "total",
      render: (text, record) => <p>{record.questions.length}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="item-action">
          <Link to={`${routes.listTopic}/${record.id}`} className="item-name">
            <img src="/src/assets/images/pencil.svg" alt="" />
          </Link>
          <img
            src="/src/assets/images/remove.svg"
            alt=""
            onClick={() => {
              dispatch(deleteTopicData(record.id));
              setCurrent(1);
              toast.success("Xoá thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchTopicData());
  }, [dispatch]);

  useEffect(() => {
    setTopicData(apiTopicData);
  }, [apiTopicData]);

  function handleInputSearch(e) {
    setInputSearch(e.target.value);
  }

  function handleChange(e) {
    setTableLength(e);
    setCurrent(1);
  }

  function handleSearchUser() {
    const listSearch = apiTopicData.filter((item, index) => {
      return item.name
        .trim()
        .toLowerCase()
        .includes(inputSearch.trim().toLowerCase());
    });
    setTopicData(listSearch);
  }

  const handlePaginationChange = (page) => {
    setCurrent(page);
  };

  return (
    <StylesTestManager>
      <div className="user-manager">
        <DrawerSide name="Test Manager">
          <UserNavbar classID={true} />
        </DrawerSide>
        <div className="manager-content">
          <h3 className="manager-heading">List Topic Manager</h3>
          <h3>{"Home > List Topic Manager"}</h3>
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
            <Link to={routes.newTopic} className="manager-btn">
              <img src="/src/assets/images/add2.svg" alt="" />
              <p>New Topic</p>
            </Link>
          </div>
          <div className="manager-detail">
            <div className="manager-list">
              <Table
                columns={columns}
                dataSource={topicData}
                rowKey="key"
                pagination={{
                  position: ["bottomCenter"],
                  current,
                  pageSize: tableLength,
                  onChange: handlePaginationChange,
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
