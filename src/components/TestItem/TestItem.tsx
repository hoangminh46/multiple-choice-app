import { StylesTestItem } from "@/components/TestItem/styles/index";
import StarIcon from "@/components/StarIcon/StarIcon";
import { Link } from "react-router-dom";
import routes from "@/config/routes";

export default function TestItem({
  id,
  heading,
  time,
}: {
  heading: string;
  time: number;
}) {
  return (
    <StylesTestItem className="test-item">
      <div className="test-item">
        <Link to={`${routes.exam}/${id}`} className="item-name">
          {heading}
        </Link>
        <div className="item-info">
          <div className="item-time">
            <img src="/src/assets/images/clock.svg" alt="" />
            <p>{time} phút</p>
          </div>
          <div className="item-grade">
            <img src="/src/assets/images/huychuong.svg" alt="" />
            <p>200 điểm</p>
          </div>
        </div>
        <div className="item-star">
          <StarIcon color="#909090" />
          <StarIcon color="#909090" />
          <StarIcon color="#909090" />
          <StarIcon color="#909090" />
          <StarIcon color="#D9D9D9" />
        </div>
      </div>
    </StylesTestItem>
  );
}
