const Input = ({ name, register, type, placeholder }) => (
  <div className="form-control-input">
    <input
      className="w-full mb-4 p-2"
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      {...register(name)}
    />
  </div>
);
export default Input;
