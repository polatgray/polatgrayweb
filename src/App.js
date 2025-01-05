import Main from "./components/Main";
import "../src/css/Main.css"
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter >
        <Main />
      </BrowserRouter>
    </>
  );
}

export default App;
