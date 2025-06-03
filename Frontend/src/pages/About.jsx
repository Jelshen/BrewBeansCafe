import React from "react";
import CustomerTestimonial from "../components/CustomerTestimonial.jsx";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const About = () => {
  const responsive = {
    largeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1400 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1024 },
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

  const customerTestimony = [
    {
      id: 1,
      name: "John Doe",
      testimony:
        "BrewBeans is my go-to coffee shop! The atmosphere is so cozy, and the coffee is always top-notch. I love spending my mornings here!",
    },
    {
      id: 2,
      name: "Jane Smith",
      testimony:
        "The baristas at BrewBeans are incredibly friendly and knowledgeable. They always make great recommendations!",
    },
    {
      id: 3,
      name: "Emily Johnson",
      testimony:
        "I love the variety of coffee options at BrewBeans. There's something for everyone, and the quality is unmatched!",
    },
    {
      id: 4,
      name: "Michael Brown",
      testimony:
        "BrewBeans has the best coffee in town! I can't start my day without their delicious brews.",
    },
    {
      id: 5,
      name: "Sarah Davis",
      testimony:
        "The ambiance at BrewBeans is perfect for studying or catching up with friends. Highly recommend!",
    },
    {
      id: 6,
      name: "David Wilson",
      testimony:
        "I love the community vibe at BrewBeans. It's a great place to meet new people and enjoy amazing coffee.",
    },
  ];

  return (
    <div className="scroll smooth text-[var(--color-accent)] backdrop-blur-lg p-4 md:p-8">
      {/* Our Story Section */}
      <div className="flex flex-col xl:flex-row xl:justify-center xl:p-8">
        {/* Paragraph section */}
        <div className="w-full p-4 xl:p-8">
          <h1 className="text-2xl xl:text-4xl text-transparent bg-clip-text bg-linear-10 from-[var(--color-accent)] to-[var(--color-background)] font-bold">
            About Us
          </h1>
          <p className="lg:w-1/1 mt-4 text-xs md:text-sm xl:text-lg text-[var(--color-background)]">
            BrewBeans is a coffee shop that specializes in providing
            high-quality coffee and a cozy atmosphere for customers to enjoy.
            Our mission is to create a welcoming space where coffee lovers can
            come together to savor their favorite brews and connect with others.
            <br />
            <br />
            At BrewBeans, we believe that coffee is more than just a drink; it's
            an experience. Our mission is to provide our customers with the
            highest quality coffee, sourced from the best beans around the
            world. We strive to create a warm and inviting atmosphere where
            everyone feels welcome.
          </p>
        </div>
        <div className="xl:w-2/5 p-4 xl:p-8 place-items-center transition-transform hover:scale-103 duration-300">
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/964/055/large_2x/coffee-cup-on-a-table-in-a-cafe-free-photo.jpg"
            alt="Coffee Shop"
            className="md:max-w-sm lg:max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Meet The Team Section */}
      <div className="flex flex-col xl:flex-row-reverse xl:justify-center xl:p-8">
        <div className="w-full p-4 xl:p-8">
          <h1 className="text-2xl xl:text-4xl text-transparent bg-clip-text bg-linear-10 to-[var(--color-accent)] from-[var(--color-background)] font-bold">
            Meet The Team!
          </h1>
          <p className="lg:w-1/1 mt-4 text-xs md:text-sm xl:text-lg text-[var(--color-accent)]">
            Our team is made up of passionate coffee enthusiasts who are
            dedicated to providing the best possible experience for our
            customers. We take pride in our craft and are always looking for new
            ways to improve our offerings.
            <br />
            <br />
            We are committed to sustainability and ethical sourcing, ensuring
            that our coffee is sourced from farms that prioritize the well-being
            of their workers and the environment. We believe that great coffee
            should not only taste good but also do good.
          </p>
        </div>
        <div className="xl:w-2/5 p-4 xl:p-8 place-items-center transition-transform hover:scale-103 duration-300">
          <img
            src="https://img.freepik.com/free-photo/group-diverse-people-having-coffee-cafe_53876-25060.jpg"
            alt="BrewBeans Team"
            className="md:max-w-sm lg:max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Customer Testimony Section */}
      <div className="w-full p-4 xl:p-8">
        <h1 className="text-2xl xl:text-4xl text-center text-transparent bg-clip-text bg-linear-10 from-[var(--color-accent)] to-[var(--color-background)] font-bold">
          What Our Customers Say!
        </h1>
        <div className="relative md:flex-1 md:flex justify-center w-full p-4 mb-8 md:mb-8 md:p-8">
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            infinite={true}
            className="about-carousel"
            autoPlay={true}
            autoPlaySpeed={1750}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="relative w-full mb-8 md:mb-0"
            removeArrowOnDeviceType={["mobile", "tablet"]}
            dotListClass="custom-dot-list-style"
            renderDotsOutside={true}
            itemClass="px-2"
          >
            {/* Dummy data for testing */}
            {customerTestimony.map((item) => (
              <CustomerTestimonial
                key={item.id}
                name={item.name}
                testimony={item.testimony}
                quoteColor={
                  item.id % 2 === 0
                    ? "var(--color-highlight)"
                    : "var(--color-accent)"
                }
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default About;
