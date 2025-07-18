import React, { useEffect, useState } from 'react'
import './Header.css'
function Header() {
    const Slider=[
    {
      image: 'https://thumbs.dreamstime.com/z/handmade-jute-dolls-indian-handicrafts-fair-kolkata-west-bengal-india-november-rd-unidentified-woman-making-47918898.jpg',
      heading: 'Welcome To Grihalashmi-Mart',
      subheading: 'Discover amazing articles and insights.'
    },
    {
      image: 'https://static.vecteezy.com/system/resources/previews/055/048/386/non_2x/fermented-homemade-food-photo.jpg',
      heading: 'Our Second Slide',
      subheading: 'Another catchy description here.'
    },
    {
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/6/SL/GA/DO/49066698/ladies-clothes-stitching-services.jpg',
      heading: 'Third Slide Title',
      subheading: 'More details or an enticing tagline.'
    },
    {
      image:'https://thumbs.dreamstime.com/b/kolkata-west-bengal-india-december-rd-unidentified-woman-preparing-jute-bags-artworks-handicraft-handicraft-fair-kolkata-107153045.jpg',
      heading:"it is cartf",
      subheading:"more details to the"
    }
    ];
  const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(()=>{
        const timer=setInterval(()=>{
            setCurrentSlide(preSlide => (preSlide + 1 )% Slider.length);
        },3000)
        return() => clearInterval(timer)
    },[Slider.length])

    const goToSlide = (index)=>{
        setCurrentSlide(index)
    };
  return (
   <>
    <div className="slider-container">
        {Slider.map((slide,index)=> (
            <div key={index}
            className={`slide ${index===currentSlide ? 'active ': ''}`} 
            style={{backgroundImage: `url(${slide.image})`}}>
         <div className="overlay">
            <h1>{slide.heading}</h1>
            <p>{slide.subheading}</p>
          </div>
              
            </div>
        ))}
        <div className="indicators">
        {Slider.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
   </>
  )
}

export default Header