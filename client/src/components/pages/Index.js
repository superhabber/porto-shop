import React, { PureComponent } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel2';
import Popup from 'reactjs-popup'
import { withTranslation, Trans } from 'react-i18next'
import cookie from 'react-cookies'
import MetaTags from 'react-meta-tags';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class Index extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            quick_popup: false,
            money: cookie.load('money') ? cookie.load('money') : 'uah'
        }

    }

    componentDidMount = async () => {
        var featured_products, date_products
        await axios.get(`http://diplom/server/products/all_sorted_products`)
            .then(async (res) => {
                date_products = JSON.parse(res.data)

                await axios.get(`http://diplom/server/products/all_sorted_products?with=none`)
                    .then(res => {
                        featured_products = JSON.parse(res.data)
                    })
            })
        this.setState({
            featured_products: featured_products,
            date_products: date_products
        })
    }

    popup(src) {
        this.setState({
            quick_popup: true,
            quick_src: src
        })
    }

    render() {

        const product = (product) => {
            return (
                <OwlCarousel ref="featured_products" options={{ items: 4, lazyLoad: true }} >

                    {product.map((item, key) =>
                        <div className="product-default col-12" key={key}>
                            <figure>
                                <Link to={"/product/" + item.id}>
                                    <LazyLoadImage
                                        src={"http://diplom/server" + item.image.src}
                                        alt={item.title}
                                        effect="blur"
                                    />
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
                                    <span className="product-price">{this.state.money === 'uah' ? item.new_price + ' UAH' : (item.new_price / 27).toFixed(1) + ' $'}</span>
                                </div>
                                <div className="product-action">
                                    <a onClick={(e) => this.props.addToWish(e, item.id)} href="#" className="btn-icon-wish"><i className="icon-heart"></i></a>
                                    <button className="btn-icon btn-add-cart" onClick={(e) => this.props.onCartAdd(e, item.id)}><i className="icon-bag"></i><Trans i18nKey="blocks.add_to_cart"></Trans></button>
                                    <a onClick={() => this.popup("http://localhost:3000/product/" + item.id)} style={{ cursor: "pointer" }} className="btn-quickview" ><i className="fas fa-external-link-alt"></i></a>
                                </div>
                            </div>
                        </div>
                    )}

                </OwlCarousel>
            )
        }

        return (
            <main className="main">
                <MetaTags>
                    <title>Вишиваночка - інтернет магазин</title>
                </MetaTags>
                <style dangerouslySetInnerHTML={{ __html: ` .popup-content{ width: 85% !important; } ` }}></style>

                <div className="home-slider-container">
                    <div className="home-slider owl-carousel owl-theme owl-theme-light">
                        <div className="home-slide">
                            <div className="slide-bg owl-lazy" data-src="assets/images/slider/slide-1.jpg"></div>
                            <div className="container">
                                <div className="home-slide-content">
                                    <div className="slide-border-top">
                                        <LazyLoadImage
                                            src="assets/images/slider/border-top.png"
                                            width="290"
                                            height="38"
                                            effect="blur"
                                        />
                                    </div>
                                    <h3><Trans i18nKey="blocks.slider_1_1"></Trans></h3>
                                    <h1><Trans i18nKey="blocks.slider_1_2"></Trans></h1>
                                    <a href="category.html" className="btn btn-primary"><Trans i18nKey="index.shop"></Trans></a>
                                    <div className="slide-border-bottom">
                                        <img src="assets/images/slider/border-bottom.png" alt="Border" width="290" height="111" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="home-slide">
                            <div className="slide-bg owl-lazy" data-src="assets/images/slider/slide-2.jpg"></div>
                            <div className="container">
                                <div className="row justify-content-end">
                                    <div className="col-8 col-md-6 text-center slide-content-right">
                                        <div className="home-slide-content">
                                            <h3><Trans i18nKey="blocks.slider_2_1"></Trans></h3>
                                            <h1><Trans i18nKey="blocks.slider_2_2"></Trans></h1>
                                            <a href="category.html" className="btn btn-primary"><Trans i18nKey="index.shop"></Trans></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-boxes-container">
                    <div className="container">
                        <div className="info-box">
                            <i className="icon-shipping"></i>

                            <div className="info-box-content">
                                <h4><Trans i18nKey="index.f_card_title"></Trans></h4>
                                <p><Trans i18nKey="index.f_card_second"></Trans></p>
                            </div>
                        </div>

                        <div className="info-box">
                            <i className="icon-us-dollar"></i>

                            <div className="info-box-content">
                                <h4><Trans i18nKey="index.s_card_title"></Trans></h4>
                                <p><Trans i18nKey="index.s_card_second"></Trans></p>
                            </div>
                        </div>

                        <div className="info-box">
                            <i className="icon-support"></i>

                            <div className="info-box-content">
                                <h4><Trans i18nKey="index.t_card_title"></Trans></h4>
                                <p><Trans i18nKey="index.t_card_second"></Trans></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="banners-group">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="banner banner-image">
                                    <img src="assets/images/banners/banner-1.jpg" alt="banner" />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="banner banner-image">
                                    <img src="assets/images/banners/banner-2.jpg" alt="banner" />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="banner banner-image">
                                    <img src="assets/images/banners/banner-3.jpg" alt="banner" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="featured-products-section carousel-section">
                    <div className="container">
                        <h2 className="h3 title mb-4 text-center"><Trans i18nKey="index.feat"></Trans></h2>
                        {this.state.featured_products &&

                            product(this.state.featured_products)

                        }
                        <Popup
                            open={this.state.quick_popup}
                            closeOnDocumentClick
                            style={{ width: "70%" }}
                        >
                            <div className="text-center">
                                <h4 className="mt-4 mb-4">
                                    <iframe src={this.state.quick_src} style={{ width: "100%", minHeight: "500px" }}></iframe>
                                </h4>
                            </div>
                        </Popup>

                    </div>
                </div>

                <div className="mb-5"></div>

                <div className="carousel-section">
                    <div className="container">

                        <h2 className="h3 title mb-4 text-center"><Trans i18nKey="index.new"></Trans></h2>
                        {this.state.date_products &&
                            
                            product(this.state.date_products)

                        }
                    </div>
                </div>

                <div className="mb-5"></div>

                <div className="info-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="feature-box feature-box-simple text-center">
                                    <i className="icon-earphones-alt"></i>

                                    <div className="feature-box-content">
                                        <h3>Customer Support<span>Need Assistence?</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="feature-box feature-box-simple text-center">
                                    <i className="icon-credit-card"></i>

                                    <div className="feature-box-content">
                                        <h3>secured payment <span>Safe & Fast</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus lacus. Lorem ipsum dolor sit amet.consectetur adipiscing elit. </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="feature-box feature-box-simple text-center">
                                    <i className="icon-action-undo"></i>

                                    <div className="feature-box-content">
                                        <h3>Returns <span>Easy & Free</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus lacus.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="promo-section" style={{ backgroundImage: "url(assets/images/promo-bg.jpg)" }}>
                    <div className="container">
                        <h3><Trans i18nKey="index.collection"></Trans></h3>
                        <a href="#" className="btn btn-dark"><Trans i18nKey="index.shop"></Trans></a>
                    </div>
                </div>

                <div className="partners-container">
                    <div className="container">
                        <div className="partners-carousel owl-carousel owl-theme">
                            <a href="#" className="partner">
                                <img src="assets/images/logos/1.png" alt="logo" />
                            </a>
                            <a href="#" className="partner">
                                <img src="assets/images/logos/2.png" alt="logo" />
                            </a>
                            <a href="#" className="partner">
                                <img src="assets/images/logos/3.png" alt="logo" />
                            </a>
                            <a href="#" className="partner">
                                <img src="assets/images/logos/4.png" alt="logo" />
                            </a>
                            <a href="#" className="partner">
                                <img src="assets/images/logos/5.png" alt="logo" />
                            </a>
                            <a href="#" className="partner">
                                <img src="assets/images/logos/2.png" alt="logo" />
                            </a>
                            <a href="#" className="partner">
                                <img src="assets/images/logos/1.png" alt="logo" />
                            </a>
                        </div>
                    </div>
                </div>

            </main>
        )
    }

}

export default withTranslation()(Index)