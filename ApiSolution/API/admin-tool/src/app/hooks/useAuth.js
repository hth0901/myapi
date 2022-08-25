import { useContext } from 'react'
import AuthContext from 'app/contexts/JWTAuthContext'
// import BanVeAuthContext from 'app/contexts/auth-context'

const useAuth = () => useContext(AuthContext)

export default useAuth
