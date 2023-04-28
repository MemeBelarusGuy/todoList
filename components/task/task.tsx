import React, {useState} from 'react';
import styles from './task.module.scss'
import {Task} from "@/types/task";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {deleteTask, editTasks} from "@/store/action-creators/tasks";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import done from '../../img/done.png'
import edit from '../../img/edit.png'
import del from '../../img/delete.png'
const Task = ({task,isEditable}: { task: Task,isEditable:boolean }) => {
    const createDate = new Date(task.createdAt || 0);
    const finishDate = new Date(task.finishAt || 0);
    const [title, setTitle] = useState(task.title);
    const minimalDate = createDate.toISOString().slice(0, 10)
    const [editDate, setEditDate] = useState(finishDate.toISOString().slice(0, 10));
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [isLoading,setIsLoading]=useState(false);
    const userId = useTypedSelector(state => state.auth._id);
    const onEdit = async () => {
        setIsLoading(true);
        await dispatch(editTasks({
            _id: task._id,
            taskId: task._id,
            title,
            finishAt: new Date(editDate).getTime()
        }))
        setIsLoading(false);
        alert("Task Edited SucessFully!");
        window.location.reload();
    }
    const onDone = async () => {
        setIsLoading(true);
        await dispatch(editTasks({
            taskId: task._id,
            done: 1
        }))
        setIsLoading(false);
        alert("Task Edited SucessFully!");
        window.location.reload();
    }
    const onDelete = async () => {
        if (confirm("Are You Sure?")) {
            setIsLoading(true);
            await dispatch(deleteTask({
                taskId: task._id,
                userId
            }))
            setIsLoading(false);
            alert("Task Deleted SucessFully!");
            window.location.reload();
        }
    }
    return (
        <div
            className={task.done ? styles.doneTask : (Date.now() > task.finishAt ? styles.failedtask : styles.processingTask)}>
            <p className={styles.title}>{task.title}</p>
            {isEditing && <div>
                <textarea value={title} className={styles.title}
                          onChange={(event => setTitle(event.target.value))}></textarea>
                <input type="date" className={styles.editFinish}
                       value={editDate} min={minimalDate} onChange={(event => setEditDate(event.target.value))}/>
                <button className={styles.save} onClick={onEdit}>SAVE</button>
                <button className={styles.cancel} onClick={() => setIsEditing(false)}>CANCEL</button>
            </div>}
            <p className={styles.createdAt}>Created At:</p>
            <p className={styles.createdAt_year}>{createDate.toLocaleDateString()}</p>
            <p className={styles.finishAt}>Finish At:</p>
            <p className={styles.finishAt_year}>{finishDate.toLocaleDateString()}</p>
            {!task.done &&isEditable&& Date.now() < task.finishAt &&
                <img alt="doneTask" src={done.src} className={styles.done} onClick={onDone}/>}
            {isEditable&&<img alt="editTask" src={edit.src} className={styles.edit} onClick={() => setIsEditing(true)}/>}
            {isEditable&&<img alt="deleteTask" src={del.src} className={styles.del} onClick={onDelete}/>}
            {isLoading&&<div className={styles.preloader}></div>}
        </div>
    );
};

export default Task;