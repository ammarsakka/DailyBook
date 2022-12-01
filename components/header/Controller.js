import React from 'react'
import { SideBar } from './SideBar'

export const Controller = (props) => {
    return (
        <div className='flex min-h-screen'>
            <SideBar
                page={props.page}
                user={props.user}
                reload={props.reload}
                children={props.children}
                pageName={props.pageName}
                pageToken={props.pageToken}
                reloadUser={props.reloadUser}
            />
        </div>
    )
}
