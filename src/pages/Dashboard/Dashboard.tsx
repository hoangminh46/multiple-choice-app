import { Button, Select } from "antd";
import { StylesDashboard } from "@/pages/Dashboard/style/index";
import { Input } from "antd";
import TestItem from "@/components/TestItem/TestItem";
import { Pagination } from "antd";
import UserInfo from "@/components/UserInfo/UserInfo";
import DrawerSide from "@/components/Drawer/Drawer";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/reducers";
import { fetchTestData } from "@/redux/testSlice";

const { Search } = Input;
const { Option } = Select;

export default function Dashboard() {
  const [pageSize, setPageSize] = useState(6);
  const dispatch = useDispatch<AppDispatch>();
  const apiData = useSelector((state: IRootState) => state.test.testList);
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [listItem, setListItem] = useState(apiData);
  const itemsPerPage = pageSize || 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listItem.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(fetchTestData());
  }, [dispatch]);

  useEffect(() => {
    handleSearch();
  }, [selectedOption]);

  function handleSearch() {
    const result = apiData.filter((item) => {
      const matchesText = item.name
        .trim()
        .toLowerCase()
        .includes(value.trim().toLowerCase());
      const matchesOption = selectedOption
        ? item.difficult === selectedOption
        : true;
      return matchesText && matchesOption;
    });
    setListItem(result);
  }

  useEffect(() => {
    setListItem(apiData);
  }, [apiData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e);
                }}
              >
                <Option value={""}>All</Option>
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
            {currentItems.map((item, index) => {
              if (item.questions.length !== 0) {
                return (
                  <TestItem
                    key={index}
                    id={item.id}
                    heading={item.name}
                    time={item.time}
                  />
                );
              } else {
                return null;
              }
            })}
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
