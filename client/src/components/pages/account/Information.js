import React, { PureComponent } from 'react'
import cookie from 'react-cookies'
import axios from 'axios'
import Popup from 'reactjs-popup'

export default class Information extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            user: cookie.load('user'),
            first_name: cookie.load('user').username.split(' ')[0],
            last_name: cookie.load('user').username.split(' ')[1],
            email: cookie.load('user').email,
            pass: "",
            pass_rep: "",
            errors: {
                password: undefined
            },
            success_popup: false
        }
        this.onChange = this.onChange.bind(this)
    }

    popup() {
        this.setState({
            success_popup: true
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, function () {
            this.setState({
                errors: {
                    password: this.state.pass !== this.state.pass_rep ? "Passwords don't match" : undefined
                }
            })
        })

    }

    onSubmit = async(e) => {
        e.preventDefault()
        if (this.state.errors.password === undefined) {
            await axios.post(`http://diplom/server/user/edit_info`, JSON.stringify({
                data: this.state
            }))
                .then(res => {
                    axios.post(`http://diplom/server/user/data`, JSON.stringify({
                        token: cookie.load('usertoken')
                    }))
                        .then(res => {
                            this.setState({success_popup: true})
                            cookie.save('user', res.data[0], { path: '/' })
                        })
                })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Popup
                        open={this.state.success_popup}
                        closeOnDocumentClick
                    >
                        <div className="text-center">
                            <h4 className="mt-4 mb-4">
                                Account successfully edited
                            </h4>
                        </div>
                    </Popup>
                    <div className="col-lg-12 order-lg-last dashboard-content">
                        <h2>Edit Account Information</h2>

                        <form action="#" onChange={this.onChange} onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group required-field">
                                                <label htmlFor="acc-name">First Name</label>
                                                <input type="text" className="form-control" id="acc-name" name="first_name" required defaultValue={this.state.user.username.split(' ')[0]} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group required-field">
                                                <label htmlFor="acc-lastname">Last Name</label>
                                                <input type="text" className="form-control" id="acc-lastname" name="last_lastname" required defaultValue={this.state.user.username.split(' ')[1]} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group required-field">
                                                <label htmlFor="acc-email">Email</label>
                                                <input type="email" className="form-control" id="acc-email" name="email" defaultValue={this.state.user.email} required />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="mb-2"></div>

                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input mr-2 ml-2" onClick={console.log('password change menu toggle')} id="change-pass-checkbox" value="1" />
                                <label className="custom-control-label ml-4" htmlFor="change-pass-checkbox">Change Password</label>
                            </div>

                            {this.state.errors.password &&
                                <div className="alert alert-danger mt-2 mb-2" role="alert">
                                    {this.state.errors.password}
                                </div>
                            }

                            <div id="account-chage-pass" className="mt-2">
                                <h3 className="mb-2">Change Password</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group required-field">
                                            <label htmlFor="acc-pass2">Password</label>
                                            <input type="password" className="form-control" id="acc-pass2" name="pass" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group required-field">
                                            <label htmlFor="acc-pass3">Confirm Password</label>
                                            <input type="password" className="form-control" id="acc-pass3" name="pass_rep" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="required text-right">* Required Field</div>
                            <div className="form-footer">
                                <a href=""><i className="icon-angle-double-left"></i>Back</a>

                                <div className="form-footer-right">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }

}