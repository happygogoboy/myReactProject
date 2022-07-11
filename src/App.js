import 'antd/dist/antd.css'
import Router from './routers'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'; 
import store ,{persistor} from './store/index'
import { PersistGate } from 'redux-persist/integration/react'


function App() {
  return (
   <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Router></Router>
          </BrowserRouter>
        </PersistGate>  
      </Provider>
   </>
  );
}

export default App;
