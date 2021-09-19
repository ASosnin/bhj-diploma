/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.counter = 0;
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const userCurrent = User.current();
    if (userCurrent) {
      Account.list(userCurrent, (error, result) => {
        if (result?.success === true) {
          const select = this.element.querySelector(".accounts-select");
          select.textContent = "";
          console.dir(select);
          result.data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.id;
            option.innerText = item.name;
            select.appendChild(option);
          });
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    console.log(data);

    Transaction.create(data, (err, result) => {
      if (result?.success) {
        this.element.reset();
        const modalNameType =
          data.type.toLowerCase().charAt(0).toUpperCase() + data.type.slice(1);
        App.getModal(`new${modalNameType}`).close();
        App.update();
      }
    });
  }
}
