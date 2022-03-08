
function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
      } 

    return (
    <article className="card" onClick={handleClick}>
        <img className="card__image" src={card.link} alt={card.name}/>
        <button type="button" className="card__trash"></button>
        <h3 className="card__el-title">{card.name}</h3>
        <div className="card__el-stroke">
            <button type="button" className="card__stroke"></button>
            <p className="card__sum-stroke">{card.likes.length}</p>
        </div>
          </article>
    );
}

export default Card;