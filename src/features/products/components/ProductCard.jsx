import { FormHelperText, Paper, Stack, Typography, useMediaQuery, useTheme, Button, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { addToCartAsync, selectCartItems } from '../../cart/CartSlice';
import { motion } from 'framer-motion';

export const ProductCard = ({ id, title, price, thumbnail, brand, stockQuantity, handleAddRemoveFromWishlist, isWishlistCard, isAdminCard }) => {
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const isProductInWishlist = wishlistItems.some(item => item.product._id === id);
  const isProductInCart = cartItems.some(item => item.product._id === id);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const data = { user: loggedInUser?._id, product: id };
    dispatch(addToCartAsync(data));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        width: isSmallScreen ? '100%' : '300px',
        cursor: 'pointer',
        margin: isSmallScreen ? '10px 0' : '20px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
      onClick={() => navigate(`/product-details/${id}`)}
    >
      <Stack spacing={2}>
        {/* Product Image */}
        <Stack sx={{ position: 'relative' }}>
          <img
            src={thumbnail}
            alt={`${title} photo`}
            style={{
              width: '100%',
              objectFit: 'contain',
              height: isSmallScreen ? '200px' : '250px',
            }}
          />
          {/* Wishlist Icon */}
          {!isAdminCard && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleAddRemoveFromWishlist(e, id);
              }}
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>
                <Checkbox
                  checked={isProductInWishlist}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: 'red' }} />}
                />
              </motion.div>
            </IconButton>
          )}
        </Stack>

        {/* Product Details */}
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight="600">
            {title}
          </Typography>
          <Typography color="text.secondary">{brand}</Typography>
          <Typography color="primary" fontWeight="bold">
            ${price}
          </Typography>
        </Stack>

        {/* Stock Alert */}
        {stockQuantity <= 20 && (
          <FormHelperText error sx={{ fontSize: '0.85rem' }}>
            {stockQuantity === 1 ? 'Only 1 item left!' : `Only ${stockQuantity} left in stock!`}
          </FormHelperText>
        )}

        {/* Add to Cart Button */}
        {!isWishlistCard && !isAdminCard && !isProductInCart && (
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              sx={{
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: 'gray',
                },
              }}
            >
              Add to Cart
            </Button>
          </motion.div>
        )}
      </Stack>
    </Paper>
  );
};
