import React, { Component } from 'react'

import Error from '../blocks/Error'

import Index from './account/Index'
import Information from './account/Information'
import Wishlist from './account/Wishlist'
import Checkout from './account/Checkout'
import Orders from './account/Orders'
import Orders_View from './account/Orders_View'

import { Route, Link } from 'react-router-dom'

import cookie from 'react-cookies'

export default class Account extends Component {

    render() {
        return (
            <main className="main">
                {cookie.load('user') ?
                    <>
                        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

                        <nav aria-label="breadcrumb" className="breadcrumb-nav">
                            <div className="container">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                </ol>
                            </div>
                        </nav>

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 order-lg-last dashboard-content">

                                    <Route path="/account" render={({ match: { url } }) => (
                                        <>
                                            <Route path={`${url}/`} component={Index} exact />
                                            <Route path={`${url}/information`} component={Information} exact />
                                            <Route path={`${url}/orders`} component={Orders} exact />
                                            <Route path={`${url}/orders/:id`} component={Orders_View} exact />
                                            <Route path={`${url}/checkout`} component={Checkout} exact />

                                            <Route path={`${url}/wishlist`} component={Wishlist} exact />
                                        </>
                                    )}
                                    />

                                </div>

                                <aside className="sidebar col-lg-2">
                                    <div className="widget widget-dashboard">
                                        <h3 className="widget-title">My Account</h3>

                                        <ul className="list">
                                            <li><Link to="/account">Dashboard</Link></li>
                                            <li><Link to="/account/information">Information</Link></li>
                                            <li><Link to="/account/orders">Orders</Link></li>
                                            <li><Link to="/account/wishlist">Wishlist</Link></li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>

                        <div className="mb-5"></div>
                    </>
                    :
                    <Route>
                        <Error code="Log in or register to see this page"/>
                    </Route>
                }
            </main>
        )
    }

}