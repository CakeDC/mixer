import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducer'


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory({ basename: '/mixer' })

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        middleware
    )
)

export { store, history }
