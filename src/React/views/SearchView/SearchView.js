import React from 'react'
import queryString from 'query-string'

import { FetchData } from '../../components/FetchData'
import { PluginsList } from '../../components/PluginsList'

const SearchView = ({ location }) => (
    <FetchData namespace="searchResults" query={`packages?q=${queryString.parse(location.search).q || ''}&sort=stars&direction=desc`}>
        <PluginsList />
    </FetchData>
)

export default SearchView
