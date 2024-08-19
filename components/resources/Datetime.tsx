import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform, Pressable, View } from "react-native"

const Datetime=()=>{

    return(
        <View >
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {
                Platform.OS=="android"
                ?
                <AndroidPicker state={null} nonState={props.nonState}></AndroidPicker>
                :
                <IosPicker state={null} nonState={props.nonState}></IosPicker>
            }
            </View>
        </View>
    )

}

const AndroidPicker=(props:Component<any,null>)=>{

    const [state,setState]=useState(props.nonState.initialValue?props.nonState.initialValue:new Date().toISOString());
    const [showPicker, setShowPicker] = useState(false);

    const eventHandler=(event:Event)=>{
        setState(event.data)
        setShowPicker(false);
        props.nonState.eventHandler
        ?
        props.nonState.eventHandler({...event,triggerBy:{componentName:'dateinput',id:props.nonState.id}})
        :
        null
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Pressable style={{backgroundColor:"lightgrey",borderRadius:10}} onPress={()=>setShowPicker(true)}><Text style={{fontSize:13,padding:10}}>{new Date(state).toDateString().substring(4)}</Text></Pressable>
            {
                showPicker
                ?
                <DateTimePicker
                maximumDate={new Date()}
                testID="dateTimePicker"
                value={new Date(state)}
                mode="date"
                is24Hour={true}
                accentColor={THEME.COLOR.SECONDARY.SUNSHINE(1)}
                style={{transform:[{scale:0.8}]}}
                onChange={(e,date)=>eventHandler({name:'dateChange',data:date?.toISOString()})}
                />
                :
                null
            }
        </View>
    )

}

const IosPicker=(props:Component<any,string>)=>{

    const [state,setState]=useState(props.nonState.initialValue?props.nonState.initialValue:new Date().toISOString());

    const eventHandler=(event:Event)=>{
        setState(event.data)
        props.nonState.eventHandler
        ?
        props.nonState.eventHandler({...event,triggerBy:{componentName:'dateinput',id:props.nonState.id}})
        :
        null
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <DateTimePicker
            maximumDate={new Date()}
            testID="dateTimePicker"
            value={new Date(state)}
            mode="date"
            is24Hour={true}
            accentColor={THEME.COLOR.SECONDARY.SUNSHINE(1)}
            style={{transform:[{scale:0.8}]}}
            onChange={(e,date)=>eventHandler({name:'dateChange',data:date?.toISOString()})}
            />
        </View>
    )

}

export default Datetime