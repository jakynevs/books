import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();

  const leftContent = session ? (
    <p>{session.user.name}'s Library </p>
  ) : (
    <p>Welcome to Jak's Books</p>
  );

  let right = null;
  if (session) {
    right = (
      <div className="rightItems">
        <button
          className="headerButton"
          onClick={() =>
            router.push({ pathname: "/edit", query: { isNewBook: true } })
          }
        >
          Add book
        </button>
        <button className="headerButton" onClick={() => signOut()}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <nav>
      <div className="left">
        <Link href="/">
          <a className="headerButton" data-active={isActive("/")}>
            {leftContent}
          </a>
        </Link>
      </div>
      <div className="right">{right}</div>
    </nav>
  );
};

export default React.memo(Header);
