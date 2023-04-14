
import './App.css';
import {Routes,Route} from "react-router-dom"
import Join from "./components/Join/Join";


function App() {

  return (
    <div className="App">
  <Routes>
    <Route path="/" element={<Join />}></Route>
    <Route path="/chat" ></Route>
  </Routes>
    </div>
  );
}

export default App;
