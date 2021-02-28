import {useState} from 'react';

const useForm = (initialValues, validate) => {
    const [inputs,setInputs] = useState(initialValues);
    const [errors,setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(inputs);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {

            await fetch('/api/add-place', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs),
            }).then((res) => {
                console.log(res)
                setInputs({
                    place: '',
                    streetAddress: '',
                    city: '',
                    countryOrRegion: '',
                    latitude: null,
                    longitude: null
                })
            });

        } else {
            console.log("Error",validationErrors);
        }
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        errors
    };
}

export default useForm;
