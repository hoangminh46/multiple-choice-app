import DrawerSide from "@/components/Drawer/Drawer";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { StylesTestManager } from "@/pages/TestManager/index";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/reducers";
import { Button, Input, Select, Modal, Checkbox } from "antd";
import { Table } from "antd";
import type { TableProps } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routes from "@/config/routes";
import { deleteTestData, editTestData, fetchTestData } from "@/redux/testSlice";
import { Bounce, toast } from "react-toastify";
import { fetchTopicData } from "@/redux/topicSlice";

const { Search } = Input;

interface DataType {
  id: string;
  name: string;
  time: number;
  start: number;
}

const { Option } = Select;

export default function TestManager() {
  const dispatch = useDispatch<AppDispatch>();
  const apiData = useSelector((state: IRootState) => state.test.testList);
  const apiTopicData = useSelector(
    (state: IRootState) => state.topic.topicList
  );

  const [testData, setTestData] = useState(apiData);
  const [inputSearch, setInputSearch] = useState("");
  const [tableLength, setTableLength] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testName, setTestName] = useState("");
  const [testTime, setTestTime] = useState("");
  const [groupQuestionValue, setGroupQuestionValue] = useState(null);
  const [testDifficult, setTestDifficult] = useState(null);
  const [groupQuestion, setGroupQuestion] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentItemID, setCurrentItemID] = useState("");
  const [currentPageQuestion, setcurrentPageQuestion] = useState(1);
  const [currentPageSelected, setcurrentPageSelected] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  const [current, setCurrent] = useState(1);

  const calculateItemIndex = (index) => {
    return (currentPageQuestion - 1) * pageSize + index + 1;
  };
  const calculateSelectedIndex = (index) => {
    return (currentPageSelected - 1) * pageSize + index + 1;
  };

  const handleItemCheck = (item) => {
    const selectedItemIds = selectedItems.map(
      (selectedItem) => selectedItem.id
    );
    if (selectedItemIds.includes(item.id)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const columnsQuestion: TableProps<DataType>["columnsQuestion"] = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      render: (_, __, index) => calculateItemIndex(index),
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <input
          type="checkbox"
          name={record.id}
          id={record.id}
          checked={selectedItems.some(
            (selectedItem) => selectedItem.id === record.id
          )}
          onChange={() => handleItemCheck(record)}
          value={record.id}
        />
      ),
    },
    {
      title: "Tên câu hỏi",
      dataIndex: "content",
      key: "content",
      render: (text, record) => (
        <label htmlFor={record.id}>{record.content}</label>
      ),
    },
  ];
  const columnsSelected: TableProps<DataType>["columnsSelected"] = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      render: (_, __, index) => calculateSelectedIndex(index),
    },
    {
      title: "Tên câu hỏi",
      dataIndex: "content",
      key: "content",
      render: (text, record) => (
        <label htmlFor={record.id}>{record.content}</label>
      ),
    },
  ];

  const calculateIndex = (index) => (current - 1) * tableLength + index + 1;

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => calculateIndex(index),
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
          <img
            src="/src/assets/images/pencil.svg"
            alt=""
            onClick={() => {
              handleOpenEdit(record);
              setIsModalOpen(true);
            }}
          />
          <img
            src="/src/assets/images/remove.svg"
            alt=""
            onClick={() => {
              dispatch(deleteTestData(record.id));
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
    setTestData(apiData);
  }, [apiData]);

  useEffect(() => {
    dispatch(fetchTestData());
    dispatch(fetchTopicData());
  }, [dispatch]);

  useEffect(() => {
    setTopicData(apiTopicData);
  }, [apiTopicData]);

  useEffect(() => {
    if (groupQuestionValue) {
      const listQuestion = topicData.find((item) => {
        return item.id === groupQuestionValue;
      });
      setGroupQuestion(listQuestion.questions);
    }
  }, [groupQuestionValue]);

  function handleInputSearch(e) {
    setInputSearch(e.target.value);
  }

  function handleChange(e) {
    setTableLength(e);
    setCurrent(1);
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

  const handlePaginationChange = (page) => {
    setCurrent(page);
  };

  function handleChangeDifficult(value) {
    setTestDifficult(value);
  }

  function handleChangeGroup(e) {
    setGroupQuestionValue(e);
  }

  const handlePageQuestionChange = (page) => {
    setcurrentPageQuestion(page);
  };

  const handlePageQuestionSizeChange = (current, size) => {
    setcurrentPageQuestion(1);
    setPageSize(size);
  };

  const handlePageSelectedChange = (page) => {
    setcurrentPageSelected(page);
  };

  const handlePageSelectedSizeChange = (current, size) => {
    setcurrentPageSelected(1);
    setPageSize(size);
  };

  function handleOpenEdit(item) {
    setTestName(item.name);
    setTestTime(item.time);
    setTestDifficult(item.difficult);
    setSelectedItems(item.questions);
    setCurrentItemID(item.id);
  }

  function handleEditTest() {
    if (testName && !isNaN(Number(testTime)) && testDifficult) {
      const data = {
        id: currentItemID,
        name: testName,
        time: testTime,
        difficult: testDifficult,
        start: 0,
        questions: selectedItems,
      };
      dispatch(editTestData(data));
      setIsModalOpen(false);
      toast.success("Sửa thành công!!!", {
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
    } else {
      return toast.error("Mời bạn nhập đúng dữ kiệu!!!", {
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
    }
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
                  current,
                  pageSize: tableLength,
                  // total: totalRows,
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
        <Modal open={isModalOpen} className="modal-edit modal-edit-test">
          <div className="form-action">
            <Input
              addonBefore="Test name:"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Nhập tên test..."
            />
            <div className="new-test-action">
              <Input
                addonBefore="Time:"
                value={testTime}
                onChange={(e) => setTestTime(e.target.value)}
                placeholder="Nhập thời gian (phút)..."
              />
              <div className="test-select">
                <label htmlFor="">Độ khó:</label>
                <Select
                  value={testDifficult}
                  style={{ width: 120 }}
                  onChange={handleChangeDifficult}
                  options={[
                    { value: "disabled", label: "Select", disabled: true },
                    { value: 1, label: "Dễ" },
                    { value: 2, label: "Vừa" },
                    { value: 3, label: "Khó" },
                  ]}
                />
              </div>
            </div>
            <div className="new-test-action">
              <div className="test-select">
                <label htmlFor="">Nhóm câu hỏi:</label>
                <Select
                  defaultValue="disabled"
                  style={{ width: 120 }}
                  onChange={(e) => handleChangeGroup(e)}
                >
                  <Option value="disabled" disabled>
                    Select
                  </Option>
                  {Array.isArray(topicData)
                    ? topicData.map((item, index) => (
                        <Option key={index} value={item.id}>
                          {item.name}
                        </Option>
                      ))
                    : null}
                </Select>
              </div>
              <Checkbox>Đảo câu hỏi</Checkbox>
            </div>
            <div className="question">
              <div className="question-item">
                <p className="question-heading">Câu hỏi trong nhóm</p>
                <Table
                  columns={columnsQuestion}
                  dataSource={groupQuestion}
                  rowKey="key"
                  pagination={{
                    position: ["bottomCenter"],
                    current: currentPageQuestion,
                    pageSize: pageSize,
                    onChange: handlePageQuestionChange,
                    onShowSizeChange: handlePageQuestionSizeChange,
                  }}
                  // scroll={tableLength >= 6 ? { y: 300 } : undefined}
                />
              </div>
              <div className="question-item">
                <p className="question-heading">Câu hỏi đã chọn</p>
                <Table
                  columns={columnsSelected}
                  dataSource={selectedItems}
                  rowKey="key"
                  pagination={{
                    position: ["bottomCenter"],
                    current: currentPageSelected,
                    pageSize: pageSize,
                    onChange: handlePageSelectedChange,
                    onShowSizeChange: handlePageSelectedSizeChange,
                  }}
                  // scroll={tableLength >= 6 ? { y: 300 } : undefined}
                />
              </div>
            </div>
            <div className="btn-list">
              <Button className="btn-add" onClick={() => setIsModalOpen(false)}>
                Huỷ
              </Button>
              <Button className="btn-add" onClick={handleEditTest}>
                Sửa test
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </StylesTestManager>
  );
}
