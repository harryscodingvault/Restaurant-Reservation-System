import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid var(--primary-500);
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .text-group {
    width: 50%;
    display: flex;
    flex-direction: row;

    p {
      padding-left: 0.5rem;
    }
    .label {
      color: var(--primary-500);
    }
  }
`;

export default Wrapper;
