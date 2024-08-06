import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

const Gradienttext=(props:{text:string,gradient:string[],fontSize:number})=>{
    
    return(
        <MaskedView
            style={styles.maskedView}
            maskElement={
                <View style={styles.maskedElement}>
                <Text style={[styles.text,{fontSize:props.fontSize}]}>{props.text}</Text>
                </View>
            }
            >
            <LinearGradient
                colors={props.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            />
        </MaskedView>
    )

}

const styles = StyleSheet.create({
    maskedView: {
      width:"100%",
      height:"100%"
    },
    maskedElement: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontWeight: 'bold',
    },
    gradient: {
      flex: 1,
    },
});

export default Gradienttext