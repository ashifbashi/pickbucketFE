import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from '../../Config/Axiosinstance'


const Navbar = (props) => {

    const { userDetails } = useSelector(state => state.user)
    const navigate = useNavigate()

    const [whishlist, setWishlist] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        getWishlistData()
        getCartData()
    }, [])

    const getWishlistData = () => {
        AxiosInstance.get('/users/getWishlistData', { params: { userId: userDetails.userId } }).then((response) => {
            setWishlist(response.data)

        })
    }

    const getCartData = () => {
        AxiosInstance.get('/users/getCartData', { params: { userId: userDetails.userId } }).then((response) => {
            setCart(response.data)

        })
    }


    const doLogout = () => {
        // localStorage.remove('token')
        // localStorage.remove('user')
        localStorage.clear()

        navigate('/')

    }



    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AxiosInstance.get(`/users/search?query=${searchQuery}`);
            setSearchResults(response.data);
            setShowResults(true); // Show the results section
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const handleCloseResults = () => {
        setShowResults(false);
    };

    console.log(searchQuery, "search quary");
    console.log(searchResults, "searchResults");

    const cart_count = cart.length;

    const Wishlistlength = whishlist.length;

    return (
        <div>

            <div className='top-nav'>
                <div className='top-nav-itm1'><p>Welcome to Pickbucket !</p></div>
                {userDetails.role === 3 && <div className='top-nav-itm2'><p> <a href='/register'>Register</a></p></div>}
                {userDetails.role === 1 && <div className='top-nav-itm2'><p> <a href='/admin'>Admin</a></p></div>}
            </div>

            <div className="main-navbar shadow-sm sticky-top">
                <div className="top-navbar">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                                <h5 className="brand-name">pickbucket</h5>
                            </div>
                            <div className="col-md-5 my-auto">

                                <form className='search-form1' role="search" onSubmit={handleSearchSubmit}>
                                    <div className="input-group">
                                        <input
                                            type="search"
                                            placeholder="Search your product"
                                            className="form-control search-inp"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                        <button className="btn bg-white search-btn" type="submit">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </form>

                                {showResults && (
                                    <div className="search-results-container">
                                        <button className="close-btn" onClick={handleCloseResults}>
                                            <i className="fa fa-times"></i>
                                        </button>
                                        <ul className="search-results">
                                            {searchResults.map(result => (
                                                <li onClick={() => navigate(`/productuserview/${result._id}`)} key={result._id}>{result.productName}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                            </div>
                            <div className="col-md-5 my-auto">
                                <ul className="nav justify-content-end">

                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={() => navigate(`/cart/${userDetails.userId}`)}>
                                            <i className="fa fa-shopping-cart"></i> Cart ({cart_count})
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={() => navigate(`/wishlist/${userDetails.userId}`)}>
                                            <i className="fa fa-heart"></i> Wishlist ({Wishlistlength})
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa fa-user"></i> {userDetails.fname} {userDetails.lname}
                                        </a>
                                        <ul className="dropdown-menu m-drop" aria-labelledby="navbarDropdown">
                                            {userDetails.role === 1 && <li style={{ backgroundColor: '#ff6b00' }}><a className="dropdown-item" href="/admin"><i className="fa fa-user"></i> Admin</a></li>}
                                            <li><a className="dropdown-item" onClick={() => navigate(`/myorder/${userDetails.userId}`)}><i className="fa fa-list"></i> My Orders</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={() => navigate(`/wishlist/${userDetails.userId}`)}><i className="fa fa-heart"></i> My Wishlist</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={() => navigate(`/cart/${userDetails.userId}`)}><i className="fa fa-shopping-cart"></i> My Cart</a></li>
                                            {userDetails.role === 2 && <span style={{ fontSize: '13px', marginLeft: '15px' }}>Vendor section</span>}
                                            {userDetails.role === 2 && <li><a className="dropdown-item" onClick={() => navigate("/addnewproduct")}><i className="fa fa-plus"></i>Add New Product</a></li>}
                                            {userDetails.role === 2 && <li><a className="dropdown-item" onClick={() => navigate(`/myproducts/${userDetails.userId}`)} href="#"><i className="fa fa-cube"></i>My products</a></li>}
                                            {userDetails.role === 2 && <li><a className="dropdown-item" href="#" onClick={() => navigate(`/orders/${userDetails.userId}`)}><i className="fa fa-list"></i> Orders</a></li>}
                                            <li><a className="dropdown-item" href="#" onClick={doLogout}><i className="fa fa-sign-out"></i> Logout</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        {/* <a className="navbar-brand d-block d-sm-block d-md-none d-lg-none" href="#">
                    pickbucket
                </a> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" style={{ alignItems: 'center' }} id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link nav-cat-link" onClick={() => navigate("/home")}>Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-cat-link" onClick={() => navigate("/allcategories")}>All Categories</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-cat-link" onClick={() => navigate("/phone")}>Phone</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-cat-link" onClick={() => navigate("/laptopandcomputer")}>Laptop/computer</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-cat-link" onClick={() => navigate("/tv")}>Tv</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-cat-link" onClick={() => navigate("/headphone")}>Headphone</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        </div>
    )
}

export default Navbar;
