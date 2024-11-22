import { google } from "googleapis";

// Next.js will revalidate the cache at most once every 60 seconds
export const revalidate = 60;

// Allow dynamic parameters for server-side rendering on unknown paths
export const dynamicParams = true;

// Fetch articles from Google Sheets
async function fetchArticles() {
  const sheetId = process.env.SHEET_ID;
  const keys = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  const auth = await google.auth.getClient({
    projectId: keys.project_id,
    credentials: {
      type: "service_account",
      private_key: keys.private_key,
      client_email: keys.client_email,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `Articles!A2:L`, // Adjust the range as needed
  });

  const rows = response.data.values || [];

  return rows.map((row) => ({
    title: row[0] || null,
    author: row[1] || null,
    date: row[2] || null,
    slug: row[4] || null,
    // cover: row[12] ? row[12].replace("https://drive.google.com/file/d/", "https://drive.usercontent.google.com/download?id=").slice(0, -18).concat("&export=view&authuser=0") || null : null,
    cover: row[5] || null,
    // views: parseInt(row[8]) || null,
    // trending: row[9] === "TRUE",
    type: row[10] || null,
    body: row[11] || null,
  }));
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await fetchArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Render the article page
export default async function Page({ params: paramsPromise }) {
  const params = await paramsPromise;
  const articles = await fetchArticles();
  const article = articles.find((a) => a.slug === params.slug);

  return (
    <main>
      <h1>{article.title}</h1>
      <img src={article.cover} alt={article.title} />
      <p>{article.author} - {article.date}</p>
      <article>{article.body}</article>
    </main>
  );
}
