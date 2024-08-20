export type ListActions={
    type:"Set",
    payload:any
}|{
    type:"Add",
    payload:any
}|{
    type:"Delete",
    payload:string
}|{
    type:"Update",
    payload:{
        id:string,
        newData:any
    }
}

export const ListReducer=(action:ListActions,state:any)=>{
    switch(action.type){
        case "Add":
            return [...state,action.payload]
            break;

        case "Update":
            return state.map((item)=>item.id==action.payload.id?action.payload.newData:item)
            break;

        case "Delete":
            return state.filter((item)=>item.id!=action.payload)
            break;
    }
}

