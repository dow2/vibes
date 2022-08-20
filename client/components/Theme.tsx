import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { StyledProvider } from '../styles/material';
import { ThemeContext } from '../context/ThemeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const dark = createTheme({
  palette: {
    primary: {
      main: '#1A2027',
      contrastText: '#F3F3F3',
    },
    secondary: {
      main: '#F3F3F3',
      contrastText: '#1A2027',
    },
    text: {
      primary: '#1A2027',
    },
    mode: 'dark',
  },
});

const light = createTheme({
  palette: {
    primary: {
      main: '#F3F3F3',
      contrastText: '#1A2027',
    },
    secondary: {
      main: '#1A2027',
      contrastText: '#F3F3F3',
    },
    text: {
      primary: '#F3F3F3',
    },
    mode: 'light',
  },
});



const GlobalTheme = createGlobalStyle`

 body {
    font-family: Roboto;
    text-align: center;
    margin: 0;
    height: 100vh;
    background: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }

@media only screen and (min-width: 600px){
body {
  font-family: Roboto;
  text-align: center;
  margin: 0;
  height: 100vh;
  padding-left: 20%;
  padding-right: 20%;
  background: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
}
}

.css-6hp17o-MuiList-root-MuiMenu-list {
  background: ${(props) => props.theme.palette.primary.contrastText};
}

a:-webkit-any-link {
  color: ${(props) => props.theme.palette.primary.main};
}

.css-vj1n65-MuiGrid-root {
margin-top: 20px;
}


  `;

// Global Theme Export
export const Theme = ({ children }) => {
  const themeContext = useContext(ThemeContext);
  const {mode, setMode, toggleMode} = themeContext;
  return (
    <ThemeProvider theme={mode == 'dark' ? dark : light}>
      <StyledProvider theme={mode == 'dark' ? dark : light}>
        <GlobalTheme />
        {children}
      </StyledProvider >
    </ThemeProvider>
  );
};
