"use strict";

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Нургуш',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
        name: 'Тулиновка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
        name: 'Остров Желтухина',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
        name: 'Владивосток',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
];
const placesList = document.querySelector('.places-list');

// const popupAddBtn = document.querySelector('.user-info__button');
const popupAddBtn = document.getElementsByName('add')[0];
const popupEditProfileBtn = document.getElementsByName('edit')[0];

const popupCloseBtnAdd = document.querySelector('.popup__close-add');
const popupCloseBtnEdit = document.querySelector('.popup__close-edit');
const addButton = document.getElementsByName('addPopup')[0];
const saveButton = document.getElementsByName('savePopup')[0];
const form = document.forms.new;
const formSecond = document.forms.second;
const formBtnStt = formBtnState();
const toggPopup = togglePopup();

/**
 * @description Прошлый вариант создания и добавления в DOM карточек, без использования <template>.
 * @param {string} name
 * @param {string} url
 * @return {HTMLDivElement} fragment
 */
function createDefaultCard(name, url) { // card create

    if ('content' in document.createElement('template')) {
        const templ = document.querySelector('.template');
        const div = templ.content.querySelectorAll('div');
        const h3 = templ.content.querySelectorAll('h3');

        div[1].style.backgroundImage = `url(${url})`;
        h3[0].textContent = name;

        const clonePlaceCard = document.importNode(templ.content, true);
        return clonePlaceCard;
    } else {
        console.log('тег <template> не поддерживатся браузером');

        const clonePlaceCard = document.createDocumentFragment();
        const placeCard = document.createElement('div');
        const placeCardImage = document.createElement('div');
        const placeCardBtnDel = document.createElement('button');
        const placeCardDescription = document.createElement('div');
        const placeCardName = document.createElement('h3');
        const placeCardBtnLike = document.createElement('button');

        placeCardImage.appendChild(placeCardBtnDel);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(placeCardBtnLike);
        placeCard.appendChild(placeCardImage);
        placeCard.appendChild(placeCardDescription);
        clonePlaceCard.appendChild(placeCard);

        placeCard.classList.add('place-card');
        placeCardImage.classList.add('place-card__image');
        placeCardBtnDel.classList.add('place-card__delete-icon');
        placeCardDescription.classList.add('place-card__description');
        placeCardName.classList.add('place-card__name');
        placeCardBtnLike.classList.add('place-card__like-icon');
        placeCardImage.style.backgroundImage = `url(${url})`;
        placeCardName.textContent = name;

        return clonePlaceCard;
    }
}

function addDefaultCard() { // card add default
    for (let i = 0; i < initialCards.length; i++) {
        const clonePlaceCard = createDefaultCard(initialCards[i].name, initialCards[i].link);
        placesList.appendChild(clonePlaceCard);
    }
}

function togglePopup() { // close\open popup

    function toggPopupAddCard() {
        const popup = document.querySelector('.popup-addCard');
        popup.classList.toggle('popup_is-opened');
        formBtnStt.deactive(addButton);
    }

    function toggPopupEditProfile() {
        const popup = document.querySelector('.popup-editProfile');
        popup.classList.toggle('popup_is-opened');
        formBtnStt.deactive(saveButton);
    }

    return {
        toggPopupAddCard,
        toggPopupEditProfile
    }
}

function addCustomCard(evt) { // card add custom
    evt.preventDefault();

    const form = document.forms.new;
    const name = form.elements.name;
    const link = form.elements.link;

    const placeCard = createDefaultCard(name.value, link.value);
    placesList.appendChild(placeCard);

    form.reset();
    toggPopup.toggPopupAddCard();
}

function editUserProfile(e) { //---------------------------------------------------------
    e.preventDefault();

    const form = document.forms.second;
    const yourName = form.elements.yourName;
    const aboutYou = form.elements.aboutYou;

    form.reset();
    toggPopup.toggPopupEditProfile();
}

function formBtnState() {

    function active(btn) {
        btn.removeAttribute('disabled');
        btn.style.cursor = 'pointer';
        btn.style.background = "#000000";
        btn.style.color = '#ffffff';
        btn.style.opacity = "1";
    }

    function deactive(btn) {
        btn.setAttribute('disabled', true);
        btn.style.cursor = 'default';
        btn.style.background = "#FFFFFF";
        btn.style.color = '#000000';
        btn.style.opacity = "0.2";
    }

    return {
        active,
        deactive
    };
}

popupAddBtn.addEventListener('click', toggPopup.toggPopupAddCard);
popupCloseBtnAdd.addEventListener('click', toggPopup.toggPopupAddCard);
popupEditProfileBtn.addEventListener('click', toggPopup.toggPopupEditProfile);
popupCloseBtnEdit.addEventListener('click', toggPopup.toggPopupEditProfile);

document.forms.new.addEventListener('submit', addCustomCard);
document.forms.second.addEventListener('submit', editUserProfile);

placesList.addEventListener('click', function (event) {

    if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked'); // like card
    }

    if (event.target.classList.contains('place-card__delete-icon')) {
        placesList.removeChild(event.target.closest('.place-card')); // delete card
    }
});

form.addEventListener('input', function () {

    const name = form.elements.name;
    const link = form.elements.link;

    if (name.value.length === 0 || link.value.length === 0) {
        formBtnStt.deactive(addButton);
    } else {
        formBtnStt.active(addButton);
    }
});

formSecond.addEventListener('input', function () {

    const yourName = formSecond.elements.yourName;
    const aboutYou = formSecond.elements.aboutYou;

    if (yourName.value.length === 0 || aboutYou.value.length === 0) {
        formBtnStt.deactive(saveButton);
    } else {
        formBtnStt.active(saveButton);
    }
});

addDefaultCard();
//https://images.unsplash.com/photo-1560438718-eb61ede255eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60