import React from 'react';
import {UserState} from "@/types/user";
import styles from './users.module.scss'
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Link from "next/link";
const User = ({name,_id,status,list,friends}:UserState) => {
    const userFriends=useTypedSelector(state=>state.auth.friends);
    const isFriend=userFriends.find(item=>item==_id);
    return (
        <div className={isFriend?styles.userFriend:styles.user}>
            <Link href={`/users/${_id}`} className={styles.name}>{name}</Link>
            <p className={styles.status}>{status}</p>
            <p className={styles.friend}>Friends:</p>
            <p className={styles.friendCount}>{friends.length}</p>
            <p className={styles.task}>Tasks:</p>
            <p className={styles.taskCount}>{list.length}</p>
        </div>
    );
};

export default User;