import React from 'react'
import { NavLink } from 'react-router-dom'

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
                    <NavLink to="/" className="navbar-brand"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTYuODcgMzIuMDEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48dGl0bGU+QXJ0Ym9hcmQgODE8L3RpdGxlPjxnIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTUxLjk0LDMyVi41Nmg2LjkyVjMyWiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTg2LjM1LDMyLDc5LjMsMjEuMjMsNzIuMiwzMkg2NC4zNGwxMS0xNkw2NC43OS41Nmg4LjA5bDYuNiwxMC4yTDg2LjEyLjU2SDk0TDgzLjQ3LDE1LjkzLDk0LjQzLDMyWiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTk5LjYsMzJWLjU2aDIzLjcyVjYuNzJIMTA2LjQ3VjEzLjFoMTQuODJ2Ni4xNUgxMDYuNDd2Ni42aDE3LjA3VjMyWiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE0OC43OCwzMiwxNDIsMjEuOTRoLTUuNDRWMzJoLTYuOTJWLjU2aDE0LjM3YzcuNDEsMCwxMS44NiwzLjkxLDExLjg2LDEwLjM4VjExYTkuNzYsOS43NiwwLDAsMS02Ljc0LDkuNzVMMTU2Ljg3LDMyWm0uMTMtMjAuNzFjMC0zLTIuMDctNC40OS01LjQzLTQuNDloLTYuODd2OWg3YzMuMzcsMCw1LjMtMS44LDUuMy00LjQ1WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQwLDMyaDdjMC0xNy42NS0xMC41My0zMi0yMy40Ny0zMlMwLDE0LjM2LDAsMzJIN2MwLTkuNDUsMy42Ny0xOC4xNiw4LjkxLTIyLjU4QzEzLjM2LDE3LjQ4LDEzLjE3LDI4Ljc3LDEzLjE3LDMyaDdjMC0xMiwxLjg4LTIxLjE4LDMuMzMtMjQuMjlDMjQuOTIsMTAuODIsMjYuOCwyMCwyNi44LDMyaDdjMC0zLjI0LS4xOS0xNC41My0yLjcxLTIyLjU4QzM2LjMsMTMuODUsNDAsMjIuNTYsNDAsMzJaIi8+PC9nPjwvc3ZnPg==" alt="" /></NavLink>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><NavLink to="/kitchen" activeClassName="active">Kitchen</NavLink></li>
                        <li><NavLink to="/installed" activeClassName="active">Installed Plugins</NavLink></li>
                        <li><NavLink to="https://github.com/FriendsOfCake/awesome-cakephp">Awesome-List</NavLink></li>
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
