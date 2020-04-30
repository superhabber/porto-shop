import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'
import {Trans, withTranslation} from 'react-i18next'

import MetaTags from 'react-meta-tags'

class Contact extends PureComponent {

    render() {
        return (
            <main className="main mt-1">
                <MetaTags>
                    <title>Контакти</title>
                </MetaTags>
                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                            <li className="breadcrumb-item active" aria-current="page"><Trans i18nKey="blocks.contact_us"></Trans></li>
                        </ol>
                    </div>
                </nav>

                <div className="container mt-1 mb-1">

                    <div className="row">
                        <div className="col-md-8">
                            <h2 className="light-title"><Trans i18nKey="blocks.contact_write_us1"></Trans> <strong><Trans i18nKey="blocks.contact_write_us2"></Trans></strong></h2>
                            <form action="#">
                                <div className="form-group required-field">
                                    <label htmlFor="contact-name"><Trans i18nKey="blocks.form_name"></Trans></label>
                                    <input type="text" className="form-control" id="contact-name" name="contact-name" required />
                                </div>

                                <div className="form-group required-field">
                                    <label htmlFor="contact-email"><Trans i18nKey="blocks.form_email"></Trans></label>
                                    <input type="email" className="form-control" id="contact-email" name="contact-email" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-phone"><Trans i18nKey="blocks.form_phone"></Trans></label>
                                    <input type="tel" className="form-control" id="contact-phone" name="contact-phone" />
                                </div>

                                <div className="form-group required-field">
                                    <label htmlFor="contact-message"><Trans i18nKey="blocks.form_mind"></Trans></label>
                                    <textarea cols="30" rows="1" id="contact-message" className="form-control" name="contact-message" required></textarea>
                                </div>

                                <div className="form-footer">
                                    <button type="submit" className="btn btn-primary"><Trans i18nKey="blocks.form_submit"></Trans></button>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-4">
                            <h2 className="light-title">Contact <strong>Details</strong></h2>

                            <div className="contact-info">
                                <div>
                                    <i className="icon-phone"></i>
                                    <p><a href="tel:">000 000 0000</a></p>
                                    <p><a href="tel:">000 000 0000</a></p>
                                </div>
                                <div>
                                    <i className="icon-mail-alt"></i>
                                    <p><a href="mailto:#">porto@test.com</a></p>
                                    <p><a href="mailto:#">porto@test.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8"></div>

            </main>
        )
    }
}

export default withTranslation() (Contact)