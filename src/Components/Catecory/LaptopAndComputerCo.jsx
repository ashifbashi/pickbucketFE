import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AxiosInstance from '../../Config/Axiosinstance';
import Card from '../Card';
import { BASE_URL } from '../../Constants/Constants';

const LaptopAndComputerCo = () => {

    const { userDetails } = useSelector(state=>state.user)
    const [laptopAndComputerData, setLaptopAndComputerData]=useState([])

    useEffect(()=>{
        getAllLaptopAndComputerData()
        
      },[])

    const getAllLaptopAndComputerData=()=>{      
     
        AxiosInstance.get('users/getAllLaptopAndComputerData').then((response)=>{
          setLaptopAndComputerData(response.data.response)
        })
  
      }
    
  return (
    <div>

      <section style={{ backgroundColor: '' }}>
        <div class="container py-5">
          <h3 className="mb-4">Laptop and Computer</h3>
          <div class="row">
          { laptopAndComputerData.map((product)=>
          <div class="col-md-12 col-lg-3 mb-3 mb-lg-0">
          <Card id={product._id} catecory={product.catecory} productname={product.productName} price={product.rate} productimg={`${BASE_URL}/product/${product.productPic[0]}`} />
        </div>
          )}

          </div>
        </div>
      </section>

    </div>
  )
}

export default LaptopAndComputerCo;
