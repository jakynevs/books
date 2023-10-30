import css from "styled-jsx/css";

export default css.global`
  body {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.8;
    font-family: sans-serif;
    flex-direction: column;
  }
  h1 {
    font-weight: 700;
    font-size: 20px;
  }
  p {
    margin-bottom: 10px;
  }
  button + button {
    margin: 0rem 1rem;
  }

  .pageParent button {
    cursor: pointer;
    height: 30px;
    width: 80px;
    line-height: 30px;
    border: 0;
    vertical-align: center;
    border: none;
    background: #ff69b4;
  }

  .homePage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh; /* 100% of the viewport height */
  }
  .book {
    background: skyblue;
    transition: box-shadow 0.1s ease-in;
    padding: 2rem;
  }
  .headerButton {
    cursor: pointer;
    color: skyblue;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
    font-size: 30px;
    background: none;
    border: none;
    text-decoration: none;
  }
  .book:hover {
    box-shadow: 1px 1px 3px #aaa;
  }
  a {
    text-decoration: none;
  }
  .book + .book {
    margin-top: 2rem;
  }
  .pageParent {
    background: skyblue;
    line-height: 20px;
  }
  .pageChild {
    padding: 30px;
  }
  nav {
    display: flex;
    padding: 2rem;
    align-items: center;
  }
  .dropDown {
    text-align: center;
    margin-right: 1rem;
  }
  .navlink {
    font-size: 30px;
    background: none;
    border: none;
    text-decoration: none;
  }
  a,
  a:visited {
    color: skyblue;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
    cursor: pointer;
    text-decoration: none; /* Remove underline */
  }

  .right {
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
  }
  .rightItems {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  body {
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    background: pink;
  }
  input,
  textarea {
    font-size: 16px;
  }
  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.25rem;
    border: 0.125rem solid rgba(0, 0, 0, 0.2);
  }
  .layout {
    padding: 0 2rem;
  }
`;
