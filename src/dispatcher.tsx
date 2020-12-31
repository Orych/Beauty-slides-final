import React from 'react';
import { AppType, History } from './model/model';
import ReactDOM from 'react-dom';
import App from './App';
import { cloneApp } from './methods/secondaryMethods';
import { exportApp, exportPDF, deleteSlideObject, copyObject, pasteObject } from './methods/methods';
import constructors from './constructors/constructors';
import ContextButton from './view/Topbar/components/ContextButton';

let globalState: AppType | null = null;
const undoStack: History = [];
const redoStack: History = [];

function dispatch(fn: Function, payload: object | string | null | number = null): void {
    if (globalState) undoStack.push(cloneApp(globalState));
    globalState = fn(globalState, payload);
    if (globalState != null) {
        renderApp(globalState);
        window.localStorage.setItem('app', JSON.stringify(globalState));
    } else throw new Error('Trying to dispatch with empty state of app!');
}

function init(state: AppType): void {
    globalState = state;
    renderApp(state);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'z' && (e.metaKey || e.ctrlKey)) {
            if (e.shiftKey) redo();
            else undo();
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            dispatch(deleteSlideObject);
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'c' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            dispatch(copyObject);
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'v' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            dispatch(pasteObject);
        }
    });
}

function undo(): void {
    if (undoStack.length && globalState) {
        redoStack.push(cloneApp(globalState))
        globalState = undoStack[undoStack.length - 1];
        undoStack.splice(undoStack.length - 1);
        renderApp(globalState)
    }
}

function redo(): void {
    if (redoStack.length && globalState) {
        undoStack.push(cloneApp(globalState))
        globalState = redoStack[redoStack.length - 1];
        redoStack.splice(redoStack.length - 1);
        renderApp(globalState)
    }
}

const settings = constructors.createSettings();
const Context = React.createContext(settings);

function renderApp(state: AppType): void {
    ReactDOM.render(
        <React.StrictMode>
            <Context.Provider value={state.settings}>
                <App app={state} />
            </Context.Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

function exportAppLocally(): void {
    console.log(globalState);
    if (globalState) exportApp(globalState);
}

export function exportPDFApp() {
    if (globalState) exportPDF(globalState);
}

export { init, dispatch, undo, redo, exportAppLocally, Context }