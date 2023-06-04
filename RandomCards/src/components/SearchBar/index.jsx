import "./style.css";

export default function SearchBar({ count, setCount }) {
  const handleChange = (e) => {
    const { value } = e.target;
    const num = Math.abs(Number(value.trim()));
    if (num < 0 || num > 500) {
      return;
    }
    setCount(num);
  };
  return (
    <form className="search-wrapper" onSubmit={(e) => e.preventDefault()}>
      <div className="searchbar">
        <img
          src="https://api.iconify.design/ic:twotone-search.svg?color=%23707070"
          alt=""
          className="search-icon icon"
          height="25"
        />
        <input
          name="number"
          placeholder="Enter a number between 1 - 500"
          type="number"
          value={count.toString()}
          min={0}
          max={500}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
