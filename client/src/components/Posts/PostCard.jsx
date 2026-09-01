export default function PostCard({ post }) {
  const isOffer = post.type === "offer";
  const defaultPlaceholder =
    "/images/posts/placeholders/placeholder-light.webp";

  return (
    <article className="flex flex-col bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-65 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <img
          src={post.imageUrl || defaultPlaceholder}
          alt={post.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultPlaceholder;
          }}
          className="w-full h-full object-cover object-[45%_55%]"
        />
      </div>
      <div className="p-5 flex flex-col grow">
        <div className="mb-2">
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              isOffer
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
            }`}
          >
            {isOffer ? "Erbjudande" : "Nyhet"}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>

        <p className="text-sm grow mb-4 opacity-80">{post.description}</p>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs opacity-60">
          <span>{post.authorName || "InfoFynd"}</span>
          <span>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("sv-SE")
              : ""}
          </span>
        </div>
      </div>
    </article>
  );
}
