import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import ajvar from '../assets/sambal.jpg'; 
import rug from '../assets/rug.jpg'; 
import clothes from '../assets/clothes.jpg'; 

const ProductCarousel = () => {
  const { isLoading, error } = useGetTopProductsQuery();

  // Static images array with correct image paths
  const staticImages = [
    { id: 'static1', src: ajvar, alt: 'Ajvar Image', caption: 'A Deep Dive into Albania\'s Rich Heritage' },
    { id: 'static2', src: rug, alt: 'Rug Image', caption: 'The Art of Rug Weaving' },
    { id: 'static3', src: clothes, alt: 'Clothes', caption: 'Traditional Clothing' },
  ];

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark mb-4 carousel-custom">
      {/* Render static images with your custom text */}
      {staticImages.map((image) => (
        <Carousel.Item key={image.id}>
          <Image src={image.src} alt={image.alt} fluid className="carousel-image" />
          <Carousel.Caption className="carousel-caption">
            <h2 className="text-white text-right font-weight-bold text-shadow">{image.caption}</h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
