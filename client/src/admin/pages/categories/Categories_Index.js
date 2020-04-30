import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Category_Delete } from './Category_Delete'
import axios from 'axios'

export default class Categories_Index extends Component {

    state = {}

    componentWillMount = async () => {
        await axios.get(`http://diplom/server/admin/all_categories`)
            .then(res => {
                var data = JSON.parse(res.data)
                this.setState({
                    categories: data
                })
            })
    }

    delete = async (id) => {
        Category_Delete(this.props, id)
        this.componentWillMount()
    }

    render() {
        return (
            <div className="page-wrapper">

                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Categories</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Categories</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">

                    <div className="row mt-1 mb-1">

                        <Link to={"/admin/categories/create"} className="btn btn-info btn-sm ">
                            CREATE NEW
                    </Link>
                    </div>

                    <div className="row">
                        <table className="table table-striped table-dark table-bordered table-hover" style={{ padding: "0 0.5em" }}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">title</th>
                                    <th scope="col">size type</th>
                                    <th scope="col">actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.categories &&
                                    this.state.categories.map((item, key) =>

                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.title}</td>
                                            <td>{item.main === "0" ? "Man" : "Woman"}</td>
                                            <td width="20%">

                                                <Link to={"/admin/categories/" + item.id + "/view"} style={{ margin: "0 0.4em" }}>
                                                    <i style={{ color: "white" }} className="fa fa-eye" aria-hidden="true"></i>
                                                </Link>
                                                <Link to={"/admin/categories/" + item.id + "/edit"} style={{ margin: "0 0.4em" }}>
                                                    <i style={{ color: "white" }} className="fa fa-pencil" aria-hidden="true"></i>
                                                </Link>
                                                <Link to="#" onClick={() => this.delete(item.id)} style={{ margin: "0 0.4em" }}>
                                                    <i style={{ color: "white" }} className="fa fa-trash-o" aria-hidden="true"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }

}