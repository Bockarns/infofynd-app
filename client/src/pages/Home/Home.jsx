import { useEffect, useState } from "react";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <section>
      <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
        InfoFynd
      </h1>
      <p>Svar från servern: {message || "Laddar..."}</p>
    </section>
  );
}

export default Home;
