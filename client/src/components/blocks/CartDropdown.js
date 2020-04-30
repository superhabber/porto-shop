import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Trans, withTranslation } from 'react-i18next';
import cookie from 'react-cookies'

import { LazyLoadImage } from 'react-lazy-load-image-component';

class CartDropdown extends PureComponent {

    constructor(props){
        super(props)

        this.state = {
            money: cookie.load('money') ? cookie.load('money') : 'uah'
        }
    }

    render() {
        return (
            <div className="dropdown cart-dropdown">
                <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false" data-display="static">
                    <span className="cart-count">{this.props.cart.length}</span>
                </a>

                <div className="dropdown-menu">
                    <div className="dropdownmenu-wrapper">
                        <div className="dropdown-cart-products">

                            {this.props.cart &&
                                this.props.cart.map((item, key) =>

                                    <div className="product" key={key}>
                                        <div className="product-details">
                                            <h4 className="product-title">
                                                <Link to={"/product/" + item.id}>{item.title}</Link>
                                            </h4>

                                            <span className="cart-product-info">
                                                <span className="cart-product-qty">1 </span>
                                                    x {this.state.money === 'uah' ? item.new_price + ' UAH' : (item.new_price / 27).toFixed(1) + ' $'}
                                            </span>
                                        </div>

                                        <figure className="product-image-container">
                                            <Link to={"/product/" + item.id} className="product-image">
                                                <LazyLoadImage
                                                    src={"http://diplom/server" + item.image.src}
                                                    effect="blur"
                                                />
                                            </Link>
                                            <a href="#" onClick={(e) => this.props.deleteCartProduct(e, key)} className="btn-remove" title="Remove Product"><i className="icon-cancel"></i></a>
                                        </figure>
                                    </div>
                                )}

                        </div>

                        <div className="dropdown-cart-total">
                            <span><Trans i18nKey="blocks.cart_total"></Trans></span>

                            <span className="cart-total-price">{this.state.money === 'uah' ? this.props.cart_count + ' UAH' : (this.props.cart_count / 27).toFixed(1) + ' $'}</span>
                        </div>

                        <div className="dropdown-cart-action">
                            <Link to={"/cart"} className="btn"><Trans i18nKey="blocks.cart_view"></Trans></Link>
                            
                            <Link to={"/account/checkout"}  className="btn"><Trans i18nKey="blocks.cart_check"></Trans></Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default withTranslation()(CartDropdown)