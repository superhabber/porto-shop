import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'
import QueryString from "query-string"

import Categories_Component from './Categories_Component'
import { Trans, withTranslation } from 'react-i18next'
import Fade from 'react-reveal/Fade';

import MetaTags from 'react-meta-tags'

class Categories_Index extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id,
            orderby: undefined,
            colors: [],
            sizes: [],
            filter_colors: [],
            filter_sizes: [],
            start_price: 0,
            finish_price: 1000,
            limit: 8,
            can_load: true
        }
        this.onFilter = this.onFilter.bind(this)
        this.filterPrice = this.filterPrice.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }

    componentDidMount = async () => {
        var categories, filter_colors, filter_sizes

        await axios.get(`http://diplom/server/admin/all_categories`)
            .then(res => {
                categories = {
                    man: JSON.parse(res.data).filter(cat => cat.main === "0"),
                    woman: JSON.parse(res.data).filter(cat => cat.main === "1")
                }
            })

        await this.getFilteredProducts()

        await axios.get(`http://diplom/server/admin/all_colors`)
            .then(async (res) => {
                filter_colors = JSON.parse(res.data)

                await axios.get(`http://diplom/server/admin/all_sizes`)
                    .then(res => {
                        filter_sizes = JSON.parse(res.data)
                    })

            })

        this.setState({
            categories: categories,
            filter_colors: filter_colors,
            filter_sizes: filter_sizes
        })
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevState === this.state) await this.getFilteredProducts()
    }

    getFilteredProducts = async () => {
        var title = QueryString.parse(this.props.location.search).search

        await axios.post(`http://diplom/server/products/filter?search=` + (title = title ? title : null), JSON.stringify({
            category_id: this.props.match.params.id,
            filter: this.state
        }))
            .then(res => {
                var data = JSON.parse(res.data)
                this.setState({
                    products: data.products,
                    can_load: data.can_load
                })
            })
    }

    onFilter = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, async () => {
            await this.getFilteredProducts()
        });
    }

    loadMore = async (e) => {
        e.preventDefault()
        this.setState({
            limit: this.state.limit + 8
        }, async () => {
            await this.getFilteredProducts()
        });

    }

    filterPrice = async (e) => {
        e.preventDefault()

        this.setState({
            start_price: $('#filter-price-range')[0].innerText.split(' - ')[0],
            finish_price: $('#filter-price-range')[0].innerText.split(' - ')[1],

        }, async () => {
            await this.getFilteredProducts()
        })
    }

    deleteSearch(e) {
        e.preventDefault()
        this.props.history.push(this.props.location.pathname)
    }

    // setColor = async (e, color) => {
    //     e.preventDefault()

    //     var li = $($(e.target)[0]).parent()[0]

    //     $(li).toggleClass('active')

    //     if ($(li).hasClass('active')) {
    //         this.state.colors.push(color)
    //         this.getFilteredProducts()
    //     } else {
    //         this.setState({
    //             colors: this.state.colors.filter(item => item !== color)
    //         }, async () => {
    //             await this.getFilteredProducts()
    //         })
    //     }

    // }

    setSize = async (e, color) => {
        e.preventDefault()

        var li = $($(e.target)[0]).parent()[0]

        $(li).toggleClass('active')

        if ($(li).hasClass('active')) {
            $(li).children().css('background-color', '#08c').css('color', '#fff')
            this.state.sizes.push(color)
            this.getFilteredProducts()
        } else {
            $(li).children().css('background-color', '#fff').css('color', '#7a7d82')
            this.setState({
                sizes: this.state.sizes.filter(item => item !== color)
            }, async () => {
                await this.getFilteredProducts()
            })
        }

    }

    render() {
        return (
            <main className="main">
                <MetaTags>
                    <title>Всі товари по категоріям</title>
                </MetaTags>
                <Fade big duration={1000}>
                    <nav aria-label="breadcrumb" className="top-nav breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb mt-0">
                                <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to="/categories"><Trans i18nKey="blocks.categories"></Trans></Link></li>
                            </ol>
                        </div>
                    </nav>

                    <div className="container">

                        <div className="row">
                            <div className="col-lg-9">
                                {QueryString.parse(this.props.location.search).search &&
                                    <div className="row ml-2">
                                        <p>Searching: {QueryString.parse(this.props.location.search).search}</p>
                                        <a href="" onClick={this.deleteSearch}><i className="icon-cancel"></i></a>
                                    </div>
                                }
                                <nav className="toolbox">

                                    <div className="toolbox-left">

                                        <div className="toolbox-item toolbox-sort">
                                            <div className="select-custom">
                                                <select name="orderby" className="form-control" onChange={this.onFilter}>
                                                    <option defaultValue="menu_order">{this.props.t('blocks.sort_def')}</option>
                                                    <option value="date">{this.props.t('blocks.sort_new')}</option>
                                                    <option value="price">{this.props.t('blocks.sort_low')}</option>
                                                    <option value="price-desc">{this.props.t('blocks.sort_high')}</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>

                                    {/* <div className="toolbox-item toolbox-show">
                                <label>Showing 1–9 of 60 results</label>
                            </div> */}

                                </nav>
                                {this.state.products &&
                                    <Fade big duration={1200}>

                                        <Categories_Component products={this.state.products} onCartAdd={this.props.onCartAdd} />

                                    </Fade>
                                }
                                {this.state.can_load && this.state.products && this.state.products.length !== 0 &&
                                    <div className="col-12 text-center loadmore">
                                        <a href="#" onClick={this.loadMore} className="btn btn-block btn-outline"><Trans i18nKey="blocks.load_more"></Trans></a>
                                    </div>
                                }

                            </div>

                            <aside className="sidebar-shop col-lg-3 order-lg-first mb-4 pb-4">
                                <div className="sidebar-wrapper mb-4">
                                    <div className="widget">
                                        <h3 className="widget-title">
                                            <a data-toggle="collapse" href="#widget-body-1" role="button" aria-expanded="true" aria-controls="widget-body-1">
                                                <Trans i18nKey="blocks.categories"></Trans>
                                            </a>
                                        </h3>

                                        <div className="collapse show" id="widget-body-1">
                                            <div className="widget-body">
                                                <ul className="cat-list">

                                                    <div className="widget">
                                                        <h3 className="widget-title">
                                                            <a data-toggle="collapse" href="#widget-body-man" role="button" aria-expanded="true" aria-controls="widget-body-man">
                                                                WOMAN
                                                            </a>
                                                        </h3>

                                                        <div className="collapse" id="widget-body-man">
                                                            <div className="widget-body">
                                                                <ul className="cat-list">
                                                                    {this.state.categories &&
                                                                        this.state.categories.man.map((item, key) =>
                                                                            <li key={key}><Link to={"/categories/" + item.id}>{item.title}</Link></li>
                                                                        )
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <h3 className="widget-title">
                                                            <a data-toggle="collapse" href="#widget-body-woman" role="button" aria-expanded="true" aria-controls="widget-body-woman">
                                                                MAN
                                                            </a>
                                                        </h3>

                                                        <div className="collapse" id="widget-body-woman">
                                                            <div className="widget-body">
                                                                <ul className="cat-list">
                                                                    {this.state.categories &&
                                                                        this.state.categories.woman.map((item, key) =>
                                                                            <li key={key}><Link to={"/categories/" + item.id}>{item.title}</Link></li>
                                                                        )
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="widget">
                                        <h3 className="widget-title">
                                            <a data-toggle="collapse" href="#widget-body-2" role="button" aria-expanded="true" aria-controls="widget-body-2"><Trans i18nKey="blocks.price"></Trans></a>
                                        </h3>

                                        <div className="collapse show" id="widget-body-2">
                                            <div className="widget-body">
                                                <form action="#" onSubmit={this.filterPrice}>
                                                    <div className="price-slider-wrapper">
                                                        <div id="price-slider"></div>
                                                    </div>

                                                    <div className="filter-price-action">
                                                        <button type="submit" className="btn btn-primary"><Trans i18nKey="blocks.filter"></Trans></button>

                                                        <div className="filter-price-text">
                                                            <span id="filter-price-range"></span>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="widget">
                                    <h3 className="widget-title">
                                        <a data-toggle="collapse" href="#widget-body-3" role="button" aria-expanded="true" aria-controls="widget-body-3">Size</a>
                                    </h3>

                                    <div className="collapse show" id="widget-body-3">
                                        <div className="widget-body">
                                            <ul className="config-size-list">
                                                <li><a href="#">S</a></li>
                                                <li className="active"><a href="#">M</a></li>
                                                <li><a href="#">L</a></li>
                                                <li><a href="#">XL</a></li>
                                                <li><a href="#">2XL</a></li>
                                                <li><a href="#">3XL</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> */}

                                    {/* <div className="widget">
                                        <h3 className="widget-title">
                                            <a data-toggle="collapse" href="#widget-body-6" role="button" aria-expanded="true" aria-controls="widget-body-6"><Trans i18nKey="blocks.color"></Trans></a>
                                        </h3>

                                        <div className="collapse show" id="widget-body-6">
                                            <div className="widget-body">
                                                <ul className="config-swatch-list">
                                                    {this.state.filter_colors.map((item, key) =>
                                                        <li key={key}>
                                                            <a href="" onClick={(e) => this.setColor(e, item.name)} style={{ backgroundColor: item.value }}></a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="widget mb-4 pb-4">
                                        <h3 className="widget-title">
                                            <a data-toggle="collapse" href="#widget-body-6" role="button" aria-expanded="true" aria-controls="widget-body-6">Select size</a>
                                        </h3>

                                        <div className="collapse show" id="widget-body-6">
                                            <div className="widget-body">
                                                <ul className="config-size-list">
                                                    {this.state.filter_sizes.map((item, key) =>
                                                        <li key={key}>
                                                            <a href="" onClick={(e) => this.setSize(e, item)}>{item}</a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </aside>
                        </div>
                    </div>

                    <div className="mb-5"></div>
                </Fade>
            </main>
        )
    }

}
export default withTranslation()(withRouter(Categories_Index))