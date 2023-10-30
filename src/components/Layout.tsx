import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="site">
      <style jsx global>{`
        html,
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
