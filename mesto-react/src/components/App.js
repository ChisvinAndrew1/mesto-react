import React, { useState } from "react";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import PopupWithForm from "./popup/PopupWithForm";
import PopupWithImage from "./popup/PopupWithImage";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={setSelectedCard}
        />
        <Footer />

        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          textButton="Сохранить"
          isPopupOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__input-container">
            <input
              defaultValue=""
              id="name-profile"
              name="name"
              autoComplete="off"
              placeholder="Имя и Фамилия"
              type="text"
              className="popup__input popup__input_el_name"
              minLength="2"
              maxLength="40"
              required
            />
            <span id="name-profile-error" className="error"></span>

            <input
              defaultValue=""
              autoComplete="off"
              id="profile-about"
              name="about"
              placeholder="О себе"
              type="text"
              className="popup__input popup__input_el_about"
              minLength="2"
              maxLength="200"
              required
            />
            <span id="profile-about-error" className="error"></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="gallery"
          title="Новое место"
          textButton="Создать"
          isPopupOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__input-container">
            <input
              id="name-gallery"
              autoComplete="off"
              defaultValue=""
              placeholder="Название"
              type="text"
              minLength="2"
              maxLength="30"
              name="place"
              className="popup__input popup__input_el_name-gallery"
              required
            />
            <span id="name-gallery-error" className="error"></span>

            <input
              id="sourse-gallery"
              autoComplete="off"
              defaultValue=""
              placeholder="Ссылка на картинку"
              type="url"
              name="link"
              className="popup__input popup__input_el_source"
              required
            />
            <span id="sourse-gallery-error" className="error"></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          textButton="Сохранить"
          isPopupOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__input-container">
            <input
              defaultValue=""
              id="name-avatar"
              name="avatar"
              autoComplete="off"
              type="url"
              className="popup__input popup__input_el_avatar"
              placeholder="Ссылка на аватар"
              required
            />
            <span id="name-avatar-error" className="error"></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="confirm"  
          title="Вы уверены?"
          textButton="Да"
          isPopupOpen={false}
          onClose={closeAllPopups}
        />

        <PopupWithImage card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
