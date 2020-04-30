import React, { PureComponent } from 'react'

export default class Login extends PureComponent {

    state = {
        email: undefined,
        password: undefined
    }

    render() {

        const error = (
            <div>
                <div className="alert alert-danger" role="alert">
                    {this.props.state.login_errors}
                </div>
            </div>
        )

        return (
            <form action="#" className="mb-1" onSubmit={this.props.onSubmit}>
                {this.props.state.login_errors !== undefined ? error : '' }
                <label htmlFor="login-email">Email address <span className="required">*</span></label>
                <input name="email" type="email" onChange={this.props.onChange} className="form-input form-wide mb-2" id="login-email" required />

                <label htmlFor="login-password">Password <span className="required">*</span></label>
                <input name="password" onChange={this.props.onChange} type="password" className="form-input form-wide mb-2" id="login-password" required />

                <div className="form-footer">
                    <button type="submit" className="btn btn-primary btn-md">LOGIN</button>

                </div>
                <a href="#" className="forget-password"> Forgot your password?</a>
            </form>
        )
    }

}