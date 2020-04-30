import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Category_Delete } from './Category_Delete'

export default class Category_View extends Component {

    state = {}

    componentWillMount() {
        this.setState({
            id: this.props.match.params.id
        })

    }

    delete = async () => {
        Category_Delete(this.props, this.state.id)
    }

    componentDidMount = async () => {
        await axios.get(`http://diplom/server/admin/get_category?id=` + this.state.id)
            .then(res => {
                this.setState({
                    category: JSON.parse(res.data)
                })
            })
    }

    render() {
        return (
            <div className="page-wrapper">

                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">View Category</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Categort View</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    {this.state.category &&
                        <>
                            <div className="row mt-1 mb-4 ml-1">
                                <Link to="/admin/categories/" className="btn btn-success btn-sm ml-1 mr-1">
                                    BACK
                            </Link>
                                <Link to={"/admin/categories/" + this.state.category.id + "/edit"} className="btn btn-primary btn-sm ml-1 mr-1">
                                    EDIT
                            </Link>
                                <Link to={"#"} onClick={this.delete} className="btn btn-danger btn-sm mr-1 ml-1">
                                    DELETE
                            </Link>
                            </div>
                            <h3>{this.state.category.title}</h3>

                            <table className="table table-bordered">
                                <tbody>

                                    <tr>
                                        <th scope="row">ID</th>
                                        <td>{this.state.category.id}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">title</th>
                                        <td>{this.state.category.title}</td>

                                    </tr>

                                    <tr>
                                        <th scope="row">Size Type</th>
                                        <td>{this.state.category.main === "0" ? "Man" : "Woman"}</td>

                                    </tr>

                                    <tr>
                                        <th scope="row">Parameters</th>
                                        <td>{JSON.parse( this.state.category.parameters ).join(', ')}</td>

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