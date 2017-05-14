import React from 'react'

const Loader = ({ icon = 'spinner', text = false }) => (
    <div className="overlay"><i className={`fa fa-${icon} fa-spin`} /></div>
)

export default Loader
