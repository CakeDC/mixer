import { combineReducers } from 'redux'

import { fetchData } from './components/FetchData/reducers'

export default combineReducers({
    homeTopDownloaded: fetchData('homeTopDownloaded'),
    homeTopStarred: fetchData('homeTopStarred'),
    homeNewPlugins: fetchData('homeNewPlugins'),
    homeNewReleases: fetchData('homeNewReleases'),
    pluginView: fetchData('pluginView'),
    searchResults: fetchData('searchResults'),
})
