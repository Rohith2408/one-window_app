import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native"
import WebView from "react-native-webview";
import { store } from "../../store";
import {  Order, Request, ServerResponse } from "../../types";
import { compareProducts, getServerRequestURL, serverRequest } from "../../utils";
import { getBasket } from "../../constants/basket";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateOrder } from "../../store/slices/ordersSlice";
import { setCart } from "../../store/slices/cartSlice";
import useNavigation from "../../hooks/useNavigation";
import { Fonts, Themes } from "../../constants";
import { addProduct, addProducts, replaceProducts } from "../../store/slices/productsSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import Transitionview from "../resources/Transitionview";

const Payment = (props:{paymentOrderId:string}) => {

  //const paymentData=useRef(getBasket("payment_options")).current;
  const order=useAppSelector((state)=>state.orders.data).find((item)=>item._id==props.paymentOrderId);
  const profile = useRef({ ...store.getState().personalinfo.data, ...store.getState().sharedinfo.data }).current;
  const [showRazorpayPage, setShowRazorpayPage] = useState(order?.paymentDetails.amount==0?false:true);
  const dispatch=useAppDispatch()
  const [path,navigate]=useNavigation()
  
  const paymentOptions = useRef({
    key: 'rzp_test_TldsbrWlP8NUF5',
    amount: order?.paymentDetails.amount*100,
    currency: order?.paymentDetails.currency,
    name: 'One Window',
    description: 'Test Transaction',
    order_id: order?.paymentDetails.razorpay_order_id,
    prefill: {
      name: profile.firstName + ' ' + profile.lastName,
      email: profile.email,
      contact: profile.phone?.countryCode+profile.phone?.number,
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
        navigate({type:"RemovePages",payload:[{id:"Order"},{id:"Ordersummary"},{id:"Cart"}]})
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
    <View style={{ flex: 1}}>
      {showRazorpayPage ? (
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
                      window.ReactNativeWebView.postMessage(JSON.stringify(response));
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
            const data = JSON.parse(event.nativeEvent.data);
            handlePayment(data); 
            setShowRazorpayPage(false); 
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
          }}
        />
      ) : (
        <Transitionview effect="pan" style={[{flex:1}]}>
          <View style={{flex:1,alignItems:"center",justifyContent:"center",gap:10}}>
            <Text style={[{fontSize:24,fontFamily:Fonts.NeutrifStudio.Bold,color:"green"}]}>Payment Successfull</Text>
            <Text style={[{fontSize:14,textAlign:"center",fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Order details can be viewed in My Orders section!</Text>
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