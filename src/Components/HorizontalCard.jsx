import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import './HorizontalCard.css';
import { useNavigate } from 'react-router-dom';

export default function HorizontalCard(props) {
  const navigate = useNavigate()
  return (
    <MDBCard style={{ maxWidth: '540px', cursor:'pointer' }}   onClick={()=>navigate(`/productuserview/${props.id}`)}>
      <MDBRow className='g-0'>
        <MDBCol md='4' className='p-2'>
          <MDBCardImage className='card-img-top-2 img-fluid' src={props.img} alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle className='ver-head'>{props.head}</MDBCardTitle>
            <MDBCardText className='ver-title'>
             {props.title}
            </MDBCardText>
            <MDBCardText className='ver-title'>
             Qty: {props.qty}
            </MDBCardText>
            <MDBCardText>
              <small className='ver-delivry'>{props.deliveryDate}</small>
            </MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}