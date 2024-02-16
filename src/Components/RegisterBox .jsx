import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { BASE_URL } from '../Constants/Constants';
import { useNavigate } from 'react-router-dom'
import { toastError, toastSuccess } from '../Constants/plugins';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../Toolkit/userSlice';
import AxiosInstance from '../Config/Axiosinstance';


const RegisterBox = () => {

    const navigate = useNavigate()
    const [registerCred, setRegisterCred]=useState({
        email: '',
        password: '',
        number: ''
    })
    // redux
    const {userDetails} = useSelector((state)=>state.user)
    const dispatch = useDispatch()



    const submitLogin =()=>{

        try {


            if(registerCred.email && registerCred.password){

                AxiosInstance.post('/auth/register', registerCred).then((res)=>{
                   console.log(res)

                   if(res.data.message === "register successfull" && res.data.token){
                       localStorage.setItem('token', res.data.token)
                       const parsedToken = parseJwt(res.data.token)
                       localStorage.setItem('user', JSON.stringify(parsedToken) )
                       console.log("aqsdfghjkl",parsedToken)
                         dispatch(setUserDetails(parsedToken))
                       toastSuccess("Register success")
                       navigate('/')

                   }
                    
                   if(res.data.message === "Invalid credential"){
                        toastError("Invalid credential")
                   }

                })

            }else{
                toastError("Credential not filled")
            }
            
        } catch (error) {
            console.log(error)
            
        }

        
    }

    console.log(registerCred.email)

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    
    const [err, setErr] = useState("")
    const [validCheck, setValidCheck] = useState(false)
    const numberValidate = () => {


        if (registerCred.number.trim() == "") {
            setErr("number cannot be blank")
            return false
        }
        else if (registerCred.number.length < 10) {
            setErr("number must not be less than 10 charecters")
            return false
        }
        else {
            setErr("")
            setValidCheck(true)
            return true
        }
    }


    return (
        <>


            <MDBCol md='4' className='position-relative'>

                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                <MDBCard className='my-5 bg-glass'>
                    <MDBCardBody className='p-5'>

                        <MDBInput onChange={(e)=>{setRegisterCred({...registerCred, email:e.target.value})}} wrapperClass='mb-4' label='Email' id='form3' type='email' value={registerCred.email} />
                        <MDBInput onChange={(e)=>{setRegisterCred({...registerCred, password:e.target.value})}} wrapperClass='mb-4' label='Password' id='form4' type='password' value={registerCred.password} />
                        <MDBInput onKeyUp={numberValidate} onChange={(e)=>{setRegisterCred({...registerCred, number:e.target.value})}} wrapperClass='mb-4' label='Contact number' id='form4' type='number' value={registerCred.number} />
                         <small>{err}</small>
                      

                        <MDBBtn onClick={()=>{validCheck ? submitLogin() : alert('please fill all fields')}} className='w-100 mb-4' size='md' style={{backgroundColor:"#ff6b00", border:"2px solid #ff6b00"}}>Register</MDBBtn>

                        <div className="text-center">

                     

                        </div>
 
                    </MDBCardBody>
                </MDBCard>

               {/* <button onClick={updateUserRole}>value: {userRole}</button> */}

            </MDBCol>





        </>
    )
}

export default RegisterBox;
