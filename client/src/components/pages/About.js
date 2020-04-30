import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import MetaTags from 'react-meta-tags'

export default class About extends Component {

    render() {
        return (
            <main className="main">
                <MetaTags>
                    <title>Про нас</title>
                </MetaTags>
                <div className="page-header page-header-bg" style={{ backgroundImage: "url('/assets/images/page-header-bg.jpg')" }}>
                    <div className="container">
                        <h1><span>ABOUT US</span>
                        OUR COMPANY</h1>
                        <a href="contact.html" className="btn btn-dark">Contact</a>
                    </div>
                </div>

                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <div className="container">
                        <ol className="breadcrumb mt-0">
                            <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                            <li className="breadcrumb-item active" aria-current="page">About Us</li>
                        </ol>
                    </div>
                </nav>

                <div className="about-section">
                    <div className="container">
                        <h2 className="subtitle">ПРО НАС</h2>
                        <p>
                            Почавши роботу як інтернет-магазин, ми з часом почали відшивати власні моделі, і на даний момент велика частина продукції яка представлена на сайті нашого власного виробництва, чим ми дуже пишаємося.

                            У нас представлений широкий асортимент жіночих вишиванок і чоловічих вишитих сорочок, дитячих вишиванок, вишитих тунік, костюмів, жилетів та іншої продукції. Працюємо ми як у роздріб, так і опт. Асортимент постійно оновлюється, тому Ви завжди знайдете у нас щось для себе, або для своїх близьких, друзів, колег чи знайомих.

                            Також вас приємно здивують низькі ціни на нашу продукцію. Ваше замовлення буде відправлене до Вас максимально швидко, не залежно від місця Вашого проживання.

                            Ми працюємо для Вас, і дорожимо своєю репутацією. Тому ми впевнені в правильності Вашого вибору. Хороших покупок Вам і Вашим близьким!
                        </p>
                    </div>
                </div>

                <div className="features-section">
                    <div className="container">
                        <h2 className="subtitle">Чому нас вибирають</h2>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="feature-box">
                                    <i className="icon-shipped"></i>

                                    <div className="feature-box-content">
                                        <h3>Free Shipping</h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr in some form.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="feature-box">
                                    <i className="icon-us-dollar"></i>

                                    <div className="feature-box-content">
                                        <h3>100% Money Back Guarantee</h3>
                                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="feature-box">
                                    <i className="icon-online-support"></i>

                                    <div className="feature-box-content">
                                        <h3>Online Support 24/7</h3>
                                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="counters-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-md-4 count-container">
                                <div className="count-wrapper">
                                    <span className="count" data-from="0" data-to="200" data-speed="2000" data-refresh-interval="50">200</span>+
                            </div>
                                <h4 className="count-title">MILLION CUSTOMERS</h4>
                            </div>

                            <div className="col-6 col-md-4 count-container">
                                <div className="count-wrapper">
                                    <span className="count" data-from="0" data-to="1800" data-speed="2000" data-refresh-interval="50">1800</span>+
                            </div>
                                <h4 className="count-title">TEAM MEMBERS</h4>
                            </div>

                            <div className="col-6 col-md-4 count-container">
                                <div className="count-wrapper">
                                    <span className="count" data-from="0" data-to="24" data-speed="2000" data-refresh-interval="50">24</span><span>HR</span>
                                </div>
                                <h4 className="count-title">SUPPORT AVAILABLE</h4>
                            </div>

                            <div className="col-6 col-md-4 count-container">
                                <div className="count-wrapper">
                                    <span className="count" data-from="0" data-to="265" data-speed="2000" data-refresh-interval="50">265</span>+
                            </div>
                                <h4 className="count-title">SUPPORT AVAILABLE</h4>
                            </div>

                            <div className="col-6 col-md-4 count-container">
                                <div className="count-wrapper">
                                    <span className="count" data-from="0" data-to="99" data-speed="2000" data-refresh-interval="50">99</span><span>%</span>
                                </div>
                                <h4 className="count-title">SUPPORT AVAILABLE</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}