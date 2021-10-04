import "../styles/globals.css";
import { ThemeProvider } from "@mui/styles";
import theme from './theme'
import { Provider } from "react-redux";
import store from "./store";
import "./Styles/D3-style.scss"
import "./Styles/index.scss"

function MyApp({ Component, pageProps }) {
  return (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
  </ThemeProvider>
  )
}

export default MyApp;
