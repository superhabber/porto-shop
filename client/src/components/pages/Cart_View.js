import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'

export default class Cart_View extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            cart: [],
            cart_count: 0,
            money: cookie.load('money') ? cookie.load('money') : 'uah'
        }
    }

    componentWillMount = () => {
        this.setState({ cart: cookie.load('cart'), cart_count: cookie.load('cart_count') })
    }

    updateCart = (e) => {
        e.preventDefault()
        this.componentWillMount()
    }

    onCartDelete = (e, key) => {
        this.props.onCartDelete(e, key)

        var deleted = this.state.cart.splice(key, 1)

        var newcart = this.state.cart

        this.setState({
            cart: newcart,
            cart_count: Number(this.state.cart_count) - Number(deleted[0].new_price)
        }, function () {
            cookie.save('cart', this.state.cart, { path: '/' })
            cookie.save('cart_count', this.state.cart_count, { path: '/' })
        })
    }

    render() {
        return (
            <main className="main">
                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                        </ol>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="cart-table-container">
                                <table className="table table-cart">
                                    <thead>
                                        <tr>
                                            <th className="product-col">Product</th>
                                            <th className="size-col">Size</th>
                                            <th className="price-col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.cart &&
                                            this.state.cart.map((item, key) =>
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

                                                    <tr className="product-action-row">
                                                        <td colSpan="4" className="clearfix">
                                                            <div className="float-left">
                                                                <a href="#" className="btn-move">Move to Wishlist</a>
                                                            </div>

                                                            <div className="float-right">
                                                                <a href="" onClick={(e) => this.onCartDelete(e, key)} title="Remove product" className="btn-remove"><span className="sr-only">Remove</span></a>
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

                                                <div className="float-right ml-1">
                                                    <a href="" onClick={this.updateCart} className="btn btn-outline-secondary btn-update-cart">Update Shopping Cart</a>
                                                </div>

                                                {/* <div className="float-right">
                                                    <a href="#" className="btn btn-outline-secondary btn-clear-cart">Clear Shopping Cart</a>
                                                </div> */}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="cart-discount">
                                <h4>Apply Discount Code</h4>
                                <form action="#">
                                    <div className="input-group">
                                        <input type="text" className="form-control form-control-sm" placeholder="Enter discount code" required />
                                        <div className="input-group-append">
                                            <button className="btn btn-sm btn-primary" type="submit">Apply Discount</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>

                        <div className="col-lg-4">
                            <div className="cart-summary">
                                <h3>Summary</h3>

                                <table className="table table-totals">
                                    <tbody>
                                        <tr>
                                            <td>Subtotal</td>
                                            <td>{this.state.cart_count}</td>
                                        </tr>

                                        <tr>
                                            <td>Tax</td>
                                            <td>$0.00</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>Order Total</td>
                                            <td>{this.state.money === 'uah' ? this.state.cart_count + ' UAH' : (this.state.cart_count / 27).toFixed(1) + ' $'}</td>
                                        </tr>
                                    </tfoot>
                                </table>

                                <div className="checkout-methods">
                                    {cookie.load('user') ?
                                        <Link to="/account/checkout" className="btn btn-block btn-sm btn-primary">Go to Checkout</Link>
                                        :
                                        <a data-mfp-src="#login-modal" className="modal-btn btn btn-block btn-sm btn-primary" style={{ cursor: "pointer", color: "white"}}>login to do checkout</a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6"></div>
            </main>
        )
    }

}