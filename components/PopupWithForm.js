import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    //or is it super({popupSelector});?
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      //TODO add a key/value pair for each input
      //the key is input.name
      //the value is input.value
      //refer back to first objects lesson in sprint 4?
      //use braclets notation, not dot notation
      //ONE line of code is all that's needed
      inputValues[input.name] = input.value;
    });
    console.log(inputValues);
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      //TODO pass result of _getInputValues to submission handler
      //call handleFormSubmit

      this._handleFormSubmit(inputValues);
    });
  }
}

export default PopupWithForm;
