import React from "react";
import styles from "./Footer.module.css"

class Footer extends React.Component {
    render() {
        return (
            <footer className={styles.footer}>
                <ul className={styles.footerNavbar}>
                    <li><a href="#" className={styles.footerNavbarLink}>Link 1</a></li>
                    <li><a href="#" className={styles.footerNavbarLink}>Link 2</a></li>
                    <li><a href="#" className={styles.footerNavbarLink}>Link 3</a></li>
                </ul>
            </footer>
        )
    }
}

export default Footer;
