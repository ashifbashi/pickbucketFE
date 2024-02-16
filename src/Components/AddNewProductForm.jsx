import React, { useState } from 'react';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import AxiosInstance from '../Config/Axiosinstance';
import { toastError, toastSuccess } from '../Constants/plugins';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AddNewProductForm() {
  const { userDetails } = useSelector(state => state.user)

  const [formValue, setFormValue] = useState({
    productName: '',
    brand: '',
    catecory: '',
    discription: '',
    details: '',
    rate: '',
    vendorId: userDetails.userId
  });
  const navigate = useNavigate()

  // const [productPicture, setProductPicture] = useState(null)
  // const [selectedImage, setSelectedImage] = useState('')
  const [productPicture, setProductPicture] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);


  
  const onChange = (e) => {

    setFormValue({ ...formValue, [e.target.name]: e.target.value });


  };



  // const addFileData = (e) => {
  //   setProductPicture(e.target.files[0])
  //   e.target.files[0] ? setSelectedImage(URL.createObjectURL(e.target.files[0])) : setSelectedImage(null)
  // }

  const addFileData = (e) => {
    const files = e.target.files;
  
    // Update productPictures state with an array of selected files
    setProductPicture(files);
  
    // Update selectedImages state with an array of URLs
    const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    setSelectedImage(imageUrls);
  };

  console.log("imagessssssss", productPicture)




  // const addProductData = () => {

  //   let fileData = new FormData()
  //   fileData.append('image', productPicture)

  //   AxiosInstance.post('/vendors/addProductData', fileData, { params: formValue }, { headers: { "Content-Type": 'multipart/form-data' } }).then((response) => {

  //     toastSuccess("New Product added")
  //     navigate('/home')
  //   })
  //     .catch(err => {
  //       toastError("Some thing went wrong")
  //     })
  // }

  const addProductData = () => {
    let fileData = new FormData();
  
    // Iterate over each selected file and append it to the FormData
    for (let i = 0; i < productPicture.length; i++) {
      fileData.append('images', productPicture[i]);
    }
  
    AxiosInstance.post('/vendors/addProductData', fileData, { params: formValue }, { headers: { "Content-Type": 'multipart/form-data' } })
      .then((response) => {
        toastSuccess("New Product added");
        navigate('/home');
      })
      .catch(err => {
        toastError("Something went wrong");
      });
  };


  console.log( "form valueeeee");
  return (
    <MDBValidation className='row g-3'>
      <p>{formValue.courtName}</p>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.ProductName}
          name='productName'
          onChange={onChange}
          id='validationCustom01'
          required
          label='Product Name'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.brand}
          name='brand'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Brandu9uu'
        />
      </MDBValidationItem>
      {/* <MDBValidationItem className='col-md-4'>
        <MDBInputGroup >
          <input
            name='catecory'
            type='text'
            onChange={onChange}
            className='form-control'
            id='validationCustomUsername'
            placeholder='Catecory'
            required
          />
        </MDBInputGroup>
      </MDBValidationItem> */}
    <MDBValidationItem className='col-md-4'>
      <select  name='catecory' className="browser-default custom-select form-select"
        value={formValue.catecory}
        onChange={onChange}
       
        >
        <option selected>Select caecory</option>
        <option value="phone">phone</option>
        <option value="laptop">laptop</option>
        <option value="tv">tv</option>
        <option value="headphone">headphone</option>
      </select>
      </MDBValidationItem>
    
      <MDBValidationItem className='col-md-6'>
        <MDBInputGroup >
          <input
            name='rate'
            type='text'
            onChange={onChange}
            className='form-control'
            id='validationCustomUsername'
            placeholder='Rate'
            required
          />
        </MDBInputGroup>
      </MDBValidationItem>
      <MDBValidationItem className='col-md-6' feedback='Please provide a valid city.' invalid>
        <textarea
          type='text-area'
          value={formValue.details}
          name='details'
          placeholder='Details'
          onChange={onChange}
          id='validationCustom03'
          required
          label='Discription'
          style={{ width: "100%" }}
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-6' feedback='Please provide a valid city.' invalid>
        <textarea
          type='text-area'
          value={formValue.discription}
          name='discription'
          onChange={onChange}
          id='validationCustom03'
          required
          placeholder='Discription'
          label='Discription'
          style={{ width: "100%" }}
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4' >
        <MDBInput
          type='file'
          value={formValue.zip}
          name='courtImage'
          onChange={addFileData}
          id='validationCustom05'
          required
          label=''
          multiple accept="image/*,video/*"
        />
              <small>select 5 images</small>
      </MDBValidationItem>


      {/* {selectedImage && <img src={selectedImage} alt="" style={{ width: "150px" }} />} */}
      {selectedImage && selectedImage.map((imageUrl, index) => (
  <img key={index} src={imageUrl} alt={`Image ${index + 1}`} style={{ width: "150px", marginRight: "10px" }} />
))}

      <div className='col-12'>
        <MDBBtn type='submit' onClick={addProductData} style={{ backgroundColor: "#ff6b00", border: "none" }}>Submit form</MDBBtn>{" "}
        <MDBBtn type='reset' style={{ backgroundColor: "#ff6b00", border: "none" }}>Reset form</MDBBtn>
      </div>
    </MDBValidation>
  );
}