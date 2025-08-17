// Create this new file at: src/pages/Dashboard.jsx

import React from 'react';
// 1. Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// 2. Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

// 3. Import required Swiper modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import placeholder images - replace with your actual image URLs or imports
const slide1 = 'https://placehold.co/1200x500/6366f1/ffffff?text=New+Arrivals';
const slide2 = 'https://placehold.co/1200x500/ec4899/ffffff?text=Summer+Sale';
const slide3 = 'https://placehold.co/1200x500/22c55e/ffffff?text=Top+Deals';
const slide4 = 'https://placehold.co/1200x500/f97316/ffffff?text=Shop+Now';

const Dashboard = () => {
  return (
    <div className="space-y-12">
      {/* Image Carousel Section */}
      <section className="w-full">
        <Swiper
          // Swiper options
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl shadow-lg"
        >
          <SwiperSlide>
            <img src={slide1} alt="New Arrivals" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide2} alt="Summer Sale" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide3} alt="Top Deals" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide4} alt="Shop Now" className="w-full h-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Placeholder for Product Cards */}
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
            <h3 className="font-semibold text-lg">Product Name</h3>
            <p className="text-gray-500">$99.99</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
            <h3 className="font-semibold text-lg">Product Name</h3>
            <p className="text-gray-500">$129.99</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
            <h3 className="font-semibold text-lg">Product Name</h3>
            <p className="text-gray-500">$79.99</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
            <h3 className="font-semibold text-lg">Product Name</h3>
            <p className="text-gray-500">$149.99</p>
          </div>
        </div>
      </section>
      
      {/* You can add more sections here like "Shop by Category", etc. */}
    </div>
  );
};

export default Dashboard;
