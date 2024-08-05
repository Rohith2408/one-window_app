import Home from "./screens/Home"
import Profile from "./screens/Profile"

const ComponentsInfo:{ [key: string]: (props?: any) => JSX.Element }={
    Home:Home,
    Profile:Profile
}

export default ComponentsInfo