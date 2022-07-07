import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  height: 1.5rem;
  background-color: var(--primary-500);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-width: var(--max-width);
  margin: 0 auto;
  p {
    font-family: inherit;
    margin: 0;
    padding: 0;
  }
`;

export default Wrapper;
