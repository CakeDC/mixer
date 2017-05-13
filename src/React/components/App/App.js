import React from 'react'
//import logo from './logo.svg';
//import './App.css'
import { Link } from 'react-router-dom'

import { SearchForm } from '../SearchForm'

const App = ({ children, push }) => (
    <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <Link to="/" className="navbar-brand">Mixer</Link>
                </div>
                <div id="navbar" className="collapse navbar-collapse">
                </div>
            </div>
        </nav>
        <div className="container">
            <div className="starter-template">
                <SearchForm action="/search" push={push} />
                {children}
            </div>
        </div>
    </div>
)

export default App
