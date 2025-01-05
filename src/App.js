import Main from "./components/Main";
import "../src/css/Main.css"
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from "./Context/LoadingContext";

function App() {
  return (
    <>
      <LoadingProvider>
        <BrowserRouter >
          <Main />
        </BrowserRouter>
      </LoadingProvider>
    </>
  );
}

export default App;
