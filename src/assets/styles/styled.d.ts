import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      background: string;
      white: string;
      skyblue: string;
      hoverSkyblue: string;
      black: string;
      link: string;
      lineGray: string;
      gray: string;
      red: string;
      hashtag: string;
    };
  }
}
