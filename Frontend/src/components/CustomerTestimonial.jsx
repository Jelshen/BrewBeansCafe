import React from "react";

const QuoteIcon = ({ color }) => (
  <svg
    className={`w-8 h-8 text-[var(--color-accent)]`}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const CustomerTestimonial = ({ name, testimony, quoteColor }) => {
  return (
    <div
      className="mx-auto max-w-md w-full h-[20rem] border 
        rounded-2xl overflow-hidden shadow-md flex flex-col
         bg-[var(--color-background)]"
    >
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start mb-4">
          <QuoteIcon color={quoteColor} />
        </div>
        <p className="text-[var(--color-text)] text-xs lg:text-sm flex-grow">
          {testimony}
        </p>

        <h2
          className="text-sm lg:text-lg font-bold mb-2 text-right"
          style={{ color: quoteColor }}
        >
          {name}
        </h2>
      </div>
    </div>
  );
};

export default CustomerTestimonial;
