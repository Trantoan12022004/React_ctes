import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
 
const MenuItems = (props) => {
    
    const { parentMenu } = props;

    const location = useLocation();
    const postURL = location.pathname.split('/'); 
    const pathLength = Number(postURL.length)

	const [page, setPage] = useState(false)
	const [home, setHome] = useState(false)
	const [event, setEvent] = useState(false)
	const [course, setCourse] = useState(false)
	const [blog, setBlog] = useState(false)

	const openMobileMenu = menu => {
        if (menu === 'home') {
			setHome(!home)
			setPage(false)
			setEvent(false)
			setCourse(false)
			setBlog(false)
		}
		else if (menu === 'page') {
			setHome(false)
			setPage(!page)
			setEvent(false)
			setCourse(false)
			setBlog(false)
		}
		else if (menu === 'event') {
			setHome(false)
			setPage(false)
			setEvent(!event)
			setCourse(false)
			setBlog(false)
		}
		else if (menu === 'course') {
			setHome(false)
			setPage(false)
			setEvent(false)
			setCourse(!course)
			setBlog(false)
		}
		else if (menu === 'blog') {
			setHome(false)
			setPage(false)
			setEvent(false)
			setCourse(false)
			setBlog(!blog)
		}
	};

    return (
        <>
            <li className={parentMenu === 'home' ? "menu-active" : ""}>
                <Link to="/home">Home</Link>
            </li>
            <li className={parentMenu === 'event' ? 'menu-active' : ''}>
                        <Link to="/event" >Events</Link>
                    </li>

            <li className={parentMenu === 'course' ? 'has-sub menu-active' : 'has-sub'}>
                <span className="arrow "></span>
                <Link to="#" className={course ? "hash menu-active" : "hash"} onClick={() => { openMobileMenu('course'); }}>
                    Courses
                    <span className="arrow "></span>
                </Link>
                <ul className={course ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={location.pathname === "/course" ? "menu-active" : ""}>
                        <Link to="/course">Course</Link>
                    </li>
                    <li className={location.pathname === "/course-sidebar" ? "menu-active" : ""}>
                        <Link to="/course-sidebar">Right Sidebar</Link>
                    </li>
                    <li className={location.pathname === "/course-list" ? "menu-active" : ""}>
                        <Link to="/course-list">Courses List</Link>
                    </li>
                    <li className={postURL[1] === "course" && pathLength > 2 ? "menu-active" : ""}>
                        <Link to="/course/1">Course Single</Link>
                    </li>
                </ul>
            </li>

            <li className={parentMenu === 'blog' ? 'has-sub menu-active' : 'has-sub'}>
                <Link to="#" className={blog ? "hash menu-active" : "hash"} onClick={() => { openMobileMenu('blog'); }}>
                    Blog
                    <span className="arrow "></span>
                </Link>
                <ul className={blog ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={location.pathname === "/blog" ? "menu-active" : ""}>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li className={postURL[1] === "blog" && pathLength > 2 ? "menu-active" : ""}>
                        <Link to="/blog/1">Blog Single</Link>
                    </li>
                </ul>
            </li>
            <li className={location.pathname === '/contact' ? 'menu-active' : ''}>
                <Link to="/contact">Contact</Link>
            </li>
        </>
    );
}

export default MenuItems;