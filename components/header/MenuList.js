import { Avatar, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import { Link } from 'react-router-dom'

export const MenuList = ({ company, menuOpen, pageName, pageToken, user }) => {
    const [open, setOpen] = useState(pageToken === company.company_id ? true : false)

    const disabledHome = pageName === 'home' ? pageToken === company.company_id ? true : false : false
    const disabledBook = pageName === 'bookkeeping' ? pageToken === company.company_id ? true : false : false
    const disabledChart = pageName === 'chartofaccount' ? pageToken === company.company_id ? true : false : false

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <Avatar sx={{ width: '24px', height: '24px' }}>
                        {company?.company_name.charAt(0).toUpperCase()}
                    </Avatar>
                </ListItemIcon>
                <ListItemText primary={company?.company_name} className='capitalize' />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link to={`/dashboard/companies/home/${company.company_id}`}>
                        <ListItemButton sx={menuOpen && { pl: 4 }} disabled={disabledHome}>
                            <ListItemIcon>
                                <DonutLargeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </Link>
                    <Link to={`/dashboard/companies/bookkeeping/${company.company_id}`}>
                        <ListItemButton sx={menuOpen && { pl: 4 }} disabled={disabledBook}>
                            <ListItemIcon>
                                <AccountBalanceWalletIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bookkeeping" />
                        </ListItemButton>
                    </Link>
                    <Link to={`/dashboard/companies/chartofaccount/${company.company_id}`}>
                        <ListItemButton sx={menuOpen && { pl: 4 }} disabled={disabledChart}>
                            <ListItemIcon>
                                <AccountTreeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chart of Account" />
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>
        </>
    )
}
