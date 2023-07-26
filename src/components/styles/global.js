import css from "styled-jsx/css";

export default css.global`
  body {
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.8;
    color: #333;
    font-family: sans-serif;
  }
  h1 {
    font-weight: 700;
  }
  p {
    margin-bottom: 10px;
  }
  .book {
    background: skyblue;
    transition: box-shadow 0.1s ease-in;
    padding: 2rem;
  }

  .book:hover {
    box-shadow: 1px 1px 3px #aaa;
  }

  .book + .book {
    margin-top: 2rem;
  }
`;
