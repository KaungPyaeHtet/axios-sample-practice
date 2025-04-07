import { Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [iName, setiName] = useState();
  const [email, setemail] = useState("");
  const [searchId, setSearchId] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users/").then((res) => {
      setComments(res.data);
      setLoading(false);
    });
  }, []);
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p style={{ padding: "25px" }}>Loading </p>
        <Spin size="large" />
      </div>
    );
  return (
    <div>
      <input
        placeholder="name filter"
        onChange={(e) => setiName(e.target.value)}
        value={iName || ""}
        type="text"
      />
      <input
        placeholder="email filter"
        onChange={(e) => setemail(e.target.value)}
        value={email || ""}
        type="email"
      />
      <input
        placeholder="id filter"
        onChange={(e) => setSearchId(e.target.value)}
        value={searchId || ""}
        type="number"
      />
      {email && (
        <section>
          <h1>Email Filter</h1>
          <ol>
            {comments
              .filter((comment) => comment.toLowerCase().email.includes(email.toLowerCase()))
              .map((comment) => (
                <li key={comment.id}>
                  <p>{comment.name}</p>
                  <span>{comment.email}</span>
                </li>
              ))}
          </ol>
        </section>
      )}
      {searchId && (
        <section>
          <h1>id Filter</h1>
            {comments
              .filter((comment) => comment.id === parseInt(searchId))
              .map((comment) => (
                <ol start={comment.id}>
                <li key={comment.id}>
                  <p>{comment.name}</p>
                  <span>{comment.email}</span>
                </li>
                </ol>
              ))}
        </section>
      )}
      {iName && (
        <section>
          <h1>Name Filter</h1>
          <ol>
          {comments
            .filter((comment) => comment.toLowerCase().email.includes(email.toLowerCase()))
            .map((comment) => (
              <li key={comment.id}>
                <p>{comment.name}</p>
                <span>{comment.email}</span>
              </li>
            ))}
            </ol>
        </section>
      )}
      {!iName & !email & !searchId ? (
        <ol>
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p>{comment.name}</p>
                <span>{comment.email}</span>
              </li>
            );
          })}
        </ol>
      ) : (
        ""
      )}
    </div>
  );
}
export default App;
