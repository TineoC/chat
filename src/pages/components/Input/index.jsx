const Input = ({
	name,
	register,
	errors,
	required,
	type,
	validationSchema,
	placeholder,
}) => (
	<div className='form-control-input'>
		<input
			className='w-full mb-4 p-2'
			id={name}
			name={name}
			type={type}
			placeholder={placeholder}
			required={required}
			{...register(name, validationSchema)}
		/>
		{errors && errors[name]?.type === "required" && (
			<span className='error text-red-600 text-sm'>
				{errors[name]?.message}
			</span>
		)}
		{errors && errors[name]?.type === "minLength" && (
			<span className='error text-red-600 text-sm'>
				{errors[name]?.message}
			</span>
		)}
	</div>
);
export default Input;
