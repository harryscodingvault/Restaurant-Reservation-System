import styled from "styled-components";

const Wrapper = styled.section`
  width: 100vw;
  max-width: var(--max-width);
  display: flex;
  flex-wrap: wrap;
  border: 2px solid var(--primary-500);

  @media screen and (min-width: 600px) {
  }

  .text-group {
    width: 50%;
    display: flex;
    flex-direction: row;

    .label {
      color: var(--primary-500);
    }
  }
  .reservation-btn-group {
    width: ;

    .btn {
      width: 33%;
    }
  }
`;

export default Wrapper;
