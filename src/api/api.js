import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://cute-gold-haddock-slip.cyclic.app/api/users'
})
 

export const getUsers = async(req) =>{ 
    
    const data = await axiosInstance.get(`/${req}`)
    return data.data
}