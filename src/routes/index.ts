import UserManager from "@/components/UserManager/UserManager";
import routesConfig from "@/config/routes";
import UserLayout from "@/layout/userLayout/UserLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Exam from "@/pages/Exam/Exam";
import Home from "@/pages/Home/Home";
import ListTopic from "@/pages/ListTopic/ListTopic";
import NewTest from "@/pages/NewTest/NewTest";
import NewTopic from "@/pages/NewTopic/NewTopic";
import TestManager from "@/pages/TestManager/TestManager";

const publicRoutes = [
  { path: routesConfig.home, components: Home },
  { path: routesConfig.dashboard, components: Dashboard },
  { path: routesConfig.user, components: UserManager, layout: UserLayout },
  { path: routesConfig.testQuiz, components: UserManager, layout: UserLayout },
  { path: routesConfig.newTest, components: NewTest, layout: UserLayout },
  {
    path: routesConfig.testManager,
    components: TestManager,
    layout: UserLayout,
  },
  { path: "/exam/:ExamId", components: Exam },
  { path: routesConfig.listTopic, components: ListTopic, layout: UserLayout },
  { path: routesConfig.newTopic, components: NewTopic, layout: UserLayout },
];

export { publicRoutes };
