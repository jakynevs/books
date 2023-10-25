import { getSession } from "next-auth/react";
import Library from "../components/Library";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const { data: session, status } = useSession();
  let homePage = (
    <div className="homePage">
      Login to access your library or to start adding books
      <style jsx>{``}</style>
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
