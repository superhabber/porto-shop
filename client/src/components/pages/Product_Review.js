import React, { Component } from 'react'
import cookie from 'react-cookies';

import {Trans, withTranslation} from 'react-i18next'

class Product_Review extends Component {

    render() {
        return (
            <form action="#" onSubmit={this.props.onSubmit} >

                <table className="ratings-table">
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>1 <Trans i18nKey="blocks.star"></Trans></th>
                            <th>2 <Trans i18nKey="blocks.stars"></Trans></th>
                            <th>3 <Trans i18nKey="blocks.stars"></Trans></th>
                            <th>4 <Trans i18nKey="blocks.stars"></Trans></th>
                            <th>5 <Trans i18nKey="blocks.stars2"></Trans></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Trans i18nKey="blocks.quality"></Trans></td>
                            <td>
                                <input type="radio" name="quality" value="1" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="quality" value="2" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="quality" value="3" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="quality" value="4" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="quality" value="5" className="radio" />
                            </td>
                        </tr>
                        <tr>
                            <td><Trans i18nKey="blocks.value"></Trans></td>
                            <td>
                                <input type="radio" name="value" id="Value_1" value="1" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="value" id="Value_2" value="2" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="value" id="Value_3" value="3" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="value" id="Value_4" value="4" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="value" id="Value_5" value="5" className="radio" />
                            </td>
                        </tr>
                        <tr>
                            <td><Trans i18nKey="blocks.price"></Trans></td>
                            <td>
                                <input type="radio" name="price" id="Price_1" value="1" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="price" id="Price_2" value="2" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="price" id="Price_3" value="3" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="price" id="Price_4" value="4" className="radio" />
                            </td>
                            <td>
                                <input type="radio" name="price" id="Price_5" value="5" className="radio" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="form-group">
                    <label><Trans i18nKey="blocks.form_name"></Trans> <span className="required">*</span></label>
                    <input type="text" name="username" defaultValue={cookie.load('user') ? cookie.load('user').username : ""} className="review-field form-control form-control-sm" required />
                </div>

                <div className="form-group">
                    <label><Trans i18nKey="blocks.form_email"></Trans> <span className="required">*</span></label>
                    <input type="email" name="email" defaultValue={cookie.load('user') ? cookie.load('user').email : ""} className="review-field form-control form-control-sm" required />
                </div>

                <div className="form-group mb-2">
                    <label><Trans i18nKey="blocks.form_mind"></Trans> <span className="required">*</span></label>
                    <textarea name="review" rows="6" className="review-field form-control col-12"></textarea>
                </div>

                <input type="submit" className="btn btn-primary modal-btn" value={this.props.t('blocks.form_submit')} />
                
            </form>
        )
    }

}

export default withTranslation() (Product_Review)