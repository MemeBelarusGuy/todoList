import React, {useState} from 'react';
import styles from './navbar.module.scss'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {fetchLogout} from "@/store/action-creators/auth";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import logout from '../../img/logout.png'
import deleteAccount from '../../img/deleteAccount.png'
import {deleteTask} from "@/store/action-creators/tasks";
import axios from "@/axios";

const Navbar = () => {
    const pathName = usePathname();
    const userData = useTypedSelector(state => state.auth);
    const userId = userData._id;
    const name = userData.name;
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [isLoading, setIsLoading] = useState(false);
    const onLogout = () => {
        if (confirm("Are You Sure You Want To Logout?")) {
            sessionStorage.clear();
            dispatch(fetchLogout());
        }
    }
    const onDelete = async () => {
        if (userData.password === prompt("Confirm Your Password To Delete Account.")) {
            setIsLoading(true);
            for (let key of userData.list) {
                await dispatch(deleteTask({
                    taskId: key,
                    userId
                }))
            }
            for (let key of userData.friends) {
                await axios.delete(`/users/${key}`, {
                    data: {
                        userId
                    }
                });
            }
            await axios.delete('/users', {
                data: {
                    userId,
                    password: userData.password
                }
            })
            setIsLoading(false);
            alert("Your Account Deleted Successfully!");
            sessionStorage.clear();
            dispatch(fetchLogout());
            window.location.reload();
        } else alert("Incorrect Password!")
    }
    return (
        <>
            <div className={styles.navbar}>
                <ul className={styles.links}>
                    <li className={styles.link}><Link href="/" className={pathName === "/" ?
                        `${styles.active}` : ""}>Profile</Link></li>
                    <li className={styles.link}><Link href="/users" className={pathName === "/users" ?
                        `${styles.active}` : ""}>Users</Link></li>
                    <li className={styles.link}><Link href="/friends" className={pathName === "/friends" ?
                        `${styles.active}` : ""}>
                        Friends</Link></li>
                </ul>
            </div>
            <div className={styles.name} style={{width: name ? `${name!.length * 15}px` : 0}}>{name}</div>
            <img alt="deleteAccount" className={styles.deleteAccount} src={deleteAccount.src} onClick={onDelete}/>
            <img alt="logoutImg" className={styles.logout} src={logout.src} onClick={onLogout}/>
            {isLoading && <div className={styles.preloader}></div>}
        </>
    );
};

export default Navbar;