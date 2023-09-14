import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { Navigate, Outlet, Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
    const [redirect, setRedirect] = useState(false);

    const logout = () => {
        localStorage.clear();
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#b6acd1' }}>
                <Container maxWidth="lg">
                    <Toolbar sx={{ '@media (min-width:600px)': { p: 0 } }}>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <Link component={RouterLink} to={`/admin/sessoes`} sx={{ textDecoration: 'none' }}>
                                <Button sx={{ my: 2, color: 'black' }}>
                                    Sessões
                                </Button>
                            </Link>
                            <Link component={RouterLink} to={'/admin/pacientes'} sx={{ textDecoration: 'none' }}>
                                <Button sx={{ my: 2, color: 'black' }}>
                                    Pacientes
                                </Button>
                            </Link>
                            <Button sx={{ my: 2, color: 'black', marginLeft: 'auto' }} onClick={() => logout()}>
                                Logout
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth='lg' sx={{ mt: 1, p: 2 }}>
                    <Outlet />
                </Container>
            </Box>
        </>
    )
}