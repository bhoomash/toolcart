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
import { Badge, Button, Chip, Stack, useMediaQuery, useTheme, Box, Divider, TextField, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import { selectProductIsFilterOpen, toggleFilters, fetchProductsAsync } from '../../products/ProductSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';



export const Navbar=({isProductList=false})=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [searchSuggestions, setSearchSuggestions] = React.useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = React.useState(false);
  const userInfo=useSelector(selectUserInfo)
  const cartItems=useSelector(selectCartItems)
  const loggedInUser=useSelector(selectLoggedInUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const theme=useTheme()
  const is480=useMediaQuery(theme.breakpoints.down(480))

  const wishlistItems=useSelector(selectWishlistItems)
  const isProductFilterOpen=useSelector(selectProductIsFilterOpen)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters=()=>{
    dispatch(toggleFilters())
  }

  // Debounced function to fetch search suggestions
  const fetchSearchSuggestions = React.useCallback(
    async (query) => {
      if (!query.trim() || query.length < 2) {
        setSearchSuggestions([]);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8001'}/products?search=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        
        // Extract unique product titles and brands for suggestions
        const suggestions = [];
        const seen = new Set();
        
        data.forEach(product => {
          if (product.title && !seen.has(product.title.toLowerCase())) {
            suggestions.push({
              type: 'product',
              value: product.title,
              id: product._id
            });
            seen.add(product.title.toLowerCase());
          }
          
          if (product.brand?.name && !seen.has(product.brand.name.toLowerCase())) {
            suggestions.push({
              type: 'brand',
              value: product.brand.name,
              id: product.brand._id
            });
            seen.add(product.brand.name.toLowerCase());
          }
        });
        
        setSearchSuggestions(suggestions.slice(0, 5));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSearchSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    },
    []
  );

  // Debounce the search suggestions
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchFocused) {
        fetchSearchSuggestions(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchFocused, fetchSearchSuggestions]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      setSearchSuggestions([]);
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      if (window.location.pathname === '/') {
        dispatch(fetchProductsAsync({ 
          search: searchQuery.trim(),
          pagination: { page: 1, limit: 10 }
        }));
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchFocused(false);
    setSearchSuggestions([]);
    if (window.location.pathname === '/') {
      dispatch(fetchProductsAsync({ 
        pagination: { page: 1, limit: 10 }
      }));
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
    if (e.key === 'Escape') {
      setSearchFocused(false);
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.value);
    setSearchFocused(false);
    setSearchSuggestions([]);
    navigate(`/?search=${encodeURIComponent(suggestion.value)}`);
    if (window.location.pathname === '/') {
      dispatch(fetchProductsAsync({ 
        search: suggestion.value,
        pagination: { page: 1, limit: 10 }
      }));
    }
  };

  const settings = [
    {name:"Home",to:"/"},
    {name:'Profile',to:loggedInUser?.isAdmin?"/admin/profile":"/profile"},
    {name:loggedInUser?.isAdmin?'Orders':'My orders',to:loggedInUser?.isAdmin?"/admin/orders":"/orders"},
    {name:'Logout',to:"/logout"},
  ];

  return (
    <>
      {/* CSS Animations */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }
          
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <AppBar 
        position="sticky" 
        sx={{
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          color: "text.primary",
          borderBottom: "1px solid #e0e0e0"
        }}
      >
      <Toolbar sx={{ p: 1, height: "5rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        
        {/* Left Section - Logo */}
        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          <Typography 
            variant="h5" 
            component={Link} 
            to="/" 
            sx={{ 
              fontWeight: 800, 
              letterSpacing: '0.1rem', 
              color: '#1976d2', 
              textDecoration: 'none',
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            🛠️ ToolCart
          </Typography>
        </Box>

        {/* Center Section - Enhanced Search Bar */}
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          px: { xs: 1, md: 4 },
          maxWidth: '600px',
          mx: 'auto'
        }}>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '30px',
                padding: '2px',
                background: searchFocused 
                  ? 'linear-gradient(45deg, #1976d2, #42a5f5, #64b5f6)' 
                  : 'transparent',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'exclude',
                transition: 'all 0.3s ease-in-out',
                zIndex: -1
              }
            }}
          >
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search automation tools, RPA, DevOps..."
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                  backgroundColor: searchFocused ? 'rgba(255,255,255,0.95)' : 'rgba(248,249,250,0.8)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: searchFocused ? '2px solid transparent' : '2px solid rgba(0,0,0,0.08)',
                  boxShadow: searchFocused 
                    ? '0 8px 32px rgba(25,118,210,0.2), 0 0 0 1px rgba(25,118,210,0.1)' 
                    : '0 2px 8px rgba(0,0,0,0.04)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 4px 16px rgba(25,118,210,0.12)',
                    transform: 'translateY(-1px)',
                    border: '2px solid rgba(25,118,210,0.2)'
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255,255,255,0.98)',
                    transform: 'translateY(-2px)',
                    '& fieldset': {
                      borderColor: 'transparent'
                    }
                  },
                  '& fieldset': {
                    borderColor: 'transparent'
                  }
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 20px',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#2c3e50',
                  '&::placeholder': {
                    color: '#7c8a96',
                    opacity: 1,
                    fontSize: '0.9rem'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: searchQuery 
                          ? 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)' 
                          : 'linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        ml: -1,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                          transform: 'scale(1.05)',
                          boxShadow: '0 4px 12px rgba(25,118,210,0.3)'
                        },
                        '&:active': {
                          transform: 'scale(0.95)'
                        }
                      }}
                      onClick={handleSearch}
                    >
                      <SearchIcon 
                        sx={{ 
                          color: searchQuery ? 'white' : '#666',
                          fontSize: '1.2rem',
                          transition: 'color 0.3s ease-in-out'
                        }} 
                      />
                    </Box>
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(211,47,47,0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        mr: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(211,47,47,0.15)',
                          transform: 'scale(1.1)'
                        },
                        '&:active': {
                          transform: 'scale(0.9)'
                        }
                      }}
                      onClick={handleClearSearch}
                    >
                      <ClearIcon 
                        sx={{ 
                          color: '#d32f2f', 
                          fontSize: '1rem'
                        }} 
                      />
                    </Box>
                  </InputAdornment>
                )
              }}
            />
            
            {/* Search Suggestions Dropdown */}
            {searchFocused && (searchSuggestions.length > 0 || loadingSuggestions || searchQuery.length >= 2) && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  mt: 1,
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  zIndex: 1000,
                  overflow: 'hidden',
                  animation: 'slideDown 0.3s ease-out'
                }}
              >
                {loadingSuggestions ? (
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: '2px solid #e3f2fd',
                        borderTop: '2px solid #1976d2',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Searching...
                    </Typography>
                  </Box>
                ) : searchSuggestions.length > 0 ? (
                  <Box>
                    {searchSuggestions.map((suggestion, index) => (
                      <Box
                        key={`${suggestion.type}-${suggestion.id}-${index}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        sx={{
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          cursor: 'pointer',
                          borderBottom: index < searchSuggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                          '&:hover': {
                            backgroundColor: '#f8f9fa',
                            '& .suggestion-icon': {
                              backgroundColor: '#1976d2',
                              color: 'white'
                            }
                          },
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        <Box
                          className="suggestion-icon"
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: suggestion.type === 'product' ? '#e3f2fd' : '#f3e5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease-in-out'
                          }}
                        >
                          {suggestion.type === 'product' ? (
                            <SearchIcon sx={{ fontSize: '1rem', color: '#1976d2' }} />
                          ) : (
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: '#9c27b0'
                              }}
                            />
                          )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: '#2c3e50'
                            }}
                          >
                            {suggestion.value}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#7c8a96',
                              textTransform: 'capitalize'
                            }}
                          >
                            {suggestion.type}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : searchQuery.length >= 2 ? (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No suggestions found for "{searchQuery}"
                    </Typography>
                  </Box>
                ) : null}
              </Box>
            )}
          </Box>
        </Box>

        {/* Right Section - Actions */}
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={2}
          sx={{ flexGrow: 0 }}
        >
          
          {/* Admin Badge */}
          {loggedInUser?.isAdmin && (
            <Chip 
              icon={<AdminPanelSettingsIcon />}
              label="Admin"
              size="small"
              color="primary"
              variant="outlined"
              sx={{ 
                fontWeight: 600,
                '& .MuiChip-icon': { fontSize: '1rem' }
              }}
            />
          )}

          {/* Action Icons */}
          <Stack direction="row" spacing={1} alignItems="center">
            
            {/* Wishlist */}
            {!loggedInUser?.isAdmin && (
              <Tooltip title="Wishlist" arrow>
                <IconButton 
                  component={Link} 
                  to="/wishlist"
                  sx={{
                    backgroundColor: wishlistItems?.length > 0 ? '#fff3e0' : 'transparent',
                    '&:hover': { 
                      backgroundColor: '#f3e5f5',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <Badge badgeContent={wishlistItems?.length} color="error">
                    <FavoriteBorderIcon sx={{ color: wishlistItems?.length > 0 ? '#e91e63' : 'text.secondary' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {/* Shopping Cart */}
            {cartItems?.length > 0 && (
              <Tooltip title="Shopping Cart" arrow>
                <IconButton 
                  onClick={() => navigate("/cart")}
                  sx={{
                    backgroundColor: '#e3f2fd',
                    '&:hover': { 
                      backgroundColor: '#bbdefb',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartOutlinedIcon sx={{ color: '#1976d2' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {/* Filter Toggle (Product List) */}
            {isProductList && (
              <Tooltip title="Filters" arrow>
                <IconButton 
                  onClick={handleToggleFilters}
                  sx={{
                    backgroundColor: isProductFilterOpen ? '#e8f5e8' : 'transparent',
                    '&:hover': { 
                      backgroundColor: '#f1f8e9',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <TuneIcon sx={{ color: isProductFilterOpen ? '#4caf50' : 'text.secondary' }} />
                </IconButton>
              </Tooltip>
            )}

            {/* User Avatar & Menu */}
            <Tooltip title="Account" arrow>
              <IconButton 
                onClick={handleOpenUserMenu} 
                sx={{ 
                  p: 0.5,
                  border: '2px solid transparent',
                  '&:hover': { 
                    border: '2px solid #1976d2',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Avatar 
                  alt={userInfo?.name} 
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#1976d2',
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  {userInfo?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* Enhanced User Menu */}
            <Menu
              sx={{ 
                mt: '50px',
                '& .MuiPaper-root': {
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  border: '1px solid #e0e0e0',
                  minWidth: '200px'
                }
              }}
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
              {/* User Info Header */}
              <Box sx={{ px: 2, py: 1.5, backgroundColor: '#f8f9fa' }}>
                <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                  {userInfo?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {loggedInUser?.isAdmin ? 'Administrator' : 'Customer'}
                </Typography>
              </Box>
              
              <Divider />

              {/* Admin-only item */}
              {loggedInUser?.isAdmin && (
                <>
                  <MenuItem onClick={handleCloseUserMenu} sx={{ py: 1.5 }}>
                    <AdminPanelSettingsIcon sx={{ mr: 2, fontSize: '1.2rem', color: '#1976d2' }} />
                    <Typography 
                      component={Link} 
                      to="/admin/add-product" 
                      sx={{ textDecoration: "none", color: 'text.primary' }}
                    >
                      Add New Product
                    </Typography>
                  </MenuItem>
                  <Divider />
                </>
              )}

              {/* Regular menu items */}
              {settings.map((setting, index) => (
                <MenuItem 
                  key={setting.name} 
                  onClick={handleCloseUserMenu}
                  sx={{ 
                    py: 1.5,
                    '&:hover': { backgroundColor: '#f5f5f5' }
                  }}
                >
                  {setting.name === 'Profile' && <PersonOutlineIcon sx={{ mr: 2, fontSize: '1.2rem', color: '#666' }} />}
                  {setting.name.includes('orders') && <ShoppingBagOutlinedIcon sx={{ mr: 2, fontSize: '1.2rem', color: '#666' }} />}
                  <Typography 
                    component={Link} 
                    to={setting.to} 
                    sx={{ 
                      textDecoration: "none", 
                      color: 'text.primary',
                      fontWeight: setting.name === 'Logout' ? 600 : 400,
                      color: setting.name === 'Logout' ? '#d32f2f' : 'text.primary'
                    }}
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
    </>
  );
}