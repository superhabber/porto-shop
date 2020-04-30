import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Orders_Delete } from './Orders_Delete'

import cookie from 'react-cookies'

export default class Orders_View extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.id,
            money: cookie.load('money') ? cookie.load('money') : 'uah'
        }

    }

    delete = async () => {
        await Orders_Delete(this.props, this.state.id)
    }

    componentDidMount = async () => {
        var order, category

        await axios.get(`http://diplom/server/admin/get_order?id=` + this.state.id)
            .then(res => {
                order = JSON.parse(res.data)
            })

        // await axios.get(`http://diplom/server/admin/get_category?id=` + product.category_id)
        //     .then(res => {
        //         category = JSON.parse(res.data)
        //     })
        console.log(order)
        this.setState({
            order: order,
            // category: category
        })
    }

    render() {
        return (
            <div className="page-wrapper">

                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Orders View</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Orders View</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid pt-2 pb-2">
                    {this.state.order &&
                        <>
                            <h3>Order - #{this.state.order.id}</h3>
                            <div className="row mt-1 mb-1 ml-1">
                                <Link to="/admin/orders/" className="btn btn-success btn-sm ml-1 mr-1">
                                    BACK
                            </Link>
                                <Link to={"/admin/orders/" + this.state.order.id + "/edit"} className="btn btn-primary btn-sm ml-1 mr-1">
                                    EDIT
                            </Link>
                                <Link to={"#"} onClick={this.delete} className="btn btn-danger btn-sm mr-1 ml-1">
                                    DELETE
                            </Link>
                            </div>


                            <div className="row">
                                <h4>Information</h4>

                                <table className="table table-hover table-dark">

                                    <tbody>
                                        <tr>
                                            <th scope="row">Name</th>
                                            <td>{this.state.order.username}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td>{this.state.order.email}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">Sum</th>
                                            <td>{this.state.money === 'uah' ? this.state.order.cart_count + ' UAH' : (this.state.order.cart_count / 27).toFixed(1) + ' $'}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Method</th>
                                            <td>{this.state.order.method === 'self' ? 'self-' : 'Nova Poshta'}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">Status</th>
                                            <td>{this.state.order.status}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">Created At</th>
                                            <td>{this.state.order.created_at}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row mt-2">
                                <h4>Order</h4>
                                <table className="table table-cart">
                                    <thead>
                                        <tr>
                                            <th className="product-col">Product</th>
                                            <th className="size-col">Size</th>
                                            <th className="price-col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {JSON.parse(this.state.order.cart).map((item, key) =>
                                            <>
                                                <tr className="product-row" key={key}>

                                                    <td className="product-col row">
                                                        <figure className="product-image-container col-md-4" style={{ border: "none !important" }}>
                                                            <Link to={"/product/" + item.id} className="product-image text-center">
                                                                <img src={"http://diplom/server" + item.image.src} alt={item.title} className="img-fluid" />
                                                            </Link>
                                                        </figure>
                                                        
                                                            <Link to={"/product/" + item.id}><h5 className="product-title">{item.title}</h5></Link>
                                                        
                                                    </td>

                                                    <td> {item.size ? item.size : 'Not selected'} </td>

                                                    <td> {this.state.money === 'uah' ? item.new_price + ' UAH' : (item.new_price / 27).toFixed(1) + ' $'} </td>

                                                </tr>

                                            </>
                                        )}

                                    </tbody>

                                </table>

                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }

}