import styled from "styled-components";
import { device } from "@/style/breakpoint";

export const StylesHome = styled.div`
  .home {
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url("/src/assets/images/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  @media ${device.sm} {
    .home {
      background-position: 12%;
    }
  }
`;
