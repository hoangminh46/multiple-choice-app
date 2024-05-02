import DrawerSide from "@/components/Drawer/Drawer";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { StylesTestManager } from "@/pages/TestManager/index";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/reducers";
import { Button, Input, Select, Modal } from "antd";
import { Table } from "antd";
import type { TableProps } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routes from "@/config/routes";
import { Bounce, toast } from "react-toastify";
import {
  deleteTopicData,
  editTopicData,
  fetchTopicData,
} from "@/redux/topicSlice";

const { Search } = Input;

interface DataType {
  id: string;
  name: string;
  time: number;
  start: number;
}

const { Option } = Select;

export default function ListTopic() {
  const dispatch = useDispatch<AppDispatch>();
  const apiTopicData = useSelector(
    (state: IRootState) => state.topic.topicList
  );

  const [inputSearch, setInputSearch] = useState("");
  const [tableLength, setTableLength] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testName, setTestName] = useState("");
  const [testDesc, setTestDesc] = useState("");
  const [testDifficult, setTestDifficult] = useState(null);
  const [topicData, setTopicData] = useState([]);
  const [currentItemID, setCurrentItemID] = useState("");

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
      dataIndex: "difficult",
      key: "difficult",
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

  function handleChangeDifficult(value) {
    setTestDifficult(value);
  }

  function handleOpenEdit(item) {
    setTestName(item.name);
    setTestDesc(item.description);
    setTestDifficult(item.difficult);
    setCurrentItemID(item.id);
  }

  function handleEditTopic() {
    if (testName && testDesc && testDifficult) {
      const data = {
        id: currentItemID,
        name: testName,
        difficult: testDifficult,
        description: testDesc,
      };
      dispatch(editTopicData(data));
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
        <Modal open={isModalOpen} className="modal-edit modal-edit-test">
          <div className="form-action">
            <div className="new-topic-action">
              <Input
                addonBefore="Topic name:"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Nhập tên test..."
              />
            </div>
            <div className="new-test-action">
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
            <div className="new-topic-action">
              <Input
                addonBefore="Description:"
                value={testDesc}
                onChange={(e) => setTestDesc(e.target.value)}
                placeholder="Nhập description..."
              />
            </div>

            <div className="btn-list">
              <Button className="btn-add" onClick={() => setIsModalOpen(false)}>
                Huỷ
              </Button>
              <Button className="btn-add" onClick={handleEditTopic}>
                Sửa test
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </StylesTestManager>
  );
}
