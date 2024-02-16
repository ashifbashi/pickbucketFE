import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Common/Navbar';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../Config/Axiosinstance';
import Card from '../Components/Card';
import { BASE_URL } from '../Constants/Constants';
import Footer from '../Components/Common/Footer';


const WishList = () => {
  const {w_id, id} =useParams()

  const [whishlist, setWishlist]=useState([])

  useEffect(()=>{
    getWishlistData()
  },[])

const getWishlistData=()=>{
  AxiosInstance.get('/users/getWishlistData', {params:{userId:w_id}}).then((response)=>{
    setWishlist(response.data)
   console.log(response.data, "jajajajajaj");
  })
}

const Wishlistlength= whishlist.length;


  return (
    <div>
      <Navbar w_count={Wishlistlength} />
      
      <section style={{ backgroundColor: '' }}>
        <div className="container py-5">
          <h3 className="mb-5">My Wishlist</h3>
          <div className="row">
            {whishlist.map((product) =>
              <div className="col-md-12 col-lg-3 mb-3 mb-lg-0">
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
      </section> 
      <Footer />

    </div>
  )
}

export default WishList
