import React, { useId } from 'react'
/// this component is used to create a select input with options and a label

function Select({
  options,
  label,
  className = "",
  ...props
}, ref) {
  const id = useId()
  return (
    /// select input container
    <div className='w-full'>
      {
        label && <label htmlFor={id}
          className='block text-sm mb-1 text-left ml-8 font-bold text-l '>
          {label}
        </label>
      }
      <select
        /// select input with options and props
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-200 border border-gray-300 ${className}`}>

        {options?.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)