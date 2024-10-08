import { useContext } from "react"
import Appcontext from "../contexts/AppContext"


const useNavigation=()=>{
    const context=useContext(Appcontext)
    return [context?.path,context?.navigate] as const
}

export default useNavigation