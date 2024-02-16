import React from 'react';
import './Carousel.css';

const Carousel = () => {
  return (
     <div>

<div id="carouselExampleCaptions" className="carousel slide main-co">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner co-in">
    <div className="carousel-item active">
      <img src="/carousel/carousel.jpg" className="d-block w-100" alt="..." />
      <div className="carousel-caption d-flex flex-column h-100 align-items-center justify-content-center bottom-0">
        {/* <h2 className="bg-dark bg-opacity-50 py-2 px-4">First slide label</h2> */}
        {/* <p className="bg-dark bg-opacity-50 py-2 px-4">Some representative placeholder content for the first slide.</p> */}
        {/* <a href="#" className="btn btn-outline-light px-4 py-2 rounded-0">Learn More</a> */}
      </div>
    </div>
    <div className="carousel-item">
      <img src="/carousel/carousel2.png" className="d-block w-100" alt="..." />
      <div className="carousel-caption d-flex flex-column h-100 align-items-center justify-content-center bottom-0 ">
        {/* <h2 className="bg-dark bg-opacity-50 py-2 px-4">Second slide label</h2> */}
        {/* <p className="bg-dark bg-opacity-50 py-2 px-4">Some representative placeholder content for the second slide.</p> */}
        {/* <a href="#" className="btn btn-outline-light px-4 py-2 rounded-0">Learn More</a> */}
      </div>
    </div>
    <div className="carousel-item">
      <img src="/carousel/carousel.jpg" className="d-block w-100" alt="..." />
      <div className="carousel-caption d-flex flex-column h-100 align-items-center justify-content-center bottom-0">
        {/* <h2 className="bg-dark bg-opacity-50 py-2 px-4">Third slide label</h2> */}
        {/* <p className="bg-dark bg-opacity-50 py-2 px-4">Some representative placeholder content for the third */}
          {/* slide.</p> */}
        {/* <a href="#" className="btn btn-outline-light px-4 py-2 rounded-0">Learn More</a> */}
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    {/* <span className="carousel-control-prev-icon" aria-hidden="false"></span> */}
    <i className="fa fa-chevron-left" aria-hidden="false"></i>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    {/* <span className="carousel-control-next-icon" aria-hidden="false"></span> */}
    
    <i className="fa fa-chevron-right" aria-hidden="false"></i>
    <span className="visually-hidden">Next</span>
  </button>
</div>
            
    </div>
  )
}

export default Carousel
