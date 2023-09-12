import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { Navigate, Outlet, Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
    const [redirect, setRedirect] = useState(false);

    const mes = new Date().getMonth();
    const ano = new Date().getFullYear();

    const logout = () => {
        localStorage.clear();
        setRedirect(true);
    }

    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            setRedirect(true);
            return;
        }
    }, []);

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'lightpink' }}>
                <Container maxWidth="lg">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <Link component={RouterLink} to={`/admin/sessoes/${mes}/${ano}`}>
                                <Button sx={{ my: 2, color: 'black' }}>
                                    Sessões
                                </Button>
                            </Link>
                            <Link component={RouterLink} to={'/admin/pacientes'}>
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