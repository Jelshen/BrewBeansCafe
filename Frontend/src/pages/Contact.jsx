import React, { useState } from "react";
import ContactCard from "../components/ContactCard";

import * as Icons from "../components/SVGIcons";

const ContactUs = () => {
  const contactInfo = [
    {
      id: 1,
      title: "Visit Our Shop",
      icon: <Icons.LocationIcon />,
      details: [
        "Jl. Raya Taman Kopo Indah 2, Rahayu, Kec. Margaasih, Kabupaten Bandung, Jawa Barat",
      ],
      highlight: "Open Daily 9AM - 9PM",
    },
    {
      id: 2,
      title: "Call Us",
      icon: <Icons.PhoneIcon />,
      details: ["(62)821 6065 6969", "(62)811 5645 7000"],
      highlight: "Available 9AM - 9PM",
    },
    {
      id: 3,
      title: "Email Us",
      icon: <Icons.EmailIcon />,
      details: ["hello@brewbeans.com", "orders@brewbeans.com"],
      highlight: "Response within 24hrs",
    },
    {
      id: 4,
      title: "Follow Us",
      icon: <Icons.InstagramIcon />,
      details: ["@BrewBeansOfficial", "facebook.com/brewbeans"],
      highlight: "Daily coffee inspiration",
    },
  ];

  return (
    <div className="text-[var(--color-accent)] backdrop-blur-lg p-4">
      {/* Header Section */}
      <div
        className="text-left lg:text-center mb-4 xl:mb-8
        px-4 pt-4 md:px-8 md:pt-8 lg:px-10 lg:pt-10 xl:px-20 xl:pt-20"
      >
        <h1 className="text-2xl xl:text-4xl text-transparent bg-clip-text bg-linear-10 from-[var(--color-accent)] to-[var(--color-background)] font-bold">
          Get In Touch!
        </h1>
        <p className="pt-4 md:pt-8 text-sm md:text-sm xl:text-lg text-[var(--color-background)] max-w-3xl mx-auto">
          We'd love to hear from you! Whether you have questions about our
          coffee, want to plan an event, or just want to say hello, we're here
          to help.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row snap-y snap-mandatory">
        {/* Map and Contact Form Section */}
        <div className="snap-start snap-always xl:w-5/9 xl:justify-center xl:gap-8">
          {/* Map Section */}
          <div className="w-full px-4 pt-8 xl:p-8">
            <h2 className="text-xl xl:text-3xl text-transparent bg-clip-text bg-linear-50 from-[var(--color-accent)] to-[var(--color-background)] font-bold mb-4">
              Find Us Here
            </h2>
            <div className="mb-4 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3981936396385!2d107.56035921132374!3d-6.96226529300918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68ef2f8d238189%3A0x7fce1da93ca7d0a9!2sPs.%20Segar%20Kopo%2C%20Jl.%20Raya%20Taman%20Kopo%20Indah%202%2C%20Rahayu%2C%20Kec.%20Margaasih%2C%20Kabupaten%20Bandung%2C%20Jawa%20Barat%2040218!5e0!3m2!1sen!2sid!4v1748767867099!5m2!1sen!2sid"
                className="w-full h-[260px] md:h-[360px] lg:h-[536px]"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-xs md:text-sm text-[var(--color-background)]">
              Located in the heart of downtown, BrewBeans is easily accessible
              by public transport and offers convenient parking for our
              customers.
            </p>
          </div>
        </div>
        {/* Contact Cards Section */}
        <div className="xl:w-4/9 sm:flex xl:justify-end justify-center items-center p-4 md:p-8">
          <div
            className="
            gap-4 grid grid-cols-1 
            sm:grid-cols-2 
            lg:flex lg:flex-row
            xl:grid xl:grid-cols-2 
            justify-center items-center"
          >
            {contactInfo.map((contact) => (
              <ContactCard
                key={contact.id}
                id={contact.id}
                title={contact.title}
                icon={contact.icon}
                details={contact.details}
                highlight={contact.highlight}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-4 p-4 lg:p-8 xl:mt-8 text-center">
        <div className="bg-gradient-to-r from-[var(--color-background)]/10 to-[var(--color-accent)]/10 backdrop-blur-sm rounded-lg p-8 border border-[var(--color-accent)]/20">
          <h3 className="text-lg xl:text-2xl text-transparent bg-clip-text bg-linear-10 from-[var(--color-accent)] to-[var(--color-background)] font-bold mb-4">
            Visit BrewBeans Today!
          </h3>
          <p className="text-xs md:text-sm xl:text-base text-[var(--color-background)] max-w-3xl mx-auto">
            Whether you're looking for your morning coffee fix, a cozy place to
            work, or want to host your next meeting with us, we're excited to
            welcome you to the BrewBeans family. Stop by anytime during our
            operating hours, or reach out using any of the methods above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
