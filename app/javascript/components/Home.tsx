import React from 'react';
import './App.scss';
import Header from "./common/Header";
import Search from "./search/Search";

function App() {
    return (
        <div className="App">
            <Header />
            <Search />
        </div>
    );
}

export default App;
