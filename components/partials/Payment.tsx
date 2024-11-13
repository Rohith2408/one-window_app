import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"
import WebView from "react-native-webview";
import { store } from "../../store";
import {  Order, Request, ServerResponse } from "../../types";
import { compareProducts, getDevice, getServerRequestURL, serverRequest } from "../../utils";
import { getBasket } from "../../constants/basket";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateOrder } from "../../store/slices/ordersSlice";
import { setCart } from "../../store/slices/cartSlice";
import useNavigation from "../../hooks/useNavigation";
import { Fonts, Themes, appStandardStyles } from "../../constants";
import { addProduct, addProducts, replaceProducts } from "../../store/slices/productsSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import Transitionview from "../resources/Transitionview";
import Styledtext from "../resources/Styledtext";

const GeneralStyles=StyleSheet.create({
 
})

const TabStyles=StyleSheet.create({
  note:{
    fontSize:18
  }
})

const MobileSStyles=StyleSheet.create({
  note:{
    fontSize:14
  }
})

const MobileMStyles=StyleSheet.create({
  note:{
    fontSize:16
  }
})

const MobileLStyles=StyleSheet.create({
  note:{
    fontSize:16
  }
})

const styles={
  Tab:TabStyles,
  MobileS:MobileSStyles,
  MobileM:MobileMStyles,
  MobileL:MobileLStyles
}

const Payment = (props:{paymentOrderId:string}) => {

  //const paymentData=useRef(getBasket("payment_options")).current;
  const order=useAppSelector((state)=>state.orders.data).find((item)=>item._id==props.paymentOrderId);
  const sharedInfo=useAppSelector((state)=>state.sharedinfo).data;
  const personalInfo=useAppSelector((state)=>state.personalinfo).data;
  const profile = useRef({ ...store.getState().personalinfo.data, ...store.getState().sharedinfo.data }).current;
  const [showRazorpayPage, setShowRazorpayPage] = useState(order?.paymentDetails.amount==0?false:true);
  const [error,setError]=useState<undefined|string>(undefined)
  const dispatch=useAppDispatch()
  const [path,navigate]=useNavigation()
  const Device=useRef<keyof typeof styles>(getDevice()).current
  
  const paymentOptions = useRef({
    key: 'rzp_test_TldsbrWlP8NUF5',
    amount: order?.paymentDetails.amount*100,
    currency: order?.paymentDetails.currency,
    name: 'One Window',
    description: 'Test Transaction',
    order_id: order?.paymentDetails.razorpay_order_id,
    prefill: {
      name: sharedInfo?.firstName + ' ' + sharedInfo?.lastName,
      email: sharedInfo?.email,
      contact: sharedInfo?.phone?.countryCode+sharedInfo?.phone?.number,
    },
    theme: {
      color: '#3399cc',
    },
  }).current;

  const handlePayment = async (response: any) => {
    console.log("razor pay response",response,getServerRequestURL("payment-verification","POST"));
    let res:ServerResponse=await serverRequest({
      reqType:"POST",
      url:getServerRequestURL("payment-verification","POST"),
      body:response
    })
    console.log("payment verification response",JSON.stringify(res,null,2));
    if (res.success) {
      const response1 = await serverRequest({
        url:getServerRequestURL("order-info","GET",{orderId:res.data.reference}),
        reqType:"GET"
      })
      console.log("order response",JSON.stringify(response1,null,2));
      if (response1) {
        //dispatch()
        let order:Order=response1.data
        console.log("after payment",JSON.stringify(response1.data.products[0].advisors,null,2));
        dispatch(updateOrder(response1.data));
        dispatch(replaceProducts(response1.data.products));
        navigate({type:"RemovePages",payload:[{id:"Order"},{id:"Payment"},{id:"Ordersummary"},{id:"Cart"}]})
      }
    } 
    else {
      console.log('Payment verification failed');
    }
  };

  const verifyPayment = async (data: any) => {
    let res = await serverRequest({
      url: getServerRequestURL('verify-razorpay-payment', 'POST'),
      reqType: 'POST',
      body: data,
    });
    // Handle the verification response
  };

  return (
    <View style={[{ flex: 1},appStandardStyles.screenMarginSmall]}>
      {showRazorpayPage ? (
        <View style={{flex:1,gap:15}}>
          <Styledtext styles={[styles[Device].note,{textAlign:'center',lineHeight:24,fontFamily:Fonts.NeutrifStudio.Regular}]} text="Please do not close the screen or exit the app during or after the payment, you will be automatically redirected after successfull payment!" focusWord="do not close the screen or exit the app"/>
          <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          source={{
            html: `
              <html>
                <body>
                  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                  <script>
                    var options = ${JSON.stringify(paymentOptions)};
                    options.handler = function (response) {
                      window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'success', data: response }));
                    };
                    options.modal = {
                      escape: false,
                      ondismiss: function() {
                        window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'cancelled' }));
                      }
                    };
                    var rzp1 = new Razorpay(options);
                    rzp1.open();
                  </script>
                </body>
              </html>
            `,
          }}
          onMessage={(event) => {
            console.log("Response from razzzz",event)
            try {
              const data = JSON.parse(event.nativeEvent.data);
              if (data.status === 'success') {
                handlePayment(data.data); 
                setError(undefined);
              } 
              else if (data.status === 'cancelled') {
                navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Payment"}}):null
              } 
              else if (data.status === 'error') {
                setError(data.message);
              }
            } catch (error) {
              console.error("Failed to parse message data:", error);
            } finally {
              setShowRazorpayPage(false); 
            }
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
          }}
        />
        </View>
        
      ) : (
        <Transitionview effect="pan" style={[{flex:1}]}>
          <View style={{flex:1,alignItems:"center",justifyContent:"center",gap:10}}>
            <Text style={[{fontSize:24,fontFamily:Fonts.NeutrifStudio.Bold,color:error?"red":"green"}]}>{error?"Payment Failed":"Payment Successfull"}</Text>
            <Text style={[{fontSize:14,textAlign:"center",fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{error?error:"Order details can be viewed in My Orders section!"}</Text>
          </View>
        </Transitionview>
        
      )}
    </View>
  );
};

export default Payment;

//onewindow://Student/Base/Myorders/Orderdetails?tab=profile


// const Payment = (props:{orderId:string}) => {

//   console.log("order id ",props.orderId);
//   const [paymentUrl, setPaymentUrl] = useState(null);
//   const orderInfo=useRef(store.getState().orders.data.find((order)=>order._id==props.orderId)).current

//   const handleNavigationStateChange = (navState) => {
//     console.log("res",navState);
//     const { url } = navState;
//     if (url.includes('payment/success')) {

//     } else if (url.includes('payment/failure')) {
//       //onPaymentError();
//     }
//   };

//   // console.log("prdersss",props.orderinfoid)

//   return (
//     <WebView
//       style={{flex:1}}
//       source={{ uri:`https://api.razorpay.com/v1/checkout/embedded?order_id=${props.orderId}&key_id=rzp_test_TldsbrWlP8NUF5` }}
//       onNavigationStateChange={handleNavigationStateChange}
//     />
//   );
// };

// export default Payment