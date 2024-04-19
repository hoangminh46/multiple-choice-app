import { Link } from "react-router-dom";
import routes from "@/config/routes";
import { Button } from "antd";

export default function UserInfo() {
  return (
    <div className="user-mobile user">
      <div className="user-info">
        <Link to={routes.user}>
          <div className="user-image">
            <img src="/src/assets/images/avatar.png" alt="" />
          </div>
        </Link>
        <p>User: thanhnh@gmail.com</p>
        <p>Point: 2488</p>
      </div>
      <Link to={routes.home}>
        <Button className="btn-logout">LOGOUT</Button>
      </Link>
    </div>
  );
}
