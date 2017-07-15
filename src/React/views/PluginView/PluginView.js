import React from 'react'

import { FetchData } from '../../components/FetchData'
import { Plugin } from '../../components/Plugin'

const PluginView = ({ match, location }) => {
    let query = `${window.apiUrl}/packages/${match.params.owner}/${match.params.repo}`

    return <FetchData namespace="searchResults" query={query}>
        <Plugin />
    </FetchData>
}

export default PluginView
