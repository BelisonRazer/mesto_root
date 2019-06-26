"use strict";
/* Отлично: использование строгого режима ввода. Супер!
*  */
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
const popupAddBtn = document.querySelector('.user-info__button');
const popupCloseBtn = document.querySelector('.popup__close');
const form = document.forms.new;
const addButton = document.querySelector('.popup__button');

/* Хорошо: Все константы объявлены в начале документа, константы внутри функций объявлены сразу же и не разбросаны по телу функции.
* */
/* Модные способы документирования кода: */
/**
 * @description Компонент карточки объекта недвижимости
 * @param {string} name
 * @param {string} url
 * @return {HTMLDivElement}
 */
function createDefaultCard(name, url) { // card create

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

    placeCard.classList.add('place-card');
    placeCardImage.classList.add('place-card__image');
    placeCardBtnDel.classList.add('place-card__delete-icon');
    placeCardDescription.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');
    placeCardBtnLike.classList.add('place-card__like-icon');
    placeCardImage.style.backgroundImage = `url(${url})`;
    placeCardName.textContent = name;

    return placeCard;
    /* Отлично:
    * Ваш подход - достаточно хорош, в нем нету никакого оверкилла.
    * Есть несколько путей оптимизации, возможно, некоторые из них немного "забегают" вперед.
    * 1. Этот путь достаточно вкусный и вы, как разработчик, его обязательно оцените:
    *       Вы можете реализовать функцию, которая сразу же возвращает "кусок" разметки. Это решает проблему постоянного криэйта DOM-элементов.
    *       В дальнейшем, в нативном JS такие функции называются getter'ами. В стандарте ES6 для таких функций описан специальный синтаксис:
    *       get cardTemplate() {
    *           return `<div class="place-card">
                             Здесь вся ваша разметка карточки.
                         </div>`
    *       };
    *
    *       Обратите внимание на использование backtick ` - это новый элемент ES6, он ОООЧЕНЬ крут для разработки, в нем можно корректно переносить строки и вставлять внутрь разметки JS-код.
    *       Конкретнее про вставку JS-кода. Сейчас вы используете метод стандарта ES5 - ' + card.link + '. Грузно, не правда ли?
    *       В ES6, используя ` бэктик, появляется возможность интерполяции `Строкое значение разметки ${console.log('А здесь уже JavaScript')} `;
    *       Обладая данными знаниями, возникает идея оптимизации createCard - теперь эта функция по прежнему принимает name & url, содержащую нужные параметры. Также
    *       можно будет завести отдельную функцию геттер, внутри нашей функции createDefaultCard, в которую будут интерполированы наши значения (card.id, card.name и etc), которая
    *       будет возвращать уже готовую разметку карточки. Которую мы также будем append'ить в DOM.
    *       Резюмирую: createDefaultCard будет содержать в себе return, состоящий из разметки, заключенной в бэктики с интерполяцией нужных значений.
    *
    *       Можете опробовать этот метод и дать некий фидбэк в комментарии, оказался ли этот метод удобнее.
    * 2. Путь оптимизации уже текущего кода с использованием documentFragment и уменьшении работы над DOM.
    *       https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment - здесь можно почитать о данном методе и его кейсах.
    *       https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML - альтернативы appendChild
    *       https://developer.mozilla.org/ru/docs/Web/HTML/Element/template - очень интересный тег, его также можно использовать для создание компонентов.
    * */

}

function addDefaultCard() { // card add default
    for (let i = 0; i < initialCards.length; i++) {
        const placeCard = createDefaultCard(initialCards[i].name, initialCards[i].link);
        placesList.appendChild(placeCard);
    }
    /* Лаконично, круто, нету никакого оверкилла.
    * */
}

function togglePopup() { // close\open popup
    const popup = document.querySelector('.popup');
    popup.classList.toggle('popup_is-opened');
    addButton.setAttribute('disabled', true);
    addButton.style.cursor = 'default';
}

function addCustomCard(event) { // card add custom
    event.preventDefault();
    /* Обратить внимание:
    * Старайтесь не использовать глобальное значение event, т.к event находится в глобальной видимости, используйте e || evt*/

    const form = document.forms.new;
    const name = form.elements.name;
    const link = form.elements.link;

    const placeCard = createDefaultCard(name.value, link.value);
    placesList.appendChild(placeCard);

    form.reset();
    togglePopup();
}

popupAddBtn.addEventListener('click', togglePopup);
popupCloseBtn.addEventListener('click', togglePopup);
document.forms.new.addEventListener('submit', addCustomCard);
/* Лаконично, функции сгруппированы.
* */

placesList.addEventListener('click', function(event) {
    /* Отлично: вы использовали делегирование для динамически добавляющихся элементов.
    * Эдвайс: возникают случаи, когда делегирование может не срабатывать (Сущетсвуют кейсы, в которых делегирование не срабатывает, например события могут
    * не "бабблиться" с инпутов, в таких случаях не забывайте своевременно удалять обработчики событий с элементов, удаляющихся из DOM.
    * На самом деле, удалить обработчик не так просто, т.к есть очень сложная штука: функции, даже хранящиеся в переменных - не совмем переменные.
    * Если попытаться удалить ранее добавленную функцию, то мы не сможем удалить старую функцию, т.к каждый раз вызывая функцию, обращаясь к переменной, мы работаем в рамках нового экземпляра этой функции.
    * Для корректного удаления событий (Я сейчас очень забегаю вперед, но вы очень крутой студент и, думаю, вам будет интересно это почитать) существует метод .bind.
    * Почитать можно здесь:
    * http://qaru.site/questions/61592/removing-event-listener-which-was-added-with-bind - сайт со странными вопросами.
    * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind - более мудреная инфа про байнд.
    * */
    if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked'); // like card
    }

    if (event.target.classList.contains('place-card__delete-icon')) { 
        placesList.removeChild(event.target.closest('.place-card')); // delete card
    }
});

form.addEventListener('input', function() {
    
    const name = form.elements.name;
    const link = form.elements.link;

    if(name.value.length === 0 || link.value.length === 0) {
        addButton.setAttribute('disabled', true);
        addButton.style.cursor = 'default';
    } else {
        addButton.removeAttribute('disabled');
        addButton.style.cursor = 'pointer';
    }
    /* Отлично, очень хороший подход к интерфейсу. В брифе была указана возможность добавлять карточку без заполнения поля для фото по сабмиту формы,
    однако ничего страшного, что задание немного выполнено не по брифу - вы сделали все ультра-правильно, однако в категорию
    Можно лучше - можно отнести совет по стилизации таких форм, старайтесь добавлять на такие формы стили, которые явным образом указывают на то, что кнопка заблокирована,
    одного курсора может не хватить (Можно изменить цвет рамки, либо добавить opacity). В дальнейшем, при работе с сетью и отправления файлов, старайтесь сохранить этот хороший тон и блокировать submit во время отправки или обновления данных.

    * */
});

addDefaultCard();
//https://images.unsplash.com/photo-1560438718-eb61ede255eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60


/* Резюмирую по работе:
* Шикарная работа, у меня нету никаких сомнений в том, что вы делаете большие успехи в изучении JS;
* Код читаемый, декомпозированный, качественно выделены в отдельные функции правильные, на мой взгляд, группы методов. 10 / 10
*
* Обратите внимание:
*   Использование event, доступной в глобальной области видимости.
* Все остальные материалы и комментарии носят исключительно рекомендательный, забегающий вперед характер.
* Удачи! Принято!
* */