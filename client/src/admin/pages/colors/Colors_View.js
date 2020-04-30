import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Color_Delete} from './Color_Delete'

export default class Colors_View extends Component {

    state = {}

    componentWillMount() {
        this.setState({
            id: this.props.match.params.id
        })
        
    }

    delete = async () => {
        Color_Delete(this.props, this.state.id)
    }

    componentDidMount = async () => {
        await axios.get(`http://diplom/server/admin/get_color?id=` + this.state.id)
            .then(res => {
                this.setState({
                    color: JSON.parse(res.data)
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.color &&
                    <>
                        <div className="row mt-1 mb-1 ml-1">
                            <Link to="/admin/colors/" className="btn btn-success btn-sm ml-1 mr-1">
                                BACK
                            </Link>
                            <Link to={"/admin/colors/" + this.state.color.id + "/edit"} className="btn btn-primary btn-sm ml-1 mr-1">
                                EDIT
                            </Link>
                            <Link to={"#"} onClick={this.delete} className="btn btn-danger btn-sm mr-1 ml-1">
                                DELETE
                            </Link>
                        </div>
                        <h3>{this.state.color.name}</h3>

                        <table className="table table-bordered">
                            <tbody>

                                <tr>
                                    <th scope="row">ID</th>
                                    <td>{this.state.color.id}</td>
                                </tr>
                                
                                <tr>
                                    <th scope="row">value</th>
                                    <td>
                                        {this.state.color.value}
                                        <div className="text-center" style={{backgroundColor:this.state.color.value}}>
                                            -
                                        </div>
                                    </td>

                                </tr>
                                
                            </tbody>
                        </table>
                    </>
                }
            </div>
        )
    }

}