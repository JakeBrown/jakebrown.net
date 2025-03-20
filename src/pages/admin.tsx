export default function AdminPage() {
  return (
    <div>
      <h1>Create a New Post</h1>
      <form
        hx-post="/api/posts"
        hx-trigger="submit"
        hx-target="#response"
        hx-swap="innerHTML"
      >
        <label htmlFor="slug">Slug:</label>
        <input type="text" id="slug" name="slug" required />

        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required />

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" required />

        <label htmlFor="tags">Tags (comma-separated):</label>
        <input type="text" id="tags" name="tags" />

        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" rows={5} required />

        <button type="submit">Add Post</button>
      </form>
      <div id="response"></div>
    </div>
  );
}
