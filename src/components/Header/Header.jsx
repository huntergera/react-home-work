import React from "react";
import styles from "./Header.module.css"

class Header extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <ul className={styles.navbar}>
                    <li><a href="#" className={styles.navbarLink}>Link 1</a></li>
                    <li><a href="#" className={styles.navbarLink}>Link 2</a></li>
                    <li><a href="#" className={styles.navbarLink}>Link 3</a></li>
                </ul>
            </header>
        )
    }
}

export default Header;
