import React from "react";

type SliderInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const SliderInput = React.forwardRef<HTMLInputElement, SliderInputProps>((props, ref) => {
    const { max, value ,...restProps }  = props;

    return <input type="range" ref={ref} {...restProps} max={max} value={value}/>;
});

export default SliderInput;