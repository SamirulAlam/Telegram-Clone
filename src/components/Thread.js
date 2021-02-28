import {  IconButton } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import "./Thread.css";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SendIcon from '@material-ui/icons/Send';
import MicNoneIcon from '@material-ui/icons/MicNone';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import db from '../firebase'
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectThreadId, selectThreadName } from '../features/threadSlice';
import Message from './Message';
import * as timeago from 'timeago.js';
import FlipMove from "react-flip-move";

const Thread = () => {

    const [input,setInput]=useState("");
    const [messages,setMessages]=useState([]);
    const threadName=useSelector(selectThreadName);
    const threadId=useSelector(selectThreadId);
    const user=useSelector(selectUser);

    useEffect(()=>{
        if(threadId){
            db.collection("threads").doc(threadId).collection("messages").orderBy("timestamp","desc").onSnapshot((snapshot)=>setMessages(snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data()
            }))))
        }
        console.log(threadId);
    },[threadId])

    const sendMessage = (e) => {
        e.preventDefault();
        if(input) {
            db.collection("threads").doc(threadId).collection("messages").add({
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                message:input,
                uid:user.uid,
                photo:user.photo,
                email:user.email,
                displayName:user.displayName,
            })
        }
        setInput("");
    }
    return (
        <div className="thread">
            <div className="thread__header">
                <div className="thread__header__contents">
                    <div className="thread__header__contents__info">
                        <h4>{threadName}</h4>
                        <h5>Last Seen {timeago.format(new Date(messages[0]?.data?.timestamp?.toDate()).toLocaleString())}</h5>
                    </div>
                </div>
                <IconButton>
                    <MoreHorizIcon className="thread__header__details" />
                </IconButton>
            </div>
            <div className="thread__messages">
                <FlipMove>
                {messages.map(({id,data})=>(
                    <Message 
                        key={id}
                        data={data}
                    />
                ))}
                </FlipMove>
                
            </div>
            <div className="thread__input">
                <form action="">
                    <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Write a message..." />
                    <IconButton>
                        <TimerOutlinedIcon />
                    </IconButton>
                    <IconButton >
                        <SendIcon onClick={sendMessage}/>
                    </IconButton>
                    <IconButton>
                        <MicNoneIcon />
                    </IconButton>
                    <button onClick={sendMessage} className="thread__submit"></button>
                </form>
            </div>
        </div>
    )
}

export default Thread
