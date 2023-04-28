import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {fetchAuth} from "@/store/action-creators/auth";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useRouter} from "next/navigation";
import styles from '../../styles/authorize.module.scss'
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import usernameImg from '../../img/username.png'
import passwordImg from '../../img/password.png'
export const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message,setMessage]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const isAuth = useTypedSelector(state => state.auth._id);
    const userData=useTypedSelector(state=>state.auth);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const router = useRouter()
    useEffect(()=>{
        if(sessionStorage.length!=0){
            const userData=JSON.parse(sessionStorage.getItem("userData"));
            dispatch(fetchAuth({name:userData.name,password:userData.password}))
                .catch(e => console.log(e));
        }
    })
    const onSubmit = async () => {
        if(name.length<4||password.length<8){
            setMessage("Fill In The Form Fields");
            setTimeout(()=>{
                setMessage("")
            },3000);
        }
        else {
            setIsLoading(true);
            const res = await dispatch(fetchAuth({name, password}));
            setIsLoading(false);
            if(!res){
                setMessage("Incorrect Login Or Password")
                setTimeout(() => {
                    setMessage("")
                }, 3000);
            }
        }
    }
    if (isAuth) {
        if (typeof window !== 'undefined') {
            window.sessionStorage.setItem("userData",JSON.stringify(userData));
            router.push('/');
        }
    }
    return (
        <MainLayout>
            {message&&<p className={styles.error}>{message}</p>}
            <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
                <p className={styles.title}>LOGIN</p>
                <label className={styles.nameLabel}>
                    <img alt="name" src={usernameImg.src} className={styles.nameImg}/>
                    <input value={name} placeholder="Username" onChange={(e) => setName(e.target.value)}
                           className={styles.input} type="text" minLength={4}/>
                </label>
                <label className={styles.passwordLabel}>
                    <img alt="password" src={passwordImg.src} className={styles.passwordImg}/>
                    <input value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                           className={styles.input} type="password" minLength={8}/>
                </label>
                <button onClick={onSubmit} className={styles.log}>LOGIN</button>
                <Link href="/auth/registration" className={styles.link}>Don't Have Account?</Link>
            </form>
            {isLoading&&<div className={styles.preloader}></div>}
        </MainLayout>
    );
};
export default Login;