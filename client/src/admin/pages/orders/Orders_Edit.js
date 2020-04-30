import React, { PureComponent } from 'react'
import Form from './Form'
import axios from 'axios'

import { withRouter } from 'react-router-dom';

class Orders_Edit extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            order: []
        }
    }

    componentWillMount = async () => {
        var order, statuses

        await axios.get(`http://diplom/server/admin/get_order?id=` + this.props.match.params.id)
            .then(res => {
                order = JSON.parse(res.data)  
            })

        await axios.get(`http://diplom/server/admin/all_statuses`)
            .then(res => {
                statuses = JSON.parse(res.data)
            })

        this.setState({
            order: order,
            statuses: statuses
        })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`http://diplom/server/admin/update_order`, JSON.stringify({
            username: e.target.username.value,
            email: e.target.email.value,
            status: e.target.status.value,
            id: this.state.order.id
        }))
            .then(res => {
                this.props.history.push('/admin/orders/' + JSON.parse(res.data).id + "/view")
            })
    }


    render() {
        return (
            <div className="page-wrapper">

                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Update product: {this.props.match.params.id}</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Orders Edit</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">

                    <div className="row">
                        <Form
                            onSubmit={this.onSubmit}
                            onChange={this.onChange}
                            statuses={this.state.statuses}
                            order={this.state.order}

                        />
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Orders_Edit)