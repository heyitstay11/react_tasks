import React from "react";

function Card({ instrument, handlePlay }) {
  const { name, description, wiki, thumbnail, file } = instrument;
  return (
    <article onClick={() => handlePlay(file)}>
      <img src={thumbnail} alt="" />
      <div className="content">
        <h3>{name}</h3>
        <p>{description}</p>
        <a onClick={(e) => e.stopPropagation()} target={"_blank"} href={wiki}>
          Wikipedia
        </a>
      </div>
    </article>
  );
}

export default Card;
