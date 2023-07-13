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
          color: '#E384FF', // Replace with your desired color
        },
      },
    },
  },
});

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Promotions />
      <ThemeProvider theme={theme} >
        <Form/>
      </ThemeProvider>
    </div>
  );
}

export default App;
