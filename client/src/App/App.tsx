import { RouterProvider } from "./providers/RouterProvider";
import { ThemeUiProvider } from "./providers/ThemeUiProvider";
import "styles/styles.css";

import { Provider } from "react-redux";
import { store } from "@/store/store";
function App() {
  return (
    <ThemeUiProvider>
      <Provider store={store}>
        <RouterProvider />
      </Provider>
    </ThemeUiProvider>
  );
}

export default App;
