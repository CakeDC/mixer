import { combineReducers } from 'redux'

import { fetchData } from './components/FetchData/reducers'
import { installButton } from './components/InstallButton/reducers'
import { installedView } from './views/InstalledView/reducers'

export default combineReducers({
    homeTopDownloaded: fetchData('homeTopDownloaded'),
    homeTopStarred: fetchData('homeTopStarred'),
    homeNewPlugins: fetchData('homeNewPlugins'),
    homeNewReleases: fetchData('homeNewReleases'),
    pluginView: fetchData('pluginView'),
    searchResults: fetchData('searchResults'),
    installedPlugins: fetchData('installedPlugins'),
    installedView,
    installButton
})
