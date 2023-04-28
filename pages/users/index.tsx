import React, {useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import Navbar from "@/components/navbar/navbar";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useRouter} from "next/navigation";
import axios from "@/axios";
import {UserState} from "@/types/user";
import User from "@/components/users/user";
import styles from "@/styles/home.module.scss";

const Index = ({allUsers}: { allUsers: UserState[] }) => {
    const isAuth = useTypedSelector(state => state.auth._id);
    const router = useRouter();
    const users = allUsers.filter(item => item._id !== isAuth);
    if (!isAuth) {
        if (typeof window !== 'undefined') {
            router.push('/auth/login')
        }
    }
    return (
        <MainLayout>
            <Navbar/>
            <div>
                {!users.length && <p className={styles.zero}>You Are Alone Here!</p>}
                {users.map((item: UserState, index) =>
                    <User key={index} _id={item._id} name={item.name}
                          list={item.list} friends={item.friends}
                          status={item.status}/>)}
            </div>
        </MainLayout>
    );
};

export default Index;

export async function getServerSideProps() {
    const response = await axios.get('/users');
    if (!response) {
        return {
            notFound: true,
        }
    }
    const allUsers = response.data;
    return {
        props: {allUsers}
    }
}