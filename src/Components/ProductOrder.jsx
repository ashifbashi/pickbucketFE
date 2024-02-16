import React, { useEffect, useState } from 'react';
import AxiosInstance from '../Config/Axiosinstance';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../Constants/Constants';
import './ProductOrder.css';
import { useSelector } from 'react-redux';
import { toastSuccess } from '../Constants/plugins';
import { ModalView } from './Common/Modal';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
// import "~react-image-gallery/styles/css/image-gallery.css";


const ProductOrder = () => {

  const { userDetails } = useSelector(state => state.user)
  const [singleProductData, setSingleProductData] = useState({})
  const [wishlistData, setWishlistData] = useState(false)
  const [bookingModal, setBookingModal] = useState(false)
  const [cartData, setCartData] = useState(false)
  const [deliveryData, setDeliveryData] = useState({ location: '', address: '', pincode: '', number: '', quantity: '' })
  const [deliveryInfo, setDeliveryInfo] = useState({})
  const [deliveryInfoChecking, setDeliveryInfoChecking] = useState(false)

  const { p_id } = useParams()
  const [currentPId, setCurrentPId] = useState(p_id);

  useEffect(() => {
    // This effect runs when p_id changes
    setCurrentPId(p_id);
    getSingleProductData()
  }, [p_id]);

  const navigate = useNavigate()

  const handleShowSlot = () => setBookingModal(true);
  const handleCloseSlot = () => setBookingModal(false);

  useEffect(() => {
    getSingleProductData()
    getToWishlist()
    getToCart()
    getDeliveryInfo()
    test()
  }, [])

console.log(deliveryData, 'dattaaaaaaa');

  const getSingleProductData = () => {
    AxiosInstance.get('/users/getSingleProductData', { params: { productid: p_id } }).then((response) => {
      setSingleProductData(response.data.response)
    })
  }

  const addToWishlist = () => {
    AxiosInstance.post('/users/addToWishlist', { params: { productId: p_id, userId: userDetails.userId } }).then((response) => {
      toastSuccess(response.data.message)
      getToWishlist()
    })
  }

  const getToWishlist = () => {
    AxiosInstance.get('/users/getToWishlist', { params: { productId: p_id, userId: userDetails.userId } }).then((response) => {

      console.log(response.data.message);
      if (response.data.message === "yes wishlist") {
        setWishlistData(true)
      } else {
        setWishlistData(false)
      }
    })
  }

  const addToCart = () => {
    AxiosInstance.post('/users/addToCart', { params: { productId: p_id, userId: userDetails.userId } }).then((response) => {
      toastSuccess(response.data.message)
      getToCart()
    })
  }


  const deleteProduct = () => {
    AxiosInstance.delete('/vendors/deleteProduct', { params: { productId: p_id, vendorId: userDetails.userId } }).then((response) => {
      removeWishlist()
      removeCart()
      navigate('/home')
    })
  }

  const removeWishlist = () => {
    AxiosInstance.put('/users/removeWishlist', { params: { productId: p_id, userId: userDetails.userId } }).then((response) => {
      toastSuccess(response.data.message)
      getToWishlist()
    })
  }

  const getToCart = () => {
    AxiosInstance.get('/users/getToCart', { params: { productId: p_id, userId: userDetails.userId } }).then((response) => {

      console.log(response.data.message);
      if (response.data.message === "yes cart") {
        setCartData(true)
      } else {
        setCartData(false)
      }
    })
  }

  const removeCart = () => {
    AxiosInstance.put('/users/removeCart', { params: { productId: p_id, userId: userDetails.userId } }).then((response) => {
      toastSuccess(response.data.message) 
      getToCart()
    })
  }


  const initiateBooking = async () => {

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await AxiosInstance.post("/payment/orders", { params: { productid: singleProductData._id } });

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
          contactInfo: deliveryData,
        };

        const result = await AxiosInstance.post("/payment/success", data, { params: { userId: userDetails.userId, productId: singleProductData._id, vendorId: singleProductData.vendorId } });

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

  const orderData = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value })
  }

  const getDeliveryInfo = () => {
    AxiosInstance.get('/users/getDeliveryInfo', { params: { userId: userDetails.userId } }).then((response) => {
      setDeliveryInfo(response.data)


    })
  }

  const test = () => {
    if (deliveryInfo.address, deliveryInfo.location, deliveryInfo.pincode, deliveryInfo.number) {
      setDeliveryInfoChecking(true)
    } else {
      setDeliveryInfoChecking(false)
    }
  }
  // setDeliveryInfoChecking





const mapProductPics = () => {
  if (singleProductData && singleProductData.productPic && Array.isArray(singleProductData.productPic)) {
    return singleProductData.productPic.map((pic, index) => ({
      original: `${BASE_URL}/product/${pic}`,
      thumbnail: `${BASE_URL}/product/${pic}`, // You can modify this if you have specific thumbnails
      // description: `Image ${index + 1}`,
    }));
  }
  return [];
};

const images = mapProductPics();

  return (
    <div>

      <div className='container'>
        <div className='row mt-3'>
          <div className='col-md-6'>
            <div className='mt-5'> 

              {/* <img className='p-img' src={`${BASE_URL}/product/${singleProductData.productPic}`} /> */}
              
              <ImageGallery
                items={images}
                // thumbnailPosition='left'
                showNav={false}
                showPlayButton={false}
                autoPlay={false}
                // disableThumbnailScroll={true}
                // useBrowserFullscreen={true}
                // disableKeyDown={false}
              />

            </div>
          </div>
          <div className='col-md-6'>
            <div>
              <div className='wish-btn-div'> <button className="btn wishlist-btn rounded-circle" onClick={() => { wishlistData ? removeWishlist() : addToWishlist() }}><i className={`${wishlistData ? 'fa fa-heart w-icon' : 'fa fa-heart n-icon'}`}></i> {wishlistData ? "" : ""}</button>
              </div>
              <h2 className='p-name'>{singleProductData.productName}</h2>
              <p className='p-brand'>{singleProductData.brand}</p>
              <h4 className='p-rate'>₹ {singleProductData.rate}</h4>
              <span className='tax-txt'>Inclusive of all taxes</span>
              <h5 className="dsc-hed">Details</h5>
              <p>{singleProductData.details}</p>
              <div className='waranty-se'>
                <div className='w-itm'><img src='/icon/w.png' /> <p>Warranty Policy</p></div>
                <div className='w-itm'><img src='/icon/t.png' /><p>Top Brand</p></div>
              </div>
              <h5 className="dsc-hed">Discription</h5>
              <h6 className='p-disc'>{singleProductData.discription}</h6>

              <div className='d-flex mt-5'>
                {/* <button className="btn wishlist-btn" onClick={()=> {wishlistData ? removeWishlist() : addToWishlist()  }}><i className={`${wishlistData ? 'fa fa-heart w-icon' : 'fa fa-heart n-icon'}`}></i> {wishlistData ? "" : ""}</button> */}
                <button className="btn add-to-cart-btn" onClick={() => { cartData ? removeCart() : addToCart() }} ><i className='fa fa-shopping-cart'></i>{cartData ? ' Remove To Cart' : ' Add to Cart'}</button>
                <button className="btn pay-now-btn" onClick={() => setBookingModal(true)}><i className='fa fa-shopping-cart' ></i> Pay now</button>
              </div>
            </div>

            {userDetails.role === 2 && userDetails.userId === singleProductData.vendorId &&  <div className='mt-5 p-4 mb-3' style={{ backgroundColor: "#e1e1e1", borderRadius: '10px' }}>
              <h3>Vendor Section</h3>
              <button type='btn' className='btn btn-danger' onClick={deleteProduct}>Delete this product</button>
            </div>}
          </div>
        </div>
      </div>

      {/* slot booking modal start */}

      <ModalView setShow={setBookingModal} show={bookingModal}>

        <Modal.Header closeButton>
          {/* <Modal.Title>{selectedSlot?.court.courtName}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>


          <div>
            <h2 className='p-name'>{singleProductData.productName}</h2>
            <p className='p-brand'>{singleProductData.brand}</p>
            <h4 className='p-rate'>₹ {singleProductData.rate}</h4>
            <span className='tax-txt'>Inclusive of all taxes</span>
          </div>

          {/* <div>
            <p><b>Delivery info</b></p>
            <p className='text-muted mb-0'>Location: {deliveryInfo?.location}</p>
            <p className='text-muted mb-0'>Address: {deliveryInfo?.address}</p>
            <p className='text-muted mb-0'>pincode: {deliveryInfo?.pincode}</p>
            <p className='text-muted mb-0'>Phone number: {deliveryInfo?.number}</p>
          </div> */}
           <Form.Label>Quantity</Form.Label>
            <select style={{maxWidth:'100px'}}  name='quantity' className="browser-default custom-select form-select mb-2"
              value={deliveryData.quantity} 
              onChange={orderData}
           >
        <option selected >qty</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

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

          {/* {!deliveryInfoChecking && <Button onClick={() => setDeliveryInfoChecking(true)} >Change delivery info</Button>} */}

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSlot}>
            Close
          </Button>

          {(() => {
            // if (deliveryInfo) {
            //   return <Button style={{ backgroundColor: "#29c911", border: "#29c911", width: "150px" }} variant="primary"
            //     onClick={initiateBooking} >
            //     {" "}Book now{" "}
            //   </Button>
            //     //  setDeliveryInfoChecking(true)
            //     ;
            // } else
             if (deliveryData.number) {
              return <Button style={{ backgroundColor: "#29c911", border: "#29c911", width: "150px" }} variant="primary"
                onClick={initiateBooking} >
                {" "}Book now{" "}
              </Button>
            } else {
              return <p>fill all field</p>;
            }
          })()}
        </Modal.Footer>

      </ModalView>

      {/* slot booking modal end */}



    </div>
  )
}

export default ProductOrder;
