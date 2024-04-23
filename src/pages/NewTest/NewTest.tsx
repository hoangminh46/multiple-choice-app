import DrawerSide from "@/components/Drawer/Drawer";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { StylesNewTest } from "@/pages/NewTest/index";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/reducers";
import { Button, Checkbox, Input, Select } from "antd";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useState, useEffect } from "react";
import { fetchTopicData } from "@/redux/topicSlice";

interface DataType {
  id: string;
  content: string;
}

const { Option } = Select;

export default function NewTest() {
  const dispatch = useDispatch<AppDispatch>();
  const apiData = useSelector((state: IRootState) => state.topic.topicList);
  const [groupQuestionValue, setGroupQuestionValue] = useState(null);
  const [groupQuestion, setGroupQuestion] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [currentPageQuestion, setcurrentPageQuestion] = useState(1);
  const [currentPageSelected, setcurrentPageSelected] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [selectedItems, setSelectedItems] = useState([]);
  const [testName, setTestName] = useState("");
  const [testTime, setTestTime] = useState("");
  const [testDifficult, setTestDifficult] = useState(null);

  const calculateItemIndex = (index) => {
    return (currentPageQuestion - 1) * pageSize + index + 1;
  };
  const calculateSelectedIndex = (index) => {
    return (currentPageSelected - 1) * pageSize + index + 1;
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

  useEffect(() => {
    dispatch(fetchTopicData());
  }, [dispatch]);

  useEffect(() => {
    setTopicData(apiData);
  }, [apiData]);

  useEffect(() => {
    if (groupQuestionValue) {
      const listQuestion = topicData.find((item) => {
        return item.id === groupQuestionValue;
      });
      setGroupQuestion(listQuestion.questions);
    }
  }, [groupQuestionValue]);

  function handleAddTest() {
    console.log(testName);
    console.log(testTime);
    console.log(testDifficult);
    console.log(selectedItems);
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

  function handleChangeGroup(e) {
    setGroupQuestionValue(e);
  }

  function handleChangeDifficult(value) {
    setTestDifficult(value);
  }

  return (
    <StylesNewTest>
      <div className="user-manager">
        <DrawerSide name="Test Manager">
          <UserNavbar classID={true} />
        </DrawerSide>
        <div className="manager-content">
          <h3 className="manager-heading">Thêm mới test</h3>
          <h3>{"Home > Test quiz manager > new test"}</h3>
          <div className="form-action">
            <Input
              addonBefore="Test name:"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
            />
            <div className="new-test-action">
              <Input
                addonBefore="Time:"
                value={testTime}
                onChange={(e) => setTestTime(e.target.value)}
              />
              <div className="test-select">
                <label htmlFor="">Độ khó:</label>
                <Select
                  defaultValue="disabled"
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
            <Button onClick={handleAddTest} className="btn-add">
              Add test
            </Button>
          </div>
        </div>
      </div>
    </StylesNewTest>
  );
}
