/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw new Error("element cannot be empty");
    }
  }

  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.addEventListener("click", (e) => {
      const ButtonIncome = e.target.closest("button.create-income-button");
      const ButtonExpense = e.target.closest("button.create-expense-button");
      if (ButtonIncome) {
        App.getModal("newIncome").open();
      }
      if (ButtonExpense) {
        App.getModal("newExpense").open();
      }
    });
  }
}
