import React from 'react'

import { FetchData } from '../../components/FetchData'
import { Plugin } from '../../components/Plugin'

const PluginView = ({ match }) => (
    <FetchData namespace="searchResults" query={`packages/${match.params.owner}/${match.params.repo}`}>
        <Plugin />
    </FetchData>
)

export default PluginView
