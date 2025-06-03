import React, { useState } from "react";
import Masonry from "react-masonry-css";
import ImageCard from "../components/ImageCard";
import GalleryModal from "../components/GalleryModal";

const GALLERY_URL = `${import.meta.env.VITE_GALLERY_IMAGE_URL}/`;

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const toggleModal = (index) => {
    setIsModalOpen(!isModalOpen);
    setSelectedImageIndex(index);
  };

  const dummyData = [
    {
      id: 1,
      name: "Morning Brew",
      description: "Fresh coffee being prepared at dawn.",
      imageUrl: "morningbrew.webp",
    },
    {
      id: 2,
      name: "Latte Art",
      description: "Beautiful heart design in our signature latte.",
      imageUrl: "latteart.webp",
    },
    {
      id: 3,
      name: "Coffee Beans",
      description: "Premium roasted beans ready for grinding.",
      imageUrl: "coffeebeans.webp",
    },
    {
      id: 4,
      name: "Cozy Corner",
      description: "Our favorite reading nook for customers.",
      imageUrl: "cozycorner.webp",
    },
    {
      id: 5,
      name: "Barista at Work",
      description: "Crafting the perfect espresso shot.",
      imageUrl: "baristaatwork.webp",
    },
    {
      id: 6,
      name: "Pastry Display",
      description: "Fresh baked goods ready for the morning rush.",
      imageUrl: "pastrydisplay.webp",
    },
    {
      id: 7,
      name: "Coffee Workshop",
      description: "Learning the art of coffee brewing.",
      imageUrl: "coffeeworkshop.webp",
    },
    {
      id: 8,
      name: "Outdoor Seating",
      description: "Perfect spot for a sunny day coffee.",
      imageUrl: "outdoorseating.webp",
    },
    {
      id: 9,
      name: "Coffee Preparation",
      description: "The pour-over method in action.",
      imageUrl: "coffeepreparation.webp",
    },
    {
      id: 10,
      name: "Coffee and Books",
      description: "Our mini library corner for readers.",
      imageUrl: "coffeeandbooks.webp",
    },
    {
      id: 11,
      name: "Evening Ambiance",
      description: "Warm lighting creates perfect evening mood.",
      imageUrl: "eveningambiance.webp",
    },
  ];

  // Define breakpoints for responsive layout
  const breakpointColumns = {
    default: 4, // Default number of columns
    1536: 4, // xl breakpoint
    1280: 3, // lg breakpoint
    1024: 3, // md breakpoint
    768: 2, // sm breakpoint
    640: 2, // xs breakpoint
  };

  return (
    <div className="backdrop-blur-md flex flex-col items-center justify-center p-4">
      <div className="flex flex-col justify-center px-4 pt-4 md:px-8 md:pt-8 lg:px-10 lg:pt-10 xl:px-20 xl:pt-20">
        <h1 className="text-center text-2xl xl:text-4xl font-bold text-transparent bg-clip-text bg-linear-10 from-[var(--color-accent)] to-[var(--color-background)]">
          Gallery
        </h1>
        <p className="mt-4 lg:mt-8 mb-8 text-sm xl:text-lg text-[var(--color-background)]">
          Explore our collection of images showcasing our coffee, team, and
          events. Each image tells a story of our passion for coffee and the
          community we build around it. Join us in celebrating the art of
          brewing and the joy it brings to our lives. Whether it's a cozy coffee
          moment or a vibrant team gathering, our gallery captures the essence
          of BrewBeans. Enjoy browsing through our visual journey and get a
          glimpse of the warmth and creativity that defines our coffee culture.
          <br />
          <br />
          Click on any image to view it in full detail.
        </p>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-10 xl:px-20 gap-4 mb-8">
        <Masonry
          breakpointCols={breakpointColumns}
          className="my-masonry-grid overflow-hidden"
          columnClassName="my-masonry-grid_column"
        >
          {dummyData.map((item, index) => (
            <div key={item.id} className="w-full gap-4 break-inside-avoid">
              <ImageCard
                image={GALLERY_URL + item.imageUrl}
                toggleModal={() => toggleModal(index)}
              />
            </div>
          ))}
        </Masonry>
      </div>

      {isModalOpen && selectedImageIndex !== null && (
        <GalleryModal
          key={dummyData[selectedImageIndex].id}
          image={GALLERY_URL + dummyData[selectedImageIndex].imageUrl}
          title={dummyData[selectedImageIndex].name}
          description={dummyData[selectedImageIndex].description}
          toggleModal={() => toggleModal(null)}
        />
      )}
    </div>
  );
};

export default Gallery;
