import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ClearIcon from '@mui/icons-material/Clear';
import { auth } from '../utils/firebase-config'; // Adjust the path as necessary
import { signOut } from "firebase/auth";
import { useRouter } from 'next/router';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';

export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function NavigationDrawer({ open, handleDrawerOpen, handleDrawerClose }: { open: boolean, handleDrawerOpen: () => void, handleDrawerClose: () => void }) {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Drawer
            style={{outline: 'none', border: 'none'}}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    border: 'none',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader style={{ background: "#161b33", outline: 'none', border: 'none' }}>
                <IconButton onClick={handleDrawerClose}>
                    <ClearIcon style={{ color: '#fff' }} />
                </IconButton>
            </DrawerHeader>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', margin: 0}} style={{ background: "#141829" }}>
                <List style={{ margin: 0, padding: 0 }}>
                    <ListItem key={'home'} disablePadding >
                        <ListItemButton onClick={async () => { // Fix: Use arrow function syntax for onClick event handler
                            router.push('/');
                        }} style={{ margin: 0, padding: 20 }}>
                            <ListItemIcon>
                                <HomeIcon style={{ color: "#fff" }} />
                            </ListItemIcon>
                            <ListItemText primary={'Home'} style = {{color: 'white' }}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'users'} disablePadding>
                        <ListItemButton onClick={async () => { // Fix: Use arrow function syntax for onClick event handler
                            router.push('/users');
                        }} style={{ margin: 0, padding: 20 }}>
                            <ListItemIcon>
                                <PeopleAltIcon style={{ color: "#fff" }} />
                            </ListItemIcon>
                            <ListItemText primary={'Users'} style = {{color: 'white' }}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'settings'} disablePadding>
                        <ListItemButton onClick={async () => { // Fix: Use arrow function syntax for onClick event handler
                            router.push('/settings');
                        }} style={{ margin: 0, padding: 20 }}>
                            <ListItemIcon>
                                <SettingsIcon style={{ color: "#fff" }} />
                            </ListItemIcon>
                            <ListItemText primary={'Settings'} style = {{color: 'white' }}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <List style={{margin:0, padding: 0, background: "#141829", display: 'flex', justifyContent: "center"}}>
                <ListItem key={'signout'} disablePadding style={{width: '160px', margin:0, marginBottom: "20px"}}>
                    <ListItemButton style={{backgroundColor: '#cf0420', margin: 0, borderRadius: "5px"}} onClick={async () => { // Fix: Use arrow function syntax for onClick event handler
                        await signOutUser();
                        router.push('/login');
                    }}>
                        <ListItemIcon>
                            <ExitToAppIcon style={{ color: "#fff" }} />
                        </ListItemIcon>
                        <ListItemText primary={'Sign out'} style={{color: 'white'}}  />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
