const Input = ({label, elementType, elementConfig, value, divClass, changed, className, labelClassname}) => {
    let inputElement = null;


    switch (elementType) {
        case ('input'):
            inputElement = <input
                className={className}
                {...elementConfig}
                onChange={changed}
                value={value}
            />
            break;

        case ('textarea'):
            inputElement = <textarea
                className={className}
                {...elementConfig}
                onChange={changed}
                value={value}/>;
            break;

        case ('select'):
            inputElement = (
                <select
                    className={className}
                    onChange={changed}
                    value={value}>
                    {elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;

        default:
            inputElement = <input
                className={className}
                {...elementConfig}
                onChange={changed}
                value={value}/>
    }
    return (
        <div className={`mb-3 ${divClass}`}>
            <label className={labelClassname}>{label}</label>
            {inputElement}
        </div>
    );
}
export default Input;
