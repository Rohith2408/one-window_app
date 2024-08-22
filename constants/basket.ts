let basket:{id:string,data:any}[]=[

]

const getBasket=(id:string)=>{
    return basket.find((item)=>item.id==id)?.data
}

const setBasket=(id:string,data:any)=>{
    basket=basket.map((item)=>item.id==id?{id:id,data:data}:item)
    console.log("settttr",basket)
}

const addToBasket=(id:string,data:any)=>{
    let res=getBasket(id)
    console.log("add2",id,data,res)
    if(res)
    {
        setBasket(id,data)
    }
    else
    {
        basket=[...basket,{id:id,data:data}]
    }
    console.log("add3",basket)
}

const removeFromBasket=(id:string)=>{
    basket=basket.filter((item)=>item.id!=id)
}

const getFullBasket=()=>{
    return basket
}

const clearBasket=()=>{
    basket=[];
}

export {getBasket,addToBasket,removeFromBasket,getFullBasket,clearBasket}