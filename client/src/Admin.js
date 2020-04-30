import React, { PureComponent } from 'react'
import { Route, Link } from 'react-router-dom'
import Index from './admin/pages/Index'

import Products_Index from './admin/pages/products/Products_Index'
import Products_Create from './admin/pages/products/Products_Create'
import Products_View from './admin/pages/products/Products_View'
import Products_Edit from './admin/pages/products/Products_Edit'

import Orders_Index from './admin/pages/orders/Orders_Index'
import Orders_Create from './admin/pages/orders/Orders_Create'
import Orders_View from './admin/pages/orders/Orders_View'
import Orders_Edit from './admin/pages/orders/Orders_Edit'

import Colors_Index from './admin/pages/colors/Colors_Index'
import Colors_Create from './admin/pages/colors/Colors_Create'
import Colors_View from './admin/pages/colors/Colors_View'
import Colors_Edit from './admin/pages/colors/Colors_Edit'

import Categories_Index from './admin/pages/categories/Categories_Index'
import Category_Create from './admin/pages/categories/Category_Create'
import Category_View from './admin/pages/categories/Category_View'
import Category_Edit from './admin/pages/categories/Category_Edit'
import Error from './components/blocks/Error'

import cookie from 'react-cookies'
import Header from './admin/blocks/Header'

import $ from 'jquery'

export default class Admin extends PureComponent {

    componentDidMount() {
        $('.main-links').remove()
    }

    render() {
        return (
            <main id="main-wrapper" data-sidebartype="full">
                
                <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>

                <div className="preloader">
                    <div className="lds-ripple">
                        <div className="lds-pos"></div>
                        <div className="lds-pos"></div>
                    </div>
                </div>
                <Route path="/admin" render={({ match: { url } }) => (
                    <>
                        <Header />
                        <Route path={`${url}/`} component={Index} exact />

                        <Route path={`${url}/products`} component={Products_Index} exact />
                        <Route path={`${url}/products/:id/view`} component={Products_View} exact />
                        <Route path={`${url}/products/:id/edit`} component={Products_Edit} exact />
                        <Route path={`${url}/products/create`} component={Products_Create} exact />

                        <Route path={`${url}/orders`} component={Orders_Index} exact />
                        <Route path={`${url}/orders/:id/view`} component={Orders_View} exact />
                        <Route path={`${url}/orders/:id/edit`} component={Orders_Edit} exact />
                        {/* <Route path={`${url}/orders/create`} component={Orders_Create} exact /> */}

                        <Route path={`${url}/categories`} component={Categories_Index} exact />
                        <Route path={`${url}/categories/:id/view`} component={Category_View} exact />
                        <Route path={`${url}/categories/:id/edit`} component={Category_Edit} exact />
                        <Route path={`${url}/categories/create`} component={Category_Create} exact />

                        <Route path={`${url}/colors`} component={Colors_Index} exact />
                        <Route path={`/colors/:id/view`} component={Colors_View} exact />
                        <Route path={`/colors/:id/edit`} component={Colors_Edit} exact />
                        <Route path={`/colors/create`} component={Colors_Create} exact />
                    </>
                )} />

            </main>
        )
    }

}
