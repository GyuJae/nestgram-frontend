import React from "react";
import styled from "styled-components";
import { SLink } from "../assets/styled-componet/SLink";

interface ICaption {
  caption: string;
}

const CaptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  font-size: 11px;
  font-weight: 400;
`;

const SSLink = styled(SLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.hashtag};
  &:hover {
    text-decoration: underline;
  }
`;

const Caption: React.FC<ICaption> = ({ caption }) => {
  return (
    <CaptionContainer>
      {caption.split(" ").map((text) =>
        text.startsWith("#") ? (
          <>
            <React.Fragment>
              <SSLink to={`/hashtag/${text.slice(1)}`}>{text}</SSLink>
            </React.Fragment>
            &nbsp;
          </>
        ) : (
          <>
            <React.Fragment>{text} </React.Fragment>{" "}
          </>
        )
      )}
    </CaptionContainer>
  );
};

export default Caption;
