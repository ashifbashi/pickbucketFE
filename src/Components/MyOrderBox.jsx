import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../Config/Axiosinstance';
import HorizontalCard from './HorizontalCard';
import { BASE_URL } from '../Constants/Constants';


const MyOrderBox = (props) => {
  const navigate = useNavigate()
    const {o_id} =useParams()

    const [myOrder, setMyOrder]=useState([])
  
    useEffect(()=>{
      getMyOrderData()
    },[])
  
  const getMyOrderData=()=>{
    AxiosInstance.get('/users/getMyOrderData', {params:{userId:o_id}}).then((response)=>{
        setMyOrder(response.data)

    
     console.log(response.data, "jajajajajaj");
    })
  }

  console.log(myOrder, "dataaaaa");

  return (
    <div>

        <div className='container mt-5'>
        <h3>My Orders</h3>
            <div className='row mt-3'>
                {myOrder.map((order) => (
    <div className='col-md-4 mb-3' key={order.productInfo._id}> 
        <HorizontalCard
            id={order.productInfo._id}
            title={order.productInfo.details}
            head={order.productInfo.productName}
            img={
            Array.isArray(order.productInfo.productPic)
            ? `${BASE_URL}/product/${order.productInfo.productPic[0]}`
            : `${BASE_URL}/product/${order.productInfo.productPic}`
          }
          qty={order.quantity}
            deliveryDate={order.deliveryDate}
        />
    </div>
))}
            
            </div>
        </div>

      
      
    </div>
  )
}

export default MyOrderBox;
