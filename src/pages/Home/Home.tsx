import Login from "@/components/Login/Login";
import { StylesHome } from "./style";

export default function Home() {
  return (
    <StylesHome>
      <div className="home">
        <Login />
      </div>
    </StylesHome>
  );
}
