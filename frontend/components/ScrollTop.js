import React, {Component} from "react";


export default class ScrollToTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_visible: false
        };
    }

    componentDidMount() {
        const scrollComponent = this;
        document.addEventListener("scroll", function (e) {
            scrollComponent.toggleVisibility();
        });
    }

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.setState({
                is_visible: true
            });
        } else {
            this.setState({
                is_visible: false
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        let classes = [`back-to-top d-flex align-items-center justify-content-center`];
        if (this.state.is_visible) {
            classes.push(`active`);
        }

        return (
                <div onClick={this.scrollToTop} className={classes.join(' ')}><i
                    className="bi bi-arrow-up-short"/>
                </div>
        );
    }
}
