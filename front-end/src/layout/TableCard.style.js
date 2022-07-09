import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 30rem;
  border: 2px solid var(--primary-500);
  padding-bottom: 0.5rem;
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
      padding-left: 0.5rem;
      p {
        padding: 0;
        margin: 0;
      }

      .label {
        color: var(--primary-500);
      }
    }
  }
`;

export default Wrapper;
