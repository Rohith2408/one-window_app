import { useContext } from "react"
import Navigationcontext from "../contexts/PathContext"

const useNavigation=()=>{
    const context=useContext(Navigationcontext)
    return context
}

export default useNavigation