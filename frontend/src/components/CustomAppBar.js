import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import userActions from '../redux/actions/userActions';
import './styles/CustomAppBar.css';
import { Link } from "react-router-dom";
import { Avatar } from '@mui/material';
import { connect } from 'react-redux';
import { useEffect } from 'react';


function CustomAppBar(props) {
    const { user, signOutUser } = props;
    const pages = [

        {

            label: 'Home',
            route: '/home'
        },
        {
            label: 'Cities',
            route: '/cities'
        }
    ];
    const userOptions = [
        [//Logged options
            {
                label: 'Sign in',
                route: '/signin'
            },
            {
                label: 'Sign up',
                route: '/signup'
            }
        ],
        [//Unlogged options
            {
                label: "Sign out",
                route: "#",
                onClick: () => signOutUser(user.email)
            }
        ]
    ];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            color="primary"
            position="static"
        >
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/home">
                            MYTINERARY
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
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
                            {pages.map(page => (
                                <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to={page.route}>
                                        <Typography textAlign="center">{page.label}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/home">
                            MYTINERARY
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link key={page.route} style={{ color: 'inherit', textDecoration: 'none' }} to={page.route}>
                                <Button
                                    key={page.route}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    {page.label}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {user ? <Avatar alt={user.firstName + " " + user.lastName} src={user.picture} /> : <AccountCircle sx={{ color: 'black' }} />}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {userOptions[user ? 1 : 0].map(option => (
                                <MenuItem key={option.route} onClick={handleCloseUserMenu}>
                                    <Link onClick={option.onClick} to={option.route} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <Typography textAlign="center">{option.label}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default connect(state => state.userReducer, userActions)(CustomAppBar)