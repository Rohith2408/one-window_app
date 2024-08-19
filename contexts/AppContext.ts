import { Dispatch, SetStateAction, createContext} from "react"
import { NavigationActions } from "../reducers/PathReducer"

type ContextType={
    path:string,
    navigate:Dispatch<NavigationActions>,
    theme:"light"|"dark",
    setTheme:Dispatch<SetStateAction<"light"|"dark">>
}

const Appcontext=createContext<undefined|ContextType>(undefined)

export default Appcontext