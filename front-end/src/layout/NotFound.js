import React from "react";

/**
 * Defines the "Not Found" page that is displayed for any unmatched route.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
import Wrapper from "./NotFound.style";

function NotFound() {
  return (
    <Wrapper className="NotFound">
      <h1>Not Found</h1>
    </Wrapper>
  );
}

export default NotFound;
