import { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'

class History extends PureComponent {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            if (this.props.location.pathname === '/' ||
                (this.props.location.pathname.split('/')[1] === 'categories' &&
                    this.props.location.pathname.split('/')[1] !== prevProps.location.pathname.split('/')[1])) {
                $('script#main-script').remove()
                $('body').append('<script id="main-script" src="/assets/js/main.min.js"></script>')
            }
        }
    }

    render() {
        return this.props.children
    }
}
export default withRouter(History)