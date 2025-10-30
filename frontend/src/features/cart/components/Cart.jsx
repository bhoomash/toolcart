import React, { useEffect } from 'react'
import { CartItem } from './CartItem'
import { Button, Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { resetCartItemRemoveStatus, selectCartItemRemoveStatus, selectCartItems } from '../CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SHIPPING, TAXES } from '../../../constants'
import { toast } from 'react-toastify'
import {motion} from 'framer-motion'

export const Cart = ({checkout}) => {
    const items=useSelector(selectCartItems)
    const subtotal=items.reduce((acc,item)=>item.product.price*item.quantity+acc,0)
    const totalItems=items.reduce((acc,item)=>acc+item.quantity,0)
    const navigate=useNavigate()
    const theme=useTheme()
    const is900=useMediaQuery(theme.breakpoints.down(900))

    const cartItemRemoveStatus=useSelector(selectCartItemRemoveStatus)
    const dispatch=useDispatch()

    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])

    useEffect(()=>{
        if(items.length===0){
            navigate("/")
        }
    },[items])

    useEffect(()=>{
        if(cartItemRemoveStatus==='fulfilled'){
            toast.success("Product removed from cart")
        }
        else if(cartItemRemoveStatus==='rejected'){
            toast.error("Error removing product from cart, please try again later")
        }
    },[cartItemRemoveStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetCartItemRemoveStatus())
        }
    },[])

  return (
    <Stack justifyContent={'flex-start'} alignItems={'center'} mb={'5rem'} >

        {/* Desktop Layout */}
        {!is900 && !checkout && (
            <Stack width={'90%'} maxWidth={'1200px'} mt={'3rem'} paddingX={4} rowGap={4}>
                <Stack flexDirection={'row'} spacing={4}>
                    {/* Cart Items Section */}
                    <Stack flex={2} rowGap={3}>
                        <Typography variant='h5' fontWeight={600}>Shopping Cart</Typography>
                        <Stack rowGap={2}>
                            {items && items.map((item)=>(
                                <CartItem key={item._id} id={item._id} title={item.product.title} brand={item.product.brand.name} category={item.product.category.name} price={item.product.price} quantity={item.quantity} thumbnail={item.product.thumbnail} stockQuantity={item.product.stockQuantity} productId={item.product._id}/>
                            ))}
                        </Stack>
                    </Stack>

                    {/* Order Summary Section */}
                    <Stack flex={1} bgcolor={'#f8f9fa'} p={3} borderRadius={2} height={'fit-content'} position={'sticky'} top={20}>
                        <Typography variant='h6' fontWeight={600} mb={2}>Order Summary</Typography>
                        
                        <Stack rowGap={2} mb={3}>
                            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                <Typography>Items ({totalItems})</Typography>
                                <Typography>${subtotal}</Typography>
                            </Stack>
                            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                <Typography>Estimated Shipping</Typography>
                                <Typography>Free</Typography>
                            </Stack>
                            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                <Typography>Estimated Tax</Typography>
                                <Typography>Calculated at checkout</Typography>
                            </Stack>
                        </Stack>

                        <hr style={{margin: '16px 0', border: 'none', borderTop: '1px solid #ddd'}}/>

                        <Stack flexDirection={'row'} justifyContent={'space-between'} mb={3}>
                            <Typography variant='h6' fontWeight={600}>Order Total</Typography>
                            <Typography variant='h6' fontWeight={600}>${subtotal}</Typography>
                        </Stack>

                        <Button 
                            variant='contained' 
                            component={Link} 
                            to='/checkout'
                            size='large'
                            fullWidth
                            sx={{mb: 2}}
                        >
                            Proceed to Checkout
                        </Button>
                        
                        <motion.div style={{alignSelf:'center'}} whileHover={{y:2}}>
                            <Chip 
                                sx={{cursor:"pointer",borderRadius:"8px"}} 
                                component={Link} 
                                to={'/'} 
                                label="Continue Shopping" 
                                variant='outlined'
                            />
                        </motion.div>
                    </Stack>
                </Stack>
            </Stack>
        )}

        {/* Mobile/Tablet Layout & Checkout Layout */}
        {(is900 || checkout) && (
            <Stack width={is900?'auto':'50rem'} mt={'3rem'} paddingLeft={checkout?0:2} paddingRight={checkout?0:2} rowGap={4} >

                {/* cart items */}
                <Stack rowGap={2}>
                {
                    items && items.map((item)=>(
                        <CartItem key={item._id} id={item._id} title={item.product.title} brand={item.product.brand.name} category={item.product.category.name} price={item.product.price} quantity={item.quantity} thumbnail={item.product.thumbnail} stockQuantity={item.product.stockQuantity} productId={item.product._id}/>
                    ))
                }
                </Stack>
                
                {/* subtotal */}
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>

                {
                    checkout?(
                        <Stack rowGap={2} width={'100%'}>

                            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                <Typography>Subtotal</Typography>
                                <Typography>${subtotal}</Typography>
                            </Stack>

                            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                <Typography>Shipping</Typography>
                                <Typography>${SHIPPING}</Typography>
                            </Stack>

                            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                <Typography>Taxes</Typography>
                                <Typography>${TAXES}</Typography> 
                            </Stack>

                            <hr/>

                            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                <Typography>Total</Typography>
                                <Typography>${subtotal+SHIPPING+TAXES}</Typography>
                            </Stack>
                            

                        </Stack>
                    ):(
                        <>
                            <Stack>
                                <Typography variant='h6' fontWeight={500}>Subtotal</Typography>
                                <Typography>Total items in cart {totalItems}</Typography>
                                <Typography variant='body1' color={'text.secondary'}>Shipping and taxes will be calculated at checkout.</Typography>
                            </Stack>

                            <Stack>
                                <Typography variant='h6' fontWeight={500}>${subtotal}</Typography>
                            </Stack>
                        </>
                    )
                }

            </Stack>
            
            {/* checkout or continue shopping */}
            {
            !checkout && 
            <Stack rowGap={'1rem'}>
                <Button variant='contained' component={Link} to='/checkout'>Checkout</Button>
                <motion.div style={{alignSelf:'center'}} whileHover={{y:2}}><Chip sx={{cursor:"pointer",borderRadius:"8px"}} component={Link} to={'/'} label="or continue shopping" variant='outlined'/></motion.div>
            </Stack>
            }
    
        </Stack>
        )}

    
    </Stack>
  )
}
