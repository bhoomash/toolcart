import { Button, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { deleteCartItemByIdAsync, updateCartItemByIdAsync } from '../CartSlice';
import { Link } from 'react-router-dom';

export const CartItem = ({id,thumbnail,title,category,brand,price,quantity,stockQuantity,productId}) => {


    const dispatch=useDispatch()
    const theme=useTheme()
    const is900=useMediaQuery(theme.breakpoints.down(900))
    const is480=useMediaQuery(theme.breakpoints.down(480))
    const is552=useMediaQuery(theme.breakpoints.down(552))

    const handleAddQty=()=>{
        const update={_id:id,quantity:quantity+1}
        dispatch(updateCartItemByIdAsync(update))
    }
    const handleRemoveQty=()=>{
        if(quantity===1){
            dispatch(deleteCartItemByIdAsync(id))
        }
        else{
            const update={_id:id,quantity:quantity-1}
            dispatch(updateCartItemByIdAsync(update))
        }
    }

    const handleProductRemove=()=>{
        dispatch(deleteCartItemByIdAsync(id))
    }


  return (
    <Stack 
        bgcolor={'white'} 
        component={is900?'':Paper} 
        p={is900?0:3} 
        elevation={is900?0:1}  
        flexDirection={'row'} 
        justifyContent={'space-between'} 
        alignItems={is900?'center':'flex-start'}
        borderRadius={is900?0:2}
        sx={{
            border: is900 ? '1px solid #e0e0e0' : 'none',
            '&:hover': !is900 ? {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
            } : {}
        }}
    >
        
        {/* image and details */}
        <Stack flexDirection={'row'} rowGap={'1rem'} alignItems={is900?'center':'flex-start'} columnGap={is900?2:4} flexWrap={'wrap'}>

            <Stack 
                width={is552?"auto":is900?'120px':'180px'} 
                height={is552?"auto":is900?'120px':'180px'} 
                component={Link} 
                to={`/product-details/${productId}`}
                sx={{
                    '&:hover img': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease'
                    }
                }}
            >
                <img 
                    style={{
                        width:"100%",
                        height:is552?"auto":"100%",
                        aspectRatio:is552?1/1:'',
                        objectFit:'contain',
                        borderRadius: '8px',
                        transition: 'transform 0.3s ease'
                    }} 
                    src={thumbnail} 
                    alt={title} 
                />
            </Stack>

            <Stack alignSelf={is900?'':'flex-start'} spacing={is900?1:2}>
                <Typography 
                    component={Link} 
                    to={`/product-details/${productId}`} 
                    sx={{
                        textDecoration:"none",
                        color:theme.palette.primary.main,
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }} 
                    variant={is900?'h6':'h5'} 
                    fontWeight={500}
                >
                    {title}
                </Typography>
                <Typography variant='body2' color={'text.secondary'}>{brand}</Typography>
                {!is900 && <Typography variant='body2' color={'text.secondary'}>Category: {category}</Typography>}
                
                <Stack spacing={1}>
                    <Typography variant={is900?'body2':'body1'} fontWeight={500}>Quantity</Typography>
                    <Stack flexDirection={'row'} alignItems={'center'} spacing={1}>
                        <IconButton 
                            onClick={handleRemoveQty}
                            size={is900?'small':'medium'}
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px'
                            }}
                        >
                            <RemoveIcon fontSize='small'/>
                        </IconButton>
                        <Typography 
                            variant={is900?'body1':'h6'} 
                            fontWeight={500}
                            sx={{
                                minWidth: '30px',
                                textAlign: 'center',
                                px: 1
                            }}
                        >
                            {quantity}
                        </Typography>
                        <IconButton 
                            onClick={handleAddQty}
                            size={is900?'small':'medium'}
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px'
                            }}
                        >
                            <AddIcon fontSize='small'/>
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>

        {/* price and remove button */}
        <Stack 
            justifyContent={is900?'space-evenly':'space-between'} 
            alignSelf={is552?'flex-end':'stretch'} 
            height={is900?'100%':'auto'} 
            rowGap={is900?'1rem':'2rem'} 
            alignItems={'flex-end'}
            minWidth={is900?'auto':'120px'}
        >
            <Typography 
                variant={is900?'body2':'h6'} 
                fontWeight={600}
                color='primary.main'
            >
                ${price}
            </Typography>
            <Button 
                size={is480?"small":is900?"medium":"large"} 
                onClick={handleProductRemove} 
                variant='outlined'
                color='error'
                sx={{
                    borderRadius: '8px',
                    '&:hover': {
                        backgroundColor: 'error.main',
                        color: 'white'
                    }
                }}
            >
                Remove
            </Button>
        </Stack>
    </Stack>
  )
}
