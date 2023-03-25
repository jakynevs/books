import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import Select from "react-select";

const options = [
  { label: "Read", value: "READ" },
  { label: "Not Read", value: "NR" },
  { label: "Reading", value: "READING" },
];
const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [readstatus, setReadStatus] = useState(null);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, author, readstatus };
      await fetch("api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Book</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            autoFocus
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            type="text"
            value={author}
          />
          <textarea
            cols={50}
            onChange={(e) => setReadStatus(e.target.value)}
            placeholder="Read status"
            rows={1}
            value={readstatus}
          />
          <input disabled={!author || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
