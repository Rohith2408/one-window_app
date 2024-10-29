import React from "react"
import Home from "../components/screens/Home"
import Profile from "../components/screens/Profile"
import Student from "../components/layouts/Student"
import Login from "../components/layouts/Login"
import Base from "../components/partials/Base"
import Popup from "../components/partials/Popup"
import Loginbase from "../components/partials/Loginbase"
import Workexperience from "../components/partials/Workexperience"
import Form from "../components/resources/Form"
import { ScreenInfo } from "../types"
import Flyer from "../components/partials/Flyer"
import Filters from "../components/partials/Filters"
import Explore from "../components/partials/Explore"
import Dropdownoptions from "../components/flyers/Dropdownoptions"
import Personalinfo from "../components/partials/Personalinfo"
import DPoptions from "../components/flyers/DPoptions"
import Dp from "../components/partials/Dp"
import Documents from "../components/partials/Documents"
import Educationhistory from "../components/partials/Educationhistory"
import Testscores from "../components/partials/Testscores"
import Testoptions from "../components/flyers/Testoptions"
import Dropdownoptionsasync from "../components/flyers/Dropdownoptionsasync"
import Mydetails from "../components/partials/Mydetails"
import Emailverification from "../components/flyers/Emailverification"
import Phoneverification from "../components/flyers/Phoneverification"
import Experts from "../components/partials/Experts"
import Expert from "../components/partials/Expert"
import Datetimeproselector from "../components/flyers/Datetimeproselector"
import Search from "../components/partials/Search"
import Register from "../components/layouts/Register"
import Registerbase from "../components/partials/Registerbase"
import Forgotpassword from "../components/flyers/Forgotpassword"
import Program from "../components/partials/Program"
import Intake from "../components/flyers/Intake"
import Cart from "../components/partials/Cart"
import Order from "../components/partials/Order"
import Ordersummary from "../components/partials/Ordersummary"
import Preferences from "../components/partials/Preferences"
import Preference from "../components/partials/Preference"
import University from "../components/partials/University"
import Community from "../components/screens/Community"
import Docview from "../components/flyers/Docview"
import Myorders from "../components/partials/Myorders"
import Payment from "../components/partials/Payment"
import Recommendations from "../components/partials/Recommendations"
import Successfull from "../components/flyers/Successfull"
import Error from "../components/flyers/Error"
import Nointernet from "../components/flyers/Nointernet"
import Coursepreference from "../components/partials/Coursepreference"
import Countrypreference from "../components/partials/Countrypreference"
import Degreepreference from "../components/partials/Degreepreference"
import Currentlyworking from "../components/flyers/Currentlyworking"
import Existingorders from "../components/flyers/Existingorders"
import Addtoorder from "../components/partials/Addtoorder"
import Institutes from "../components/flyers/Institutes"
import Verifyuser from "../components/flyers/Verifyuser"
import Familydetails from "../components/partials/Familydetails"
import Intermediatecompleted from "../components/flyers/Intermediatecompleted"
import Myproducts from "../components/partials/Myproducts"
import Product from "../components/partials/Product"
import Orderdetails from "../components/partials/Orderdetails"
import Message from "../components/partials/Message"
import Address from "../components/partials/Address"
import Chatsearch from "../components/partials/Chatsearch"
import Basicinfo from "../components/flyers/Basicinfo"
import Guest from "../components/layouts/Guest"
import Guestbase from "../components/partials/Guestbase"
import Gettoken from "../components/flyers/Gettoken"
import Warning from "../components/flyers/Warning"
import Userdoesntexist from "../components/cards/Userdoesntexistcard"
import Wishlist from "../components/partials/Wishlist"
import Expertsintro from "../components/partials/Expertsintro"
import Emaillogin from "../components/flyers/Emailogin"
import Phonelogin from "../components/flyers/Phonelogin"

const components:ScreenInfo[]=[
    {id:"Base",component:Base,props:["tab"],type:"Screen",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Home",component:Home,type:"Screen",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Profile",component:Profile,type:"Screen",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Student",component:Student,type:"Layout"},
    {id:"Guest",component:Guest,type:"Layout"},
    {id:"Login",component:Login,type:"Layout"},
    {id:"Register",component:Register,type:"Layout"},
    {id:"Verifyuser",component:Verifyuser,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Popup",component:Popup,props:["popupid","popupdata"],swipeDirection:"XY",type:"Screen",animationStyle:"Custom",customPlacement:{initial:{x:0,y:0,scale:0,opacity:1,height:0,width:0},final:{x:0.25,y:0.25,scale:1,opacity:1,height:0.5,width:0.5}}},
    {id:"Error",component:Error,props:["message"],type:"Popup"},
    {id:"Warning",component:Warning,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Loginbase",component:Loginbase,occupyFullScreen:true,swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",props:["auth"],type:"Partial"},
    {id:"Registerbase",component:Registerbase,occupyFullScreen:true,swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",props:["auth"],type:"Partial"},
    {id:"Userdoesntexist",component:Userdoesntexist,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Guestbase",component:Guestbase,occupyFullScreen:true,swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",props:["auth"],type:"Partial"},
    {id:"Gettoken",component:Gettoken,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Forgotpassword",component:Forgotpassword,title:"Forgot Password",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",type:"Partial"},
    {id:"Form",component:Form,type:"Partial",title:"Form",props:["formid","forminitialdataid","formupdate","formerrors","formbasket"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Flyer",component:Flyer,type:"Flyer",props:["flyerid","flyerdata"],showTouchCaptureScreen:true,swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Filters",component:Filters,type:"Partial",props:["filtersbasketid","filterslistid"],title:"Filters",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3,swipeDirection:"X"},
    {id:"Explore",component:Explore,type:"Partial",title:"Explore",props:["initialexploretab","programslistquery","universitieslistquery"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},//,"Programslistquery","Universitieslistquery"  //["initialexploretab","programsadditionalfilters","programsquickfilters","universitiesadditionalfilters","universitiesquickfilters","search","universitiespage","programspage"]  //"courselistid","courseadditionalFilters","coursequickFilters","coursesearch","coursepage"
    {id:"Dropdownoptions",component:Dropdownoptions,type:"Flyer",props:["basketid"],swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Dropdownoptionsasync",component:Dropdownoptionsasync,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Emailverification",component:Emailverification,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Phoneverification",component:Phoneverification,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Institutes",component:Institutes,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Personalinfo",component:Personalinfo,type:"Partial",title:"Personal Info",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3,swipeDirection:"X"},
    {id:"DPoptions",component:DPoptions,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Dp",component:Dp,type:"Popup",props:["image"],swipeDirection:"XY",isTransparent:true,occupyFullScreen:true,animationStyle:"FadeIn",removalThreshold:0.5},
    {id:"Wishlist",component:Wishlist,type:"Partial",title:"Wishlist",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Documents",component:Documents,type:"Partial",title:"Documents",props:["documentstab"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Workexperience",component:Workexperience,type:"Partial",title:"Work Experience",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Educationhistory",component:Educationhistory,type:"Partial",title:"Education History",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Testscores",component:Testscores,type:"Partial",title:"Test Scores",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Experts",component:Experts,type:"Partial",title:"Experts",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Expert",props:["expertid"],component:Expert,type:"Partial",occupyFullScreen:true,swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Expertintro",component:Expertsintro,title:"Experts",type:"Partial",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Testoptions",component:Testoptions,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Mydetails",component:Mydetails,type:"Partial",title:"My Details",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Address",component:Address,type:"Partial",title:"Address",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Datetimeproselector",component:Datetimeproselector,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Successfull",component:Successfull,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Emaillogin",component:Emaillogin,type:"Flyer",swipeDirection:"Y",animationStyle:"Custom",removalThreshold:5/6,customPlacement:{initial:{x:0,y:1,scale:1,height:0.35,width:1,opacity:1},final:{x:0,y:0.65,scale:1,opacity:1,height:0.35,width:1}}},
    {id:"Phonelogin",component:Phonelogin,type:"Flyer",swipeDirection:"Y",animationStyle:"Custom",removalThreshold:5/6,customPlacement:{initial:{x:0,y:1,scale:1,height:0.35,width:1,opacity:1},final:{x:0,y:0.65,scale:1,opacity:1,height:0.35,width:1}}},
    {id:"Nointernet",component:Nointernet,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Error",component:Error,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Search",component:Search,props:["initialSearch"],type:"Partial",title:"Search",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Program",component:Program,title:"Program",props:["programid"],type:"Partial",occupyFullScreen:true,swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"University",component:University,title:"University",props:["universityid"],type:"Partial",occupyFullScreen:true,swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Intake",component:Intake,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Docview",component:Docview,props:["docpreviewurl"],type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Cart",component:Cart,type:"Partial",title:"Cart",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Order",component:Order,type:"Partial",title:"Checkout",props:["orderinfoid"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Ordersummary",component:Ordersummary,type:"Partial",title:"Order Summary",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Addtoorder",component:Addtoorder,type:"Partial",title:"Add To Order",props:["orderinfoid"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Preferences",component:Preferences,type:"Partial",title:"Preferences",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Preference",component:Preference,props:["preferenceid"],type:"Partial",title:"Preferences",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Community",component:Community,type:"Partial",title:"Community",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Myorders",component:Myorders,type:"Partial",title:"My Orders",props:["ordersummaryid"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Orderdetails",component:Orderdetails,type:"Partial",title:"Order Details",props:["orderdetailsid"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Myproducts",component:Myproducts,type:"Partial",title:"My Products",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Product",component:Product,type:"Partial",title:"Product",props:["productId"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Payment",component:Payment,type:"Partial",title:"Payment",props:["paymentOrderId"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Recommendations",component:Recommendations,type:"Partial",title:"Recommendations",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Coursepreference",component:Coursepreference,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Countrypreference",component:Countrypreference,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Degreepreference",component:Degreepreference,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Currentlyworking",component:Currentlyworking,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Existingorders",component:Existingorders,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Basicinfo",component:Basicinfo,type:"Flyer",nonClosable:true,swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Familydetails",component:Familydetails,type:"Partial",title:"Family Details",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Intermediatecompleted",component:Intermediatecompleted,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Message",component:Message,type:"Partial",occupyFullScreen:true,props:["chatId"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Chatsearch",component:Chatsearch,type:"Partial",title:"Search",props:["initialChatSearch"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
]

const setComponentInfo=(id:string,key:keyof ScreenInfo,value:any)=>{
    let component=components.find((item)=>item.id==id)
    if(component)
    {
        component[key]=value
    }
}

export {components,setComponentInfo}