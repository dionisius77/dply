import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRouter from "./dply/AppRouter";
import store from "./dply/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
