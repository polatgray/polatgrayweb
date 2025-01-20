import Main from "./components/Main";
import "../src/css/Main.css"
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from "./Context/LoadingContext";
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/react"


function App() {
  return (
    <>
        <Toaster />
        <LoadingProvider>
            <BrowserRouter >
              <Main />
            </BrowserRouter>
          </LoadingProvider>
    </>
  );
}

export default App;
