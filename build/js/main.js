const modal = document.querySelector('.modal');
const modalFormName = document.getElementById('user-name');
const modalFormTel = document.getElementById('user-tel');
const modalFormMessage = document.getElementById('form__modal-message');
const modalButton = document.querySelector('.form__button--feedback');
const feedbackFormTel = document.getElementById('tel');
const feedbackFormName = document.getElementById('name');
const feedbackFormMessage = document.getElementById('form__feedback-message');
const feedbackButton = document.querySelector('.form__button--modal');

//Валидация поля телефона
const addValuePhoneField = function (element) {
  //ставит +7 при фокусе на поле
  if (element) {
    element.addEventListener('focus', function () {
      if (element.value.length < 3) {
        element.value = '+7 (';
      }
    });
  }

  //убирает +7
  if (element) {
    element.addEventListener('blur', function () {
      if (element.value === '+7 (' || element.value.length <= 3) {
        element.value = '';
      }
    });
  }

  window.IMask(element, {
    mask: '+{7} (000) 000-00-00'
  });
};

addValuePhoneField(feedbackFormTel);

// кастомная валидация полей формы
const fieldValidation = function (name, tel, message, button) {
  if (name && tel) {
    name.addEventListener('input', function () {
      if (name.validity.patternMismatch) {
        name.setCustomValidity('Вводите только буквы');
      } else {
        name.setCustomValidity('');
      }
    });

    tel.addEventListener('input', function () {
      if (tel.validity.patternMismatch) {
        tel.setCustomValidity('Введите телефон в формате +7 ХХХ ХХХ ХХ ХХ');
      } else {
        tel.setCustomValidity('');
      }
    });
  }
  if (button) {
    button.addEventListener('submit', (evt) => {
      evt.preventDefault();

      localStorage.setItem(name.name, name.value);
      localStorage.setItem(tel.name, tel.value);
      localStorage.setItem(message.name, message.value);
    });
  }
};

fieldValidation(feedbackFormName, feedbackFormTel, feedbackFormMessage, feedbackButton);

// открывает модальное окно по кнопке заказа звонка
const pageHeaderButton = document.querySelector('.page-header__button');
pageHeaderButton.addEventListener('click', function () {
  if (modal) {
    modal.classList.remove('modal--close');
    modalFormName.focus();
    addValuePhoneField(modalFormTel);
    fieldValidation(modalFormName, modalFormTel, modalFormMessage, modalButton);

    // закрывает модальное окно тапом на ESC
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        if (!modal.classList.contains('modal__button-close')) {
          evt.preventDefault();
            modal.classList.add('modal--close');
        }
      }
    })

    // закрывает модальное окно тапом на крестик
    const modalCloseButton = modal.querySelector('.modal__button-close');
    modalCloseButton.addEventListener('click', function (evt) {
      if (!modal.classList.contains('modal--close')) {
        evt.preventDefault();
          modal.classList.add('modal--close');
      }
    })
  }
});

// аккордеон на мобильном меню
const navigationButton = document.querySelector('.navigation h2');
const navigation = document.querySelector('.navigation');
const contactsButton = document.querySelector('.contacts h2');
const contacts = document.querySelector('.contacts');

navigationButton.addEventListener('click', function () {
  navigation.classList.toggle('navigation--close');

  if (!contacts.classList.contains('contacts--close')) {
    contacts.classList.add('contacts--close');
  }
});

contactsButton.addEventListener('click', function () {
  contacts.classList.toggle('contacts--close');

  if (!navigation.classList.contains('navigation--close')) {
    navigation.classList.add('navigation--close');
  }
});
