import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Router, { useRouter } from "next/router";
import { Rate } from "antd";

const Edit: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: router.query.id,
    title: router.query.title,
    author: router.query.author,
    read: router.query.read,
    rating: Number(router.query.rating),
    thoughts: router.query.thoughts,
  });
  const [disabled, setDisabled] = useState(true);
  const [isRead, setIsRead] = useState(() => bookRead(formData.read));

  const onClick = () => {
    setDisabled(true);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    name === "read" && setIsRead(bookRead(value));
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleStarChange(e) {
    const value = e;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        rating: value,
      };
    });
  }

  useEffect(() => {
    if (!formData.id) {
      const getLocalFormData = window.localStorage.getItem("formValues");
      const savedValues = JSON.parse(getLocalFormData);
      setFormData(() => {
        return {
          id: savedValues.id,
          title: savedValues.title,
          author: savedValues.author,
          read: savedValues.read,
          rating: savedValues.rating,
          thoughts: savedValues.thoughts,
        };
      });
      setIsRead(savedValues.read);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("formValues", JSON.stringify(formData));
    window.localStorage.setItem("isRead", JSON.stringify(isRead));
  });

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDisabled(true);
    const id = formData.id;
    try {
      await fetch(`api/book/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      window.localStorage.removeItem("formValues");
      await Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  function bookRead(read) {
    return read === "READ" ? true : false;
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Edit Book</h1>
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
                Yet to read
              </option>
              <option value="READ">Read</option>
            </select>
          </label>
          {isRead && (
            <a>
              <Rate
                count={4}
                allowClear={true}
                style={{ color: "#96e7f1" }}
                onChange={handleStarChange}
                defaultValue={0}
                value={formData.rating}
              />
              <input
                name="thoughts"
                onChange={handleChange}
                placeholder="Thoughts..."
                type="text"
                value={formData.thoughts}
              />
            </a>
          )}
          <button
            disabled={
              formData.title === router.query.title &&
              formData.author === router.query.author &&
              formData.read === router.query.read &&
              formData.rating === Number(router.query.rating) &&
              formData.thoughts === router.query.thoughts
            }
            onClick={onClick}
          >
            Update
          </button>
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

export default Edit;
