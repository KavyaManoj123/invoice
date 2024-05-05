import './style.css';

const Input = ({ type = 'text', onChange, placeholder, className, value }) => {
  return (
    <div>
      <input
        className={`custom-style ${className}`}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
