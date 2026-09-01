import { useEffect, useState } from "react";
import PostCard from "../../components/Posts/PostCard";

export default function Archive() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArchivedPosts() {
      try {
        const res = await fetch("/api/posts/archived");
        if (!res.ok) {
          throw new Error("Kunde inte hämta arkiverade inlägg från servern.");
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArchivedPosts();
  }, []);

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Arkiv
        </h1>
        <p className="text-sm sm:text-base opacity-80">
          Här hittar du tidigare nyheter och utgångna erbjudanden.
        </p>
      </div>

      {loading && (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <p className="text-sm text-gray-500">Laddar arkivet...</p>
        </div>
      )}

      {error && <p className="text-red-500 font-medium">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="text-sm opacity-70 italic">
          Det finns inga arkiverade inlägg just nu.
        </p>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
