const searchBtn = document.getElementById("button-search");
const searchInput = document.getElementById("search-field");

searchInput.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.key== 'Enter')
    searchBtn.click();
});




const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    if(searchText.length > 0){
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
        
    }
    else{
        document.getElementById("error-message").innerHTML =
        "<p class='text-center p-3 bg-danger'><b>Please enter a meal name...</b></p>";
    }   
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if(meals.length == 0){
        // home work-1
        // show no result found
        console.log('kisu nai')
    }
    else{
        meals.forEach(meal => {
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
    
}

const loadMealDetail = mealId => {
//    console.log(mealId);
   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.value ='';
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">In thid food review</a>
        </div>
    `;
    mealDetails.appendChild(div);
}