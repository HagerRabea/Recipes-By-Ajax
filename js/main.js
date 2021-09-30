
var model=document.getElementById("model");
var single=document.getElementById("single");
var link=document.querySelectorAll(".nav-link");
var exampleModalLabel=document.getElementById("exampleModalLabel");
var getMore=document.getElementById("getMore");
var input1=document.getElementById("input1");
var searchWords=document.getElementById("searchWords");
var error=document.getElementById("error");
var index='';
for(var i=0; i<link.length; i++){
    link[i].addEventListener("click",function(e){
        var term=e.target.innerHTML;
        
        console.log(term);
        getRecipes(term)
    })
}
var allData=[];
var rowData=document.getElementById("data");
let id='';
async function getRecipes(recipe){
    let data=await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipe}`);
    data=await data.json();
     allData=data.recipes;
    console.log(allData);
    display();

}
let oneResipe={};
async function getSingleResipe(id){
   var singleRes=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
   singleRes= await singleRes.json();
   oneResipe=singleRes.recipe;
   console.log(oneResipe.ingredients);
   exampleModalLabel.innerHTML=oneResipe.title;
   displaySingleResipe();

}

function display(){
    var str="";
    for(var i=0; i<allData.length; i++){
        str+=`  <div class="col-md-4">
        <div class=" text-center all">

        <img onclick="getSingleResipe('${allData[i].recipe_id}')" src="${allData[i].image_url}" class="w-100 h-50" data-bs-toggle="modal"
         data-bs-target="#exampleModal">

          <h2>${allData[i].publisher}</h2>
          <p>${allData[i].title}</p>
        
        </div>
      </div>`
    }
    
    rowData.innerHTML=str;

}
getRecipes("pizza");


function displaySingleResipe(){
    var inger="";
for(let i=0; i<oneResipe.ingredients.length; i++){
    inger+=`<li>${oneResipe.ingredients[i]}</li>`
}
    var cartona="";
    cartona=`<div  class="w-100  text-center m-auto">
    <img src='${oneResipe.image_url}' class="w-50 h-50" alt="SingleResipe">
    <h3>${oneResipe.title}</h3>
    <div></div>
    <ul class="text-decoration-non">${inger}</ul> 
    
  </div>`
  model.innerHTML=cartona;
}

let arr=["carrot","broccoli"," asparagus","cauliflower","corn"," cucumber","green pepper","lettuce","mushrooms","onion","potato",
"pumpkin","red pepper","tomato","beetroot","brussel sprouts","peas","zucchini","sweet potato","radish","artichoke","leek"];

function search(word){
    let para="";
    for(let i=0; i<arr.length; i++){
        if(arr[i].includes(word)&&word!=""){
            para +=`<li onclick="getRecipes('${arr[i]}')">${arr[i].replace(word,`<span class="span">${word}</span>`)}</li>`
        }
    }
    searchWords.innerHTML=para;
     console.log(para.length);
if(para.length==0){
    error.classList.remove("d-none");
}else{
    error.classList.add("d-none");
    searchWords.innerHTML=para;
}
if(input1.value==""){
    error.classList.add("d-none");
}

}
input1.addEventListener("keyup",function(){
    if(input1.value==""){
        error.classList.add("d-none");
    }
    search(input1.value);
})


































// function getData(klma){
//     var req= new XMLHttpRequest();
//     req.open('GET',`https://forkify-api.herokuapp.com/api/search?q=${klma}`);
//     req.send();
//     req.addEventListener('readystatechange',function(){
//         // console.log(req.readyState,req.status);
//         if(req.readyState==4&&req.status==200){
//             allData=JSON.parse(req.response);
//             allData=allData.recipes;
//             console.log(allData);
//             display();
//             // console.log(req.response);
//         }else{
//             console.log("error");
//         }
//     })
// }

// getData("pizza");

