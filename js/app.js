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
       <figure><img class="h-full " src="${
         news.image_url
       }" alt="car!"/></figure>
     <div class="card-body">
            <h2 class="card-title">${news.title}</h2>
            <p>${news.details.slice(0, 150)}</p>
            <div class = " flex items-center justify-between mt-2"> 
               
              
               <div class ="flex items-center space-x-4"> 
               <img class ="rounded-full w-7 h-7" src="${
                 news.author.img
               }" alt= "img"/> 
               <span>
               <h4 class ="text-sx text-slate-900"> ${news.author.name}</h4>
               <p class ="text-sm text-slate-500">${
                 news.author.published_date
               }</p>
               </span>
               </div>
                  
                <span class = "flex items-center space-x-2">
                <i class="fa fa-eye"></i>
                <h2>${news.rating.number}M</h2>
                </span>
                <span>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                </span>
                <i class="fa fa-arrow-right"></i>
            </div>
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
