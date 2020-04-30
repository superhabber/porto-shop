import React, { PureComponent } from 'react'
import Login from '../forms/Login'
import Register from '../forms/Register'
import CartDropdown from './CartDropdown'
import axios from 'axios'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import $ from 'jquery'
import Popup from 'reactjs-popup'
import { withRouter } from 'react-router-dom'

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Trans, withTranslation } from 'react-i18next';
import i18n from '../../i18n'

class Header extends PureComponent {

    // конструктор класу шапки сайту
    constructor(props) {
        super(props)

        this.state = {
            user_group: cookie.load('user') ? cookie.load('user').group : undefined, // роль\група користувача
            cart: cookie.load('cart') ? cookie.load('cart') : [], // корзина
            email: undefined,
            password: undefined,
            login_errors: undefined,
            register_errors: undefined,
            cart_count: cookie.load('cart_count') ? cookie.load('cart_count') : 0, // сума корзини
            logout_popup: false,
            lang: this.props.lang, // мова користувача
            money: cookie.load('money') ? cookie.load('money') : 'uah' // валюта
        }
    }

    // метод пошуку по слову і категорії
    doSearch = async (e) => {
        e.preventDefault()
        var text = e.target.search.value,
            cat = e.target.cat.value ? e.target.cat.value : ""
        //редірект за ключовим словом і категорією
        await this.props.history.push('/categories/' + cat + '?search=' + text)
    }

    // підтвердження форми авторизації
    onSubmitLogin = async (e) => {
        e.preventDefault()
        this.setState({
            email: e.target.email.value,
            password: e.target.password.value
        })
        // виконати авторизацію
        await this.DoLogin();
    }

    // метод оновлення компоненту, потрібен для оновлення корзини при додаванні\видаленні товару
    componentDidUpdate = async (prevProps, prevState) => {
        if (prevState === this.state && prevProps.location.pathname === this.props.location.pathname) {

            this.setState({
                cart: this.props.cart,
                cart_count: 0
            }, () => {
                var price = 0;
                // перерахування суми корзини, щоб уникнути помилок
                this.state.cart.map((item) => price += Number(item.new_price))

                this.setState({ cart_count: price })
                cookie.save('cart_count', price, { path: '/' })
            })
        }

    }

    // початкова функція програми, отримує всі категорії, щоб занести у список для пошуку
    componentDidMount = async () => {
        await axios.get(`http://diplom/server/admin/all_categories`)
            .then(async (res) => {
                this.setState({ categories: JSON.parse(res.data) })
                // якщо користувач авторизований показати список порівняння товарів
                if (this.state.user_loaded) await this.props.compareUpdate()
            })

    }

    // видалення товару з корзини
    deleteCartProduct = (e, id) => {
        e.preventDefault()

        var deleted = this.state.cart.splice(id, 1)

        var newcart = this.state.cart

        this.setState({
            cart: newcart,
            cart_count: Number(this.state.cart_count) - Number(deleted[0].new_price)
        }, function () {
            cookie.save('cart', this.state.cart, { path: '/' })
            cookie.save('cart_count', this.state.cart_count, { path: '/' })
        })

    }

    // метод видалення сесії авторизації користувача
    logout = async () => {
        cookie.remove('usertoken', { path: '/' })
        cookie.remove('user', { path: '/' })

        this.setState({ user_group: undefined, logout_popup: true })
    }

    componentWillUpdate(prevProps, prevState) {
        if (prevState.user_group === undefined && this.state.user_group !== undefined) {
            this.props.history.push('/')
        }
    }

    // метод авторизації
    DoLogin = async () => { // асинхронна функція авторизації
        if (this.state.email && this.state.password) { // якщо введено email і пароль
            const user = { // введення константи користувача з двома полями і полем можливих помилок
                email: this.state.email,
                password: this.state.password,
                login_errors: undefined
            }
            //відправлення POST запиту на сервер з потрібними полями
            await axios.post(`http://diplom/server/user/login`, JSON.stringify({
                email: user.email,
                password: user.password
            }))
                .then(async (res) => {
                    var data = JSON.parse(res.data)
                    if (data.errors) { // якщо є помилки - занести їх в глобальний масив 
                        this.setState({ login_errors: data.errors })
                    } else if (data.usertoken) { // якщо результатом запиту є токен авторизації, все успішно
                        cookie.save('usertoken', data.usertoken, { path: '/' }) // збереження токену в кукі
                        await this.props.setUserToken(data.usertoken) // передача токену в батьківський клас для обробки

                        axios.post(`http://diplom/server/user/data`, JSON.stringify({ //отримання даних користувача по токену
                            token: cookie.load('usertoken')
                        }))
                            .then(async (res) => {
                                this.setState({
                                    user_group: res.data[0].group // збереження номеру групи, якщо адмін, то в меню буде цей пункт
                                })
                                cookie.save('user', res.data[0], { path: '/' })

                                await this.props.compareUpdate()
                            })
                        $('#login-modal').addClass('mfp-hide') // закриття модал-вікна
                        $('.mfp-bg.mfp-ready').remove()
                    }
                })
        } else {
            this.setState({ errors: "Some of inputs are empty" }) // якщо серед полів є пусте поле
        }
    }

    // метод для відправки форми реєстрації
    onSubmitRegister = async (e) => {
        e.preventDefault()
        // константа користувача з введеними даними
        var user = {
            email: e.target.email.value,
            password: e.target.password.value
        };
        await axios.post(`http://diplom/server/user/register`, JSON.stringify({
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }))
            .then(async (res) => {
                var data = JSON.parse(res.data)
                if (data.errors) { // якщо є помилки занести у масив state
                    this.setState({ register_errors: data.errors })
                } else {

                    this.setState({
                        email: user.email,
                        password: user.password,
                        register_errors: undefined
                    })
                    // виконати авторизацію
                    await this.DoLogin();
                }
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeLanguage = async (e, lang) => {
        e.preventDefault()

        await i18n.changeLanguage(lang);
        cookie.save('lang', lang, { path: '/' })
        this.setState({ lang: lang })

        document.documentElement.lang = lang;
    }

    onChangeMoney = (e, money) => {
        e.preventDefault()

        cookie.save('money', money, { path: '/' })
        this.setState({ money: money })
    }

    render() {
        return (
            <header className="header">
                <Popup
                    open={this.state.logout_popup}
                    closeOnDocumentClick
                >
                    <div className="text-center">
                        <h4 className="mt-4 mb-4">
                            <Trans i18nKey='blocks.logged-out-modal'></Trans>
                        </h4>
                    </div>
                </Popup>

                <div id="good-login" className="mfp-hide" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-content" style={{ background: "white" }}>
                    <div id="modal-content" style={{ padding: "1em 0 1em 0" }}>
                        <div className="modal-wrapper">
                            <div className="container">
                                <div className="row col-md-6 offset-md-3" style={{ background: "white", padding: "3em" }}>
                                    <Trans i18nKey='blocks.logged-in-modal'></Trans>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="header-top">
                    <div className="container">
                        <div className="header-left header-dropdowns">
                            <div className="header-dropdown">
                                <a href="">{this.state.money === 'usd' ? 'USD' : 'UAH'}</a>

                                <div className="header-menu">
                                    <ul>
                                        <li><a href="" onClick={(e) => this.onChangeMoney(e, 'uah')}>UAH</a></li>
                                        <li><a href="" onClick={(e) => this.onChangeMoney(e, 'usd')}>USD</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="header-dropdown">
                                <a href="#">
                                    <LazyLoadImage
                                        src={this.state.lang === 'en' ? "/assets/images/flags/en.png" : "/assets/images/flags/uk.png"}
                                        effect="blur"
                                    />
                                    {this.state.lang === 'en' ? 'ENGLISH' : 'UKRAINIAN'}
                                </a>
                                <div className="header-menu">
                                    <ul>
                                        <li><a href="" onClick={(e) => this.onChangeLanguage(e, 'en')}><img src="/assets/images/flags/en.png" alt="England flag" />ENGLISH</a></li>
                                        <li><a href="" onClick={(e) => this.onChangeLanguage(e, 'ua')}><img src="/assets/images/flags/uk.png" alt="France flag" />UKRAINIAN</a></li>
                                    </ul>
                                </div>
                            </div>
                            {cookie.load('usertoken') && this.props.compares &&
                                <div className="dropdown compare-dropdown">

                                    <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false" data-display="static">
                                        <i className="icon-retweet"></i> Compare ({this.props.compares.count})
                                    </a>

                                    <div className="dropdown-menu">
                                        <div className="dropdownmenu-wrapper">
                                            <ul className="compare-products">
                                                {this.props.compares.data.map((item, key) =>
                                                    <li className="product" key={key}>
                                                        <a onClick={(e) => this.props.deleteCompares(e, item.id)} style={{ cursor: "pointer" }} className="btn-remove" title="Remove Product"><i className="icon-cancel"></i></a>
                                                        <h4 className="product-title"><Link to={"/product/" + item.id}>{item.title}</Link></h4>
                                                    </li>
                                                )}
                                            </ul>

                                            <div className="compare-actions">
                                                <a href="#" className="action-link">Clear All</a>
                                                <Link to="/compare" className="btn btn-primary">Compare</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            }
                        </div>

                        <div className="header-right">

                            <div className="header-dropdown dropdown-expanded">
                                <a href="#">Links</a>
                                <div className="header-menu">
                                    <ul>
                                        {!cookie.load('usertoken') ?
                                            <li><a data-mfp-src="#login-modal" className="modal-btn" style={{ cursor: "pointer" }}><Trans i18nKey='blocks.my_account'></Trans></a></li>
                                            :
                                            <li><Link to="/account"><Trans i18nKey='blocks.my_account'></Trans></Link></li>
                                        }
                                        <li><Link to="/account/wishlist">MY WISHLIST </Link></li>
                                        {!cookie.load('usertoken') ?
                                            <li><a data-mfp-src="#login-modal" className="modal-btn" style={{ cursor: "pointer" }}><Trans i18nKey='blocks.login'></Trans></a></li>
                                            :
                                            <li><a href="" onClick={this.logout}><Trans i18nKey='blocks.logout'></Trans></a></li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-middle">
                    <div className="container">
                        <div className="header-left">
                            <Link to="/" className="logo">
                                <LazyLoadImage
                                    src="/assets/images/logo-main.png"
                                    effect="blur"
                                />
                            </Link>
                        </div>

                        <div className="header-center">
                            <div className="header-search">
                                <a href="#" className="search-toggle" role="button"><i className="icon-magnifier"></i></a>
                                <form action="#" onSubmit={this.doSearch}>
                                    <div className="header-search-wrapper">
                                        <input type="search" className="form-control" name="search" id="q" placeholder={this.props.t('blocks.search_place')} required />
                                        <div className="select-custom">
                                            <select id="cat" name="cat">
                                                <option value="">{this.props.t('blocks.all_cats')}</option>
                                                {this.state.categories &&
                                                    this.state.categories.map((item, key) =>
                                                        <option key={key} value={item.id}>{item.title}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <button className="btn" type="submit"><i className="icon-magnifier"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="header-right">
                            <button className="mobile-menu-toggler" type="button">
                                <i className="icon-menu"></i>
                            </button>
                            <div className="header-contact">
                                <span><Trans i18nKey='blocks.call_us'></Trans></span>
                                <a href="tel:#"><strong>+000 000 0000</strong></a>
                            </div>

                            <CartDropdown cart={this.state.cart} deleteCartProduct={this.deleteCartProduct} cart_count={this.state.cart_count} />

                        </div>
                    </div>
                </div>


                <div id="login-modal" className="mfp-hide" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-content" style={{ background: "white" }}>
                    <div id="modal-content" style={{ padding: "1em 0 1em 0" }}>
                        <div className="modal-wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h2 className="title mb-2"><Trans i18nKey='blocks.login_modal_title'></Trans></h2>

                                        <Login onChange={this.onChange} onSubmit={this.onSubmitLogin} state={this.state} />

                                    </div>

                                    <div className="col-md-6">
                                        <h2 className="title mb-2"><Trans i18nKey='blocks.register_modal_title'></Trans></h2>

                                        <Register submit={this.onSubmitRegister} state={this.state} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="header-bottom sticky-header">

                    <div className="container">

                        <CartDropdown cart={this.state.cart} deleteCartProduct={this.deleteCartProduct} cart_count={this.state.cart_count} />

                        <nav className="main-nav">
                            <ul className="menu sf-arrows">
                                <li id="home"><Link to="/"><Trans i18nKey='blocks.home_link'></Trans></Link></li>
                                {this.state.user_group &&
                                    this.state.user_group === '2' &&
                                    <li><a href="/admin"><Trans i18nKey='blocks.admin_link'></Trans></a></li>
                                }
                                <li><Link to="/categories" id="contacts"><Trans i18nKey='blocks.products_link'></Trans></Link></li>
                                <li><Link to="/contact" id="contacts"><Trans i18nKey='blocks.contacts_link'></Trans></Link></li>
                                <li><Link to="/about" id="about"><Trans i18nKey='blocks.about_link'></Trans></Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }

}
export default withTranslation()(withRouter(Header))