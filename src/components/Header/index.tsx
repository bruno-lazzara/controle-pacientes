import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Link, Menu, MenuItem } from '@mui/material';
import { Navigate, Outlet, Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../Loading';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { anoState, carregandoState, mesState, pacientesMesAnoState, pacientesState, parametroDescontoState } from '../../state/atom';

export default function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [redirect, setRedirect] = useState(false);
    const setCarregando = useSetRecoilState(carregandoState);

    const resetMes = useResetRecoilState(mesState);
    const resetAno = useResetRecoilState(anoState);
    const resetPacientes = useResetRecoilState(pacientesState);
    const resetPacientesMesAno = useResetRecoilState(pacientesMesAnoState);
    const resetParametroDesconto = useResetRecoilState(parametroDescontoState);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logout = () => {
        setCarregando(true);
        localStorage.clear();
        resetMes();
        resetAno();
        resetPacientes();
        resetPacientesMesAno();
        resetParametroDesconto();
        setRedirect(true);
        setCarregando(false);
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#b6acd1' }}>
                <Container maxWidth="lg">
                    <Toolbar sx={{ '@media (min-width:600px)': { p: 0 } }}>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
                            <IconButton
                                size="small"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link component={RouterLink} to={`/admin/sessoes`} sx={{ textDecoration: 'none', color: 'black' }}>
                                        Sessões
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link component={RouterLink} to={'/admin/pacientes'} sx={{ textDecoration: 'none', color: 'black' }}>
                                        Pacientes
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link component={RouterLink} to={'/admin/parametros'} sx={{ textDecoration: 'none', color: 'black' }}>
                                        Parâmetros
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                            <Link component={RouterLink} to={`/admin/sessoes`} sx={{ textDecoration: 'none' }}>
                                <Button sx={{ my: 1, mr: 1.5, color: 'black' }}>
                                    Sessões
                                </Button>
                            </Link>
                            <Link component={RouterLink} to={'/admin/pacientes'} sx={{ textDecoration: 'none' }}>
                                <Button sx={{ my: 1, mr: 1.5, color: 'black' }}>
                                    Pacientes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to={'/admin/parametros'} sx={{ textDecoration: 'none' }}>
                                <Button sx={{ my: 1, mr: 1.5, color: 'black' }}>
                                    Parâmetros
                                </Button>
                            </Link>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Button sx={{ my: 1, color: 'black', marginLeft: 'auto' }} onClick={() => logout()}>
                                Logout
                            </Button>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth='lg' sx={{ mt: 1, p: 2 }}>
                    <Loading />
                    <Outlet />
                </Container>
            </Box>
        </>
    )
}