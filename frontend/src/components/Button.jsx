import Spinner from './Spinner/Spinner'

const Button = ({ type, loading, className, label, text, onClick, ref, ...props }) => {
  return (
    <button
      className={`all-[unset] box-border flex items-center justify-center gap-2.5 px-5 py-2.5 relative ${className}`}
      type={type}
      disabled={loading}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      <div className={`all-[unset] box-border relative w-fit mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium ${text} text-base tracking-[0] leading-[normal]`}>
        {loading ? <Spinner /> : label}
      </div>
    </button>
  );
};

export default Button;
