import { useEffect, useState } from "react";
import { SearchBar, CardGrid, Loader } from "./components";
import { randomNumberInInvertal } from "./utils";
import { getAllProfiles } from "./api";

function App() {
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const randFn = randomNumberInInvertal(1, 500);

  useEffect(() => {
    const fetchData = async () => {
      const randomProfiles = [];
      setLoading(true);
      try {
        const response = await getAllProfiles();
        for (let i = 0; i < count; i++) {
          let randomIndex = randFn();
          randomProfiles.push(response[randomIndex]);
        }
        setProfiles(() => randomProfiles);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!count) {
      setProfiles([]);
      return;
    }
    if (count > 0 && Number.isInteger(count)) {
      fetchData();
    } else {
      console.log(count, "Invalid Input, please enter a valid number");
    }
  }, [count]);

  return (
    <>
      <h1 className="title">Random Card Generator</h1>
      <SearchBar count={count} setCount={setCount} />
      {loading ? <Loader /> : <CardGrid profiles={profiles} />}
    </>
  );
}

export default App;
