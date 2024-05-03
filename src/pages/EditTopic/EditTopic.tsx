import { StylesEditTopic } from "@/pages/EditTopic/index";
import { useParams } from "react-router-dom";
import DrawerSide from "@/components/Drawer/Drawer";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IRootState } from "@/redux/reducers";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { deleteQuestionData, fetchQuestions } from "@/redux/topicSlice";
import { Button, Pagination, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function EditTopic() {
  const dispatch = useDispatch<AppDispatch>();
  const questionData = useSelector(
    (state: IRootState) => state.topic.topicQuestions
  );
  const { TopicId } = useParams();
  const pageSize = 3;
  const [topicQuestion, setTopicQuestion] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(0);
  const [questionID, setQuestionID] = useState("");
  // input edit
  const [inputQuestionEdit, setInputQuestionEdit] = useState("");
  const [optionsAnswer, setOptionsAnswer] = useState([]);
  // input add
  const itemsPerPage = pageSize || 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = topicQuestion.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(fetchQuestions(TopicId));
  }, [dispatch, TopicId]);

  useEffect(() => {
    setTopicQuestion(questionData);
  }, [questionData]);

  function handleInputSearch(e) {
    setInputSearch(e.target.value);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleSearchTopic() {
    const listSearch = topicQuestion.filter((item, index) => {
      return item.content
        .trim()
        .toLowerCase()
        .includes(inputSearch.trim().toLowerCase());
    });
    if (inputSearch.length === 0) {
      setTopicQuestion(questionData);
    } else {
      setTopicQuestion(listSearch);
    }
  }

  // const showModal = () => {
  //   setModalOpen(true);
  // };

  const showModalEdit = (item) => {
    setInputQuestionEdit(item.content);
    setModalEditOpen(true);
    setOptionsAnswer(item.options);
    setQuestionID(item.id);
    setSelectedValue(item.correctOption);
  };

  function handleChangeAnswer(index, event) {
    const newInputValues = [...optionsAnswer];
    newInputValues[index] = event.target.value;
    setOptionsAnswer(newInputValues);
  }

  function handleUpdateQuestion() {
    console.log("id topic:", TopicId);
    console.log("id questions:", questionID);
    console.log("Cau hoi: ", inputQuestionEdit);
    console.log("Cau tra loi:", optionsAnswer);
    console.log("Dap an:", selectedValue);
  }

  function handleChangeInputQuestionEdit(e) {
    setInputQuestionEdit(e.target.value);
  }

  function handleRadioChange(e) {
    setSelectedValue(e.target.value);
  }

  const handleDelete = (questionID, topicID) => {
    dispatch(
      deleteQuestionData({
        questionID,
        topicID,
      })
    );
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
  };

  return (
    <StylesEditTopic>
      <div className="edit-topic">
        <DrawerSide name="Topic Manager">
          <UserNavbar classID={true} />
        </DrawerSide>
        <div className="manager-content">
          <h3 className="manager-heading">{`Home > Question Manager > $`}</h3>
          <div className="manager-action">
            <Search
              placeholder="Search"
              enterButton={
                <Button className="search-btn" onClick={handleSearchTopic}>
                  <SearchOutlined />
                </Button>
              }
              value={inputSearch}
              className="manager-search"
              onChange={handleInputSearch}
            />
            <Button className="manager-btn">
              <img src="/src/assets/images/add.svg" alt="" />
              <p>New Question</p>
            </Button>
          </div>
          <div className="manager-detail">
            <div className="total-user">Tổng số câu hỏi: </div>
            <div className="manager-list">
              {currentItems.map((item, index) => (
                <div className="manager-item" key={index}>
                  <div className="item-desc">
                    <p>{item.content}</p>
                    <div className="item-answer">
                      {item.options.map((answer, index) => (
                        <p key={index}>{answer}</p>
                      ))}
                    </div>
                  </div>
                  <div className="item-action">
                    <img
                      src="/src/assets/images/pencil.svg"
                      alt=""
                      onClick={() => showModalEdit(item)}
                    />
                    <img
                      src="/src/assets/images/remove.svg"
                      alt=""
                      onClick={() => handleDelete(item.id, TopicId)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="manager-pagination">
          <Pagination
            current={currentPage}
            total={topicQuestion.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <Modal open={modalEditOpen} className="edit-topic-modal" footer={false}>
        <div className="modal-question">
          <div className="modal-item">Câu hỏi</div>
          <input
            type="text"
            className="modal-item"
            value={inputQuestionEdit}
            onChange={handleChangeInputQuestionEdit}
          />
        </div>
        <div className="modal-answer">
          {optionsAnswer.map((item, index) => (
            <div className="item-answer" key={index}>
              <div className="modal-item">
                {String.fromCharCode(65 + index)}
              </div>
              <input
                type="text"
                className="modal-item"
                value={optionsAnswer[index]}
                onChange={(event) => handleChangeAnswer(index, event)}
              />
            </div>
          ))}
        </div>
        <div className="modal-input">
          <div>Đáp án đúng:</div>
          <div className="input-section">
            <input
              type="radio"
              name="answer-radio"
              id="a"
              value={0}
              checked={selectedValue == 0}
              onChange={handleRadioChange}
            />
            <label htmlFor="a">A</label>
          </div>
          <div className="input-section">
            <input
              type="radio"
              name="answer-radio"
              id="b"
              value={1}
              checked={selectedValue == 1}
              onChange={handleRadioChange}
            />
            <label htmlFor="b">B</label>
          </div>
          <div className="input-section">
            <input
              type="radio"
              name="answer-radio"
              id="c"
              value={2}
              checked={selectedValue == 2}
              onChange={handleRadioChange}
            />
            <label htmlFor="c">C</label>
          </div>
          <div className="input-section">
            <input
              type="radio"
              name="answer-radio"
              id="d"
              value={3}
              checked={selectedValue == 3}
              onChange={handleRadioChange}
            />
            <label htmlFor="d">D</label>
          </div>
        </div>
        <div className="input-action">
          <Button className="btn-edit" onClick={() => setModalEditOpen(false)}>
            Cancel
          </Button>
          <Button className="btn-edit" onClick={handleUpdateQuestion}>
            Update
          </Button>
        </div>
      </Modal>
    </StylesEditTopic>
  );
}
