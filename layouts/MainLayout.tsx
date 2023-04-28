import React from 'react';
import Head from "next/head";
interface Props {
    children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({children}) => {
    return (
        <div>
            <Head>
                <title>Todo List</title>
            </Head>
            {children}
        </div>
    );
};

export default MainLayout;