import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "378355478540-jhsksobrv67ja6nfubsv8asdtrhs0np7.apps.googleusercontent.com"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <GoogleOAuthProvider clientId={clientId}>
      
      <App />
    </GoogleOAuthProvider>
    </PersistGate>
    </Provider>
  </StrictMode>
);
