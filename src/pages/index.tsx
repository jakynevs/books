import { getSession } from "next-auth/react";
import Library from "../components/Library";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import "../components/styles/global";
import Link from "next/link";
import SearchGoogleBooks from "../components/SearchGoogleBooks";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [books, setBooks] = useState([]);

  const isActive = (pathname: string) => router.pathname === pathname;

  const fetchBooks = async (userId: string) => {
    const res = await fetch(`api/books?userId=${userId}`);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    console.log("Session:", session);
    if (session?.userId) {
      fetchBooks(session.userId);
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      {session ? (
        <>
          <SearchGoogleBooks />
          <Library books={books} />
        </>
      ) : (
        <NoSessionWelcome isActive={isActive} />
      )}
    </Layout>
  );
};

const NoSessionWelcome = ({
  isActive,
}: {
  isActive: (pathname: string) => boolean;
}) => (
  <div className="homePage">
    <div className="noSessionWelcome">
      <Link href="/api/auth/signin">
        <a className="navLink" data-active={isActive("/signup")}>
          Log in for functionality
        </a>
      </Link>
    </div>
  </div>
);

export default Home;
