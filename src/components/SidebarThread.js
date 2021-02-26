import { Avatar } from '@material-ui/core';
import React from 'react';
import "./SidebarThread.css"

const SidebarThread = () => {
    return (
        <div className="sidebarThread">
            <Avatar />
            <div className="sidebarThread__details">
                <h3>Thread name</h3>
                <p>info</p>
                <small className="sidebarThread__timestamp">timestamp</small>
            </div>
        </div>
    )
}

export default SidebarThread
