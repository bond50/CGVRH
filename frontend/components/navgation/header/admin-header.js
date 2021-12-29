import React from 'react';
import Link from 'next/link';
import classes from '../../../styles/Adminheader.module.css'

const AdminHeader = () => {
    return (
        <header className={`${classes.Header} fixed-top d-flex align-items-center`}>
            <div className="d-flex align-items-center justify-content-between">
                <Link href={`/admin2`}>
                    <a className={`${classes.Logo} d-flex align-items-center`}>
                        <img src="/logo/logo.png" alt="Logo" className={classes.Image}/>
                        <span className={`${classes.Span} d-none d-lg-block`}>VCRH Administration</span>
                    </a>
                </Link>
                <i className={`bi bi-list ${classes.ToggleBtn}`}/>
            </div>

            <nav className={`${classes.HeaderNav}  ms-auto`}>
                <ul className={`d-flex align-items-center ${classes.HeaderNavItem}`}>
                    <li className={`nav-item dropdown`}>
                        <a className={`nav-link ${classes.Icon}`} href="#" data-bs-toggle="dropdown">
                            <i className="bi bi-bell"/>
                            <span className={`badge bg-primary ${classes.BadgeNo}`}>4</span>
                        </a>

                        {/*<ul className={`${classes.DropdownMenu}  ${classes.DropdownMenuArrow}`}>*/}
                        {/*    <li className={classes.DropdownHeader}>*/}
                        {/*        You have 4 new notifications*/}
                        {/*        <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <hr className={classes.DropdownDivider}/>*/}
                        {/*    </li>*/}

                        {/*    <li className={classes.NotificationItem}>*/}
                        {/*        <i className="bi bi-exclamation-circle text-warning"/>*/}
                        {/*        <div>*/}
                        {/*            <h4>Lorem Ipsum</h4>*/}
                        {/*            <p>Quae dolorem earum veritatis oditseno</p>*/}
                        {/*            <p>30 min. ago</p>*/}
                        {/*        </div>*/}
                        {/*    </li>*/}

                        {/*    <li>*/}
                        {/*        <hr className={classes.DropdownDivider}/>*/}
                        {/*    </li>*/}

                        {/*    <li className={classes.NotificationItem}>*/}
                        {/*        <i className="bi bi-x-circle text-danger"></i>*/}
                        {/*        <div>*/}
                        {/*            <h4>Atque rerum nesciunt</h4>*/}
                        {/*            <p>Quae dolorem earum veritatis oditseno</p>*/}
                        {/*            <p>1 hr. ago</p>*/}
                        {/*        </div>*/}
                        {/*    </li>*/}

                        {/*    <li>*/}
                        {/*         <hr className={classes.DropdownDivider}/>*/}
                        {/*    </li>*/}

                        {/*        <li className={classes.NotificationItem}>*/}
                        {/*        <i className="bi bi-check-circle text-success"></i>*/}
                        {/*        <div>*/}
                        {/*            <h4>Sit rerum fuga</h4>*/}
                        {/*            <p>Quae dolorem earum veritatis oditseno</p>*/}
                        {/*            <p>2 hrs. ago</p>*/}
                        {/*        </div>*/}
                        {/*    </li>*/}

                        {/*    <li>*/}
                        {/*       <hr className={classes.DropdownDivider}/>*/}
                        {/*    </li>*/}

                        {/*        <li className={classes.NotificationItem}>*/}
                        {/*        <i className="bi bi-info-circle text-primary"/>*/}
                        {/*        <div>*/}
                        {/*            <h4>Dicta reprehenderit</h4>*/}
                        {/*            <p>Quae dolorem earum veritatis oditseno</p>*/}
                        {/*            <p>4 hrs. ago</p>*/}
                        {/*        </div>*/}
                        {/*    </li>*/}

                        {/*    <li>*/}
                        {/*    <hr className={classes.DropdownDivider}/>*/}
                        {/*    </li>*/}
                        {/*    <li className={classes.DropdownFooter}>*/}
                        {/*        <a href="#">Show all notifications</a>*/}
                        {/*    </li>*/}

                        {/*</ul>*/}


                    </li>


                    <li className={`${classes.HeaderNavItem} nav-item dropdown`}>

                        <a className={`nav-link ${classes.Icon}`} href="#" data-bs-toggle="dropdown">
                            <i className="bi bi-chat-left-text"/>
                            <span className={`badge bg-success ${classes.BadgeNo}`}>3</span>
                        </a>

                        {/*<ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">*/}
                        {/*    <li className="dropdown-header">*/}
                        {/*        You have 3 new messages*/}
                        {/*        <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <hr className="dropdown-divider"/>*/}
                        {/*    </li>*/}

                        {/*    <li className="message-item">*/}
                        {/*        <a href="#">*/}
                        {/*            <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle"/>*/}
                        {/*                <div>*/}
                        {/*                    <h4>Maria Hudson</h4>*/}
                        {/*                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est*/}
                        {/*                        ut...</p>*/}
                        {/*                    <p>4 hrs. ago</p>*/}
                        {/*                </div>*/}
                        {/*        </a>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <hr className="dropdown-divider"/>*/}
                        {/*    </li>*/}

                        {/*    <li className="message-item">*/}
                        {/*        <a href="#">*/}
                        {/*            <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle"/>*/}
                        {/*                <div>*/}
                        {/*                    <h4>Anna Nelson</h4>*/}
                        {/*                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est*/}
                        {/*                        ut...</p>*/}
                        {/*                    <p>6 hrs. ago</p>*/}
                        {/*                </div>*/}
                        {/*        </a>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <hr className="dropdown-divider"/>*/}
                        {/*    </li>*/}

                        {/*    <li className="message-item">*/}
                        {/*        <a href="#">*/}
                        {/*            <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle"/>*/}
                        {/*                <div>*/}
                        {/*                    <h4>David Muldon</h4>*/}
                        {/*                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est*/}
                        {/*                        ut...</p>*/}
                        {/*                    <p>8 hrs. ago</p>*/}
                        {/*                </div>*/}
                        {/*        </a>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <hr className="dropdown-divider"/>*/}
                        {/*    </li>*/}

                        {/*    <li className="dropdown-footer">*/}
                        {/*        <a href="#">Show all messages</a>*/}
                        {/*    </li>*/}

                        {/*</ul>*/}

                    </li>

                    <li className={`${classes.HeaderNavItem} nav-item dropdown pe-3`}>

                        <a className={`nav-link  ${classes.Profile} d-flex align-items-center pe-0`} href="#"
                           data-bs-toggle="dropdown">
                            <img src="/avatar/fmale.jpg" alt="Profile" className="rounded-circle"/>
                            <span className={`d-none d-md-block dropdown-toggle ps-2`}>ooo</span>
                        </a>

                        {/*<ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">*/}
                        {/*    <li className="dropdown-header">*/}
                        {/*        <h6>Kevin Anderson</h6>*/}
                        {/*        <span>Web Designer</span>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <hr className="dropdown-divider"/>*/}
                        {/*    </li>*/}

                        {/*    <li>*/}
                        {/*        <a className="dropdown-item d-flex align-items-center" href="users-profile.html">*/}
                        {/*            <i className="bi bi-person"></i>*/}
                        {/*            <span>My Profile</span>*/}
                        {/*        </a>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <hr className="dropdown-divider"/>*/}
                        {/*    </li>*/}

                        {/*    <li>*/}
                        {/*        <a className="dropdown-item d-flex align-items-center" href="users-profile.html">*/}
                        {/*            <i className="bi bi-gear"></i>*/}
                        {/*            <span>Account Settings</span>*/}
                        {/*        </a>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <hr className="dropdown-divider"/>*/}
                        {/*    </li>*/}

                        {/*    <li>*/}
                        {/*        <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">*/}
                        {/*            <i className="bi bi-question-circle"></i>*/}
                        {/*            <span>Need Help?</span>*/}
                        {/*        </a>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <hr className="dropdown-divider"/>*/}
                        {/*    </li>*/}

                        {/*    <li>*/}
                        {/*        <a className="dropdown-item d-flex align-items-center" href="#">*/}
                        {/*            <i className="bi bi-box-arrow-right"></i>*/}
                        {/*            <span>Sign Out</span>*/}
                        {/*        </a>*/}
                        {/*    </li>*/}

                        {/*</ul>*/}

                    </li>


                </ul>
            </nav>

        </header>
    );
};

export default AdminHeader;