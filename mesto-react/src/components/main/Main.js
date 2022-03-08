import api from "../../utils/Api.js";
import React, { useState } from "react";
import Card from "../card/Card.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api
      .getDefaultData()
      .then((data) => {
        const [userData, cardList] = data;
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile page__profile">
        <div className="profile__cover" onClick={onEditAvatar}>
          <img
            className="profile__image"
            src={userAvatar}
            alt="фотография профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
            type="button"
          ></button>
          <p className="profile__about-self">{userDescription}</p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__add-button"
        ></button>
      </section>

      <section className="gallery page__gallery">
        {console.log(cards)}
        {cards.map((cardData) => (
          <Card card={cardData} key={cardData._id} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
