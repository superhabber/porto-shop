import React, { PureComponent } from 'react'

export default class Register extends PureComponent {

    render() {

        const error = (
            <div>
                <div className="alert alert-danger" role="alert">
                    {this.props.state.register_errors}
                </div>
            </div>
        )
        return (
            <form action="" onSubmit={this.props.submit}>
                {this.props.state.register_errors !== undefined ? error : '' }
                <label htmlFor="register-username">Your First and Last name <span className="required">*</span></label>
                <input type="text" name="username" className="form-input form-wide mb-2" id="register-username" required />

                <label htmlFor="register-email">Email address <span className="required">*</span></label>
                <input type="email" name="email" className="form-input form-wide mb-2" id="register-email" required />

                <label htmlFor="register-password">Password <span className="required">*</span></label>
                <input type="password" name="password" className="form-input form-wide mb-2" id="register-password" required />

                <div className="form-footer">
                    <button type="submit" className="btn btn-primary btn-md">Register</button>
                </div>
            </form>
        )
    }


}