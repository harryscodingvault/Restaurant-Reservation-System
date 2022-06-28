import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  .dashboard-current-date {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  }
  .dashboard-switch {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dashboard-button-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

export default Wrapper;
