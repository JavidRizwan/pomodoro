import Pomodoro from "./components/Pomodoro.js";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App container-md">
      <h1>Pomodoro Clock</h1>
      <div className="row"></div>
      <Pomodoro />
    </div>
  );
}

export default App;
