import React, { Component } from 'react'
import cookie from 'react-cookies'

export default class Mobile extends Component {

    render() {
        return (
            <div>
                <div className="mobile-menu-overlay"></div>

                <div className="mobile-menu-container">
                    <div className="mobile-menu-wrapper">
                        <span className="mobile-menu-close"><i className="icon-cancel"></i></span>
                        <nav className="mobile-nav">
                            <ul className="mobile-menu">
                                <li><a href="/">Home</a></li>
                                {cookie.load('user') && cookie.load('user').group === '2' &&
                                    <li ><a href="/admin">Admin Panel</a></li>
                                }
                                <li><a href="/categories">Products</a></li>
                                <li><a href="/contact">Contacts</a></li>
                                <li><a href="/about">About us</a></li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        )
    }

}