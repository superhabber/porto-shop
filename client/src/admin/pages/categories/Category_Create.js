import React, { Component } from 'react'
import Form from './Form'
import axios from 'axios'

export default class Category_Create extends Component {

    state = {}

    onSubmit = async (e) => {
        e.preventDefault()
        
        axios.post(`http://diplom/server/admin/create_category`, JSON.stringify({
            title: e.target.title.value,
            main: e.target.size_type.value,
            parameters: e.target.parameters.value.split(' ')
        }))
            .then(res => {
                this.props.history.push('/admin/categories/' + JSON.parse(res.data).id + "/view")
            })
    }

    render() {
        return (
            <div className="page-wrapper">

                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Create new category</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Categories Create</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">

                    <div className="row">
                        <Form onSubmit={this.onSubmit} />
                    </div>
                </div>
            </div>
        )
    }

}