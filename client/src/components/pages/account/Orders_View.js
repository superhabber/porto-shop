import React, { PureComponent } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'

class Orders_View extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.id,
            money: cookie.load('money') ? cookie.load('money') : 'uah'
        }
    }

    componentDidMount = async () => {
        await axios.get(`http://diplom/server/orders/select?id=` + this.state.id)
            .then(res => {
                var data = JSON.parse(res.data)
                if (data.email !== cookie.load('user').email)
                    return this.props.history.push('/')
                this.setState({ order: data })
            })
    }

    render() {
        return (
            <div>
                {this.state.order &&
                    <>
                        <div className="row">
                            <h3>Order #{this.state.order.id}</h3>
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
                                            <tr className="product-row">

                                                <td className="product-col row">
                                                    <figure className="product-image-container col-md-4" style={{ border: "none !important" }}>
                                                        <Link to={"/product/" + item.id} className="product-image text-center">
                                                            <img src={"http://diplom/server" + item.image.src} alt={item.title} />
                                                        </Link>
                                                    </figure>
                                                    <h2 className="product-title">
                                                        <Link to={"/product/" + item.id}>{item.title}</Link>
                                                    </h2>
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
        )
    }

}

export default withRouter(Orders_View)