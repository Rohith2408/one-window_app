import { Text, View } from "react-native"
import Stacknavigator from "../../navigation/stackNavigator"
import Invalidpath from "./Invalidpath"
import { useRef } from "react"
import { taskApi } from "../../constants/tasks"
import { getComponent } from "../../utils"

const Task=(props:{taskId:string})=>{

    const task=useRef(taskApi("get",props.taskId)).current

    return(
        <View style={{width:"100%",height:"100%",position:"relative"}}>
        {
            task?.success && task.data
            ?
            <Stacknavigator 
                invalidPathScreen={Invalidpath}
                screens={task.data.stages.map((stage)=>({
                    id:stage.id,
                    component:stage.id,
                    props:stage.data,
                    swipable:true,
                    animationStyle:getComponent(stage.id)?.animationStyle
                }))}
            />
            :
            <Text>Task not found</Text>
        }
            
        </View>
    )
}

export default Task