import React, {useEffect, useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import Navbar from "@/components/navbar/navbar";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useRouter} from "next/navigation";
import axios from "@/axios";
import {UserState} from "@/types/user";
import User from "@/components/users/user";
import styles from "@/styles/home.module.scss";

const Index = () => {
    const userData = useTypedSelector(state => state.auth);
    const isAuth = userData._id || "";
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get(`/friends/${userData._id}`,)
            .then(res => {
                setFriends(res.data);
                setIsLoading(false)
            })
            .catch(error => console.log(error));
    }, [])
    const router = useRouter();
    if (!isAuth) {
        if (typeof window !== 'undefined') {
            router.push('/auth/login')
        }
    }
    return (
        <MainLayout>
            <Navbar/>
            <div>
                {friends.length != 0 && friends[0] != null && friends.map((item: UserState, index) =>
                    <User key={index} _id={item._id} name={item.name}
                          list={item.list} friends={item.friends}
                          status={item.status}/>)}
            </div>
            {isLoading && <div className={styles.preloader}></div>}
            {!friends.length && !isLoading && <p className={styles.zero}>Add Your First Friend!</p>}
        </MainLayout>
    );
};

export default Index;