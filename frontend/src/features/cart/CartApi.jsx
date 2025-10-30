import {axiosInstance} from '../../config/axios'

export const addToCart=async(item)=>{
    try {
        const res=await axiosInstance.post('/cart',item)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchCartByUserId=async(id)=>{
    try {
        const res=await axiosInstance.get(`/cart/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateCartItemById=async(update)=>{
    try {
        const res=await axiosInstance.patch(`/cart/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const deleteCartItemById=async(id)=>{
    try {
        const res=await axiosInstance.delete(`/cart/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const resetCartByUserId=async(userId)=>{
    try {
        const res=await axiosInstance.delete(`/cart/user/${userId}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
