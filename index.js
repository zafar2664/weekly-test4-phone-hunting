const main = document.querySelector(".card-main");
const searchBtn = document.querySelector("#search-btn");
const UInput = document.querySelector(".search-box");
const loaderAnimation = document.querySelector(".loader");
const body = document.querySelector("body");
const showAllBtn = document.querySelector("#show-All");
const overlay = document.querySelector(".overlay");


let showButton = false;

async function fetchData(userInput,showButton){
     main.innerHTML = "";
     if(userInput === ""){
        userInput = "iphone 12";
     }
     showLoader()
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${userInput}`);
    const result = await response.json();
    hideLoader();
    // console.log(result.data[0].slug)
    displayData(result.data)
    // UInput.value = "";

}

function showLoader(){
    loaderAnimation.style.display = "block";
    setTimeout(()=>{
        loaderAnimation.style.display = "none";
    },5000)
}
function hideLoader(){
    loaderAnimation.style.display = "none";
}

function displayData(data){
    if(data.length === 0){
        alert("write valid Phone name ");
        fetchData("iphone 13",showButton);
        return;
    }
 
   if(data.length > 10 && !showButton){
    showAllBtn.style.display = "block";
    document.querySelector(".icon-up").style.visibility = "hidden"
     if(!showButton){
        data = data.slice(0,12);
     }
   }else{
    showAllBtn.style.display = "none";
    document.querySelector(".icon-up").style.visibility = "visible"
    showButton=false;

   }

// console.log(data)
   
 data.forEach((item,index)=>{
    let card = document.createElement("div");
    card.classList.add("card");


    let cardImg = document.createElement("div");
    cardImg.classList.add("card-img");

    let imgDiv = document.createElement("div");
    imgDiv.classList.add("img");

    let img = document.createElement("img");
    img.src = item.image

    let cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = item.phone_name;

    let cardDes = document.createElement("div");
    cardDes.classList.add("card-subtitle");
    cardDes.innerText = "Product description. Lorem ipsum dolor sit amet, consectetur adipisicing elit."

    let cardDivider = document.createElement("hr");
    cardDivider.classList.add("card-divider");

    let cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer")

    let cardPrice = document.createElement("div");
    cardPrice.classList.add("card-price");
    cardPrice.innerText = "123.45"

    let priceIcon = document.createElement("span");
    priceIcon.innerText = "$";


    let cardBtn = document.createElement("button");
    cardBtn.classList.add("card-btn");
    cardBtn.innerText = "More Detail";
    cardBtn.addEventListener("click",(event)=>{displayMoreDetails(event,item.slug)});

    imgDiv.append(img);
    cardImg.append(imgDiv);

    cardPrice.append(priceIcon);
    cardFooter.append(cardPrice);

    cardFooter.append(cardBtn);

    card.append(cardImg,cardTitle,cardDes,cardDivider,cardFooter);

    main.append(card);
 })

}

async function displayMoreDetails(event,id){
    showLoader();
   let response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   let result = await response.json();
   hideLoader()
//    console.log(result)
   overlay.style.display = "block";
   showDetails(result.data);

}
function showDetails(phoneDetail){
    // if(main.childNodes[main.childNodes.length-1].classList.contains("show-detail")){
    //     main.childNodes[main.childNodes.length-1].remove();
    // }
    
    let showDiv = document.createElement("div");
   showDiv.classList.add("show-detail");
    let imgDiv = document.createElement("div");
    imgDiv.classList.add("card-img")

    let img = document.createElement("img");
    img.src = phoneDetail.image;

    let title = document.createElement("div");
    title.classList.add("card-title");
    title.innerText = phoneDetail.name;
    imgDiv.append(img);

    let features = document.createElement("div");
    features.classList.add("features")
     
    let phoneFeature = phoneDetail.mainFeatures;

    for(const key in phoneFeature){
        // console.log(key +" : " + phoneFeature[key]);
        // console.log(phoneFeature[key]);
        if(key === "sensors"){
            continue;
        }
        let feature = document.createElement("div");
    
        let featureName = document.createElement("span");
        featureName.innerText = `${key} : `
       let featureDetail = document.createElement("span");
       featureDetail.innerText = phoneFeature[key];

       feature.append(featureName,featureDetail);
       features.append(feature);

    }
    

    let feature = document.createElement("div");
    feature.innerText = phoneDetail.releaseDate;
    features.append(feature);

    let closeBtn = document.createElement("button");
    closeBtn.classList.add("search-btn")
    closeBtn.innerText = "Close"
    closeBtn.style.color = "white"
    closeBtn.addEventListener("click",(event)=>{
        main.childNodes[main.childNodes.length-1].remove();
        overlay.style.display = "none";
    })

    showDiv.append(imgDiv,title,features,closeBtn);
    main.append(showDiv);

}

showAllBtn.addEventListener("click",()=>{
     showButton = true;
     fetchData(UInput.value,showButton)

})
window.addEventListener("load",()=>{
     fetchData("iphone 13",showButton)
})

searchBtn.addEventListener("click",()=>{
    //  searchBtn.preventDefault();
       fetchData(UInput.value,showButton);
})