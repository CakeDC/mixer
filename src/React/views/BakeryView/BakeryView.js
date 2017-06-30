import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FetchData } from '../../components/FetchData'
import { TablesList } from '../../components/TablesList'
import { bake, updateBakeEnabled } from './actions'

class BakeryView extends Component {
    constructor(props) {
        super(props)

        this.onSelectionChange = this.onSelectionChange.bind(this)
        this.handleBake = this.handleBake.bind(this)
        this.handleCheckAll = this.handleCheckAll.bind(this)
    }

    handleBake(event) {
        event.preventDefault()

        const { dispatch } = this.props

        dispatch(bake(this.form))
    }

    handleCheckAll(event) {
        event.preventDefault()

        Array.from(this.form.getElementsByTagName('input')).forEach((input) => { if (!input.checked) input.click() })

        this.onSelectionChange()
    }

    onSelectionChange() {
        const { dispatch } = this.props

        if (this.form !== undefined) {
            const enabled = (Array.from(this.form.getElementsByTagName('input')).findIndex((input) => input.checked) !== -1)

            dispatch(updateBakeEnabled(enabled))
        }
    }

    render() {
        const { isFetching = false, enabled = false } = this.props

        return <form action="" ref={(form) => { this.form = form }}>
            <a href="" className="btn btn-default btn-sm pull-right" onClick={this.handleCheckAll}>Check All</a>
            <h3>Baking Room</h3>
            <p>We've found the following tables in your database. Here you can generate skeleton application code for them.</p>
            <FetchData namespace="tables" query="tables.json">
                <TablesList onSelectionChange={this.onSelectionChange} />
            </FetchData>
            <button className="btn btn-primary btn-social btn-install btn-lg" onClick={this.handleBake} disabled={!enabled}>
                <i className="fa fa-birthday-cake" /><span>Bake</span>
            </button>
            {isFetching && <div className="global-overlay" key="loader"><div><h3>Please wait, it might take a bit...</h3><i className="fa fa-cog fa-spin fa-3x fa-fw" /></div></div>}
        </form>
    }
}

function mapStateToProps(state, ownProps) {
    const { isFetching, enabled } = state.bakeryView || {
        isFetching: false,
        enabled: false
    }

    return { isFetching, enabled }
}

export default connect(mapStateToProps)(BakeryView)
