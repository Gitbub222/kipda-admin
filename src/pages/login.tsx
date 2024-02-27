// pages/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Container, Paper, Typography, TextField, Button, Box, Link } from '@mui/material';
import { auth } from '../utils/firebase-config';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (event: any) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/'); // Redirect after login
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Typography component="h1" variant="h5" sx={{ margin: '16px 0' }}>
                        Kipda Admin Portal
                    </Typography>
                    <Typography variant="subtitle1" sx={{ margin: '8px 0' }}>
                        Sign in to access the admin dashboard.
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
                            style={{ background: '#161b33', padding: '12px'}}
                            onClick={handleLogin}
                        >
                            Sign in
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
