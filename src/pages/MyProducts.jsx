import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Common/Navbar'
import { useParams } from 'react-router-dom'
import AxiosInstance from '../Config/Axiosinstance'
import Card from '../Components/Card'
import { BASE_URL } from '../Constants/Constants'
import Footer from '../Components/Common/Footer'

const MyProducts = () => {
  const { id } = useParams()
  const [myProductsData, setMyProductsData]=useState([])
  
  useEffect(()=>{
   myProductData()
  },[])

  const myProductData=()=>{
    AxiosInstance.get('/vendors/myproducts', {params:{vendorId:id}}).then((response)=>{
      setMyProductsData(response.data.response)
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div>
      <Navbar />


      <section style={{ backgroundColor: '' }}>
        <div className="container py-5">
          <h3 className="mb-5">My Products</h3>
          <div className="row">
            {myProductsData.map((product) =>
              <div className="col-md-12 col-lg-3 mb-3 mb-lg-0">
                <Card id={product._id} catecory={product.catecory} productname={product.productName} price={product.rate} productimg={`${BASE_URL}/product/${product.productPic[0]}`} />
              </div>
            )}

          </div>
        </div>
      </section> 

      <Footer />

    </div>
  )
}

export default MyProducts;
