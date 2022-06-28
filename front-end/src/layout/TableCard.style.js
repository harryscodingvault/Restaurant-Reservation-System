import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    .text-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 33%;

      .label {
        color: var(--primary-500);
      }
    }
  }
`;

export default Wrapper;
