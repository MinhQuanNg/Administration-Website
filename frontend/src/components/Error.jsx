const Error = ({ children, ...props }) => {
    return (
      <div
        style={{ color: '#f23838', textAlign: 'center' }}
        {...props}
      >
        {children}
      </div>
    )
  }
  
  export default Error