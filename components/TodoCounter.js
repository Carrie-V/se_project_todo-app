class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector); // select the appropriate element
    this._completed = todos.filter((item) => item.completed).length; // number of completed todos
    this._total = todos.length; // the total number of todos
    this._updateText();
  }

  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is
  // created via the form.
  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
