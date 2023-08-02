import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <style jsx global>{`
      h1 {
        font-size: 20px;
      }
      h2 {
        font-size: 30px;
      }
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        background: rgba(0, 0, 0, 0.05);
      }

      input,
      textarea {
        font-size: 16px;
      }

      .layout {
        padding: 0 2rem;
      }
      button {
        cursor: pointer;
        height: 40px;
        width: 80px;
        line-height: 40px;
        background: #ececec;
        box-sizing: border-box;
        border: 0;
        vertical-align: center;
      }

      button + button {
        margin-left: 1rem;
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
      .noRating {
        color: #ff69b4;
      }
    `}</style>
    <div className="layout">{props.children}</div>
  </div>
);

export default React.memo(Layout);
