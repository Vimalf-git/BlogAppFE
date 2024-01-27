import { useNavigate } from 'react-router-dom'

function uselogout(){
    let navigate=useNavigate()
  return () => {
    sessionStorage.clear()
     navigate('/login')
  }
}

export default uselogout