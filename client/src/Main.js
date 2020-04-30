import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import cookie from 'react-cookies'
import axios from 'axios'
import Popup from 'reactjs-popup'

import Header from './components/blocks/Header'
import Footer from './components/blocks/Footer'
import Index from './components/pages/Index'
import History from './History'
import About from './components/pages/About'
import Contact from './components/pages/Contact'

import Products_View from './components/pages/Product_View'
import Categories_Index from './components/pages/Categories_Index'
import Account from './components/pages/Account';
import Cart_View from './components/pages/Cart_View'

import Mobile from './Mobile.js'

import Error from './components/blocks/Error'

import i18n from './i18n'
import Fade from 'react-reveal/Fade';
import Compare from './components/pages/Compare';

import $ from 'jquery'

class Main extends PureComponent {

    // конструктор головного класу
    constructor(props) {
        super(props)

        this.state = {
            usertoken: cookie.load('usertoken'), // токен користувача
            user: undefined, // користувач
            cart: cookie.load('cart') ? cookie.load('cart') : [], // корзина
            cart_count: cookie.load('cart_count') ? cookie.load('cart_count') : 0, // сума корзини
            lang: cookie.load('lang') ? cookie.load('lang') : 'en', // мова користувача
            popup_show: false, // попап вікно
            popup_message: "" // попап повідомлення
        }

        // бінд основних функцій, які будуть передаватися в підкомпоненти
        this.onCartDelete = this.onCartDelete.bind(this)
        this.onClose = this.onClose.bind(this)
        this.deleteCompares = this.deleteCompares.bind(this)
        this.addCompare = this.addCompare.bind(this)
        this.compareUpdate = this.compareUpdate.bind(this)

        this.setModal = this.setModal.bind(this)
    }

    // початкова функція
    componentDidMount() {

        $('.admin-links').remove()

        i18n.changeLanguage(this.state.lang)

        document.documentElement.lang = this.state.lang

        if (this.state.usertoken) this.compareUpdate()

    }

    // функція встановлення токена користувача
    setUserToken = (token, r) => {
        this.setState({ usertoken: token })
    }

    // функція додавання товару до корзини
    onCartAdd = async (e, id, color, size) => {
        e.preventDefault()
        // отримання інформації про товар з сервера для збереження
        await axios.get(`http://diplom/server/products/single?id=` + id)
            .then(res => {
                var cart = cookie.load('cart') ? cookie.load('cart') : []

                var data = JSON.parse(res.data) // записання товару в перемінну
                data.color = color // додавання кольору і розміру якщо є
                data.size = size
                cart.push(data);

                //збереження нової корзини з доданим товаром. Збільшення суми корзини на ціну нового товару
                this.setState({ cart: cart, cart_count: Number(this.state.cart_count) + Number(data.new_price) }, function () {
                    //збереження корзини та суми в куки
                    cookie.save('cart', cart, { path: '/' })
                    cookie.save('cart_count', this.state.cart_count, { path: '/' })
                })

            })

    }

    // функція додавання товару до списку побажань, приймає event та id товару
    addToWish = async (e, id) => {
        e.preventDefault()

        var msg

        if (this.state.usertoken === undefined) {
            msg = "Login or register to add this item"
        } else {
            await axios.post(`http://diplom/server/wishlist/add`, JSON.stringify({
                model_id: id,
                user_id: cookie.load('user').id
            })).then(res => {

                if (JSON.parse(res.data).code === 'success') {
                    msg = "You have successfully added an item to wishlist"
                } else {
                    msg = "This product is already in your wishlist"
                }

            })
        }
        // показати попап вікно з потрібним повідомленням
        this.setState({
            popup_message: msg,
            popup_show: true
        })

    }

    // функція видалення товару з корзини, приймає event та ключ товару в масиві state
    onCartDelete(e, key) {
        e.preventDefault()
        // видалений елемент за ключом
        var deleted = this.state.cart.splice(key, 1)

        var newcart = this.state.cart

        this.setState({
            cart: newcart,
            cart_count: Number(this.state.cart_count) - Number(deleted[0].new_price)
        }, function () {
            cookie.save('cart', this.state.cart, { path: '/' })
            cookie.save('cart_count', this.state.cart_count, { path: '/' })
        })
    }

    onClose() {
        this.setState({ popup_show: false })
    }

    // оновити список порівняння
    compareUpdate = async () => {
        await axios.get(`http://diplom/server/user/compares?user_id=` + cookie.load('user').id)
            .then(res => {
                this.setState({ compares: JSON.parse(res.data) })
            })

    }

    // видалити з списку побажань, приймає event та id товару
    deleteCompares = async (e, id) => {
        e.preventDefault()

        var new_c = this.state.compares.data.filter(item => item.id !== id)

        this.setState({
            compares: {
                data: new_c,
                count: new_c.length
            }
        }, async () => {
            var list = []
            this.state.compares.data.map((item) => list.push(item.id))

            await axios.post(`http://diplom/server/user/set_compare`, JSON.stringify({
                new_list: list,
                user_id: cookie.load('user').id
            }))
                .then(res => {
                    console.log(JSON.parse(res.data))
                })
        })
    }

    // додати товар до списку порівнять
    addCompare = async (e, id, cat_id) => {
        e.preventDefault()

        if (this.state.compares.count >= 2) {
            this.setState({
                popup_show: true,
                popup_message: "Limit of items to compare is 2"
            })
        } else {
            if (cookie.load('user')) {
                if(this.state.compares.data.length === 1 && this.state.compares.data[0].category_id !== cat_id){
                    this.setState({
                        popup_show: true,
                        popup_message: "You can not add two products with different categories"
                    })

                    return
                }
                
                await axios.get(`http://diplom/server/user/add_compare?id=` + id + '&user_id=' + cookie.load('user').id)
                    .then(async (res) => {
                        // оновити список
                        await this.compareUpdate()
                    })
            } else {
                this.setState({
                    popup_show: true,
                    popup_message: "Log in or register to add this product to compare list"
                })
            }
        }

    }

    setModal(value, msg) {
        this.setState({
            popup_show: value,
            popup_message: msg ? msg : ""
        })
    }

    render() {

        return (

            <div className="App">

                <BrowserRouter>
                    <History>

                        <Header
                            setUserToken={this.setUserToken}
                            link={this.state.link}
                            cart={this.state.cart}
                            cart_count={this.state.cart_count}
                            lang={this.state.lang}
                            compares={this.state.compares}
                            compareUpdate={this.compareUpdate}
                            deleteCompares={this.deleteCompares}
                        />

                        <Switch>

                            <Route exact path="/">
                                <Fade big>
                                    <Index onCartAdd={this.onCartAdd} addToWish={this.addToWish} />
                                </Fade>
                            </Route>

                            <Route exact path="/cart">
                                <Fade big>
                                    <Cart_View onCartAdd={this.onCartAdd} onCartDelete={this.onCartDelete} />
                                </Fade>
                            </Route>

                            <Route path="/product/:id">
                                <Fade big>
                                    <Products_View onCartAdd={this.onCartAdd} addCompare={this.addCompare} addToWish={this.addToWish} />
                                </Fade>
                            </Route>

                            <Route exact path="/categories/:id?/:title?">
                                <Fade big>
                                    <Categories_Index onCartAdd={this.onCartAdd} />
                                </Fade>
                            </Route>

                            <Route exact path="/about">
                                <Fade big>
                                    <About />
                                </Fade>
                            </Route>

                            <Route exact path="/contact">
                                <Fade big>
                                    <Contact />
                                </Fade>
                            </Route>

                            {this.state.usertoken &&
                                <>
                                    <Route exact path="/compare">
                                        <Fade big>
                                            <Compare compares={this.state.compares} compareUpdate={this.compareUpdate} />
                                        </Fade>
                                    </Route>

                                    <Route path="/account">
                                        <Fade big>
                                            <Account />
                                        </Fade>
                                    </Route>
                                </>
                            }

                            <Route component={Error} />

                        </Switch>

                        <Footer setModal={this.setModal} />

                        <Popup open={this.state.popup_show} closeOnDocumentClick onClose={this.onClose} >
                            <div className="text-center">
                                <h4 className="mt-4 mb-4">
                                    {this.state.popup_message}
                                </h4>
                            </div>
                        </Popup>

                    </History>

                </BrowserRouter>
                <div id="mobile-wrapper">
                    <Mobile />
                </div>

                <a id="scroll-top" href="#top" role="button"><i className="icon-angle-up"></i></a>
            </div>

        )
    }
}

export default Main