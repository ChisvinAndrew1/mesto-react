import React, { useState } from "react";
import api from "../utils/Api";

import Header from "./Headering/Header";
import Main from "./Maining/Main";
import Footer from "./Footering/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import PopupWithImage from "./PopupWithImage/PopupWithImage";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api
      .getDefaultData()
      .then((data) => {
        const [userData, cardList] = data;
        setCurrentUser(userData);
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.checkDateLike(!isLiked, card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  // state.filter((c) => c._id !== card._id

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(User) {
    api
      .editInfo({ name: User.name, about: User.about })
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar({ avatar })
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
    // console.log(newCard)
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
