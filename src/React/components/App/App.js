import React from 'react'
import { Link } from 'react-router-dom'

import { SearchForm } from '../SearchForm'

const App = ({ children, push }) => (
    <div>
        <nav className="navbar navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <Link to="/" className="navbar-brand"><img src="/cake_d_c/mixer/img/logo.svg" alt="" /></Link>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/installed">Installed Plugins</Link></li>
                    </ul>
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
