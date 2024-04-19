import styled from "styled-components";

export const StylesNewTest = styled.div`
  flex: 1;
  .user-manager {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #c4c4c4;
    .manager-content {
      flex: 1;
      box-sizing: border-box;
      padding: 20px 60px 0 60px;
      .manager-heading {
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
  }
`;
