import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { store, persistor } from 'state/store';
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import 'fonts/font.css'
const theme = createTheme(
  {
    typography: {
      allVariants: {
        fontFamily: "regular"
      }
    },
    palette: {
      primary: { main: "#002c5f" },
    },
  },
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </StoreProvider>
);
reportWebVitals();
