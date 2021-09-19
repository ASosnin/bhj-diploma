/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const ToggleButton = document.querySelector(".sidebar-toggle");
    const Body = document.querySelector("body.sidebar-mini");
    ToggleButton.addEventListener("click", (event) => {
      Body.classList.toggle("sidebar-open");
      Body.classList.toggle("sidebar-collapse");
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    document.querySelector(".menu-item_login").addEventListener("click", () => {
      const modal = App.getModal("login");
      modal.open();
    });
    document
      .querySelector(".menu-item_register")
      .addEventListener("click", () => {
        const modal = App.getModal("register");
        modal.open();
      });
    document
      .querySelector(".menu-item_logout")
      .addEventListener("click", () => {
        console.log('close');
        User.logout((err, response) => {
          console.log(response);
          if (response.success === true) {
            App.setState("init");
          }
        });
      });
  }
}
