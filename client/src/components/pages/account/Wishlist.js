import React, { PureComponent } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'

export default class Wishlist extends PureComponent {

    state = {
        products: [],
        money: cookie.load('money') ? cookie.load('money') : 'uah'
    }

    componentDidMount = async () => {
        await axios.get(`http://diplom/server/wishlist/products?user_id=` + cookie.load('user').id)
            .then(res => {
                this.setState({
                    products: JSON.parse(res.data)
                })
            })

    }

    onWishDelete = async (e, id) => {
        e.preventDefault()
        this.setState({
            products: this.state.products.filter(item => item.id !== id)
        }, async () => {
            await axios.get(`http://diplom/server/wishlist/delete?model_id=` + id + '&user_id=' + cookie.load('user').id)
            
        });
    }

    render() {
        return (
            <div className="Dashboard">
                <div className="row">
                    <h2>Wish List</h2>
                </div>
                <div className="row">
                    <table className="table table-cart">
                        <thead>
                            <tr>
                                <th className="product-col">Product</th>
                                <th className="price-col">Price</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.products &&
                                this.state.products.map((item) =>
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

                                            <td>{this.state.money === 'uah' ? item.new_price + ' UAH' : (item.new_price / 27).toFixed(1) + ' $' }</td>

                                        </tr>
                                        <tr className="product-action-row">
                                            <td colSpan="4" className="clearfix">
                                                <div className="float-left">
                                                    <a href="#" className="btn-move">Remove from Wishlist</a>
                                                </div>

                                                <div className="float-right">
                                                    <a href="" onClick={(e) => this.onWishDelete(e, item.id)} title="Remove product" className="btn-remove"><span className="sr-only">Remove</span></a>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )}

                        </tbody>

                        <tfoot>
                            <tr>
                                <td colSpan="4" className="clearfix">

                                    <div className="float-left">
                                        <Link to="/categories" className="btn btn-outline-secondary">Continue Shopping</Link>
                                    </div>

                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }

}