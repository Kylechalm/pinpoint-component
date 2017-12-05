import React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css';
import './index.css';
import Pinpoint from './Pinpoint';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Pinpoint />, document.getElementById('root'));
registerServiceWorker();
