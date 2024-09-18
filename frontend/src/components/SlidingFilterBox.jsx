import React, { useRef, useEffect } from 'react';

const SlidingFilterBox = (props) => {
    const { isTextFieldVisible } = props;

  const textFieldRef = useRef(null);

  useEffect(() => {
    if (isTextFieldVisible) {
      // Set initial transform to make the text field invisible
      textFieldRef.current.style.transform = 'translateX(0) scale(0)';

      // Use a setTimeout to delay the slide animation
      setTimeout(() => {
        textFieldRef.current.style.transform = 'translateX(-220px) scale(1)';
      }, 150); // Adjust the delay as needed
    } else {
      // Slide the text field back to its original position
      textFieldRef.current.style.transform = 'translateX(0) scale(0)';
    }
  }, [isTextFieldVisible]);

  return (
    <div className="flex justify-end h-full">
      <input
        ref={textFieldRef}
        type="text"
        placeholder="Enter text"
        className="absolute top-0 right-0 w-64 h-10 border border-gray-300 rounded-md px-2 py-1 transform transition-transform duration-300 ease-in-out"
      />
    </div>
  );
};

export default SlidingFilterBox;