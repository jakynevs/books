import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import Select from "react-select";

const Create: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    read: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch("api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
            name="title"
            autoFocus
            onChange={handleChange}
            placeholder="Title"
            type="text"
            value={formData.title}
          />
          <input
            name="author"
            autoFocus
            onChange={handleChange}
            placeholder="Author"
            type="text"
            value={formData.author}
          />
          <label>
            Reading status:
            <select name="read" value={formData.read} onChange={handleChange}>
              <option value="READING">Reading</option>
              <option selected value="NR">
                Not read
              </option>
              <option value="READ">Read</option>
            </select>
          </label>
          <input
            disabled={!formData.author || !formData.title}
            type="submit"
            value="Create"
          />
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

export default Create;
