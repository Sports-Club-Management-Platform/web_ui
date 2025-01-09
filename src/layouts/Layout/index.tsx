import { Outlet } from 'react-router-dom'
import Navbar from '../Layout/Navbar'
import { useUserStore } from '@/stores/useUserStore'
import { UserService } from '@/services/Client/UserService'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CleanLayout = () => {
      const { token, setUserInformation, logout } = useUserStore()
      console.log("Token acessado na LandingPage:", token)
      const navigate = useNavigate()
    
      const fetchUser = async () => {
        const response = await UserService.getUser()
        return response.data
      }
      const { data, isError } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        enabled: !!token,
      })
    
      useEffect(() => {

        if (isError) {
          logout()
          navigate("/")
        }

        if (data && token) {
          setUserInformation(data)
        }

      }, [data, setUserInformation, token, isError, logout, navigate])

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export { CleanLayout }
