import React, { PureComponent } from 'react'

import { Trans, withTranslation } from 'react-i18next';
import Fade from 'react-reveal/Fade';

import axios from 'axios'

class Footer extends PureComponent {

    onSubmit = async (e) => {
        e.preventDefault()

        var email = e.target.email.value

        await axios.get(`http://diplom/server/admin/email_news?email=` + email)
            .then(res => {
                var msg = JSON.parse(res.data) === 'already' ? 'This email is already subscribed' : 'You have successfully subscribed'

                this.props.setModal(true, msg)
            })
    }

    render() {
        return (
            <footer className="footer">
                <Fade duration={1500}>
                    <div className="container">
                        <div className="footer-top">
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="widget widget-newsletter">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <h4 className="widget-title"><Trans i18nKey="blocks.sub_news"></Trans></h4>
                                                <p><Trans i18nKey="blocks.news_info"></Trans></p>
                                            </div>

                                            <div className="col-lg-6">
                                                <form action="#" onSubmit={this.onSubmit}>
                                                    <input type="email" name="email" className="form-control" placeholder={this.props.t('blocks.email_place')} required />

                                                    <input type="submit" className="btn" value={this.props.t('blocks.sub_btn')} />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 widget-social">
                                    <div className="social-icons">
                                        <a href="#" className="social-icon" target="_blank"><i className="icon-facebook"></i></a>
                                        <a href="#" className="social-icon" target="_blank"><i className="icon-twitter"></i></a>
                                        <a href="#" className="social-icon" target="_blank"><i className="icon-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-middle">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="widget">
                                        <h4 className="widget-title"><Trans i18nKey="blocks.contact_us"></Trans></h4>
                                        <ul className="contact-info">
                                            <li>
                                                <span className="contact-info-label">Address:</span>123 Street Name, City, England
                                        </li>
                                            <li>
                                                <span className="contact-info-label">Phone:</span>Toll Free <a href="tel:">(000) 000-0000</a>
                                            </li>
                                            <li>
                                                <span className="contact-info-label">Email:</span> <a
                                                    href="mailto:mail@example.com">example@example.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-9">
                                    <div className="row">
                                        <div className="col-md-12 text-left">
                                            <div className="widget">
                                                <h4 className="widget-title"><Trans i18nKey="blocks.my_account"></Trans></h4>

                                                <div className="row">
                                                    <div className="col-sm-12 col-md-12">
                                                        <ul className="links">
                                                            <li><a href="about.html">About Us</a></li>
                                                            <li><a href="contact.html">Contact Us</a></li>
                                                            <li><a href="my-account.html">My Account</a></li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="footer-bottom">
                                        <p className="footer-copyright">Yaroslav Palamarchuk. &copy; 2020.<Trans i18nKey="blocks.copy"></Trans></p>


                                        <img src="/assets/images/payments.png" alt="payment methods" className="footer-payments" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </footer>

        )
    }

}

export default withTranslation()(Footer)