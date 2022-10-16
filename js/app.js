const loadAllCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  return data.data.news_category;
};

const loadDisplayCategories = async () => {
  const categories = await loadAllCategories();
  categories.forEach((category) => {
    // console.log(category.category_name);
    const displayCatagories = document.getElementById("display-catagories");
    const div = document.createElement("div");
    div.classList.add("catagories");
    div.innerHTML = `
     <div >
     <h3 onclick ="loadAllNewsParper('${category.category_id}')" class ="hover:bg-green-200 p-2 rounded-lg">${category.category_name}</h3>
     </div>
    `;
    displayCatagories.appendChild(div);
  });
  //   console.log(categories);
};
loadDisplayCategories();

const loadAllNewsParper = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

  //   console.log(url);
  const res = await fetch(url);
  const data = await res.json();

  displayLoadAllNews(data.data);
  //   console.log("check click newsparper", id);
};
const displayLoadAllNews = async (allNews) => {
  //   const allNews = await loadAllNewsParper();
  const allNewsContainer = document.getElementById("allnews-container");
  allNewsContainer.textContent = "";
  allNews.forEach((news) => {
    console.log(news);
    const displayDiv = document.createElement("div");

    displayDiv.innerHTML = `
  <div class="card w-3/4 mx-auto glass flex flex-row  ">
       <figure><img class="w-72  " src="${news.image_url}" alt="car!"/></figure>
     <div class="card-body">
            <h2 class="card-title">${news.author.name}</h2>
            <p>How to park your car at your garage?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Learn now!</button>
            </div>
      </div>
   </div>
    `;
    allNewsContainer.appendChild(displayDiv);
  });
};
// displayLoadAllNews();
