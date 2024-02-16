import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted mt-3'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
          <MDBIcon icon="instagram" className="me-2" />
          </a>
          <a href='' className='me-4 text-reset'>
          <MDBIcon icon="facebook" className="me-2" />
          </a>
          <a href='' className='me-4 text-reset'>
          <MDBIcon icon="whatsapp" className="me-2" />
          </a>
          <a href='' className='me-4 text-reset'>
          <MDBIcon icon="linkedin" className="me-2" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                Pickbucket
              </h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora numquam possimus exercitationem beatae,
                 aperiam repellendus commodi veritatis
                 provident! Enim delectus inventore
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Categories</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Phone
                </a>
              </p>
            
              <p>
                <a href='#!' className='text-reset'>
                  Laptop & Computer
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Fridge
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Tv
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Account
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                   My Order
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                   My Cart
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Terms & conditions
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Help</h6>
              <p>
                Help Center
              </p>
              <p>
                Community Guideline
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section >

      <div className='text-center p-4' style={{ backgroundColor: '#ff6b00',color:'#fff' }}>
        © 2021 Copyright: Pickbucket
      </div>
    </MDBFooter>
  );
}