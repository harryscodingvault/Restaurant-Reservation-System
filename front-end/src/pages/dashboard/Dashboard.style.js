import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--max-width);
  .dashboard-current-date {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  }

  .dashboard-button-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 1rem;
    margin-bottom: 2rem;
    @media screen and (min-width: 600px) {
      width: 400px;
      margin: auto;
    }
    .btn {
      width: 90%;
    }
  }
`;

export default Wrapper;
