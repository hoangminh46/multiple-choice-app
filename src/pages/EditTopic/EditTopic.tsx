import { StylesEditTopic } from "@/pages/EditTopic/index";
import { useParams } from "react-router-dom";
import DrawerSide from "@/components/Drawer/Drawer";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IRootState } from "@/redux/reducers";
import { useEffect, useState } from "react";
import { fetchTopicData } from "@/redux/topicSlice";

export default function EditTopic() {
  const dispatch = useDispatch<AppDispatch>();
  const apiTopicData = useSelector(
    (state: IRootState) => state.topic.topicList
  );
  const [topicData, setTopicData] = useState([]);

  const { TopicId } = useParams();

  useEffect(() => {
    dispatch(fetchTopicData());
  }, [dispatch]);

  useEffect(() => {
    setTopicData(apiTopicData);
  }, [apiTopicData]);

  const currentTopic = topicData.find((item) => {
    return item.id === TopicId;
  });

  return (
    <StylesEditTopic>
      <div className="edit-topic">
        <DrawerSide name="Topic Manager">
          <UserNavbar classID={true} />
        </DrawerSide>
        <div>{currentTopic && currentTopic.name}</div>
      </div>
    </StylesEditTopic>
  );
}
