import { Button, Select } from "antd";
import { StylesDashboard } from "@/pages/Dashboard/style/index";
import { Input } from "antd";
import TestItem from "@/components/TestItem/TestItem";
import { Pagination } from "antd";
import UserInfo from "@/components/UserInfo/UserInfo";
import DrawerSide from "@/components/Drawer/Drawer";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

export default function Dashboard() {
  const headingExam = [
    {
      id: 1,
      name: "Kiểm tra an toàn bảo mật thông tin",
      time: 7,
      grade: 250,
      difficult: 1,
    },
    {
      id: 2,
      name: "Kiểm tra javascript cơ bản",
      time: 6,
      grade: 250,
      difficult: 1,
    },
    {
      id: 3,
      name: "Kiểm tra html/css cơ bản",
      time: 8,
      grade: 250,
      difficult: 1,
    },
    {
      id: 4,
      name: "Kiểm tra reactjs cơ bản",
      time: 10,
      grade: 250,
      difficult: 2,
    },
    {
      id: 5,
      name: "Kiểm tra typescript cơ bản",
      time: 5,
      grade: 250,
      difficult: 1,
    },
    {
      id: 6,
      name: "Kiểm tra SCSS cơ bản",
      time: 3,
      grade: 250,
      difficult: 2,
    },
    {
      id: 7,
      name: "Kiểm tra CSDL cơ bản",
      time: 1,
      grade: 250,
      difficult: 3,
    },
    {
      id: 8,
      name: "Kiểm tra thuật toán cơ bản",
      time: 4,
      grade: 250,
      difficult: 2,
    },
    {
      id: 9,
      name: "Kiểm tra phần cứng cơ bản",
      time: 6,
      grade: 250,
      difficult: 1,
    },
    {
      id: 10,
      name: "Kiểm tra an toàn dữ liệu cơ bản",
      time: 7,
      grade: 250,
      difficult: 1,
    },
    {
      id: 11,
      name: "Kiểm tra SCSS cơ bản",
      time: 3,
      grade: 250,
      difficult: 2,
    },
    {
      id: 12,
      name: "Kiểm tra CSDL cơ bản",
      time: 1,
      grade: 250,
      difficult: 3,
    },
  ];
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("");
  const [listItem, setListItem] = useState(headingExam);
  const itemsPerPage = pageSize || 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listItem.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function handleSearch() {
    const result = headingExam.filter((item) => {
      return item.name
        .trim()
        .toLowerCase()
        .includes(value.trim().toLowerCase());
    });
    setListItem(result);
  }

  function handleSelect(e) {
    const result = headingExam.filter((item) => {
      return item.difficult === e;
    });
    if (e === 0) {
      setListItem(headingExam);
    } else {
      setListItem(result);
    }
  }

  return (
    <StylesDashboard>
      <div className="dashbroad">
        <UserInfo />
        <DrawerSide name="Dashboard">
          <UserInfo />
        </DrawerSide>
        <div className="quiz">
          <div className="quiz-action">
            <Search
              placeholder="Search"
              enterButton={
                <Button className="search-btn" onClick={handleSearch}>
                  <SearchOutlined />
                </Button>
              }
              className="quiz-search"
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
            />
            <div className="select-container">
              <Select
                className="quiz-select"
                defaultValue="Difficult"
                onChange={(e) => handleSelect(e)}
              >
                <Option value={0}>All</Option>
                <Option value={1}>Easy</Option>
                <Option value={2}>Medium</Option>
                <Option value={3}>Hard</Option>
              </Select>
              <img
                src="/src/assets/images/arrrow-down.png"
                alt=""
                className="select-arrow"
              />
            </div>
          </div>
          <div className="quiz-list">
            {currentItems.map((item, index) => (
              <TestItem
                key={index}
                heading={item.name}
                time={item.time}
                grade={item.grade}
              />
            ))}
          </div>

          <div className="quiz-pagination">
            <Pagination
              current={currentPage}
              total={listItem.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </StylesDashboard>
  );
}
