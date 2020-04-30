import React, { PureComponent } from 'react'

import axios from 'axios'

import { Chart } from "react-google-charts";

export default class Index extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            user_count: 0,
            order_count: 0,
            products_count: 0,
            reviews_count: 0,
            chart: []
        }
    }

    componentDidMount = async () => {
        await axios.get(`http://diplom/server/dashboard/counts`)
            .then(res => {
                var data = JSON.parse(res.data)
                this.setState({
                    user_count: data.user,
                    order_count: data.orders,
                    products_count: data.products,
                    reviews_count: data.reviews,
                    chart: data.chart
                })
            })
    }

    render() {
        return (
            <div className="page-wrapper">

                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Dashboard</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-md-flex align-items-center">
                                        <div>
                                            <h4 className="card-title">Orders Analysis</h4>
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col-lg-9">
                                            <div className="flot-chart">

                                                <Chart
                                                    style={{height:"100%", width: "100%"}}
                                                    chartType="Bar"
                                                    loader={<div>Loading Chart</div>}
                                                    data={
                                                        this.state.chart
                                                    }
                                                    
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-3">
                                            <div className="row">
                                                <div className="col-6 mb-1 mt-1 pt-1 pb-1">
                                                    <div className="bg-dark p-10 text-white text-center">
                                                        <i className="fa fa-user m-b-5 font-16"></i>
                                                        <h5 className="m-b-0 m-t-5">{this.state.user_count}</h5>
                                                        <small className="font-light">Total Users</small>
                                                    </div>
                                                </div>

                                                <div className="col-6 mb-1 mt-1 pt-1 pb-1">
                                                    <div className="bg-dark p-10 text-white text-center">
                                                        <i className="fa fa-tag m-b-5 font-16"></i>
                                                        <h5 className="m-b-0 m-t-5">{this.state.order_count}</h5>
                                                        <small className="font-light">Total Orders</small>
                                                    </div>
                                                </div>

                                                <div className="col-6 mb-1 mt-1 pt-1 pb-1">
                                                    <div className="bg-dark p-10 text-white text-center">
                                                        <i className="fa fa-tag m-b-5 font-16"></i>
                                                        <h5 className="m-b-0 m-t-5">{this.state.products_count}</h5>
                                                        <small className="font-light">Products</small>
                                                    </div>
                                                </div>

                                                <div className="col-6 mb-1 mt-1 pt-1 pb-1">
                                                    <div className="bg-dark p-10 text-white text-center">
                                                        <i className="fa fa-tag m-b-5 font-16"></i>
                                                        <h5 className="m-b-0 m-t-5">{this.state.reviews_count}</h5>
                                                        <small className="font-light">Reviews</small>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


            </div>

        )
    }

}