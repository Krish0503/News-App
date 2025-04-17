const apiKey = "f0888fd4f83e4eb4bb5e0154d65a0203";

async function getNews() {
  const topic = document.getElementById("topicInput").value.trim();
  const loader = document.getElementById("loader");
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "";

  if (!topic) {
    alert("Please enter a topic.");
    return;
  }

  loader.classList.remove("hidden");

  const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = `${proxy}https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    loader.classList.add("hidden");

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news found for this topic.</p>";
      return;
    }

    data.articles.slice(0, 10).forEach(article => {
      const articleDiv = document.createElement("div");
      articleDiv.classList.add("article");
      articleDiv.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(articleDiv);
    });
  } catch (error) {
    loader.classList.add("hidden");
    newsContainer.innerHTML = "<p>Error loading news. Please try again later.</p>";
    console.error(error);
  }
}


