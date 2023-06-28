import "./App.css";

import Header from "./Components/Header/Header"
import Home from "./Components/Home/Home";
import Promotions from "./Components/Promotions/Promotions";
import Form from "./Components/Form/Form";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
      <Promotions></Promotions>
      <Form></Form>
    </div>
  );
}

export default App;
