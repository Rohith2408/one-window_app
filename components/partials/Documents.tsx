import { Pressable, StyleSheet, Text, View } from "react-native"
import { Word2Sentence, formatDate, getDevice, getServerRequestURL, pickDocument, serverRequest } from "../../utils"
import { Documents as DocumentsType, Document as DocumentType, ServerResponse, Request } from "../../types"
import Tabbar from "../resources/Tabbar"
import { useRef, useState } from "react"
import Tabnavigator from "../../navigation/tabNavigator"
import Invalidpath from "./Invalidpath"
import useNavigation from "../../hooks/useNavigation"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Fonts, Themes } from "../../constants"
import upload_icon from '../../assets/images/misc/upload.png'
import delete_icon from '../../assets/images/misc/delete.png'
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setDocuments } from "../../store/slices/documentsSlice"
import Nestedview from "../resources/Nestedview"
import add_icon from '../../assets/images/misc/add.png'
import { store } from "../../store"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        paddingTop:10
    },
    document_wrapper:{
        flexDirection:'row',
        alignItems:"flex-start",
        //padding:10
    }
})

const TabStyles=StyleSheet.create({
    tabbar_wrapper:{
        height:100
    },
    document_title:{
        fontSize:14
    },
    document_info:{
        fontSize:10,
        maxWidth:"70%",
        lineHeight:18
    },
    delete:{
        width:20,
        height:20
    },
    upload:{
        width:20,
        height:20
    },
    loading:{
        width:20,
        height:20 
    },
    add:{
        width:20,
        height:20
    }
})

const MobileSStyles=StyleSheet.create({
    tabbar_wrapper:{
        height:50
    },
    document_title:{
        fontSize:14
    },
    document_info:{
        fontSize:10,
        maxWidth:"70%",
        lineHeight:18
    },
    delete:{
        width:18,
        height:18
    },
    upload:{
        width:18,
        height:18
    },
    loading:{
        width:20,
        height:20 
    },
    add:{
        width:20,
        height:20 
    }
})
const MobileMStyles=StyleSheet.create({
    tabbar_wrapper:{
        height:100
    },
    document_title:{
        fontSize:14
    },
    document_info:{
        fontSize:10,
        maxWidth:"70%",
        lineHeight:18
    },
    delete:{
        width:20,
        height:20
    },
    upload:{
        width:20,
        height:20
    },
    loading:{
        width:20,
        height:20 
    },
    add:{
        width:20,
        height:20 
    }
})
const MobileLStyles=StyleSheet.create({
    tabbar_wrapper:{
        height:100
    },
    document_title:{
        fontSize:14
    },
    document_info:{
        fontSize:10,
        maxWidth:"70%",
        lineHeight:18
    },
    delete:{
        width:20,
        height:20
    },
    upload:{
        width:20,
        height:20
    },
    loading:{
        width:20,
        height:20 
    },
    add:{
        width:20,
        height:20 
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Documents=(props:{documentstab:string})=>{

    const documents=useAppSelector(state=>state.documents)
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const categories=useRef([
        {title:"Personal"},
        {title:"Academic"},
        {title:"Test"},
        {title:"Work"}
    ]).current

    const Screens=useRef([
        {id:"Academic",component:Academic},
        {id:"Personal",component:Personal},
        {id:"Test",component:Test},
        {id:"Work",component:Work},
    ]).current

    const tabChange=(tab:string)=>{
        navigate?navigate({type:"UpdateParam",payload:{param:"documentstab",newValue:tab}}):null
    }

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={[styles[Device].tabbar_wrapper]}><Tabbar fitWidth tabChangeHandler={tabChange} tabs={categories} currentTab={props.documentstab}></Tabbar></View>
            <View style={{flex:1,padding:10}}><Tabnavigator invalidPathScreen={Invalidpath} screens={Screens} currentTab={{id:props.documentstab,props:documents}}></Tabnavigator></View>
        </View>
    )

}

const Personal=(props:Request<DocumentsType>)=>{

    let documents=props.data.personal

    return(
        <View>
            <Document title="Resume" fieldPath="personal.resume" doc={documents?.resume}></Document>
            <Document title="PassportBD" fieldPath="personal.passportBD" doc={documents?.passportBD}></Document>
            <Document title="PassportADD" fieldPath="personal.passportADD" doc={documents?.passportADD}></Document>
        </View>
    )
}

const Academic=(props:Request<DocumentsType>)=>{

    let documents=props.data.academic

    return(
        <View style={{gap:50,padding:10}}>
            <Document title="Secondary School" fieldPath="academic.secondarySchool" doc={documents?.secondarySchool}></Document>
            <Document title="Intermediate" fieldPath="academic.plus2" doc={documents?.plus2}></Document>
            <Document title="Degree" fieldPath="academic.degree" doc={documents?.degree}></Document>
            <Nestedview title="Bachelors" maxHeight={150}>
                <View style={{gap:15}}>
                    <Document title="Transcripts" fieldPath="academic.bachelors.transcripts" doc={documents?.bachelors?.transcripts}></Document>
                    <Document title="Bonafide" fieldPath="academic.bachelors.bonafide" doc={documents?.bachelors?.bonafide}></Document>
                    <Document title="CMM" fieldPath="academic.bachelors.CMM" doc={documents?.bachelors?.CMM}></Document>
                    <Document title="PCM" fieldPath="academic.bachelors.PCM" doc={documents?.bachelors?.PCM}></Document>
                    <Document title="OD" fieldPath="academic.bachelors.OD" doc={documents?.bachelors?.OD}></Document>
                </View>
            </Nestedview>
            <Nestedview title="Masters" maxHeight={150}>
                <View style={{gap:15}}>
                    <Document title="Transcripts" fieldPath="academic.masters.transcripts" doc={documents?.masters?.transcripts}></Document>
                    <Document title="Bonafide" fieldPath="academic.masters.bonafide" doc={documents?.masters?.bonafide}></Document>
                    <Document title="CMM" fieldPath="academic.masters.CMM" doc={documents?.masters?.CMM}></Document>
                    <Document title="PCM" fieldPath="academic.masters.PCM" doc={documents?.masters?.PCM}></Document>
                    <Document title="OD" fieldPath="academic.masters.OD" doc={documents?.masters?.OD}></Document>
                </View>
            </Nestedview>
        </View>
    )
}

const Work=(props:Request<DocumentsType>)=>{

    let documents=props.data.workExperiences
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const upload=async ()=>{
        setIsLoading(true);
        let res=await uploadDoc("workExperiences",updateStore);
        setIsLoading(false)
    }

    return(
        <View style={{gap:15,paddingTop:10}}>
            <Pressable onPress={()=>upload()}><Image source={isLoading?loading_gif:add_icon} style={[styles[Device].add,{alignSelf:'center'}]}></Image></Pressable> 
            <View style={{gap:15}}>
            {
                documents?.map((doc)=>
                <Document key={doc._id} title="Work Document" fieldPath="workExperiences" doc={doc}></Document>
                )
            } 
            </View>  
        </View>
    )
}

const Test=(props:Request<DocumentsType>)=>{

    let documents=props.data.test
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isLoading,setIsLoading]=useState<undefined|"language"|"general">(undefined)
    const upload=async (fieldPath:string,type:undefined|"language"|"general")=>{
        setIsLoading(type);
        let res=await uploadDoc(fieldPath,updateStore);
        setIsLoading(undefined)
    }

    return(
        <View style={{gap:30,padding:10}}>
            <Nestedview title="Language Proficiency" maxHeight={150}>
                <View style={{gap:15,paddingTop:10}}>
                    <Pressable onPress={()=>upload("test.languageProf","language")}><Image source={isLoading=="language"?loading_gif:add_icon} style={[styles[Device].add,{alignSelf:'center'}]}></Image></Pressable> 
                    <View style={{gap:15}}>
                    {
                        documents?.languageProf?.map((doc)=>
                        <Document key={doc._id} title="Test Document" fieldPath="test.languageProf" doc={doc}></Document>
                        )
                    } 
                </View>  
                </View>
            </Nestedview>
            <Nestedview title="General" maxHeight={150}>
                <View style={{gap:15,paddingTop:10}}>
                    <Pressable onPress={()=>upload("test.general","general")}><Image source={isLoading=="general"?loading_gif:add_icon} style={[styles[Device].add,{alignSelf:'center'}]}></Image></Pressable> 
                    <View style={{gap:15}}>
                    {
                        documents?.general?.map((doc)=>
                        <Document key={doc._id} title="Test Document" fieldPath="test.general" doc={doc}></Document>
                        )
                    } 
                </View>  
                </View>
            </Nestedview>
        </View>
    )
}

const Document=(props:{title:string,fieldPath:string,doc:DocumentType|undefined})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isLoading,setIsLoading]=useState(false);
    const dispatch=useAppDispatch()

    const upload=async ()=>{
        setIsLoading(true);
        let res=await uploadDoc(props.fieldPath,updateStore);
        setIsLoading(false)
    }

    const remove=async ()=>{
        if(props.doc?._id)
        {
            console.log(props.doc)
            setIsLoading(true);
            let res=await deleteDoc(props.fieldPath,props.doc?._id);
            setIsLoading(false)
            if(res.success)
            {
                dispatch(setDocuments(res.data));
            }   
        }
    }

    return(
        <View style={[GeneralStyles.document_wrapper]}>
            <View style={{display:'flex',flex:1,flexDirection:'column',gap:5}}>
                <Text style={[styles[Device].document_title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.title}</Text>
                {
                    props.doc
                    ?
                    <Text style={[styles[Device].document_info,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.doc.name,props.doc.contentType.toUpperCase(),formatDate(props.doc.createdAt)],""," | ")}</Text>
                    :
                    null
                }
            </View>
            <View>
            {
                isLoading
                ?
                <Image source={loading_gif} style={[styles[Device].loading]}></Image>
                :
                props.doc
                ?
                <Pressable onPress={remove}><Image style={[styles[Device].delete,{objectFit:"contain"}]} source={delete_icon} ></Image></Pressable>
                :
                <Pressable onPress={upload}><Image style={[styles[Device].upload,{objectFit:"contain"}]} source={upload_icon} ></Image></Pressable>
            }
            </View>
        {/* {
            props.doc
            ?
            <View>
                <Text>{props.doc.name}</Text>
            </View>
            :
            
        } */}
        </View>
    )

}

const uploadDoc=async (fieldPath:string,callback?:(res:ServerResponse)=>void)=>{
    console.log("docrs");
    let docRes=await pickDocument(40);
    console.log("docrs",docRes);
    if(docRes.success)
    {
        const data = new FormData()
        data.append('fieldPath', fieldPath)
        data.append('uploaded_file',docRes.data);
        console.log("form",data);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("upload-profile","POST"),
            reqType:"POST",
            body:data,
            preventStringify:true,
        })
        if(callback)
        {
            callback(res)
        }
        return res;   
    }
    return docRes;
}

const deleteDoc=async (fieldPath:string,documentId:string)=>{
    let res:ServerResponse=await serverRequest({
        url:getServerRequestURL("delete-uploaded-profile","POST"),
        reqType:"POST",
        body:{
            documentId:documentId,
            fieldPath:fieldPath
        }
    })
    return res; 
}

const updateStore=(res:ServerResponse)=>{
    res.success?store.dispatch(setDocuments(res.data.docs)):null
}

export default Documents