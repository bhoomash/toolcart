import { axiosInstance } from "../../config/axios"

export const getUserById=async(id)=>{
    try {
        const res=await axiosInstance.get(`/users/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateUserById=async(update)=>{
    try {
        const res=await axiosInstance.patch(`/users/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}