const placesList = document.querySelector('.places-list');

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup-edit');
const popupImage = document.querySelector('.popup-image');

const cardForm = document.forms.card;
const userForm = document.forms.user;

const popupPic = document.querySelector('.popup__pic');




/*---------Задание 1 --------- 10 карточек из коробки-------------------*/




function createCard(name, link) {

  const newImage = document.createElement('div');
  const newDelButton = document.createElement('button')
  const newCardName = document.createElement('h3');

  newDelButton.classList.add('place-card__delete-icon');

  newImage.classList.add('place-card__image');
  newImage.setAttribute('style', 'background-image: url(' + link + ')');
  newImage.appendChild(newDelButton);

  newCardName.classList.add('place-card__name');
  newCardName.textContent = name;

  placesList.innerHTML += `
      <div class="place-card"> 
        ${newImage.outerHTML}
        <div class="place-card__description">
          ${newCardName.outerHTML}
          <button class="place-card__like-icon"></button>
        </div>
      </div>`

}




function addCards() {

  for (i = 0; i < initialCards.length; i++) {
    createCard(initialCards[i].name, initialCards[i].link);
  }

}

addCards();




/*---------Задание 2 ---------- Открытие формы-----------------------*/





function formOpenClose() {
  if (event.target.classList.contains('user-info__button') || event.target.classList.contains('place__form') || event.target.id =="place-close") {
    popup.classList.toggle('popup_is-opened');
  } else if (event.target.classList.contains('user-edit__button') || event.target.classList.contains('user__form') || event.target.id =="user-close") {
    popupEdit.classList.toggle('popup_is-opened');
  } else if (event.target.classList.contains('place-card__image') || event.target.id =="image-close") {
    setImageLink(event);
    popupImage.classList.toggle('popup_is-opened');
  }
}


function setImageLink(event) {
  const imageStyle = String(event.target.getAttribute('style'));
  const imageLink = imageStyle.substring(22, imageStyle.length - 1);
  popupPic.setAttribute('src', imageLink);
}


const userInfoButton = document.querySelector('.user-info__button');
userInfoButton.addEventListener('click', formOpenClose);

placesList.addEventListener('click', formOpenClose);




/*---------Задание 3 ---------- Закрытие формы-----------------------*/





const popupCloseButton = document.querySelector('.popup__close');
popupCloseButton.addEventListener('click', formOpenClose);






/*---------Задание 4 ---------- Лайки----------------------*/




function setLike(event) {
  event.target.classList.toggle('place-card__like-icon_liked');   // вешаю или удаляю класс
}



function likeOrRemove(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    setLike(event);
  } else {
    if (event.target.classList.contains('place-card__delete-icon')) {
      removeCard(event);
    }
  }
}




/*---------Задание  5---Добавление карточки ----------*/




function addNewCard() {

  const inputPlace = cardForm.elements.place;
  const inputLink = cardForm.elements.link;

  createCard(inputPlace.value, inputLink.value);
  formOpenClose();

  event.preventDefault();
}


cardForm.addEventListener('submit', addNewCard);




/*---------Задание 6 ---------- Удаление карточки ----------------------*/




function removeCard(event) {
  event.currentTarget.removeChild(event.target.closest('.place-card'));
}




placesList.addEventListener('click', likeOrRemove);  //  реализую 2 функции на 1 слушателе: лайки и удаление карточки







/*-------------------------------------------7 СПРИНТ-------------------------------------------------*/





/*---------Задание 1 ---------- PopUp "Редактировать профиль"  открытие и закрытие----------------------*/



const userEditButton = document.querySelector('.user-edit__button');
userEditButton.addEventListener('click', formOpenClose);

const popupEditCloseButton = document.querySelector('.popup-edit__close');
popupEditCloseButton.addEventListener('click', formOpenClose);



/*---------Задание 2 ---Редактировать профиль" редактирование профиля----------------------*/



function addNewUser() {

  const name = document.querySelector('.user-info__name');
  const job = document.querySelector('.user-info__job');  

    name.textContent = userForm.elements.name.value;
    job.textContent = userForm.elements.job.value;
    formOpenClose();

  event.preventDefault();
}

userForm.addEventListener('submit', addNewUser);


/*---------Задание 3 ---------- Открытие попапа с картинкойр------------------*/


const popupImageCloseButton = document.querySelector('.popup-image__close');
popupImageCloseButton.addEventListener('click', formOpenClose);



/*---------Задание 4 5-6---------- Валидация -----------------------------------------------------*/



const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const popupUserButton = document.querySelector('.popup__user-add-button');

const placeInput = document.querySelector('#place');
const linkInput = document.querySelector('#link');
const popupCardButton = document.querySelector('.popup__card-add-button');


function handleValidate(event) {
  validate(event.target);
}


nameInput.addEventListener('input', handleValidate);
jobInput.addEventListener('input', handleValidate);

placeInput.addEventListener('input', handleValidate);
linkInput.addEventListener('input', handleValidate);


function cardValidate() {
  if (validate(placeInput) && validate(linkInput)) {
    popupCardButton.classList.add('popup__button-is-active');
    popupCardButton.removeAttribute('disabled');
  } else {
    popupCardButton.classList.remove('popup__button-is-active');
    popupCardButton.setAttribute('disabled', true);
  }
}


function userValidate() {
  if (validate(nameInput) && validate(jobInput)) {
    popupUserButton.classList.add('popup__button-is-active');
    popupUserButton.removeAttribute('disabled');
  } else {
    popupUserButton.classList.remove('popup__button-is-active');
    popupUserButton.setAttribute('disabled', true);
  }
}


userForm.addEventListener('input', userValidate);
cardForm.addEventListener('input', cardValidate);


function checkLink() {
  const str = cardForm.elements.link.value;
  if (str.startsWith('https://') && !str.includes(' ') && !str.includes('"') && !str.includes(',') && str.includes('.')) {
    return true;
  } else return false;
}



const message = {
  validationLenght: 'Должно быть от 2 до 30 символов',
  validationRequired: 'Это обязательное поле',
  validationLink: 'Здесь должна быть ссылка',
  validationDone: ''
}

function validate(element) {

  const errorElement = document.querySelector(`#error-${element.id}`);

  if (element.id == 'link') {
    if (checkLink()) {
      errorElement.textContent = message.validationDone;
      errorElement.classList.remove('error-message__visible');
      return true;

    } else {
      errorElement.textContent = message.validationLink;
      errorElement.classList.add('error-message__visible');
      return false;
    }



  } else if (element.value.length === 0) {
    errorElement.textContent = message.validationRequired;
    errorElement.classList.add('error-message__visible');
    return false;

  } else if (element.value.length < 2 || element.value.length > 30) {
    errorElement.textContent = message.validationLenght;
    errorElement.classList.add('error-message__visible');
    return false;

  } else {
    errorElement.textContent = message.validationDone;
    errorElement.classList.remove('error-message__visible');
    return true;
  }
}


/**
 * Здравствуйте
 *
 * Так делать не очень хорошо
 *   } else if ((event.target.classList.contains('place-card__image')) || (event.target.parentElement.parentElement.classList.contains('popup-image'))){
 * Я имею ввиду parentElement.parentElement
 * лучще положите всё на один уровень. (исправил через id X кнопок)
 *
 * очень большие отступы, лучше делать один отступ
 *
 * Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов'
 * выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
 * Для примера : const lang = { validationLenght: 'Должно быть от 2 до 30 символов' }
 *
 * initialCards в отдельный файл, меньше строк, больше понимание,
 * подключить его можно через  <script src="js/initialCards.js"></script>
 *
 *
 */