// Import necessary modules from MUI and Next.js
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { useState, ReactNode } from 'react';
import APPBAR from './components/AppBar';
import NavigationDrawer from './components/nav-drawer';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface RootLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

export default function RootLayout({ children, pageTitle = 'Your Site Title', pageDescription = 'Your site description' }: RootLayoutProps) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <APPBAR open={open} handleDrawerOpen={handleDrawerOpen} />
        <NavigationDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <Main open={open} sx={{ marginTop: "32px", width: '100%', display: 'flex', justifyContent: "center" }}>{children}</Main>
      </Box>
    </>
  );
}
