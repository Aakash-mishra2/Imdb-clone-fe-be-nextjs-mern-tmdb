import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom';
import './index.css'
import { Provider } from 'react-redux';
//@ts-ignore
import { store } from './store/index.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
      <Provider store={store}>
        <App />
    </Provider>
  </HashRouter>,
)
