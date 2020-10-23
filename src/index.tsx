import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import constructors from './constructors/constructors';
import { addText, moveItem, addFigure, addImage, setSlideBg } from './methods/methods';

const settings = constructors.createSettings('800px', '600px');
export let app = constructors.createApp(settings);
app = addText(app);
app = moveItem(app, app.slides[0].objects[0].id, 500, 500);
app = addFigure(app, 'triangle');
app = moveItem(app, app.slides[0].objects[1].id, 300, 300);
app = addImage(app, '/background-1.jpg');
app = setSlideBg(app, '#ccc');

ReactDOM.render(
    <React.StrictMode>
        <App app={app} />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
