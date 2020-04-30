import React, { PureComponent } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'

export default class Orders extends PureComponent {

    state = {
        money: cookie.load('money') ? cookie.load('money') : 'uah'
    }

    componentDidMount = async() => {
        await axios.get('http://diplom/server/orders/find_by_email?email=' + cookie.load('user').email)
            .then(res => {
                this.setState({ orders: JSON.parse(res.data) })
            })
    }

    render() {
        return (
            <div>
                <div className="list-group">
                    {this.state.orders &&
                        this.state.orders.map((item) =>
                            <Link to={"/account/orders/" + item.id} key={item.id} className="list-group-item list-group-item-action flex-column align-items-start mt-2 mb-2">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">Order #{item.id}</h5>
                                    <small className="text-muted">{item.created_at}</small>
                                </div>
                                {/* <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> */}
                                <small className="text-muted">{this.state.money === 'uah' ? item.cart_count + ' UAH' : (item.cart_count / 27).toFixed(1) + ' $'}</small>
                            </Link>
                        )
                    }

                </div>
            </div>
        )
    }

}