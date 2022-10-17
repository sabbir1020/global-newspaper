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
     <h3 onclick ="loadAllNewsParper('${category.category_id}')" class ="hover:bg-green-200 hover:cursor-pointer p-2 rounded-lg">${category.category_name}</h3>
     </div>
    `;

    displayCatagories.appendChild(div);
  });
  //   console.log(categories);
};
loadDisplayCategories();

const loadAllNewsParper = async (id) => {
  // spinner loading start
  loadingPages(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

  //   console.log(url);
  const res = await fetch(url);
  const data = await res.json();

  displayLoadAllNews(data.data);
  //   console.log("check click newsparper", id);
};
const displayLoadAllNews = async (allNews) => {
  // totalNewspaper length
  if (allNews.length === 0) {
    alert('Can"t found news');
  }
  // console.log(allNews);

  const totalNewspaper = document.getElementById("total-newsperpar");
  totalNewspaper.innerHTML = `
     <h1 class = "text-2xl text-center">Total Newsperpar ${allNews.length} </h1>
     `;
  allNews.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  //   console.log(allNews.length);
  //   const allNews = await loadAllNewsParper();
  const allNewsContainer = document.getElementById("allnews-container");
  allNewsContainer.textContent = "";
  allNews.forEach((news) => {
    console.log(typeof news.rating.number);
    const displayDiv = document.createElement("div");

    displayDiv.innerHTML = `
  <div class="card  glass flex  md:flex-row my-8 ">
   <div > <figure><img  class="h-full" src="${
     news.image_url
   }" alt="car!"/></figure></div>
     <div class="card-body">
            <h2 class="card-title">${news.title ? news.title : "title nai"}</h2>
            <p>${news.details.slice(0, 150)}...</p>
            <div class = " flex  items-center justify-between mt-2"> 
               
              
               <div class ="flex  items-center space-x-4"> 
               <img class ="rounded-full w-7 h-7" src="${
                 news.author.img
               }" alt= "img"/> 
               <span>
               <h4 class ="text-sx text-slate-900"> ${
                 news.author.name
                   ? news.author.name
                   : "Can't found Author Name "
               }</h4>
               <p class ="text-sm text-slate-500">${
                 news.author.published_date
                   ? news.author.published_date
                   : "can't not published date"
               }</p>
               </span>
               </div>
                  
                <span class = "flex items-center space-x-2">
                <i class="fa fa-eye"></i>
                <h2>${news.total_view}</h2>
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
                <label  onclick = "newsDatails('${
                  news._id
                }')" for="my-modal-3" class="btn modal-button btn-primary">open modal</label>
            </div>
      </div>
   </div>
    `;
    allNewsContainer.appendChild(displayDiv);

    // stop spinner loading
    loadingPages(false);
  });
};

//  newsDatails function
const newsDatails = async (uniqueId) => {
  const url = `https://openapi.programming-hero.com/api/news/${uniqueId}`;
  const res = await fetch(url);
  const data = await res.json();
  newsDatailsDisplay(data.data[0]);
};
const newsDatailsDisplay = (detailsNews) => {
  const uniqueIdContainer = document.getElementById("uniqueId-container");
  uniqueIdContainer.innerHTML = `
  <div> 
  <h3 class="text-lg font-bold">${detailsNews.title}</h3>
  <div class = "flex justify-between items-center">
  <span>
  <h3 class ="text-sm font-bold mt-2">${
    detailsNews.author.name
      ? detailsNews.author.name
      : "Can not found author Name"
  }</h3>
  <p class = "text-xs">${
    detailsNews.author.published_date
      ? detailsNews.author.published_date
      : "Can not found Published date"
  }</p>
  </span>
  <span class = "flex  items-center">
  <i class="fa fa-eye m-2"></i>
    <h2>${detailsNews.total_view}</h2>
  </span>
  </div>
  <p class="py-4">${detailsNews.details}</p>
  </div>
  `;
  console.log(detailsNews);
};

// spinnerLoading function
const spinnerLoading = document.getElementById("progress-container");
const loadingPages = (isloading) => {
  if (isloading) {
    spinnerLoading.classList.remove("hidden");
  } else {
    spinnerLoading.classList.add("hidden");
  }
};
// displayLoadAllNews();
