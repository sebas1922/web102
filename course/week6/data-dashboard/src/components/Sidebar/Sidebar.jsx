import style from './Sidebar.module.css'
import StyledInput from '../StyledInput/StyledInput.jsx'
import { useState, useEffect } from 'react';

const Sidebar = ({ filters, onFilterChange, onSubmit }) => {
    const [inputValues, setInputValues] = useState(filters);
    const [errors, setErrors] = useState({});

    // This effect syncs the local input state with the parent's filter state.
    // This is important for when the parent component might want to reset or
    // change the filters programmatically.
    useEffect(() => {
        setInputValues(filters);
    }, [filters]);

    const validateInput = (name, value) => {
        // Rule 1: The input must contain only digits (or be empty).
        // This is a regular expression that checks for non-digit characters.
        if (!(/^\d*$/).test(value)) {
            return 'Must be numbers only.';
        }

        // Convert the string value to a number for range checks.
        // If the value is an empty string, we'll treat it as null.
        const numValue = value === '' ? null : Number(value);

        switch (name) {
            case 'zipCode':
                if (value.length > 5) {
                    return 'Zip code cannot exceed 5 digits.';
                }
                break;
            case 'priceMin':
            case 'priceMax':
                if (numValue !== null && numValue > 99999) {
                    return 'Price cannot exceed $99,999.';
                }
                break;
            case 'bedrooms':
            case 'bathrooms':
                if (numValue !== null && numValue > 99) {
                    return 'Cannot exceed 99.';
                }
                break;
            default:
                // No specific validation for other fields
                break;
        }

        return ''; // Return an empty string if there are no errors
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Update the local state immediately for a responsive UI
        setInputValues(prev => ({ ...prev, [name]: value }));

        const error = validateInput(name, value);
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));

        // Only propagate the change to the parent if the input is valid
        if (!error) {
            onFilterChange(name, value);
        }
    };

    // The button's visibility logic is now derived directly from the currently
    // displayed input value, avoiding state timing issues.
    const isZipCodeValid = validateInput('zipCode', inputValues.zipCode) === '' && inputValues.zipCode.length === 5;


    return (
        <div className={style.sidebar}>
            <div className={style.filterGroup}>
                <h3>Zip Code</h3>
                <div className={style.zipInput}>
                    <div className={style.inputWrapper}>
                        <StyledInput
                            name="zipCode"
                            onChange={handleInputChange}
                            value={inputValues.zipCode}
                            placeholder={"Enter 5-digit zip"}
                        />
                        {errors.zipCode && <p className={style.error}>{errors.zipCode}</p>}
                    </div>
                </div>
            </div>

            <div className={style.filterGroup}>
                <h3>Price Range</h3>
                <div className={style.prices}>
                    <div className={style.inputWrapper}>
                        <StyledInput
                            name="priceMin"
                            onChange={handleInputChange}
                            value={inputValues.priceMin}
                            placeholder={"Min Price"}
                            type="number"
                        />
                        {errors.priceMin && <p className={style.error}>{errors.priceMin}</p>}
                    </div>
                    <span>to</span>
                    <div className={style.inputWrapper}>
                        <StyledInput
                            name="priceMax"
                            onChange={handleInputChange}
                            value={inputValues.priceMax}
                            placeholder={"Max Price"}
                            type="number"
                        />
                        {errors.priceMax && <p className={style.error}>{errors.priceMax}</p>}
                    </div>
                </div>
            </div>

            <div className={style.filterGroup}>
                <h3>Beds & Baths</h3>
                <div className={style.bedBath}>
                    <div className={style.inputWrapper}>
                        <StyledInput
                            name="bedrooms"
                            onChange={handleInputChange}
                            value={inputValues.bedrooms}
                            placeholder={"Beds"}
                            type="number"
                        />
                        {errors.bedrooms && <p className={style.error}>{errors.bedrooms}</p>}
                    </div>
                    <div className={style.inputWrapper}>
                        <StyledInput
                            name="bathrooms"
                            onChange={handleInputChange}
                            value={inputValues.bathrooms}
                            placeholder={"Baths"}
                            type="number"
                        />
                        {errors.bathrooms && <p className={style.error}>{errors.bathrooms}</p>}
                    </div>
                </div>
            </div>

            {isZipCodeValid && (
                <div className={style.submitGroup}>
                    <button onClick={onSubmit} className={style.submitButton}>
                        Find Listings
                    </button>
                </div>
            )}

        </div>
    )
}

export default Sidebar
