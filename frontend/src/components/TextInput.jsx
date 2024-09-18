import PropTypes from "prop-types";
import React from "react";

export const TextInput = ({ state, className, inputType = "text", placeholder, onChange }) => {
  return (
    <div className={`flex flex-col items-center gap-0.5 relative ${className}`}>
      <input
        className="p-3 relative self-stretch w-full bg-surfacelight rounded border border-[#c4c4c4] mt-[-1.00px] font-paragraph-IBM-plex-sans-regular font-[number:var(--paragraph-IBM-plex-sans-regular-font-weight)] text-text-secondary-grey3 text-[length:var(--paragraph-IBM-plex-sans-regular-font-size)] tracking-[var(--paragraph-IBM-plex-sans-regular-letter-spacing)] leading-[var(--paragraph-IBM-plex-sans-regular-line-height)] [font-style:var(--paragraph-IBM-plex-sans-regular-font-style)]"
        placeholder={placeholder}
        type={inputType}
        onChange={onChange}
      />
    </div>
  );
};

TextInput.propTypes = {
  state: PropTypes.oneOf(["required"]),
  inputType: PropTypes.string,
};
