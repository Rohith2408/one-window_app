import { Dispatch, createContext} from "react"
import { NavigationActions } from "../reducers/PathReducer"

type PathType={
    path:string,
    navigate:Dispatch<NavigationActions>
}

const Pathcontext=createContext<undefined|PathType>(undefined)

export default Pathcontext