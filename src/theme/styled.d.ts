import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      defaultTextColor: string;
      grayText: string;
      blue: string;
      darkBlue: string;
      borderDarkBlue: string;
      shadowColor: string;
      borderColor: string;
      backgroundLightColor: string;
      backgroundLightBlueColor: string;
      fieldBorder: string;
      sideDarkBlue: string;
      statusBlue: string;
      statusBlueBackground: string;
      statusBlueBorder: string;
      transparent: string;
      inherit: string;
      red: string;
      darkRed: string;
      lightBorder: string;
      lightGray: string;
    };
    fontSizes: {
      xxs: number;
      xs: number;
      sm: number;
      md: number;
      xl: number;
      lg: number;
      xxl: number;
    };
    fonts: {};
  }
}
