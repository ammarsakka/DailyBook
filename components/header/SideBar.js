import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import GroupIcon from '@mui/icons-material/Group'
import MenuIcon from '@mui/icons-material/Menu'
import { CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar, Typography, useTheme } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import axios from 'axios'
import React, { useCallback, useMemo, useState } from 'react'
import { ImSpinner11 } from 'react-icons/im'
import { Link } from 'react-router-dom'
import URL_API from '../api/Url'
import UserProfile from '../auth/UserProfile'
import { UserMenu } from './UserMenu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Menus from './Menus'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import { MenuList } from './MenuList'


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: 'white',
  color: 'black',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(
    open &&
    {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(
        ['width', 'margin'],
        {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }
      ),
    }
  ),
}))


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

const menuIcon = {
  HomeIcon: <DashboardIcon />,
  GroupIcon: <GroupIcon />,
  HomeRepairServiceIcon: <HomeRepairServiceIcon />
}

export const SideBar = ({ page, user, reload, children, pageName, pageToken, reloadUser }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  const { getUser, setUser } = UserProfile()
  const [menu, setMenu] = useState([])
  const [companies, setCompanies] = useState([])

  const handleMenu = useCallback(() => {
    axios.post(
      URL_API,
      {
        username: getUser[0]?.username,
        fullname: getUser[0]?.fullname,
        play: 'menu'
      },
      {
        Headers: { "content-type": "application/json" }
      }
    ).then((result) => {
      setMenu(Menus.filter(item => item.role === result.data)[0].menu)
    })
  }, [])

  const handleCompanies = useCallback(() => {
    axios.post(
      URL_API,
      { play: 'getcompanies' },
      { headers: { "content-type": "application/json" } }
    ).then((result) => {
      setCompanies(result.data)
    })
  }, [])

  useMemo(handleMenu, [])
  useMemo(handleCompanies, [])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className='flex w-full'>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className='flex justify-between items-center w-full'>
            <Typography variant="h6" noWrap component="div" className='capitalize !tracking-wider'>
              {page}
            </Typography>
            <div className='flex items-center gap-4'>
              <IconButton
                onClick={() => {
                  setLoading(true)
                  setTimeout(() => {
                    reload()
                    reloadUser()
                    handleCompanies()
                    setLoading(false)
                  }, 1000)
                }}
                disabled={loading}
              >
                <ImSpinner11 className={loading ? 'animate-spin' : ''} size={17} />
              </IconButton>
              <UserMenu user={user} reload={reloadUser} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {
            menu &&
            menu.map((item, index) => (
                <Link to={`/dashboard/${item.path}`} key={index}>
                  <ListItemButton disabled={page === item.label ? true : false}>
                    <ListItemIcon>
                      {menuIcon[item.icon]}
                    </ListItemIcon>
                    <ListItemText primary={item.label} className='capitalize !tracking-wider' />
                  </ListItemButton>
                </Link>
            ))
          }
          {
            user.role !== 'admin' && companies &&
            companies.map((comapny, index) => (
              <MenuList company={comapny} key={index} menuOpen={open} pageName={pageName} pageToken={pageToken} user={user} />
            ))
          }
        </List>
      </Drawer>
      <div className='grow w-full'>
        <div className='p-4'>
          <div className='w-full tableMaxHeight'>
            <DrawerHeader />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
