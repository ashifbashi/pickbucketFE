import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
  const navigate = useNavigate()
  return (
    <div>

<div className="card" style={{cursor:'pointer'}} onClick={()=>navigate(`/productuserview/${props.id}`)}>
          {/* <div className="d-flex justify-content-between p-2">
            <div
              className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
              style={{width: "30px", height:"30px"}}>
              <p className="text-white mb-0 small">x4</p>
            </div>
          </div> */}
          <img className='c-img card-img-top' style={{height:'250px !important'}} src={props.productimg}
           alt="products" />
          <div className="card-body p-3" style={{padding:'10px 10px !important'}}>
            <div className="d-flex justify-content-between">
              <p className="small"><a href="#!" className="text-muted">{props.catecory}</a></p>
              {/* <p className="small text-danger"><s>$1099</s></p> */}
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h6 className="mb-0">{props.productname}</h6>
              <h6 style={{color: '#00bd00', fontWeight: '600'}} className="mb-0">₹{props.price}</h6>
            </div>

            {/* <div className="d-flex justify-content-between ">
              <p className="text-muted mb-0">Available: <span className="fw-bold">6</span></p>
              <div className="ms-auto text-warning">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
            </div> */}
          </div>
        </div>

      
    </div>
  )
}

export default Card;