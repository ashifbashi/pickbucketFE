import React from 'react'
import Navbar from '../Components/Common/Navbar'
import AddNewProductForm from '../Components/AddNewProductForm'
import Footer from '../Components/Common/Footer'

const AddNewProduct = () => {
    return (
        <div>
            <Navbar />
            <div className='container'>
                <AddNewProductForm />
            </div>
            <Footer />
        </div>
    )
}

export default AddNewProduct
