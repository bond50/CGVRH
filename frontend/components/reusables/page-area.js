import classes from '../../styles/page-area.module.css'

const PageArea = () => {
    return (
        <div className={classes.pageArea}>
            <div className="container position-relative">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="slider-content text-center">
                            <div className="header-bottom">
                                <div className="layer2">
                                    <h1 className="title2">My Blog</h1>
                                </div>
                                <div className="layer3">
                                    <h2 className="title3">Profesional Blog Page</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageArea;