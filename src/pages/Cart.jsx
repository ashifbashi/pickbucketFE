import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Common/Navbar';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../Config/Axiosinstance';
import Card from '../Components/Card';
import { BASE_URL } from '../Constants/Constants';
import './Cart.css';
import { useSelector } from 'react-redux';
import { ModalView } from '../Components/Common/Modal';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Footer from '../Components/Common/Footer';
import { toastSuccess } from '../Constants/plugins';



const Cart = () => {
  const {c_id, id} =useParams()
  const { userDetails } = useSelector(state=>state.user)
  const [cart, setCart]=useState([])
  const [sumValue, setSumValue]=useState(0)
  const [productIds, setProductIds]=useState('')
  const [vendorIds, setVendorIds]=useState('')
  const [deliveryData, setDeliveryData] = useState({ location: '', address: '', pincode: '', number: '' })
  const [bookingModal, setBookingModal] = useState(false)
  const [deliveryInfo, setDeliveryInfo]=useState({})
  const [deliveryInfoChecking, setDeliveryInfoChecking]=useState(false)

  useEffect(()=>{
    getCartData()

  },[c_id])

  useEffect(()=>{
    sumRate()
  },[cart])

  useEffect(()=>{
    getIds()
    getVendorIds()
  },[cart])

  useEffect(()=>{
    getDeliveryInfo()
    test()
  },[])


  const handleShowSlot = () => setBookingModal(true);
  const handleCloseSlot = () => setBookingModal(false);
 

const getCartData=()=>{
  AxiosInstance.get('/users/getCartData', {params:{userId:c_id}}).then((response)=>{
    setCart(response.data)
   
  })
}

console.log(cart , "rate checkkkkk");

const cart_count= cart.length;

const sumRate = () => {
  let sum = 0;

  cart.forEach((value) => {
    // Check if value.productinfo.rate is a valid number
    if (typeof value.productinfo.rate === 'number' && !isNaN(value.productinfo.rate)) {
      sum += value.productinfo.rate;
    }
   
  });

  setSumValue(sum);
};

const getIds = ()=>{
let ids = ''; 

cart.forEach((value, index) => {
  if (index !== 0) {
    ids += ','; 
  }
  ids += value.productinfo._id;
});

setProductIds(ids)
}

const getVendorIds=()=>{

  let vendorIds = ''; 

cart.forEach((value, index) => {
  if (index !== 0) {
    vendorIds += ','; 
  }
  vendorIds += value.productinfo.vendorId;
});

setVendorIds(vendorIds)

}


console.log(vendorIds, "idssssss");





const initiateBooking =async()=>{

  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
);

if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
}

// creating a new order
const result = await AxiosInstance.post("/payment/cartOrder", {params:{productid: productIds, ammount:sumValue}});

if (!result) {
    alert("Server error. Are you online?");
    return;
}

// Getting the order details back
const { amount, id: order_id, currency } = result.data;

const options = {
    key: "rzp_test_cx9B8rETmWVZI6", // Enter the Key ID generated from the Dashboard
    amount: amount.toString(),
    currency: currency,
    name: "Pickbucket",
    description: "Test Transaction",
    order_id: order_id,
    handler: async function (response) {
        const data = {
            
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            contactInfo:deliveryData,
        };

        const result = await AxiosInstance.post("/payment/cartOrderSuccess", data, {params:{vendorId:vendorIds, userId: userDetails.userId, productId:productIds}});

        // alert(result.data.msg);
        toastSuccess(result.data.msg)
        handleCloseSlot()

    },
    prefill: {
        name: "Pickbucket",
        email: "pickbucket@gmail.com",
        contact: "9999999999",
    },
    notes: {
        address: "Soumya Dey Corporate Office",
    },
    theme: {
        color: "#61dafb",
    },
};

const paymentObject = new window.Razorpay(options);
paymentObject.open();

}

function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}


const getDeliveryInfo=()=>{
  AxiosInstance.get('/users/getDeliveryInfo', {params:{userId: userDetails.userId}} ).then((response)=>{
    setDeliveryInfo(response.data)

  })
}

const test =()=>{
  if (deliveryInfo.address, deliveryInfo.location, deliveryInfo.pincode, deliveryInfo.number) {
    setDeliveryInfoChecking(true)
  } else {
    setDeliveryInfoChecking(false)
  }
}

const orderData = (e) => {
  setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value })
}



  return (
    <div>
      <Navbar  />
      
      <section style={{ backgroundColor: '' }}>
        <div className="container py-5">
         <div className='row'>
          <div className='col-md-9'>

          <h3 className="mb-5">My Cart</h3>
          <div className="row">
            {cart.map((product) =>
              <div className="col-md-12 col-lg-4 mb-3 mb-lg-0">
                <Card id={product.productinfo._id} catecory={product.productinfo.catecory} productname={product.productinfo.productName} price={product.productinfo.rate} 
                 productimg={
                  Array.isArray(product.productinfo.productPic)
                    ? `${BASE_URL}/product/${product.productinfo.productPic[0]}` // If productPic is an array, take the first image
                    : `${BASE_URL}/product/${product.productinfo.productPic}` // If productPic is a string, use it directly
                }
                />
              </div>
            )}

          </div>

          </div>
          <div className='col-md-3'>
          
          <div className='summery-m'>
            <h5>Order summery</h5>
               <div className='summery-item'><p>Amount:</p> <p>₹{sumValue}</p></div>
               <div className='summery-item'><p>Delivery charge:</p> <p>₹ 0</p></div>
               <div className='summery-item'><p>Tottal Amount:</p> <p>₹{sumValue}</p></div>
             <div className='cart-btn'>
             <Button style={{ backgroundColor: "#29c911", border: "#29c911", width: "150px" }} variant="primary"
               onClick={()=>setBookingModal(true)}>
                {" "}Order now{" "}
            </Button>
             </div>
               
    
          </div>

          </div>
         </div>
         
          </div>
      </section> 



         {/* slot booking modal start */}

         <ModalView setShow={setBookingModal} show={bookingModal}>

<Modal.Header closeButton>
  {/* <Modal.Title>{selectedSlot?.court.courtName}</Modal.Title> */}
</Modal.Header>
<Modal.Body>


    {/* <div>
        <h2 className='p-name'>{singleProductData.productName}</h2>
        <p className='p-brand'>{singleProductData.brand}</p>
        <h4 className='p-rate'>₹ {singleProductData.rate}</h4>
        <span className='tax-txt'>Inclusive of all taxes</span>
        </div> */}

       {/* <div>
          <p><b>Delivery info</b></p>
        <p className='text-muted mb-0'>Location: {deliveryInfo?.location}</p>
        <p className='text-muted mb-0'>Address: {deliveryInfo?.address}</p>
        <p className='text-muted mb-0'>pincode: {deliveryInfo?.pincode}</p>
        <p className='text-muted mb-0'>Phone number: {deliveryInfo?.number}</p>
        </div> */}
        <div className='summery-item'><p>Tottal Amount:</p> <p>₹{sumValue}</p></div>

  <div><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Location</Form.Label>
    <Form.Control
      type="text"
      onChange={orderData}
      name="location"
      value={deliveryData.location}
      placeholder="Location"
      autoFocus
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Address</Form.Label>
    <Form.Control
      type="text"
      onChange={orderData}
      name="address"
      value={deliveryData.address}
      placeholder="Address"
      autoFocus
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Pincode</Form.Label>
    <Form.Control
      type="number"
      onChange={orderData}
      name="pincode"
      value={deliveryData.pincode}
      placeholder="Pincode"
      autoFocus
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Phone number</Form.Label>
    <Form.Control

      type="number"
      onChange={orderData}
      name="number"
      value={deliveryData.number}
      placeholder="Phone number"
      autoFocus
    />
  </Form.Group> </div> 

  {/* {!deliveryInfoChecking && <Button onClick={()=>setDeliveryInfoChecking(true)} >Change delivery info</Button> } */}

</Modal.Body>

<Modal.Footer>
  <Button variant="secondary" onClick={handleCloseSlot}>
    Close
</Button>

{(() => {
if(deliveryData.number){
   return <Button style={{ backgroundColor: "#29c911", border: "#29c911", width: "150px" }} variant="primary"
   onClick={initiateBooking} >
    {" "}Order now{" "}
  </Button>
} else {
  return <p>fill all field</p>;
}
})()}  
</Modal.Footer>

</ModalView>

{/* slot booking modal end */}

<Footer />

    </div>
  )
}

export default Cart
