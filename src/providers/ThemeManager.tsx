import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useState } from "react";
import styled from "styled-components/macro";
import { SwitchWithLabels } from "../components/common/DivStyles";

const ThemeManagerStyles = styled.div`
  .switchWrapper {
    position: fixed;
    top: 4px;
    right: 20px;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
  }
`;

export default function ThemeManager({ children }) {
  const [darkState, setDarkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? `hsl(200,70%,40%)` : `hsl(200,70%,50%)`;
  const mainSecondaryColor = darkState
    ? `hsl(270,50%,45%)`
    : `hsl(270,50%,60%)`;
  const textPrimaryColor = darkState ? `hsl(0,0%,100%)` : `hsl(0,0%,0%)`;
  const textSecondaryColor = darkState ? `hsl(0,0%,90%)` : `hsl(0,0%,10%)`;
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
      text: {
        primary: textPrimaryColor,
        secondary: textSecondaryColor,
      },
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeManagerStyles>
      <ThemeProvider theme={darkTheme}>
        <div className="switchWrapper">
          <SwitchWithLabels
            labelLeft="Light"
            labelRight="Dark"
            className="themeSwitch"
            checked={darkState}
            onChange={handleThemeChange}
          />
        </div>
        {children}
      </ThemeProvider>
    </ThemeManagerStyles>
  );
}