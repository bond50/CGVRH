import classes from './page-title.module.css'

const PageTitle = ({title}) => {
    return (
        <div className={`${classes.PageTitle} mb-4`}>
            <h1>{title}</h1>
            {/*<nav>*/}
            {/*    <ol className={`breadcrumb ${classes.breadcrumb}`}>*/}
            {/*        <li className={`breadcrumb-item ${classes.breadcrumbItem}`}><a href="index.html">Home</a></li>*/}
            {/*        <li className={`breadcrumb-item ${classes.breadcrumbItem} ${classes.active}`}>Dashboard</li>*/}
            {/*    </ol>*/}
            {/*</nav>*/}
        </div>
    );
};

export default PageTitle;