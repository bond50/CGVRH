import classes from './layout.module.css'
import useToggle from "../../../hooks/useToggle";
import Header from "../../../components/admin/header/header";
import AdminSidebar from "../../../components/admin/sidebar/admin-sidebar";
import PageTitle from "../../../components/admin/page_title/page-title";

const Layout = ({children, pageTitle,}) => {
    const [closed, toggleClosed] = useToggle();
    let attachedClasses = [classes.Main];
    if (closed) {
        attachedClasses = [classes.Main, classes.Close];
    }

    return (
        <>
            <Header clicked={toggleClosed}/>
            <AdminSidebar closed={closed}/>
            <main className={attachedClasses.join(' ')}>
                {/*<div className="pagetitle">*/}
                {/*    <h1>Profile</h1>*/}
                {/*    <nav>*/}
                {/*        <ol className="breadcrumb">*/}
                {/*            <li className="breadcrumb-item"><a href="index.html">Home</a></li>*/}
                {/*            <li className="breadcrumb-item">Users</li>*/}
                {/*            <li className="breadcrumb-item active">Profile</li>*/}
                {/*        </ol>*/}
                {/*    </nav>*/}
                {/*</div>*/}
                {pageTitle && <PageTitle title={pageTitle}/>}
                {children}
            </main>
        </>
    );
};

export default Layout;