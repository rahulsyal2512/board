import React from "react";
import WrapperComponent from "./modules/components/WrapperComponent";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./modules/reducers/rootReducer";
import ErrorBoundary from "./modules/components/ErrorBoundary";

const store = createStore(rootReducer);

store.subscribe(() => {
  localStorage.setItem("task", JSON.stringify(store.getState().tasks));
});

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <WrapperComponent />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
