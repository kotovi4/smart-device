const modal = document.querySelector('.modal');
const modalFormName = modal.querySelector('#modal__form-name');
const modalFormTel = modal.querySelector('#modal__form-tel');
const modalFormMessage = modal.querySelector('#modal__form-message');
const modalButton = modal.querySelector('.modal__button');
const feedbackFormTel = document.querySelector('#feedback-tel');
const feedbackFormName = document.querySelector('#feedback-name');
const feedbackFormMessage = document.querySelector('#modal__form-message');
const feedbackButton = document.querySelector('.feedback__button');

// Валидация полей формы
if (nameInput && telInput) {
  nameInput.addEventListener('input', function () {
    if (nameInput.validity.patternMismatch) {
      nameInput.setCustomValidity('Вводите только буквы');
    } else {
      nameInput.setCustomValidity('');
    }
  });

  telInput.addEventListener('input', function () {
    if (telInput.validity.patternMismatch) {
      telInput.setCustomValidity('Введите телефон в формате +7 ХХХ ХХХ ХХ ХХ');
    } else {
      telInput.setCustomValidity('');
    }
  });

  formButton.addEventListener('click', function () {
    localStorage.setItem(nameInput.name, nameInput.value);
    localStorage.setItem(telInput.name, telInput.value);
  });
}

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
var addValuePhoneField = function (element) {
  //ставит +7 при фокусе на поле
  if (element) {
    element.addEventListener('focus', function () {
      if (element.value.length < 3) {
        element.value = '+7 (';
      }
    });
  }

  // убирает +7
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

addValuePhoneField(modalFormTel);
addValuePhoneField(feedbackFormTel);

// //Валидация полей формы
const fieldValidation = function (name, tel, message, button) {
  if (name && tel && message) {
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

    message.addEventListener('input', function () {
      if (message.validity.patternMismatch) {
        message.setCustomValidity('Вводите ваш вопрос');
      } else {
        message.setCustomValidity('');
      }
    });

    button.addEventListener('submit', function () {
      localStorage.setItem(name.name, name.value);
      localStorage.setItem(tel.name, tel.value);
      localStorage.setItem(message.name, message.value);
    });
  }
}

fieldValidation(modalFormName, modalFormTel, modalFormMessage, modalButton);
fieldValidation(feedbackFormName, feedbackFormTel, feedbackFormMessage, feedbackButton);

// // Проверка заполненности полей формы перед отправкой,

// const modalForm = modal.querySelector('.modal__form');
// modalForm.addEventListener('submit', function (evt) {
//   if (!modal.classList.contains('modal--close')) {
//     evt.preventDefault();

//     localStorage.setItem('modalFormName', modalFormName.value);
//     localStorage.setItem('modalFormTel', modalFormTel.value);
//     localStorage.setItem('modalFormMessage', modalFormMessage.value);

//     modal.classList.add('modal--close');
//   }
// });
