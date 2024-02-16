import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import AxiosInstance from '../../Config/Axiosinstance';

const AdminDashboard = () => {

    const [usersData, setUsersData] = useState('')
    const [productCount, setProductCount] = useState('')
    const [vendorsData, setVendorsData] = useState([])

    useEffect(() => {
        getUsersData()
        getVendorsData()
        getProductCount()
    }, [])


    const getUsersData = () => {
        AxiosInstance.get('/admin/getUsersData').then((response) => {
            setUsersData(response.data.response)
        })
    }

    const getProductCount = () => {
        AxiosInstance.get('/admin/getProductCount').then((response) => {
            setProductCount(response.data.response)
           
        })
    }


    const getVendorsData = () => {
        AxiosInstance.get('/admin/getVendorsData').then((response) => {
            setVendorsData(response.data.response)
        })
    }

    const vendorCount = vendorsData.length



    const handleDeleteVendor = async (vendorId) => {
        try {
          // Make an HTTP request to delete the vendor
          await AxiosInstance.delete('/admin/deleteVendor', {params:{id:vendorId}});
    
          // Update the local state to reflect the deletion
          setVendorsData((prevData) => prevData.filter((vendor) => vendor._id !== vendorId));
        } catch (error) {
          console.error('Error deleting vendor:', error);
        }
      };

    return (
        <div>

            <div className="container mt-4">

            <div className="row">
        <div className="col-md-4 col-xl-4">
            <div className="card bg-c-blue order-card">
                <div className="card-block card-tm">
                    <h6 className="m-b-20">Tottal Users</h6>
                   <div className=''> <h2 className="text-right count-itm-row"><i className="fa fa-users f-left"></i><span>{usersData}</span></h2></div>
                   <p className="m-b-0">Active users<span className="f-right">{usersData}</span></p>
                </div>
            </div>
        </div>
        
        <div className="col-md-4 col-xl-4">
            <div className="card bg-c-green order-card">
                <div className="card-block card-tm">
                    <h6 className="m-b-20">Tottal Vendors</h6>
                    <div className=''> <h2 className="text-right count-itm-row"><i className="fa fa-users f-left"></i><span>{vendorCount}</span></h2></div>
                    <p className="m-b-0">Active Vendors<span className="f-right">{vendorCount}</span></p>
                </div>
            </div>
        </div>
        
        {/* <div className="col-md-4 col-xl-3">
            <div className="card bg-c-yellow order-card">
                <div className="card-block card-tm">
                    <h6 className="m-b-20">Orders Received</h6>
                    <div className=''> <h2 className="text-right count-itm-row"><i className="fa fa-users f-left"></i><span>{usersData}</span></h2></div>
                    <p className="m-b-0">Completed Orders<span className="f-right">351</span></p>
                </div>
            </div>
        </div> */}
        
        <div className="col-md-4 col-xl-4">
            <div className="card bg-c-pink order-card">
                <div className="card-block card-tm">
                    <h6 className="m-b-20">Tottal Products</h6>
                    <div className=''> <h2 className="text-right count-itm-row"><i className="fa fa-users f-left"></i><span>{productCount}</span></h2></div>
                    <p className="m-b-0">Avilable Product<span className="f-right">{productCount}</span></p>
                </div>
            </div>
        </div>
	</div>

      



                <div className="app-main">

                    <div className="app-main__outer">
                        <div className="app-main__inner">
                     
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-card mb-3 card">
                                        <div className="card-header">Active Vendors
                                        </div>
                                        <div className="table-responsive">
                                            <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">#</th>
                                                        <th>Name</th>
                                                        <th className="text-center">Email</th>
                                                        <th className="text-center">Number</th>
                                                        <th className="text-center">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>



                                                    {vendorsData.map((vendor, key) =>

                                                        <tr key={vendor._id}>
                                                            <td className="text-center text-muted">{key}</td>
                                                            <td>
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-content-left mr-3">
                                                                            <div className="widget-content-left">
                                                                                <img width="40" className="rounded-circle" src="assets/images/avatars/4.jpg" alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="widget-content-left flex2">
                                                                            <div className="widget-heading">{vendor.fname}</div>
                                                                            <div className="widget-subheading opacity-7">{vendor.lname}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-center">{vendor.email}</td>
                                                            <td className="text-center">
                                                                <div className="widget-subheading opacity-7">{vendor.number}</div>
                                                            </td>
                                                            <td className="text-center">
                                                                <button onClick={() => handleDeleteVendor(vendor._id)} type="button" id="PopoverCustomT-1" className="btn btn-danger btn-sm">Delete</button>
                                                            </td>
                                                        </tr>

                                                    )}



                                                    {/* <tr>
                                                <td className="text-center text-muted">#347</td>
                                                <td>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width="40" className="rounded-circle" src="assets/images/avatars/3.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Ruben Tillman</div>
                                                                <div className="widget-subheading opacity-7">Etiam sit amet orci eget</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">Berlin</td>
                                                <td className="text-center">
                                                    <div className="badge badge-success">Completed</div>
                                                </td>
                                                <td className="text-center">
                                                    <button type="button" id="PopoverCustomT-2" className="btn btn-primary btn-sm">Details</button>
                                                </td>
                                            </tr> */}



                                                    {/* <tr>
                                                <td className="text-center text-muted">#321</td>
                                                <td>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width="40" className="rounded-circle" src="assets/images/avatars/2.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Elliot Huber</div>
                                                                <div className="widget-subheading opacity-7">Lorem ipsum dolor sic</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">London</td>
                                                <td className="text-center">
                                                    <div className="badge badge-danger">In Progress</div>
                                                </td>
                                                <td className="text-center">
                                                    <button type="button" id="PopoverCustomT-3" className="btn btn-primary btn-sm">Details</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center text-muted">#55</td>
                                                <td>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width="40" className="rounded-circle" src="assets/images/avatars/1.jpg" alt="" /></div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Vinnie Wagstaff</div>
                                                                <div className="widget-subheading opacity-7">UI Designer</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">Amsterdam</td>
                                                <td className="text-center">
                                                    <div className="badge badge-info">On Hold</div>
                                                </td>
                                                <td className="text-center">
                                                    <button type="button" id="PopoverCustomT-4" className="btn btn-primary btn-sm">Details</button>
                                                </td>
                                            </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-block text-center card-footer">
                                            {/* <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i className="pe-7s-trash btn-icon-wrapper"> </i></button>
                                            <button className="btn-wide btn btn-success">Save</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;
