import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AxiosInstance from '../../Config/Axiosinstance';
import Card from '../Card';
import { BASE_URL } from '../../Constants/Constants';

const AllCatecoryCo = () => {

    const { userDetails } = useSelector(state=>state.user)
    const [allCatecoryData, setAllCatecoryData]=useState([])

    useEffect(()=>{
      getAllCatecoryDataData()
      },[])

    const getAllCatecoryDataData=()=>{      
     
        AxiosInstance.get('users/getAllCatecoryDataData').then((response)=>{
          setAllCatecoryData(response.data.response)
        })
  
      }
    
  return (
    <div>

      <section style={{ backgroundColor: '' }}>
        <div className="container py-5">
          <h3 className="mb-4">All Categories</h3>
          <div className="row">
          { allCatecoryData.map((product)=>
          <div className="col-md-12 col-lg-3 mb-3 mb-lg-0">
          <Card id={product._id} catecory={product.catecory} productname={product.productName} price={product.rate} productimg={`${BASE_URL}/product/${product.productPic[0]}`} />
        </div>
          )}

          </div>
        </div>
      </section>

    </div>
  )
}

export default AllCatecoryCo;