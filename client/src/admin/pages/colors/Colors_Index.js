import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Color_Delete } from './Color_Delete'
import axios from 'axios'

export default class Colors_Index extends Component {

    state = {}

    componentWillMount = async () => {
        await axios.get(`http://diplom/server/admin/all_colors`)
            .then(res => {
                var data = JSON.parse(res.data)
                this.setState({
                    colors: data
                })
            })
    }

    delete = async (id) => {
        Color_Delete(this.props, id)
        this.componentWillMount()
    }

    render() {
        return (
            <div className="Products">
                <h2>Colors</h2>

                <div className="row mt-1 mb-1">

                    <Link to={"/admin/colors/create"} className="btn btn-info btn-sm ">
                        CREATE NEW
                    </Link>
                </div>

                <div className="row">
                    <table className="table table-striped table-dark table-bordered table-hover" style={{ padding: "0 0.5em" }}>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">name</th>
                                <th scope="col">value</th>
                                <th scope="col">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.colors &&
                                this.state.colors.map((item, key) =>

                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td ><span style={{ backgroundColor: item.value, height: "100%" }}>---</span></td>
                                        <td width="20%">

                                            <Link to={"/admin/colors/" + item.id + "/view"} style={{ margin: "0 0.4em" }}>
                                                <i style={{ color: "white" }} className="fa fa-eye" aria-hidden="true"></i>
                                            </Link>
                                            <Link to={"/admin/colors/" + item.id + "/edit"} style={{ margin: "0 0.4em" }}>
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
        )
    }

}