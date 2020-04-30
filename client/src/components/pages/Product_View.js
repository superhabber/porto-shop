import React, { PureComponent } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel2';
import Product_Review from './Product_Review'
import cookie from 'react-cookies';
import $ from 'jquery'
import Popup from 'reactjs-popup'
import Fade from 'react-reveal/Fade';

import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

import MetaTags from 'react-meta-tags'

import { Trans, withTranslation } from 'react-i18next'
import Dress_Room_Men from '../blocks/Dress_Room_Men';
import Dress_Room_Women from '../blocks/Dress_Room_Women'

class Product_View extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            review_modal: false,
            id: props.match.params.id,
            cart_size: undefined,
            money: cookie.load('money') ? cookie.load('money') : 'uah'
        }

        this.setSize = this.setSize.bind(this)
        this.setReviewModal = this.setReviewModal.bind(this)
    }

    getReviews = async () => {
        await axios.get(`http://diplom/server/reviews/single?id=` + this.props.match.params.id)
            .then(res => {
                this.setState({ reviews: JSON.parse(res.data) })
            })
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.setState({
                id: this.props.match.params.id
            }, async () => {
                await this.componentDidMount()
            })
        }
    }

    componentDidMount = async () => {

        var product, colors_filter, featured

        await axios.get(`http://diplom/server/products/single?id=` + this.state.id)
            .then(res => {
                product = JSON.parse(res.data)
            })

        await axios.get(`http://diplom/server/products/all_sorted_products?limit=8&category_id=` + product.category_id)
            .then(res => {
                featured = JSON.parse(res.data)
            })

        $($('.config-swatch-list li')[0]).addClass('active')

        this.setState({
            product: product,
            // colors_filter: colors_filter,
            featured: featured,
            cart_color: $($('.config-swatch-list li')[0]).attr('data-id')
        })

        await this.getReviews()
    }

    onSubmit = async (e) => {
        e.preventDefault()

        var review = {
            model_id: this.state.product.id,
            quality: e.target.quality.value,
            value: e.target.value.value,
            price: e.target.price.value,
            name: e.target.username.value,
            user_id: cookie.load('user') ? cookie.load('user').id : null,
            review: e.target.review.value,
            email: e.target.email.value,
        }

        await axios.post(`http://diplom/server/reviews/add`, JSON.stringify({
            review: review
        }))
            .then(async (res) => {
                if (JSON.parse(res.data).code === 'success') {
                    await this.getReviews()
                    $('.review-field').val('')
                    $('.radio').prop('checked', false);
                    this.setReviewModal(true)
                }
            })
    }

    setReviewModal(value) {
        this.setState({ review_modal: value });
    }

    // setColor(e, id) {
    //     e.preventDefault()

    //     var li = $($(e.target)[0]).parent()[0]

    //     $(li).addClass('active')

    //     $('.config-swatch-list li').removeClass('selected')
    //     $(li).addClass('selected')
    //     $(".config-swatch-list li").not(".selected").removeClass('active')
    //     this.setState({ cart_color: id })

    // }


    setSize(e, name) {
        e.preventDefault()

        var li = $($(e.target)[0]).parent()[0]

        $(li).addClass('active')

        $('.config-size-list li').removeClass('selected')
        $(li).addClass('selected')
        $(".config-size-list li").not(".selected").removeClass('active')
        this.setState({ cart_size: name })

    }

    doSizebyName = (name) => {
        this.setState({ cart_size: name, openPanel: false }, () => {
            $($("li[data-name='" + name + "']")[0]).addClass('active')
        })
    }

    render() {

        return (
            <main className="main">

                <Fade big duration={2000} ssrFadeout>

                    {this.state.product &&
                        <>
                            <MetaTags>
                                <title>{this.state.product.title} | Вишиваночка - інтернет магазин</title>
                            </MetaTags>

                            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                                <div className="container">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/"><i className="icon-home"></i></Link>
                                        </li>
                                        {this.state.product.category &&
                                            <li className="breadcrumb-item">
                                                <Link to={"/categories/" + this.state.product.category.id}>{this.state.product.category.title}</Link>
                                            </li>
                                        }
                                    </ol>
                                </div>
                            </nav>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="product-single-container product-single-default">
                                            <div className="row">
                                                <div className="col-lg-5 col-md-6">
                                                    <div className="product-single-gallery">
                                                        <div className="product-slider-container product-item">

                                                            <div className="">
                                                                <div className="product-item">
                                                                    <LazyLoadImage
                                                                        src={"http://diplom/server" + this.state.product.image.src}
                                                                        // data-zoom-image={"http://diplom/server" + this.state.product.image.src}
                                                                        alt={this.state.product.title}
                                                                        className="product-single-image"
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-7 col-md-6">
                                                    <div className="product-single-details">
                                                        <h1 className="product-title">{this.state.product.title}</h1>

                                                        <div className="ratings-container">
                                                            {this.state.reviews &&
                                                                <a href="" className="rating-link">( {this.state.reviews.length} <Trans i18nKey="blocks.reviews"></Trans> )</a>
                                                            }
                                                        </div>

                                                        <div className="price-box">
                                                            {this.state.product.old_price !== null &&
                                                                <span className="old-price">
                                                                    {this.state.money === 'uah' ? this.state.product.old_price + ' UAH' : (this.state.product.old_price / 27).toFixed(1) + ' $'}
                                                                </span>
                                                            }
                                                            <span className="product-price">
                                                                {this.state.money === 'uah' ? this.state.product.new_price + ' UAH' : (this.state.product.new_price / 27).toFixed(1) + ' $'}
                                                            </span>
                                                        </div>

                                                        <div className="product-filters-container">

                                                            <div className="product-single-filter">
                                                                <label>Sizes:</label>
                                                                <ul className="config-size-list">
                                                                    {JSON.parse(this.state.product.sizes).map((item, key) =>
                                                                        <li key={key} data-name={item} onClick={(e) => this.setSize(e, item)}><a href="#">{item}</a></li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div className="product-action">

                                                            <a href="" onClick={(e) => this.props.onCartAdd(e, this.state.product.id, this.state.cart_color, this.state.cart_size)} className="paction add-cart">
                                                                <span><Trans i18nKey="blocks.add_to_cart"></Trans></span>
                                                            </a>

                                                            <a href="" onClick={(e) => this.props.addToWish(e, this.state.product.id)} className="paction add-wishlist" title={this.props.t("blocks.add_to_wish")}>
                                                                <span><Trans i18nKey="blocks.add_to_wish"></Trans></span>
                                                            </a>

                                                            <a href="" onClick={(e) => this.props.addCompare(e, this.state.product.id, this.state.product.category.id)} className="paction add-compare" title="Add to Compare">
                                                                <span>Add to Compare</span>
                                                            </a>
                                                        </div>

                                                        <div className="product-single-share">
                                                            <label><Trans i18nKey="blocks.share"></Trans>:</label>
                                                            <div className="addthis_inline_share_toolbox"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product-single-tabs">
                                            <ul className="nav nav-tabs" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" id="product-tab-desc" data-toggle="tab" href="#product-desc-content" role="tab" aria-controls="product-desc-content" aria-selected="false"><Trans i18nKey="blocks.description"></Trans></a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="product-tab-reviews" data-toggle="tab" href="#product-reviews-content" role="tab" aria-controls="product-reviews-content" aria-selected="false"><Trans i18nKey="blocks.reviews2"></Trans></a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="product-tab-dress" data-toggle="tab" href="#product-dress-content" role="tab" aria-controls="product-dress-content" aria-selected="false">Dress Room</a>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane fade active show" id="product-desc-content" role="tabpanel" aria-labelledby="product-tab-desc">
                                                    <div className="product-desc-content">

                                                        <h2>{this.state.product.title}</h2>
                                                        <p>
                                                            {this.state.product.description}
                                                        </p>

                                                    </div>
                                                </div>

                                                <LazyLoadComponent>
                                                    <div className="tab-pane fade" id="product-reviews-content" role="tabpanel" aria-labelledby="product-tab-reviews">
                                                        <div className="product-reviews-content">

                                                            <div className="add-product-review">
                                                                <h3 className="text-uppercase heading-text-color font-weight-semibold">
                                                                    WRITE YOUR OWN REVIEW
                                                                </h3>
                                                                <p>How do you rate this product? *</p>

                                                                <Product_Review onSubmit={this.onSubmit} />

                                                            </div>

                                                            <div className="row mt-2">

                                                                {this.state.reviews &&
                                                                    <>
                                                                        {this.state.reviews.length === 0 ? (
                                                                            <div className="collateral-box">
                                                                                <ul>
                                                                                    <li>Be the first to review this product</li>
                                                                                </ul>
                                                                            </div>
                                                                        ) : (
                                                                                this.state.reviews.map((item, key) =>
                                                                                    <div key={key} className="row col-12" style={{ border: "2px black" }}>
                                                                                        <div className="author-content">
                                                                                            <h4>{item.name} - <small>{item.created_at}</small></h4>

                                                                                            <p>
                                                                                                {item.review}
                                                                                            </p>
                                                                                        </div>
                                                                                        <hr />
                                                                                    </div>

                                                                                )
                                                                            )
                                                                        }
                                                                    </>
                                                                }
                                                            </div>

                                                        </div>
                                                    </div>

                                                </LazyLoadComponent>

                                                <Popup
                                                    open={this.state.review_modal}
                                                    closeOnDocumentClick
                                                >
                                                    <div className="text-center">
                                                        <h4 className="mt-4 mb-4">
                                                            Your review added
                                                    </h4>
                                                    </div>
                                                </Popup>

                                                <div className="tab-pane fade" id="product-dress-content" role="tabpanel" aria-labelledby="product-tab-dress">
                                                    <div className="product-dress-content">
                                                        <LazyLoadComponent>
                                                            {this.state.product.category.size_id == 0 ?
                                                                <Dress_Room_Men male={this.state.product.category.size_id} />
                                                                :
                                                                <Dress_Room_Women male={this.state.product.category.size_id} />
                                                            }
                                                        </LazyLoadComponent>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {this.state.featured &&
                                    <div className="featured-section pt-sm bg-white">
                                        <h2 className="carousel-title"><Trans i18nKey="index.feat"></Trans></h2>
                                        <LazyLoadComponent>
                                            <Fade big duration={1500} cascade>
                                                <OwlCarousel ref="featured_products" options={{ items: 4, lazyLoad: true }} >
                                                    {this.state.featured.map((item) =>
                                                        <div className="product-default col-12" key={item.id}>
                                                            <figure>
                                                                <Link to={"/product/" + item.id}>
                                                                    <img src={"http://diplom/server" + item.image.src} alt={item.title} />
                                                                </Link>
                                                            </figure>
                                                            <div className="product-details">
                                                                <div className="ratings-container">
                                                                    <div className="product-ratings">
                                                                        <span className="ratings" style={{ width: "80%" }}></span>
                                                                        <span className="tooltiptext tooltip-top"></span>
                                                                    </div>
                                                                </div>
                                                                <h2 className="product-title">
                                                                    <Link to={"/product/" + item.id}>{item.title}</Link>
                                                                </h2>
                                                                <div className="price-box">
                                                                    <span className="product-price">{item.new_price}</span>
                                                                </div>
                                                                <div className="product-action">
                                                                    <a href="#" className="btn-icon-wish"><i className="icon-heart"></i></a>
                                                                    <button className="btn-icon btn-add-cart" onClick={(e) => this.props.onCartAdd(e, item.id)}><i className="icon-bag"></i>ADD TO CART</button>
                                                                    {/* <a onClick={() => this.popup("http://localhost:3000/product/" + item.id)} style={{ cursor: "pointer" }} className="btn-quickview" ><i className="fas fa-external-link-alt"></i></a> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </OwlCarousel>
                                            </Fade>
                                        </LazyLoadComponent>
                                    </div>
                                }

                                <div className="mb-lg-4"></div>
                            </div>
                        </>
                    }
                </Fade>
            </main>
        )
    }

}

export default withTranslation()(withRouter(Product_View))