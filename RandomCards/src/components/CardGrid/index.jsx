import "./style.css";
import Card from "../Card";

export default function CardGrid({ profiles }) {
  return (
    <div className="card-grid-wrapper">
      {profiles?.length > 0 ? (
        <ul className="card-grid">
          {profiles.map((profile, index) => {
            return <Card key={index} profile={profile} index={index} />;
          })}
        </ul>
      ) : (
        <>
          <p className="message">No cards to show, enter a number</p>
        </>
      )}
    </div>
  );
}
