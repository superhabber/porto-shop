import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Product_Delete } from './Product_Delete'

export default class Products_View extends Component {

    constructor(props) {
        super(props)

        this.state = { id: props.match.params.id }
    }

    delete = async () => {
        await Product_Delete(this.props, this.state.id)
    }

    componentDidMount = async () => {
        var product, category

        await axios.get(`http://diplom/server/admin/get_product?id=` + this.state.id)
            .then(res => {
                product = JSON.parse(res.data)
            })

        await axios.get(`http://diplom/server/admin/get_category?id=` + product.category_id)
            .then(res => {
                category = JSON.parse(res.data)
            })

        this.setState({
            product: product,
            category: category
        })
    }

    render() {
        return (
            <div className="page-wrapper">

                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Create new product</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Products Create</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    {this.state.product &&
                        <>
                            <div className="row mt-1 mb-4 ml-1">
                                <Link to="/admin/products/" className="btn btn-success btn-sm ml-1 mr-1">
                                    BACK
                            </Link>
                                <Link to={"/admin/products/" + this.state.product.id + "/edit"} className="btn btn-primary btn-sm ml-1 mr-1">
                                    EDIT
                            </Link>
                                <Link to={"#"} onClick={this.delete} className="btn btn-danger btn-sm mr-1 ml-1">
                                    DELETE
                            </Link>
                            </div>
                            <h3>{this.state.product.title}</h3>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th scope="row">ID</th>
                                        <td>{this.state.product.id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Image</th>
                                        <td> <img style={{ width: "40%" }} src={"http://diplom/server/" + this.state.product.image.src} /> </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">title</th>
                                        <td>{this.state.product.title}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">category</th>
                                        <td>
                                            {this.state.category &&
                                                <Link to={"/admin/categories/" + this.state.category.id + "/view"}>
                                                    {this.state.category.title}
                                                </Link>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">price</th>
                                        <td>{this.state.product.new_price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    }
                </div>
            </div>
        )
    }

}