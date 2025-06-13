export function useInput(defaultValue,validationFun) {
    const [enteredValue, setEnteredValue] = useState(defaultValue)

    const [didEdit, setDidEdit] = useState(false)

    const valueIsValid=validationFun(enteredValue);


    function handleInputChange(event) {
        setEnteredValue(event.target.value)
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true);
    }

    return {
        value: enteredValue, handleInputChange, handleInputBlur: handleInputBlur, hasError: didEdit && !valueIsValid
    };
}