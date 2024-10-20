import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';

export const Navbar = ({ isProductList = false }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const settings = [
    { name: 'Home', to: '/' },
    { name: 'Profile', to: loggedInUser?.isAdmin ? '/admin/profile' : '/profile' },
    { name: loggedInUser?.isAdmin ? 'Orders' : 'My orders', to: loggedInUser?.isAdmin ? '/admin/orders' : '/orders' },
    { name: 'Logout', to: '/logout' },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#121212', color: 'white', boxShadow: 'none', p: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left Section - Logo */}
        <Typography
          variant="h5"
          component="a"
          href="/"
          sx={{
            fontWeight: 700,
            letterSpacing: '.2rem',
            textDecoration: 'none',
            color: '#FFCE00',
            ':hover': {
              color: '#FFC107',
            },
          }}
        >
          AccessCart
        </Typography>

        {/* Middle Section - User Controls */}
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 300 }}>
            {is480 ? `${userInfo?.name.split(' ')[0]}` : `Welcome, ${userInfo?.name}`}
          </Typography>

          {/* User Avatar */}
          <Tooltip title="Account Settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userInfo?.name} src={userInfo?.avatar || 'https://via.placeholder.com/150'} />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{ mt: 2 }}
          >
            {loggedInUser?.isAdmin && (
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  to="/admin/add-product"
                  sx={{ color: 'black', textDecoration: 'none', textAlign: 'center' }}
                >
                  Add New Product
                </Typography>
              </MenuItem>
            )}
            {settings.map((setting) => (
              <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  to={setting.to}
                  sx={{ color: 'black', textDecoration: 'none', textAlign: 'center' }}
                >
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Stack>

        {/* Right Section - Cart, Wishlist, Filters */}
        <Stack direction="row" alignItems="center" spacing={3}>
          {cartItems.length > 0 && (
            <Badge badgeContent={cartItems.length} color="error">
              <IconButton onClick={() => navigate('/cart')} sx={{ color: '#FFC107' }}>
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Badge>
          )}

          {!loggedInUser?.isAdmin && (
            <Badge badgeContent={wishlistItems?.length} color="error">
              <IconButton component={Link} to="/wishlist" sx={{ color: '#FFC107' }}>
                <FavoriteBorderIcon />
              </IconButton>
            </Badge>
          )}

          {isProductList && (
            <IconButton onClick={handleToggleFilters} sx={{ color: isProductFilterOpen ? '#FFCE00' : 'white' }}>
              <TuneIcon />
            </IconButton>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
