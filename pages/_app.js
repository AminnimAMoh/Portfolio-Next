import "../styles/globals.css";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import theme from './theme'
import { Provider } from "react-redux";
import store from "./store";
import "./Styles/D3-style.scss"
import "./Styles/index.scss"

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
        <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
