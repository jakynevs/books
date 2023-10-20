import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      Environment: {process.env.NEXT_PUBLIC_ENV}
      <style jsx>
        {`
          footer {
            display: flex;
            padding: 2rem;
            align-items: center;
          }
        `}
      </style>
    </footer>
  );
};

export default React.memo(Footer);
