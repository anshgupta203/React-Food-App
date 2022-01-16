import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isSixChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredName && enteredStreet && enteredPostal && enteredCity;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity
    })
  };

  

  const nameControlClasses = `${styles.control} ${
    formInputsValidity.name ? "" : styles.invalid
  }`;
  const streetControlClasses = `${styles.control} ${
    formInputsValidity.street ? "" : styles.invalid
  }`;
  const postalControlClasses = `${styles.control} ${
    formInputsValidity.postalCode ? "" : styles.invalid
  }`;
  const cityControlClasses = `${styles.control} ${
    formInputsValidity.city ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Enter a valid street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postalCode && <p>Enter a valid Postal code!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
