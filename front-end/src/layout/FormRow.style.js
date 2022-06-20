import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  background-color: var(--grey-700);
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 6vw;
    cursor: pointer;
  }
  ul {
    display: flex;
    flex-direction: column;

    li {
      width: 100%;
      padding: 0.5rem;
      margin: 0.1rem;
      cursor: pointer;
      :hover {
        background-color: var(--primary-500);
      }
    }
  }
`;

export default Wrapper;
