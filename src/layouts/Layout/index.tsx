import { Outlet } from 'react-router-dom'
import Navbar from '../Layout/Navbar'
import { useUserStore } from '@/stores/useUserStore'
import { UserService } from '@/services/Client/UserService'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const CleanLayout = () => {
      const { token, setUserInformation } = useUserStore()
      console.log("Token acessado na LandingPage:", token)
    
      const fetchUser = async () => {
        const response = await UserService.getUser()
        return response.data
      }
      const { data } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        enabled: !!token,
      })
    
      useEffect(() => {
        console.log("Data do usuário:", data)
        if (data && token) {
          setUserInformation(data)
        }
      }, [data, setUserInformation, token])
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export { CleanLayout }
