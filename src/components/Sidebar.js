import React, {useState,useEffect} from 'react';
import "./Sidebar.css";
import SearchIcon from '@material-ui/icons/Search';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { IconButton,Avatar } from '@material-ui/core';
import SidebarThread from './SidebarThread';
import PhoneIcon from '@material-ui/icons/Phone';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SettingsIcon from '@material-ui/icons/Settings';
import db, {auth} from "../firebase"
import { selectUser } from '../features/userSlice';
import {useSelector} from 'react-redux';

const Sidebar = () => {

    const user=useSelector(selectUser);
    const [threads,setThreads]=useState([]);

    useEffect(()=>{
        db.collection("threads").onSnapshot((snapshot)=>setThreads(snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data()
        }))))
    },[])

    const addThread=() =>{
        const threadName=prompt("Enter a thread name");
        if(threadName){
            db.collection("threads").add({
                threadName:threadName
            })
        }
    }
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__search">
                    <SearchIcon className="sidebar__searchIcon" />
                    <input type="text" placeholder="Search" className="sidebar__input"/>
                </div>
                <IconButton variant="outlined" id="sidebar__button">
                    <BorderColorIcon onClick={addThread} />
                    </IconButton>
            </div>
            <div className="sidebar__threads">
                {threads.map(({id,data:{threadName}})=>(
                    <SidebarThread
                        key={id}
                        id={id}
                        threadName={threadName}
                    />
                ))}
            </div>
            <div className="sidebar__bottom">
                <Avatar
                    onClick={()=>auth.signOut()} className="sidebar__bottom__avatar"
                    src={user.photo}/>
                <IconButton>
                    <PhoneIcon />
                </IconButton>
                <IconButton>
                    <QuestionAnswerIcon />
                </IconButton>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar
