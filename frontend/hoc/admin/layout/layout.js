import classes from './layout.module.css'
import useToggle from "../../../hooks/useToggle";
import Header from "../../../components/admin/header/header";
import AdminSidebar from "../../../components/admin/sidebar/admin-sidebar";
import PageTitle from "../../../components/admin/page_title/page-title";

const Layout = ({children, pageTitle,}) => {
    const [closed, toggleClosed] = useToggle();
    let attachedClasses = [classes.Main];
    if (closed) {
        attachedClasses = [classes.Main,classes.Close];
    }

    return (
        <>
            <Header clicked={toggleClosed}/>
            <AdminSidebar closed={closed} />
            <main className={attachedClasses.join(' ')}>
                {pageTitle && <PageTitle title={pageTitle}/>}
                {children}
            </main>
        </>
    );
};

export default Layout;