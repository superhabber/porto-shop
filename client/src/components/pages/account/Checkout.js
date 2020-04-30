import React, { PureComponent } from 'react'

import cookie from 'react-cookies'
import { Link, withRouter } from 'react-router-dom'

import axios from 'axios'

import ApiNovaPochta from 'yz-react-deliveri-newpochta';

class Checkout extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            fields: cookie.load('user'),
            money: cookie.load('money') ? cookie.load('money') : 'uah',
            np_cities: {data: []},
            show_np: false
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount = async () => {
        const apiKey = '12c4727454965c1851427504121a070c';

        const cb = (data) => {
            this.setState({
                np_cities: data
            })
        };

        const np = new ApiNovaPochta;
        await np.getCities(cb, apiKey);
    }

    onSubmit(e) {
        e.preventDefault()

        const order = {
            username: e.target.first_name.value + ' ' + e.target.last_name.value,
            email: e.target.email.value,
            method: e.target.method.value,
            city: e.target.city.value,
            cart: cookie.load('cart'),
            cart_count: cookie.load('cart_count')
        }

        axios.post(`http://diplom/server/orders/create`, JSON.stringify({
            order: order
        }))
            .then(res => {
                
                return this.props.history.push("/account/orders/" + JSON.parse(res.data).id)
            })
    }

    show_np = () => {
        this.setState({
            show_np: true
        })
    }

    render() {

        const empty_cart = (
            <div className="text-center">
                <h3>Your cart is empty</h3>
            </div>
        )

        return (

            <div className="container">
                {cookie.load('cart').length !== 0 ?
                    <>
                        <h2>Checkout</h2>
                        <form action="" onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-lg-8">

                                    <div className="form-group required-field">
                                        <label>First Name </label>
                                        <input type="text" name="first_name" className="form-control" defaultValue={this.state.fields.username.split(' ')[0]} required />
                                    </div>

                                    <div className="form-group required-field">
                                        <label>Last Name </label>
                                        <input type="text" name="last_name" className="form-control" defaultValue={this.state.fields.username.split(' ')[1]} required />
                                    </div>


                                    <div className="form-group required-field">
                                        <label>Email</label>
                                        <input type="email" name="email" className="form-control" defaultValue={this.state.fields.email} required />
                                    </div>

                                    <div className="checkout-step-shipping">
                                        <h2 className="step-title">Shipping Methods</h2>

                                        <table className="table table-step-shipping">
                                            <tbody>
                                                <tr>
                                                    <td><input type="radio" name="method" value="self" /></td>
                                                    <td><strong>$00.00</strong></td>
                                                    <td>Фіксована</td>
                                                    <td>Самовивіз</td>
                                                </tr>

                                                <tr>
                                                    <td><input type="radio" name="method" value="novaposhta" onClick={this.show_np} /></td>
                                                    <td><strong>$02.00</strong></td>
                                                    <td>За тарифом</td>
                                                    <td>Нова пошта</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="">
                                        <h2 className="step-title">Set your city</h2>

                                        <select className="form-control" name="city" required>
                                            {this.state.np_cities.data.map((item, key) =>
                                                <option key={key}>{item.Description}</option>
                                            )}
                                        </select>
                                    </div>

                                </div>

                                <div className="col-lg-4">
                                    <div className="order-summary">
                                        <h3>Summary</h3>

                                        <h4>
                                            <a data-toggle="collapse" href="#order-cart-section" className="collapsed" role="button" aria-expanded="false" aria-controls="order-cart-section">{cookie.load('cart').length} products in Cart</a>
                                        </h4>

                                        <div className="collapse" id="order-cart-section">
                                            <table className="table table-mini-cart">
                                                <tbody>
                                                    {cookie.load('cart').map((item) =>
                                                        <tr key={item.id}>
                                                            <td className="product-col">
                                                                <figure className="product-image-container">
                                                                    <Link to={"/product/" + item.id} className="product-image">
                                                                        <img src={"http://diplom/server" + item.image.src} alt="product" />
                                                                    </Link>
                                                                </figure>
                                                                <div>
                                                                    <h2 className="product-title">
                                                                        <Link to={"/product/" + item.id} >{item.title}</Link>
                                                                    </h2>

                                                                    <span className="product-qty">{this.state.money === 'uah' ? item.new_price + ' UAH' : (item.new_price / 27).toFixed(1) + ' $'}</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>


                                <div className="row col-md-10 text-center mt-2">
                                    <div className="col-md-2 ">
                                        <div className="checkout-steps-action">
                                            <input type="submit" className="btn btn-primary float-right" value="NEXT" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </>
                    :
                    empty_cart
                }
            </div>

        )
    }

}

export default withRouter(Checkout)