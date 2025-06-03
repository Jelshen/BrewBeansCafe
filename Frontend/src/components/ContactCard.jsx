import React from "react";

const ContactCard = ({ id, title, icon, details, highlight }) => {
  return (
    <div
      key={id}
      className="
      w-full h-[14rem]
      sm:w-[14rem] sm:h-[14rem]
      md:w-[16rem] md:h-[16rem]
      lg:w-[15rem] lg:h-[15rem]
      xl:w-[15rem] xl:h-[15rem]

      bg-gradient-to-br from-[var(--color-background)]/10 to-[var(--color-accent)]/10 
      backdrop-blur-sm rounded-xl p-4 border border-[var(--color-accent)]/20 
      transition-transform hover:scale-103 duration-300 shadow-lg"
    >
      <div className="text-center flex flex-col items-center justify-center">
        <div className="text-xl py-2 mb-2 mt-2">{icon}</div>
        <h3 className="text-sm md:text-lg xl:text-lg font-bold text-transparent bg-clip-text bg-linear-10 from-[var(--color-accent)] to-[var(--color-background)] mb-2">
          {title}
        </h3>
        <div className="space-y-1">
          {details.map((detail, index) => (
            <p
              key={index}
              className="text-[16px] sm:text-xs text-[var(--color-accent)]"
            >
              {detail}
            </p>
          ))}
        </div>
        <p
          className="absolute bottom-4 left-4 right-4
            text-[12px] md:text-xs
            font-semibold text-[var(--color-background)] 
            bg-[var(--color-accent)]/20 rounded-full px-1 py-1"
        >
          {highlight}
        </p>
      </div>
    </div>
  );
};

export default ContactCard;
