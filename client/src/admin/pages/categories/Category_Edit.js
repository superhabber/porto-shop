import React, { PureComponent } from 'react'

import axios from 'axios'
import Form from './Form'

export default class Category_Edit extends PureComponent {

    state = {
        category: []
    }

    componentDidMount = async () => {
        await axios.get(`http://diplom/server/admin/get_category?id=` + this.props.match.params.id)
            .then(res => {
                this.setState({
                    category: JSON.parse(res.data),
                    parameters: JSON.parse( JSON.parse(res.data).parameters ).join(' ')
                })
            })
    
}

onSubmit = async (e) => {
    e.preventDefault()

    axios.post(`http://diplom/server/admin/update_category`, JSON.stringify({
        id: this.state.category.id,
        title: e.target.title.value,
        main: e.target.size_type.value
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
                        <h4 className="page-title">Update Category</h4>
                        <div className="ml-auto text-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Categories Update</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <Form
                    category={this.state.category}
                    onSubmit={this.onSubmit}
                    parameters={this.state.parameters}
                />
            </div>
        </div>
    )
}

}