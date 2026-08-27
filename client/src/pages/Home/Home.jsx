import { useEffect, useState } from "react";
import Hero from "../../components/SiteComponents/Hero";
import PostCard from "../../components/Posts/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error("Kunde inte hämta inlägg från servern.");
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section>
      <Hero />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Aktuellt just nu</h2>

        {loading && (
          <div className="min-h-screen flex flex-col items-center justify-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <p className="text-sm text-gray-500">Laddar inlägg...</p>
          </div>
        )}

        {error && <p className="text-red-500 font-medium">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
