import { ServerResponse } from "../types";
import useNavigation from "./useNavigation";

const useServerResponseChecker=(res:ServerResponse)=>{

    const Navigation=useNavigation()
    if(!res.success)
    {
        Navigation?.navigate({type:"logout"});
    }
    return res
}

export default useServerResponseChecker