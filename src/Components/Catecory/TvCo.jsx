import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AxiosInstance from '../../Config/Axiosinstance';
import Card from '../Card';
import { BASE_URL } from '../../Constants/Constants';

const TvCo = () => {

    const { userDetails } = useSelector(state=>state.user)
    const [tvData, setTvData]=useState([])

    useEffect(()=>{
        getAllTvData()
        
      },[])

    const getAllTvData=()=>{      
     
        AxiosInstance.get('users/getAllTvData').then((response)=>{
            setTvData(response.data.response)
        })
  
      }
    
  return (
    <div>

      <section style={{ backgroundColor: '' }}>
        <div className="container py-5">
          <h3 className="mb-4">Tv</h3>
          <div className="row">
          { tvData.map((product)=>
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

export default TvCo;