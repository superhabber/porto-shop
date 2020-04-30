import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import cookie from 'react-cookies'

export default class Categories_Component extends Component {

    state = {
        money: cookie.load('money') ? cookie.load('money') : 'uah'
    }

    render() {
        return (
            <div className="row row-sm product-ajax-grid">
                {this.props.products.map((item, key) =>
                    <div className="col-6 col-md-3" key={item.id}>
                        <div className="product-default">
                            <figure>
                                <Link to={"/product/" + item.id}>
                                    <LazyLoadImage
                                        src={"http://diplom/server" + item.image.src}
                                        effect="blur"
                                    />
                                </Link>
                            </figure>
                            <div className="product-details">
                                {/* <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style={{ width: "100%" }}></span>
                                        <span className="tooltiptext tooltip-top"></span>
                                    </div>
                                </div> */}
                                <h2 className="product-title">
                                    <Link to={"/product/" + item.id}>{item.title}</Link>
                                </h2>
                                <div className="price-box">
                                    <span className="product-price">{this.state.money === 'uah' ? item.new_price + ' UAH' : (item.new_price / 27).toFixed(1) + ' $'}</span>
                                </div>
                                <div className="product-action">
                                    <a href="#" className="btn-icon-wish"><i className="icon-heart"></i></a>
                                    <button className="btn-icon btn-add-cart" onClick={(e) => this.props.onCartAdd(e, item.id)}><i className="icon-bag"></i>ADD TO CART</button>
                                    {/* <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt"></i></a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }

            </div>
        )
    }

}