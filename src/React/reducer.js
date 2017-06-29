import { combineReducers } from 'redux'

import { fetchData } from './components/FetchData/reducers'
import { pluginButtons } from './components/PluginButtons/reducers'
import { bakeryView } from './views/BakeryView/reducers'
import { installedView } from './views/InstalledView/reducers'

export default combineReducers({
    homeTopDownloaded: fetchData('homeTopDownloaded'),
    homeTopStarred: fetchData('homeTopStarred'),
    homeNewPlugins: fetchData('homeNewPlugins'),
    homeNewReleases: fetchData('homeNewReleases'),
    pluginView: fetchData('pluginView'),
    searchResults: fetchData('searchResults'),
    installedPlugins: fetchData('installedPlugins'),
    tables: fetchData('tables'),
    installedView,
    pluginButtons,
    bakeryView,
})
