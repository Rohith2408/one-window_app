import { useContext } from "react"
import Appcontext from "../contexts/AppContext"

const useTheme=()=>{
    const context=useContext(Appcontext)
    return [context?.theme,context?.setTheme]
}

export default useTheme