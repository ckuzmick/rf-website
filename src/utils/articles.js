import { createClient } from '@/utils/supabase/client';

async function fetchArticles() {
  const supabase = await createClient();
  const { data: rows } = await supabase.from("articles").select("*");

  // console.log(rows);

  const articles = [];

  for (const row of rows) {
    let authors = [];

    try {
      console.log("Row writers:", row.writers);

      authors = typeof row.writers === "string"
        ? JSON.parse(row.writers.replace(/'/g, '"'))
        : row.writers || [];
    } catch (error) {
      authors = [];
      console.error("Error parsing authors:", error);
    }

    authors = authors.map((author) => ({
      name: author.name,
      slug: author.name.toLowerCase().replace(/\s+/g, "-"),
      position: author.role || null,
    }));

    articles.push({
      title: row.title,
      authors: authors || [
        {
          name: "Test Author",
          slug: "test-author",
          position: "Contributing Writer"
        }
      ],
      date: row.date || null,
      slug: row.slug,
      cover: row.image || null,
      visibility: row.published,
      views: 0,
      trending: row.published,
      type: row.section || null,
      body: row.body || "",
      photocredit: row.image_author || null,
    });
  }

  // console.log(articles);

  return articles;
}; // Revalidate every 5 minutes

export default fetchArticles;
