import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FetchData } from '../../components/FetchData'
import { TablesList } from '../../components/TablesList'
import { bake } from './actions'

class BakeryView extends Component {
    constructor(props) {
        super(props)

        this.handleBake = this.handleBake.bind(this)
    }

    handleBake(event) {
        event.preventDefault()

        const { dispatch, tables } = this.props

        //if (window.confirm('Are you sure you want to install ' + data.name + '?')) {
        dispatch(bake(tables))
        //}
    }

    render() {
        const { isFetching = false } = this.props

        return <div>
            <a href="" className="btn btn-default btn-sm pull-right">Check All</a>
            <h3>Bakery</h3>
            <p>We've found the following tables in your database. Here you can generate skeleton application code for them.</p>
            <FetchData namespace="tables" query="tables.json">
                <TablesList />
            </FetchData>
            <button className="btn btn-primary btn-social btn-install btn-lg" onClick={this.handleBake}>
                <i className="fa fa-birthday-cake" /><span>Bake</span>
            </button>
            {isFetching && <div className="global-overlay" key="loader"><div><h3>Please wait, it might take a bit...</h3><i className="fa fa-cog fa-spin fa-3x fa-fw" /></div></div>}
        </div>
    }
}

function mapStateToProps(state, ownProps) {
    //const { data  } = ownProps;

    const { isFetching } = state.bakeryView || {
        isFetching: false
    }

    return { isFetching }
}

export default connect(mapStateToProps)(BakeryView)
