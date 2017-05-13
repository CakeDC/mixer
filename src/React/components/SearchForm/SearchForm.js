import React, {Component} from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { withRouter } from 'react-router'
//import Form from 'react-router-form'

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            q: props.q,
        }

        this.submitHandler = this.submitHandler.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(event) {
        const target = event.target
        this.setState({
            [target.name]: target.value
        })
    }

    submitHandler(event) {
        event.preventDefault()
        // do some sort of verification here if you need to
        //this.props.push(`${this.state.where}/${this.state.q}`)
        //const { dispatch } = this.props
        this.props.dispatch(this.props.push(`${this.props.action}?q=${this.state.q}`))
    }

    render() {
        return (
            <form onSubmit={this.submitHandler} action={this.props.action} method="GET" id="search" acceptCharset="utf-8">
                <div className="input-group">
                    <input
                        type="text"
                        name="q"
                        placeholder="Search..."
                        className="input-lg form-control"
                        value={this.state.q}
                        onChange={this.handleInput} />
                    <span className="input-group-btn"><button className="btn-lg btn btn-default" type="submit"><i className="fa fa-search"></i></button></span>
                </div>
            </form>
        );
    }
}

//export default SearchForm

function mapStateToProps(state, ownProps) {
    const { q } = queryString.parse(ownProps.location.search) || {
        q: ''
    }

    return { q }
}

//export default withRouter(connect(mapStateToProps)(SearchForm))
export default withRouter(connect(mapStateToProps)(SearchForm))
