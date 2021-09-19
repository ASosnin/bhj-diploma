/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    if (data) {
      Account.create(data, (err, result) => {
        if (result?.success === true) {
          App.update();
          App.getModal('createAccount').close();
          this.element.reset();
        }
      })
    }
  }
}