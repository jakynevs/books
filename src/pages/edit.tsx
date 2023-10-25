import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Router, { useRouter } from "next/router";
import { Rate } from "antd";
import globalStyles from "../components/styles/global";
import { getSession } from "next-auth/react";

const Edit: React.FC = () => {
  const router = useRouter();
  const [isNewBook, setIsNewBook] = useState(router.query.isNewBook);
  const [userId, setUserId] = useState(null);
  const [pageTitle, setPageTitle] = useState(
    isNewBook ? "Add book" : "Edit book"
  );

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setUserId(session?.userId);
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState(
    isNewBook
      ? {
          id: "",
          title: "",
          author: "",
          read: "",
          rating: null,
          thoughts: "",
        }
      : {
          id: router.query.id,
          title: router.query.title,
          author: router.query.author,
          read: router.query.read,
          rating: Number(router.query.rating),
          thoughts: router.query.thoughts,
        }
  );
  const [disabled, setDisabled] = useState(true);
  const [isRead, setIsRead] = useState(() => bookRead(formData.read));

  useEffect(() => {
    if (!isNewBook && !formData.id) {
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
    window.localStorage.setItem(
      "isNewBook",
      JSON.stringify(router.query.isNewBook)
    );
    Layout;
  });

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

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDisabled(true);
    const id = formData.id;
    const bodyData = { ...formData, userId: userId };

    isNewBook
      ? await fetch("api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        })
      : await fetch(`api/book/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        });
    window.localStorage.removeItem("formValues");
    await Router.push("/");
  };

  function bookRead(read) {
    return read === "READ" ? true : false;
  }

  return (
    <Layout>
      <div className="pageParent">
        <div className="pageChild">
          <form onSubmit={submitData}>
            <h1> {pageTitle}</h1>
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
                  style={{ color: "#FF69B4" }}
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
              onClick={submitData}
            >
              {isNewBook ? "Create" : "Update"}
            </button>
            <a className="back" href="#" onClick={() => Router.push("/")}>
              or Cancel
            </a>
          </form>
        </div>
      </div>

      <style jsx global>
        {globalStyles}
      </style>
    </Layout>
  );
};

export default Edit;
