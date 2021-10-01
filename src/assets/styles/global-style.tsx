import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    overflow: hidden;
    background-color: ${(props) => props.theme.color.background};
    font-family: "Segoe UI";
    height:100%;
    overflow-y:scroll;
  }

`;

export default GlobalStyle;
