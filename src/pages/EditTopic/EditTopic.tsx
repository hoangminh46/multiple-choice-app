import { StylesEditTopic } from "@/pages/EditTopic/index";
import { useParams } from "react-router-dom";
import DrawerSide from "@/components/Drawer/Drawer";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IRootState } from "@/redux/reducers";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  addQuestionData,
  deleteQuestionData,
  editQuestionData,
  fetchQuestions,
  fetchTopicData,
} from "@/redux/topicSlice";
import { Button, Pagination, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function EditTopic() {
  const dispatch = useDispatch<AppDispatch>();
  const topicData = useSelector((state: IRootState) => state.topic.topicList);
  const questionData = useSelector(
    (state: IRootState) => state.topic.topicQuestions
  );
  const { TopicId } = useParams();

  const currentTopic = topicData.find((item) => {
    return item.id === TopicId;
  });

  const pageSize = 3;
  const [topicQuestion, setTopicQuestion] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalNewOpen, setModalNewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedValueNew, setSelectedValueNew] = useState(0);
  const [questionID, setQuestionID] = useState("");
  // input edit
  const [inputQuestionEdit, setInputQuestionEdit] = useState("");
  const [optionsAnswer, setOptionsAnswer] = useState([]);
  // input add
  const [inputQuestionNew, setInputQuestionNew] = useState("");
  const [newAnswer, setNewAnswer] = useState({
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
  });
  //
  const itemsPerPage = pageSize || 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = topicQuestion.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(fetchQuestions(TopicId));
  }, [dispatch, TopicId]);

  useEffect(() => {
    dispatch(fetchTopicData());
  }, [dispatch]);

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

  function handleChangeNewAnswer(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setNewAnswer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleUpdateQuestion() {
    const data = {
      topicId: TopicId,
      question: {
        id: questionID,
        content: inputQuestionEdit,
        options: optionsAnswer,
        correctOption: selectedValue,
      },
    };
    dispatch(editQuestionData(data));
    toast.success("Sửa thành công", {
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
    setModalEditOpen(false);
  }

  function handleAddQuestion() {
    const data = {
      topicId: TopicId,
      question: {
        id: uuidv4(),
        content: inputQuestionNew,
        options: [
          newAnswer.answerA,
          newAnswer.answerB,
          newAnswer.answerC,
          newAnswer.answerD,
        ],
        correctOption: selectedValueNew,
      },
    };
    dispatch(addQuestionData(data));
    toast.success("Thêm thành công", {
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
    setModalNewOpen(false);
    setInputQuestionNew("");
    setNewAnswer({
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
    });
    setSelectedValueNew("");
  }

  function handleChangeInputQuestionEdit(e) {
    setInputQuestionEdit(e.target.value);
  }

  function handleChangeInputQuestionNew(e) {
    setInputQuestionNew(e.target.value);
  }

  function handleRadioChange(e) {
    setSelectedValue(e.target.value);
  }

  function handleRadioNewChange(e) {
    setSelectedValueNew(e.target.value);
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
          <h3 className="manager-heading">{`Home > Question Manager > ${currentTopic?.name}`}</h3>
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
            <Button
              className="manager-btn"
              onClick={() => setModalNewOpen(true)}
            >
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
                        <p key={index}>{`${String.fromCharCode(
                          65 + index
                        )}. ${answer}`}</p>
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
      <Modal open={modalNewOpen} className="edit-topic-modal" footer={false}>
        <div className="modal-question">
          <div className="modal-item">Câu hỏi</div>
          <input
            type="text"
            className="modal-item"
            value={inputQuestionNew}
            onChange={handleChangeInputQuestionNew}
          />
        </div>
        <div className="modal-answer">
          <div className="item-answer">
            <div className="modal-item">A</div>
            <input
              type="text"
              className="modal-item"
              name="answerA"
              value={newAnswer.answerA}
              onChange={handleChangeNewAnswer}
            />
          </div>
          <div className="item-answer">
            <div className="modal-item">B</div>
            <input
              type="text"
              className="modal-item"
              name="answerB"
              value={newAnswer.answerB}
              onChange={handleChangeNewAnswer}
            />
          </div>
          <div className="item-answer">
            <div className="modal-item">C</div>
            <input
              type="text"
              className="modal-item"
              name="answerC"
              value={newAnswer.answerC}
              onChange={handleChangeNewAnswer}
            />
          </div>
          <div className="item-answer">
            <div className="modal-item">D</div>
            <input
              type="text"
              className="modal-item"
              name="answerD"
              value={newAnswer.answerD}
              onChange={handleChangeNewAnswer}
            />
          </div>
        </div>
        <div className="modal-input">
          <div>Đáp án đúng:</div>
          <div className="input-section">
            <input
              type="radio"
              name="answer-radio"
              id="a"
              value={0}
              checked={selectedValueNew == 0}
              onChange={handleRadioNewChange}
            />
            <label htmlFor="a">A</label>
          </div>
          <div className="input-section">
            <input
              type="radio"
              name="answer-radio"
              id="b"
              value={1}
              checked={selectedValueNew == 1}
              onChange={handleRadioNewChange}
            />
            <label htmlFor="b">B</label>
          </div>
          <div className="input-section">
            <input
              type="radio"
              name="answer-radio"
              id="c"
              value={2}
              checked={selectedValueNew == 2}
              onChange={handleRadioNewChange}
            />
            <label htmlFor="c">C</label>
          </div>
          <div className="input-section">
            <input
              type="radio"
              name="answer-radio"
              id="d"
              value={3}
              checked={selectedValueNew == 3}
              onChange={handleRadioNewChange}
            />
            <label htmlFor="d">D</label>
          </div>
        </div>
        <div className="input-action">
          <Button className="btn-edit" onClick={() => setModalNewOpen(false)}>
            Cancel
          </Button>
          <Button className="btn-edit" onClick={handleAddQuestion}>
            Add
          </Button>
        </div>
      </Modal>
    </StylesEditTopic>
  );
}
