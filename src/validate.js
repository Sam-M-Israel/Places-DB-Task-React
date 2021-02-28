const validate = (inputs) => {

    const errors = {};
    //
    if (!inputs.place) {
        errors.place = 'Please add a name for the place';
    }
    if(!inputs.countryOrRegion && !inputs.city && !inputs.latitude && !inputs.longitude) {
        errors.general = 'You must have either a city and country/region or lat & long coordinators.'
    }

    if ((inputs.latitude && !inputs.longitude) || (!inputs.latitude && inputs.longitude)) {
        if (inputs.latitude > 90 || inputs.latitude < -90) {
            errors.latitude = 'Invalid latitude value, please enter a decimal value between 0 and 90'
        }
        if (inputs.longitude > 180 || inputs.longitude < -180) {
            errors.longitude = 'Invalid longitude value, please enter a decimal value between 0 and 180'
        }
    }

    return errors;
}

export default validate;
