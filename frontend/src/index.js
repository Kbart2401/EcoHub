import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.css';

import configureStore from './store'

const store = configureStore();

const theme = extendTheme({
  colors: {
    brand:{
      50: '#718096',   //Gray 
      100: 'tomato',  
      500: '#276749'   //Green
    },
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true} theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
