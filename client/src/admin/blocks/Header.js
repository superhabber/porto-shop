import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import {Link} from 'react-router-dom'

class Header extends PureComponent {

    render() {
        return (
            <>
                <header className="topbar" data-navbarbg="skin5">
                    <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                        <div className="navbar-header" data-logobg="skin5">

                            <a className="nav-toggler waves-effect waves-light d-block d-md-none" href=""><i className="ti-menu ti-close"></i></a>

                            <Link className="navbar-brand" to="/admin">

                                <b className="logo-icon p-l-10">
                                    <img src="/assets/images/logo-icon.png" alt="homepage" className="light-logo" />
                                </b>

                                <span className="logo-text">
                                    <img src="/assets/images/logo-text.png" alt="homepage" className="light-logo" />
                                </span>

                            </Link>

                            <a className="topbartoggler d-block d-md-none waves-effect waves-light" href={void(0)} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="ti-more"></i></a>
                        </div>

                        <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">

                            <ul className="navbar-nav float-left mr-auto">
                                
                                <li><a href="/" style={{color:"white"}}>Головна сторінка</a></li>
                            
                            </ul>

                            
                        </div>
                    </nav>
                </header>

                <aside className="left-sidebar" data-sidebarbg="skin5">

                    <div className="scroll-sidebar">
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav" className="p-t-30">
                                <li className="sidebar-item"> <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/admin" aria-expanded="false"><i className="mdi mdi-view-dashboard"></i><span className="hide-menu">Dashboard</span></Link></li>

                                <li className="sidebar-item"> <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/admin/products" aria-expanded="false"><i className="mdi mdi-receipt"></i><span className="hide-menu">Products</span></Link></li>

                                <li className="sidebar-item"> <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/admin/categories" aria-expanded="false"><i className="mdi mdi-relative-scale"></i><span className="hide-menu">Categories</span></Link></li>
                                
                                <li className="sidebar-item"> <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/admin/orders" aria-expanded="false"><i className="mdi mdi-move-resize-variant"></i><span className="hide-menu">Orders</span></Link></li>

                                {/* <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href={void(0)} aria-expanded="false"><i className="mdi mdi-receipt"></i><span className="hide-menu">Products </span></a>
                                    <ul aria-expanded="false" className="collapse  first-level">
                                        <li className="sidebar-item"><Link to="/admin/products" className="sidebar-link"><i className="mdi mdi-note-outline"></i><span className="hide-menu"> ALL Products</span></Link></li>
                                    </ul>
                                </li>

                                <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href={void(0)} aria-expanded="false"><i className="mdi mdi-chart-bubble"></i><span className="hide-menu">Categories </span></a>
                                    <ul aria-expanded="false" className="collapse  first-level">
                                        <li className="sidebar-item"><Link to="/admin/categories" className="sidebar-link"><i className="mdi mdi-note-outline"></i><span className="hide-menu">ALL Categories</span></Link></li>
                                    </ul>
                                </li> */}
                                
                            </ul>
                        </nav>

                    </div>

                </aside>
            </>
        )
    }

}

export default withRouter(Header)