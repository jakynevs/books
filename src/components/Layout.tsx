import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import global from "./styles/global";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="site">
      <style jsx global>
        {global}
      </style>
      <style jsx>{`
        body {
          height: 100%;
          margin: 0;
          padding: 0;
        }

        .site-content {
          flex: 1 0 auto;
        }

        .site {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
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

        .layout {
          padding: 0 2rem;
        }
        button {
          cursor: pointer;
          height: 30px;
          width: 80px;
          line-height: 30px;
          border: 0;
          vertical-align: center;
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
        select {
          cursor: pointer;
          height: 30px;
          width: 80px;
          line-height: 30px;
          background: #ff69b4;
          box-sizing: border-box;
          border: 0;
          vertical-align: center;
          margin-left: 1rem;
        }
      `}</style>
      <div className="site-content">
        <div className="layout">{props.children}</div>
      </div>
      <Footer />
    </div>
  </div>
);

export default React.memo(Layout);
