function Card({ profile, index }) {
  const {
    gender = "N/A",
    email = "john.doe@example.com",
    phone = "99999999",
    nat,
  } = profile || {};
  const { title = "Mr", first = "John", last = "Doe" } = profile?.name || {};
  const { medium = "avatar.jpg" } = profile?.picture || {};
  const { age = 31 } = profile?.dob || {};

  return (
    <li className="card">
      <span className="tag">{index + 1}</span>
      <img
        src={nat ? `https://flagsapi.com/${nat}/flat/64.png` : "bg.jpg"}
        alt=""
        className="banner"
      />
      <img src={medium} alt="" height={80} width={80} className="profile-pic" />
      <div className="card-content">
        <h3>{`${title} ${first} ${last}`}</h3>
        <p>{email}</p>
        <p>
          Age: <strong>{age}</strong>
        </p>
        <p>
          Gender: <strong>{gender}</strong>
        </p>
        <p>
          Phone: <strong>{phone}</strong>
        </p>
      </div>
    </li>
  );
}

export default Card;
