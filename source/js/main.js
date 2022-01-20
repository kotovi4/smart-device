const modal = document.querySelector('.modal');
const modalFormName = modal.querySelector('#modal__form-name');
const modalFormTel = modal.querySelector('#modal__form-tel');
const modalFormMessage = modal.querySelector('#modal__form-message');
const modalButton = modal.querySelector('.modal__button');
const feedbackFormTel = document.querySelector('#feedback__tel');
const feedbackFormName = document.querySelector('#feedback__name');
const feedbackFormMessage = document.querySelector('#feedback__message');
const feedbackButton = document.querySelector('.feedback__button');

// открывает модальное окно по кнопке заказа звонка
const pageHeaderButton = document.querySelector('.page-header__button');
pageHeaderButton.addEventListener('click', function (evt) {
  modal.classList.remove('modal--close');
  modalFormName.focus();
});

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
addValuePhoneField(modalFormTel);

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

    button.addEventListener('submit', (evt) => {
      evt.preventDefault();

      localStorage.setItem(name.name, name.value);
      localStorage.setItem(tel.name, tel.value);
      localStorage.setItem(message.name, message.value);
    });

  }
}

fieldValidation(feedbackFormName, feedbackFormTel, feedbackFormMessage, feedbackButton);
fieldValidation(modalFormName, modalFormTel, modalFormMessage, modalButton);


// аккордеон на мобильном меню
const navigationButton = document.querySelector('.navigation h2');
const navigationList = document.querySelector('.navigation__list');
const contactsButton = document.querySelector('.contacts h2');
const contactsList = document.querySelector('.contacts__list');

navigationButton.addEventListener('click', function () {
  navigationList.classList.toggle('navigation__list--close');

  if (!contactsList.classList.contains('contacts__list--close')) {
    contactsList.classList.add('contacts__list--close');
  }
});

contactsButton.addEventListener('click', function () {
  contactsList.classList.toggle('contacts__list--close');

  if (!navigationList.classList.contains('navigation__list--close')) {
    navigationList.classList.add('navigation__list--close');
  }
});
