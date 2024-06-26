import { Progress } from "antd";
import { StylesExam } from "@/pages/Exam/style/index";
import { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Space, Button, Modal } from "antd";
import ButtonQuestion from "@/components/ButtonQuestion/ButtonQuestion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useParams } from "react-router-dom";
import { setAnswered } from "@/redux/questionSlice";
import { Link } from "react-router-dom";
import routes from "@/config/routes";
import { IRootState } from "@/redux/reducers";
import { fetchTestData } from "@/redux/testSlice";

type dataTypes = {
  id: number;
  content: string;
  options: string[];
  correctOption: number;
};

export default function Exam() {
  const dispatch = useDispatch<AppDispatch>();
  const apiData = useSelector((state: IRootState) => state.test.testList);
  const { ExamId } = useParams();

  useEffect(() => {
    dispatch(fetchTestData());
  }, [dispatch]);

  let questions: object[] | undefined = [];

  const testData = apiData.find((item) => {
    return item.id === ExamId;
  });

  if (testData) {
    questions = testData.questions;
  }

  const asnsweredList = useSelector(
    (state: IRootState) => state.question.answeredList
  );

  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [wrongAnswer, setWrongAnswer] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [examTime, setExamTime] = useState(testData ? testData.time * 60 : 10);
  const [time, setTime] = useState(examTime);
  const [value, setValue] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);
  const [isModalOpenList, setIsModalOpenList] = useState(false);
  const currentValue = handleCalValue(asnsweredList, value);
  const showModal = () => {
    setIsModalOpenConfirm(true);
  };

  const handleCancel = () => {
    setIsModalOpenConfirm(false);
  };

  const selectedList: number[] = [];

  for (let i = 0; i < asnsweredList.length; i++) {
    selectedList.push(Number(...Object.keys(asnsweredList[i])));
  }

  function handleCalValue(list: object[], value: number | null) {
    for (let i = 0; i < list.length; i++) {
      const keys = Object.keys(list[i]);
      if (keys.includes(value!.toString())) {
        return Object.values(list[i])[0];
      }
    }
  }

  function handleReload() {
    setValue(0);
    setTime(examTime);
    setCurrentQuestion(0);
    setCorrectAnswer(0);
    setWrongAnswer(0);
    dispatch(setAnswered({}));
  }

  function handleSubmit() {
    const listCorrectOption = [];
    const listAwsweredOption = [];
    for (let i = 0; i < questions!.length; i++) {
      listCorrectOption.push(questions![i].correctOption);
    }

    for (let i = 0; i < listCorrectOption.length; i++) {
      let found = false;
      for (let j = 0; j < asnsweredList.length; j++) {
        if (asnsweredList[j][i] !== undefined) {
          listAwsweredOption[i] = asnsweredList[j][i];
          found = true;
          break;
        }
      }
      if (!found) {
        listAwsweredOption[i] = null;
      }
    }

    let correctCount = 0;
    let wrongCount = 0;
    for (let i = 0; i < listCorrectOption.length; i++) {
      if (listCorrectOption[i] === listAwsweredOption[i]) {
        correctCount++;
      } else if (listAwsweredOption[i] !== null) {
        wrongCount++;
      }
    }
    setIsModalOpen(true);
    setCorrectAnswer(correctCount);
    setWrongAnswer(wrongCount);
  }

  useEffect(() => {
    if (testData) {
      setExamTime(testData.time * 60);
      setTime(testData.time * 60);
    }
  }, [testData]);

  useEffect(() => {
    const calculateProgress = () => {
      const calculatedProgress = 100 - ((examTime - time) / examTime) * 100;
      setProgress(calculatedProgress);
    };
    calculateProgress();
  }, [time]);

  function handleChangeQuestion(index: number) {
    setCurrentQuestion(index);
    setValue(index);
  }

  function handleClickPrev() {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setValue((prev) => prev! - 1);
    }
  }
  function handleClickNext() {
    if (currentQuestion < questions!.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setValue((prev) => prev! + 1);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(timer);
      handleSubmit();
    }
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `Thời gian còn lại: ${minutes} phút ${seconds
      .toString()
      .padStart(2, "0")} giây`;
  };

  const onChange = (e: RadioChangeEvent, key: number) => {
    dispatch(setAnswered({ [key]: e.target.value }));
  };
  return (
    <StylesExam>
      <div className="exam">
        <div className="exam-content">
          <div className="exam-header-mobile">Làm bài thi</div>
          <div className="exam-info">
            <h3>{testData ? testData.name : ""}</h3>
            <p>{formatTime(time)}</p>
            <Progress percent={progress} status="active" />
          </div>
          <div className="exam-desc">
            {questions!.map((item: dataTypes, index: number) => {
              if (index === currentQuestion) {
                return (
                  <div className="exam-ques" key={index}>
                    <p>{`Câu ${index + 1}: ${item.content}`}</p>
                    <Radio.Group
                      onChange={(e) => {
                        onChange(e, index);
                        setValue(index);
                      }}
                      value={currentValue}
                    >
                      <Space direction="vertical">
                        {item.options.map((item: string, index: number) => (
                          <Radio value={index} key={index}>
                            {`${String.fromCharCode(65 + index)}. ${item}`}
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  </div>
                );
              }
            })}
            <div className="exam-action">
              <Button
                className="exam-btn"
                onClick={handleClickPrev}
                disabled={currentQuestion === 0}
              >
                Câu trước
              </Button>
              <Button
                className="exam-btn"
                disabled={currentQuestion === questions!.length - 1}
                onClick={handleClickNext}
              >
                Câu sau
              </Button>
            </div>
          </div>
          <button
            className="btn-moveto"
            onClick={() => setIsModalOpenList(true)}
          >
            Chuyển đến
          </button>
        </div>
        <div className="exam-navbar">
          <div className="question-list">
            {questions!.map((_: dataTypes, index: number) => (
              <ButtonQuestion
                key={index}
                num={index}
                status={index === currentQuestion ? true : false}
                selectedQuestion={selectedList.includes(index) ? true : false}
                onClick={() => handleChangeQuestion(index)}
              />
            ))}
          </div>
          <Button className="btn-submit" onClick={showModal}>
            Nộp bài
          </Button>
        </div>
      </div>
      <Modal
        title="Câu hỏi lý thuyết Javascript cơ bản phần 1"
        open={isModalOpen}
        className="exam-modal"
      >
        <div className="point-detail">
          <div className="point-desc">
            <p>Số câu trả lời đúng: {correctAnswer}</p>
            <p>Số câu trả lời sai: {wrongAnswer}</p>
            <p>
              Số câu chưa trả lời:{" "}
              {questions!.length - correctAnswer - wrongAnswer}
            </p>
            <p>Tổng số câu hỏi: {questions!.length}</p>
          </div>
          <div className="point-total">
            <p>Điểm số: {`${correctAnswer * 10}/${questions!.length * 10}`}</p>
          </div>
        </div>
        <Link to={routes.dashboard}>
          <Button className="btn-reload" onClick={handleReload}>
            Dashboard
          </Button>
        </Link>
      </Modal>
      <Modal
        title="Bạn có chắc chắn muốn nộp bài không?"
        open={isModalOpenConfirm}
        onOk={handleSubmit}
        onCancel={handleCancel}
        className="confirm-modal"
      ></Modal>
      <Modal open={isModalOpenList} className="list-modal">
        <div className="exam-navbar exam-navbar-mobile">
          <div className="question-list">
            {questions!.map((_: dataTypes, index: number) => (
              <ButtonQuestion
                key={index}
                num={index}
                status={index === currentQuestion ? true : false}
                selectedQuestion={selectedList.includes(index) ? true : false}
                onClick={() => {
                  handleChangeQuestion(index);
                  setIsModalOpenList(false);
                }}
              />
            ))}
          </div>
          <div className="btn-exam-action">
            <Button
              className="btn-submit"
              onClick={() => setIsModalOpenList(false)}
            >
              Huỷ
            </Button>
            <Button className="btn-submit" onClick={showModal}>
              Nộp bài
            </Button>
          </div>
        </div>
      </Modal>
    </StylesExam>
  );
}
