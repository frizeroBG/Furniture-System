import React from 'react';
import ReactDOM from 'react-dom';
import './style/site.css';
import './style/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/toastr/build/toastr.min.css'

ReactDOM.render((
    <Router>
        <App />
    </Router>), document.getElementById('root'));
registerServiceWorker();
