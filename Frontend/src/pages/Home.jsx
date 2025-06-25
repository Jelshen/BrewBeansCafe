import React from "react";

// Import components
import HomeCard from "../components/HomeCard.jsx";
import fetchMenu from "../api/FetchMenu.js";

// Import library
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MENU_IMAGE_URL = `${import.meta.env.VITE_MENU_IMAGE_URL}/`;

const Home = () => {
  const [randomItems, setRandomItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const fetchAndRandomize = async () => {
      try {
        setLoading(true);
        const menuData = await fetchMenu.getMenu();
        // Get 5 random items from the menu
        const randomSelection = getRandomItems(menuData, 5);
        setRandomItems(randomSelection);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
        // Fallback to dummy data if API fails
        setRandomItems(dummyData);
      } finally {
        setLoading(false);
      }
    };

    fetchAndRandomize();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-wrap md:flex-row justify-center lg:p-0 p-4"
    >
      {/* Header */}
      <div className="w-full lg:w-1/1 xl:w-3/7 flex-col text-lg p-4 md:p-8 lg:p-10 xl:p-20 justify-center">
        <h2 className="text-sm md:text-lg lg:text-2xl font-medium text-[var(--color-accent)]">
          Welcome!
        </h2>

        <h1 className="mt-2 text-xl md:text-2xl lg:text-4xl xl:text-4xl font-bold text-transparent bg-clip-text bg-linear-10 from-[var(--color-accent)] to-[var(--color-background)]">
          Start the day with a fresh brew!
        </h1>

        <h2 className="mt-4 text-sm md:text-lg lg:text-xl font-medium text-[var(--color-accent)]">
          Brewed for Comfort.
        </h2>

        <p className="mt-4 text-sm md:text-lg lg:text-xl text-[var(--color-background)]">
          BrewBeans is a coffee shop that specializes in providing high-quality
          coffee and a cozy atmosphere for customers to enjoy. Our mission is to
          create a welcoming space where people can come together, relax, and
          savor the perfect cup of coffee.
        </p>

        <Link to="/menu">
          <button
            className="mt-4 border-2 rounded-full px-4 border-[var(--color-background)] 
        text-[var(--color-background)] p-2 md:hover:scale-105 active:scale-105 transition-transform duration-100"
          >
            <span className="text-sm md:text-md">Check Our Menu!</span>
          </button>
        </Link>
      </div>

      {/* Card Section */}
      <div className="relative md:mb-0 md:flex-1 md:flex justify-center w-full lg:w-1/1 xl:w-4/7 p-4 md:p-8 lg:p-10 xl:p-20">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2500}
            className="home-carousel"
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="relative w-full h-full mb-8 md:mb-0"
            removeArrowOnDeviceType={["mobile", "tablet"]}
            dotListClass="custom-dot-list-style-home"
            renderDotsOutside={true}
            itemClass="px-2"
          >
            {randomItems.map((item) => (
              <HomeCard
                key={item.menu_id}
                image={`${MENU_IMAGE_URL}${item.picture_url}`}
                name={item.menu_name}
                description={item.menu_description}
              />
            ))}
          </Carousel>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
