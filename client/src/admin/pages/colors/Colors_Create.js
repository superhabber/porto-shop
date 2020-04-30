import React, { Component } from 'react'
import Form from './Form'
import axios from 'axios'

export default class Colors_Create extends Component {

    state = {}
    
    onSubmit = async (e) => {
        e.preventDefault()

        axios.post(`http://diplom/server/admin/create_color`, JSON.stringify({
            name: e.target.name.value,
            value: e.target.value.value
        }))
            .then(res => {
                this.props.history.push('/admin/colors/' + JSON.parse(res.data).id + "/view")
            })
    }

    render() {
        return (
            <div className="create-product">
                <h3>Add new color to library</h3>

                <div className="row">
                    <Form onSubmit={this.onSubmit} />
                </div>
            </div>
        )
    }

}