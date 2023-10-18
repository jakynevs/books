import { getSession } from "next-auth/react";
import Library from "../components/Library";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";

export default function Home() {
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      const userId = session?.userId;
  
      const res = await fetch(`api/books?userId=${userId}`);
      const data = await res.json();
      setBooks(data)
    }; 
    fetchData();
  }, []);
  
  return (
    <Layout>
      <Library books={books} />
    </Layout>
  );
}
