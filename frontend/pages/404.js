import classes from '../styles/404.module.css'
import Router from "next/router";

export default function Custom404() {
    return <div className={` ${classes.pageWrap} d-flex flex-row align-items-center`}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 text-center">

                    <span className="display-1 d-block">404</span>

                    <div className="mb-4 lead">The page you are looking for was not found.</div>
                    <div className="btn btn-link" onClick={() => Router.back()}>Go back</div>
                </div>
            </div>
        </div>
    </div>
}
