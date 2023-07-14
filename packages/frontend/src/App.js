import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Promotions from "./Components/Promotions/Promotions";
import Form from "./Components/Form/Form";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E384FF",
    },
    text: {
      primary: "#fff",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#E384FF",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Home />
        <Promotions />
        <Form />
      </div>
    </ThemeProvider>
  );
}

export default App;
