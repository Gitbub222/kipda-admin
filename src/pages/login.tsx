import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { auth } from '../utils/firebase-config';
import { getUserRole } from '../utils/firestore';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const role = await getUserRole(uid);

            if (role === 'admin') {
                router.push('/');
            } else {
                setError('You need admin privileges to log in to the portal.');
            }
        } catch (error) {
            setError('Email and password do not match. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <img src="https://pbs.twimg.com/profile_images/1478379019515146240/nEIsqkvi_400x400.jpg" alt="Logo" style={{ width: '200px', height: '200px' }} />
                    <Typography component="h1" variant="h5" sx={{ margin: '16px 0' }}>
                        KIPDA Notify Admin
                    </Typography>
                    <Typography variant="subtitle1" sx={{ margin: '8px 0' }}>
                        Sign in to access the admin dashboard.
                    </Typography>
                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
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
                        >
                            Sign in
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
