import { Avatar, Button, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material'
import React, { useState } from 'react'
import Logout from '@mui/icons-material/Logout'
import LockResetIcon from '@mui/icons-material/LockReset'
import FaceIcon from '@mui/icons-material/Face'
import { Link } from 'react-router-dom'
import { ChangePassword } from '../controllers/ChangePassword'
import { ProfilePhoto } from '../controllers/ProfilePhoto'

export const UserMenu = ({ user, reload }) => {
    const [isPassword, setPassword] = useState(false)
    const [isPhoto, setPhoto] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Button
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <div className='flex items-center gap-2'>
                    <div className='text-right text-black capitalize tracking-wider leading-4'>
                        <p className='font-semibold text-base'>{user.full_name}</p>
                        <p className='text-gray-500 text-xs'>{user.role}</p>
                    </div>
                    <Avatar src={`/images/users/${user.avatar}?${Date.now()}`}>{user.username.charAt(0).toUpperCase()}</Avatar>
                </div>
            </Button>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => { setPhoto(true) }}>
                    <ListItemIcon>
                        <FaceIcon fontSize="small" />
                    </ListItemIcon>
                    Change Profile Photo
                </MenuItem>
                <MenuItem onClick={() => { setPassword(true) }}>
                    <ListItemIcon>
                        <LockResetIcon fontSize="small" />
                    </ListItemIcon>
                    Change Password
                </MenuItem>
                <Link to={'/sign-out'}>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Link>
            </Menu>
            <ProfilePhoto isModule={isPhoto} setModule={setPhoto} user={user} reload={reload} />
            <ChangePassword isModule={isPassword} setModule={setPassword} user={user} />
        </div>
    )
}
