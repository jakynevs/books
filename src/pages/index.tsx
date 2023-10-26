import { getSession } from "next-auth/react";
import Library from "../components/Library";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";
import "../components/styles/global";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const { data: session, status } = useSession();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  let homePage = (
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

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      const userId = session?.userId;

      const res = await fetch(`api/books?userId=${userId}`);
      const data = await res.json();
      setBooks(data);
    };
    fetchData();
  }, []);

  if (session) {
    homePage = (
      <>
        <Library books={books} />
      </>
    );
  }

  return <Layout>{homePage}</Layout>;
}
