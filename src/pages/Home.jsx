import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Common/Navbar';
import Card from '../Components/Card';
import AxiosInstance from '../Config/Axiosinstance';
import { BASE_URL } from '../Constants/Constants';
import { useSelector } from 'react-redux';                              
import Carousel from '../Components/Carousel';
import './Home.css';
import Footer from '../Components/Common/Footer';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {

  const [productData, setProductData]=useState([])
  const [productDataLaptop, setProductDataLaptop]=useState([])
  const [productDataTv, setProductDataTv]=useState([])
  const [productDataHeadpone, setProductDataHeadpone]=useState([])
  const { userDetails } = useSelector(state=>state.user)
  const navigate = useNavigate()

  useEffect(()=>{
    getAllProductData()
    getLaptopProductData()
    getTvProductData()
    getHeadphoneProductData()
  },[])

    const getAllProductData=()=>{         
     
      AxiosInstance.get('users/getAllProductData').then((response)=>{
        setProductData(response.data.response)
      })

    }

    const getLaptopProductData=()=>{         
     
      AxiosInstance.get('users/getLaptopProductData').then((response)=>{
        setProductDataLaptop(response.data.response)
      })

    }

    const getTvProductData=()=>{         
     
      AxiosInstance.get('users/getTvProductData').then((response)=>{
        setProductDataTv(response.data.response)
      })

    }

    const getHeadphoneProductData=()=>{         
     
      AxiosInstance.get('users/getHeadphoneProductData').then((response)=>{
        setProductDataHeadpone(response.data.response)
      })

    }
    
    console.log(productData);

  return (
    <div>
      <Navbar />
      <Carousel />

      <section style={{ backgroundColor: '' }}>
        <div className="container py-5">
          <h3 className="mb-4 mn-head">Phone</h3>
          <div className="row">
          { productData.map((product)=>
          <div className="col-md-6 col-sm-6 col-lg-3 mb-3 mb-lg-0">
          <Card id={product._id} catecory={product.catecory} productname={product.productName} price={product.rate} productimg={`${BASE_URL}/product/${product.productPic[0]}`} />
        </div>
          )}

          </div>
          <div className='show-all-btn-div'><a type='btn' onClick={() => navigate("/phone")} className='btn'>Show all</a></div>
        </div>
      </section>5

      <section>
        <div className='container'>
          <div className='row'>
             <div className='col-md-6 mb-2'><img width="100%" src='/ad/add1.png' style={{borderRadius:'15px'}} /></div>
             <div className='col-md-6 mb-2'><img width="100%" src='/ad/add2.png' style={{borderRadius:'15px'}} /></div>
           </div>
        </div>
      </section>

      <section style={{ backgroundColor: '' }}>
      <div className="container py-5">
          <h3 className="mb-4">Laptop</h3>
          <div className="row">
          { productDataLaptop.map((product)=>
          <div className="col-md-12 col-lg-3 mb-3 mb-lg-0">
          <Card id={product._id} catecory={product.catecory} productname={product.productName} price={product.rate} productimg={`${BASE_URL}/product/${product.productPic[0]}`} />
        </div>
          )}

          </div>
          <div className='show-all-btn-div'><a type='btn' onClick={() => navigate("/laptopandcomputer")}  className='btn'>Show all</a></div>

        </div>
      </section>


      <section style={{ backgroundColor: '' }}>
      <div className="container py-5">
          <h3 className="mb-4">Tv</h3>
          <div className="row">
          { productDataTv.map((product)=>
          <div className="col-md-12 col-lg-3 mb-3 mb-lg-0">
          <Card id={product._id} catecory={product.catecory} productname={product.productName} price={product.rate} productimg={`${BASE_URL}/product/${product.productPic[0]}`} />
        </div>
          )}

          </div>
          <div className='show-all-btn-div'><a type='btn' onClick={() => navigate("/tv")} className='btn'>Show all</a></div>

        </div>
      </section>

      <section>
        <div className='container'>
          <div className='row'>
             <div className='col-md-6 mb-2'><img width="100%" src='/ad/add2.png' style={{borderRadius:'15px'}} /></div>
             <div className='col-md-6 mb-2'><img width="100%" src='/ad/add1.png' style={{borderRadius:'15px'}} /></div>
           </div>
        </div>
      </section>


      <section style={{ backgroundColor: '' }}>
      <div className="container py-5">
          <h3 className="mb-4">Headphone</h3>
          <div className="row">
          { productDataHeadpone.map((product)=>
          <div className="col-md-12 col-lg-3 mb-3 mb-lg-0">
          <Card id={product._id} catecory={product.catecory} productname={product.productName} price={product.rate} productimg={`${BASE_URL}/product/${product.productPic[0]}`} />
        </div>
          )}

          </div>
          <div className='show-all-btn-div'><a type='btn' onClick={() => navigate("/headphone")}  className='btn'>Show all</a></div>

        </div>
      </section>

      <Footer />

    </div>
  )
}

export default Home;
