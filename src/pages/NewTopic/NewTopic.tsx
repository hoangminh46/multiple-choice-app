import { StylesNewTopic } from "@/pages/NewTopic/index";
import DrawerSide from "@/components/Drawer/Drawer";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Modal, Input, Select } from "antd";
import { Link } from "react-router-dom";
import routes from "@/config/routes";
import { Bounce, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { addTopicData } from "@/redux/topicSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function NewTopic() {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testName, setTestName] = useState("");
  const [testDesc, setTestDesc] = useState("");
  const [testDifficult, setTestDifficult] = useState(null);

  function handleChangeDifficult(value) {
    setTestDifficult(value);
  }

  function handleAddTest() {
    if (testName && testDesc && testDifficult) {
      const data = {
        id: uuidv4(),
        name: testName,
        description: testDesc,
        difficult: testDifficult,
        questions: [],
      };
      dispatch(addTopicData(data));
      setIsModalOpen(true);
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
    <StylesNewTopic>
      <div className="user-manager">
        <DrawerSide name="Topic Manager">
          <UserNavbar classID={true} />
        </DrawerSide>
        <div className="manager-content">
          <h3 className="manager-heading">Thêm mới topic</h3>
          <h3>{"Home > Topic manager > new topic"}</h3>
          <div className="form-action">
            <div className="new-topic-action">
              <Input
                addonBefore="Topic name:"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Nhập tên topic..."
              />
            </div>
            <div className="new-topic-action">
              <Input
                addonBefore="Description:"
                value={testDesc}
                onChange={(e) => setTestDesc(e.target.value)}
                placeholder="Nhập description..."
              />
            </div>
            <div className="new-topic-action">
              <div className="test-select">
                <label htmlFor="">Độ khó:</label>
                <Select
                  value={testDifficult}
                  style={{ width: 120 }}
                  onChange={handleChangeDifficult}
                  options={[
                    { value: null, label: "Select", disabled: true },
                    { value: 1, label: "Dễ" },
                    { value: 2, label: "Vừa" },
                    { value: 3, label: "Khó" },
                  ]}
                />
              </div>
            </div>
          </div>
          <Button onClick={handleAddTest} className="btn-add">
            Add test
          </Button>
        </div>
        <Modal open={isModalOpen} className="modal-success">
          <div className="modal-heading">
            <CheckCircleTwoTone twoToneColor="#52c41a" className="modal-icon" />
            <p>Thêm mới topic thành công !!!</p>
          </div>
          <Link to={routes.listTopic}>
            <Button>Về trang List Topic</Button>
          </Link>
        </Modal>
      </div>
    </StylesNewTopic>
  );
}
