import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native"
import WebView from "react-native-webview";
import { store } from "../../store";
import {  Request, ServerResponse } from "../../types";
import { getServerRequestURL, serverRequest } from "../../utils";
import { getBasket } from "../../constants/basket";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateOrder } from "../../store/slices/ordersSlice";

const Payment = () => {

  const paymentData=useRef(getBasket("payment_options")).current;
  const profile = useRef({ ...store.getState().personalinfo.data, ...store.getState().sharedinfo.data }).current;
  const [showRazorpayPage, setShowRazorpayPage] = useState(true);
  const dispatch=useAppDispatch()

  //console.log("payment ",paymentData)
  console.log("profile",profile);
  const paymentOptions = useRef({
    key: 'rzp_test_TldsbrWlP8NUF5',
    amount: paymentData.amount*100,
    currency: paymentData.currency,
    name: 'One Window',
    description: 'Test Transaction',
    order_id: paymentData.razorpay_order_id,
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
    console.log("razor pay response",JSON.stringify(response,null,2));
    try {
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
          dispatch()
          dispatch(updateOrder(response1.data));
      }
      } 
      else {
        console.log('Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
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
    <View style={{ flex: 1, backgroundColor: 'red' }}>
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
        <View>
          {/* You can show some status or confirmation here */}
        </View>
      )}
    </View>
  );
};

export default Payment;

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