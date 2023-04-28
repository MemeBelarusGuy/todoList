import MainLayout from "@/layouts/MainLayout";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useRouter} from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import styles from '../styles/home.module.scss'
import {addTasks, getTasks} from "@/store/action-creators/tasks";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import React, {useEffect, useState} from "react";
import {IndexRouteProps} from "react-router";
import Task from "@/components/task/task";
import edit from "@/img/edit.png";
import {editStatus} from "@/store/action-creators/auth";

const Index = React.memo<IndexRouteProps>(() => {
    const userData = useTypedSelector(state => state.auth);
    const isAuth = userData._id;
    const [status, setStatus] = useState(userData.status);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [tasks, setTasks] = useState([]);
    const freshTasks = [...tasks].sort((a, b) => a.done < b.done ? 1 : -1);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    if (!isAuth) {
        if (typeof window !== 'undefined') {
            router.push('/auth/login')
        }
    }
    useEffect(() => {
        if (isAuth) {
            setIsLoading(true);
            dispatch(getTasks(isAuth))
                .then(res => {
                    setTasks(res?.data);
                    setIsLoading(false);
                })
                .catch(e => console.log(e));
        }
    }, [])
    const onAddTask = async () => {
        const title = prompt("Write Title Of New Task");
        if (title) {
            setIsLoading(true);
            const date = new Date();
            date.setDate(date.getDate() + 1);
            await dispatch(addTasks({
                userId: isAuth,
                title,
                done: 0,
                finishAt: date.getTime()
            }))
            setIsLoading(false);
            alert("Task Added SuccessFully!");
            window.location.reload();
        } else alert("Write Task Title!");
    }
    const onEdit = async () => {
        if (status) {
            setIsLoading(true);
            const res = await dispatch(editStatus(userData._id, {status}))
            console.log(res.data);
            setIsLoading(false);
            alert("Status Edited SuccessFully!");
            window.location.reload();
        }
        else alert("Add Atleast A Few Symbols");
    }
    return (
        <MainLayout>
            <Navbar/>
            <p className={styles.status}>{userData.status}</p>
            {isEditing && <div>
                <textarea value={status} className={styles.status}
                          onChange={(event => setStatus(event.target.value))}></textarea>
                <button className={styles.save} onClick={onEdit}>SAVE</button>
                <button className={styles.cancel} onClick={() => setIsEditing(false)}>CANCEL</button>
            </div>}
            <img alt="editImg" src={edit.src} className={styles.edit} onClick={() => setIsEditing(true)}/>
            {freshTasks.map((item: any, index: number) => <Task isEditable={true} task={item} key={index}/>)}
            {!freshTasks.length && !isLoading && <p className={styles.zero}>Add Your First Task!</p>}
            <button className={styles.addTask} onClick={onAddTask}>+</button>
            {isLoading && <div className={styles.preloader}></div>}
        </MainLayout>
    );
});

export default Index;