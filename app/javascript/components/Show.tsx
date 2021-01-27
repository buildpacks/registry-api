import React from 'react';
import './App.scss';
import Header from "./common/Header";
import Detail from "./buildpack/Detail";

function App() {
    return (
        <div className="App">
            <Header />
            <Detail />
        </div>
    );
}

export default App;
