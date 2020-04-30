import React, { Component } from 'react'
import cookie from 'react-cookies'

export default class Index extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            user: cookie.load('user')
        }
    }

    render() {
        return (
            <div className="Dashboard">
                <div className="row">
                    <h2>
                        {this.state.user.username}
                    </h2>
                </div>
                <div className="row">
                    <h4>
                        email: {this.state.user.email}
                    </h4>
                </div>
            </div>
        )
    }

}