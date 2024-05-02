import { Link, NavLink } from "react-router-dom";
import routes from "@/config/routes";
import { Button } from "antd";
import { StylesUserNavbar } from "@/components/UserNavbar/style/index";
import UserSettingIcon from "@/components/UserSettingIcon/UserSettingIcon";
import QuestionIcon from "@/components/QuestionIcon/QuestionIcon";
import TestQuizIcon from "@/components/TestQuizIcon/TestQuizIcon";

export default function UserNavbar({ classID }: { classID?: boolean }) {
  return (
    <StylesUserNavbar className={classID ? "user-navbar-mobile" : ""}>
      <div className="user-navbar">
        <div className="user-info">
          <div className="user-image">
            <img src="/src/assets/images/avatar.png" alt="" />
          </div>
          <NavLink
            to={routes.user}
            className={({ isActive }) => (isActive ? "active-nav" : "")}
          >
            <div className="user-action">
              <UserSettingIcon />
              <p>User Manager</p>
            </div>
          </NavLink>
          <NavLink
            to={routes.testManager}
            className={({ isActive }) => (isActive ? "active-nav" : "")}
          >
            <div className="user-action">
              <QuestionIcon />
              <p>Test Manager</p>
            </div>
          </NavLink>
          <NavLink
            to={routes.listTopic}
            className={({ isActive }) => (isActive ? "active-nav" : "")}
          >
            <div className="user-action">
              <TestQuizIcon />
              <p>Topic Manager</p>
            </div>
          </NavLink>
        </div>
        <Link to={routes.home}>
          <Button className="btn-logout">LOGOUT</Button>
        </Link>
      </div>
    </StylesUserNavbar>
  );
}
