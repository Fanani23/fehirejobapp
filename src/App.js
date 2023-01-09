import React from "react";
import Router from "./routes";
import { Provider } from "react-redux";
import store from "./configs/redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
