import React, { useId } from 'react'
// this component is used to create an input with a label and different types and styles

const Input = React.forwardRef(
    // this component is used to create an input with a label and different types and styles
    function Input({
        // label is the label for the input, type is the type of the input, className is the additional class name for the input, props are the other props for the input
        label,
        type = "text",
        className = "",
        ...props
    }, ref) {
        const id = useId()
        return (
            // input container
            <div className=' flex   justify-evenly   text-center focus:bg-gray-100 focus:text-black  h'>
                <div className=' text-left '>
                    <div>
                        {label && <label
                            className=' text-md font-medium text-black text-left  w-full '
                            htmlFor={id}>
                            {label}
                        </label>
                        }
                    </div>


                    <input
                        type={type}
                        className={` w-full px-2 py-2 rounded-md bg-white text-black  outline-none  focous:bg-gray-100 duration-200 border-gray-300   l hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black ${className} `}
                        ref={ref}
                        id={id}
                        {...props}
                    />



                </div>
            </div>

        )
    }
)

export default Input