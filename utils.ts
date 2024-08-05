import ComponentsInfo from "./components/info";
import { StackScreen } from "./types";

export const formatQueryParamsToString=(params:any)=>{
    let keys=Object.keys(params);
    let values=Object.values(params);
    return keys.reduce((acc,current,index)=>acc+(current+"="+values[index])+(index==(keys.length-1)?"":"&"),"")
}

export const formatQueryParamsToObj=(queryString:string)=>{
     if (queryString.startsWith('?')) {
        queryString = queryString.substring(1);
      }
    
      const pairs = queryString.split('&');
      const result:{ [key: string]: string|number} = {};
    
      pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        const decodedKey = decodeURIComponent(key);
        const decodedValue = decodeURIComponent(value); 
        result[decodedKey] = isNaN(Number(decodedValue)) ? decodedValue : Number(decodedValue);      });
      return result;
}

export const pathToScreens=(path:string)=>{
    let slashIndexs=getAllCharOccurences(path,"/");
    let paramIndex=path.indexOf("?")
    let screens:StackScreen[]=new Array(slashIndexs.length).fill({});
    return screens.map((screen,i)=>({
        component:ComponentsInfo[path.substring(slashIndexs[i]+1,(i==(screens.length-1))?(paramIndex==-1?path.length:paramIndex):slashIndexs[i+1])],
        props:((i==screens.length-1 && paramIndex!=-1)?formatQueryParamsToObj(path.substring(paramIndex+1,path.length)):undefined),
        animationStyle:"HorizontalSlideToLeft",
    }))
}

export const getAllCharOccurences=(str:string, char:string)=>{
    let regex = new RegExp(char, 'g');
    let indexes = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      indexes.push(match.index);
    }
    return indexes;
}

