import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  max-width: var(--max-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  @media screen and (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  h2 {
    font-size: 6vw;
    cursor: pointer;
    @media screen and (min-width: 600px) {
      font-size: 2rem;
    }
  }
  ul {
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 600px) {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
    }

    li {
      width: 100%;
      padding: 0.5rem;
      margin: 0.1rem;
      cursor: pointer;
      :hover {
        background-color: var(--primary-400);
      }
      @media screen and (min-width: 600px) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

export default Wrapper;
