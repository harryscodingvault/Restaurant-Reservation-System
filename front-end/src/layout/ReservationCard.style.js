import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  max-width: var(--max-width);
  display: flex;
  flex-wrap: wrap;
  border: 2px solid var(--primary-500);
  padding: 0.5rem 0;

  .info {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    @media screen and (min-width: 900px) {
      width: 60%;
    }
    .text-group {
      width: 50%;
      display: flex;
      flex-direction: row;
      padding-left: 0.5rem;
      @media screen and (min-width: 600px) {
        padding-left: 1rem;
        width: 30%;
      }
      .label {
        color: var(--primary-500);
      }
    }
  }

  .reservation-btn-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 900px) {
      width: 40%;
    }
  }
`;

export default Wrapper;
