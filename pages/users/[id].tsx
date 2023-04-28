import React, {useEffect, useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import Navbar from "@/components/navbar/navbar";
import axios from "@/axios";
import {GetServerSideProps} from "next";
import {UserState} from "@/types/user";
import styles from "./users.module.scss"
import {Task as TaskItem} from '@/types/task'
import Task from "@/components/task/task";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import addFriend from '../../img/addFriend.png'
import deleteFriend from '../../img/deleteFriend.png'
import {useRouter} from "next/navigation";

const Id = ({data, _id}: { data: TaskItem[], _id: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const tasks = [...data];
    const freshTasks = [...tasks].sort((a, b) => a.done < b.done ? 1 : -1);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const userData = useTypedSelector(state => state.auth);
    const isAuth = userData._id;
    const userFriends: string[] = userData.friends;
    const isFriend = userFriends.includes(_id);
    const router=useRouter();
    if (!isAuth) {
        if (typeof window !== 'undefined') {
            router.push('/auth/login')
        }
    }
    useEffect(() => {
        setIsLoading(true);
        axios.get(`/users/${_id}`).then(res => {
            setName(res.data.name);
            setStatus(res.data.status);
        });
        setIsLoading(false);
    })
    const onAddUser = async () => {
        setIsLoading(true);
        const fields = {
            userId: userData._id
        }
        const res = await axios.post(`/users/${_id}`, fields);
        setIsLoading(false);
        if(res.data.message!=='Friend Added'){
            alert("error");
        }
        else{
            alert("Friend Added SuccessFully!");
            window.location.reload();
        }
    }
    const onDeleteUser = async () => {
        setIsLoading(true);
        const res = await axios.delete(`/users/${_id}`,{
            data:{
                userId:userData._id
            }
        });
        setIsLoading(false);
        if(res.data.message!=='Friend Deleted'){
            alert("error");

        }
        else{
            alert("Friend Deleted SuccessFully!");
            window.location.reload();
        }
    }
    return (
        <MainLayout>
            <Navbar/>
            <div className={styles.name} style={{width: name ? `${name!.length * 15}px` : 0}}>{name}</div>
            <div className={styles.status}>{status}</div>
            {freshTasks.map((item: any, index: number) => <Task isEditable={false} task={item} key={index}/>)}
            {!freshTasks.length && !isLoading && <p className={styles.zero}>User Has 0 Tasks To Do!</p>}
            <img alt="addDeleteIcon" onClick={isFriend?onDeleteUser:onAddUser} className={styles.icon}
                 src={isFriend ? deleteFriend.src : addFriend.src}/>
            {isLoading && <div className={styles.preloader}></div>}
        </MainLayout>
    );
};
export default Id;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const response = await axios.get('/' + context.params.id);
    if (!response) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            data: response.data,
            _id: context.params.id
        }
    }
}