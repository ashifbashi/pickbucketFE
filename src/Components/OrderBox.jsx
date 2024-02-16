import React, { useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../Config/Axiosinstance';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../Constants/Constants';
import { MDBRadio } from 'mdb-react-ui-kit';

const OrderBox = () => {
    const {or_id} =useParams()
    const { userDetails } = useSelector(state=>state.user)
    const [orderData, setOrderData]=useState([])

    useEffect(()=>{
      orderItem()
    },[])


    const orderItem =()=>{
      AxiosInstance.get('/vendors/getOredrItem', {params:{vendorId:userDetails.userId}}).then((response)=>{
        setOrderData(response.data)
        console.log(response.data);
      })
    }



    // const [selectedValues, setSelectedValues] = useState({});

    // const handleDeliceryStatusVendor = async (_id, value) => {
    //   console.log(_id, value, "oooooooo");
    //   try {
  
    //     await AxiosInstance.put('/admin/deleteVendor', {params:{id:_id, status:value}});
  
 
    //   } catch (error) {
    //     console.error('Error deleting vendor:', error);
    //   }
    // };

    console.log(orderData, "dataaaaa");
  
  return (
    <div>

<div className='container mt-4'>
    <h3>Orders</h3>
<MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Order item</th>
          <th scope='col'>qty</th>
          <th scope='col'>Amound</th>
          <th scope='col'>Status</th>
          <th scope='col'>Costumer info</th>
          <th scope='col'>Date</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {orderData.map((orderData) => (
  <tr key={orderData._id}>
    <td>
      <div className='d-flex align-items-center'>
        <img
          src={
          Array.isArray(orderData.productinfo.productPic)
          ? `${BASE_URL}/product/${orderData.productinfo.productPic[0]}` 
          : `${BASE_URL}/product/${orderData.productinfo.productPic}`
        }
          alt=''
          style={{ width: '45px', height: '45px' }}
          className='rounded-circle'
        />
        <div className='ms-3'>
          <p className='fw-bold mb-1'>{orderData.productinfo.productName}</p>
          <p className='text-muted mb-0'>{orderData.productinfo.details}</p>
        </div>
      </div>
    </td>
    <td>
      <p className='fw-normal mb-1'>{orderData.products.quantity}</p>
    </td>
    <td>
      <p className='fw-normal mb-1'>{orderData.productinfo.rate}</p>
    </td>
    <td>
      <MDBBadge color='success' pill>Paid</MDBBadge> {/* Assuming it's a placeholder */}
    </td>
    <td>
      <p className='text-muted mb-0'>Location: {orderData.products.location}</p>
      <p className='text-muted mb-0'>Address: {orderData.products.address}</p>
      <p className='text-muted mb-0'>Pincode: {orderData.products.pincode}</p>
      <p className='text-muted mb-0'>Phone Number: {orderData.products.number}</p>
    </td>
    <td>

    {new Date(orderData.products?.orderDate).toString().slice(0, 15)}
     
    </td>
  </tr>
))}

      
      
       
      </MDBTableBody>
    </MDBTable>
    </div>


    </div>
  )
}

export default OrderBox;
