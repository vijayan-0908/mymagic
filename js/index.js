//console.log("its working");
showNotes();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
  let addtxt = document.getElementById("addtxt");
  let notes = localStorage.getItem("notes");
  // let notesObj=[];
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addtxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addbtn.value = "";
  //console.log(notes);
  //console.clear();
  showNotes();
  addtxt.value="";
});
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    let str='card';
    str+=index;
    html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem">
          <div class="card-body" id="card${index}">
            <h5 class="card-title">Notes ${index + 1}</h5>
            <p class="card-text" >${element}</p>
            <button id="${index}" onclick="ImportNote(this.id)" class="btn btn-primary">Important</button>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
            <button id="${index}" onclick="EditNote(this.id)" class="btn btn-primary">Edit</button>
            
            </div>
        </div>`;
  });
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = "please add notes";
  }
}
function ImportNote(index){
  let str="card"
  str+=index;
  let cv=document.getElementById(`card${index}`);
  
  if( cv.style.background=='red')
  {
    cv.style.background='white';
  }
  else
  cv.style.background='red';
 
}
function deleteNote(index) {
  //console.log("delete button is press");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index,1);
  localStorage.setItem("notes", JSON.stringify(notesObj));  
  showNotes();
}
function EditNote(index){
    let notes=localStorage.getItem("notes");
    notesObj=JSON.parse(notes);
    let txt=notesObj[index];
    deleteNote(index);
    document.getElementById("addtxt").value = txt;
   // deleteNote(index);

    //showNotes();



  
}
let search=document.getElementById('searchtxt');
search.addEventListener("input",function(){
    let inputval=search.value.toLowerCase();
   // console.log('input event fired!')
    let noteCards=document.getElementsByClassName('notecard');
        Array.from(noteCards).forEach(function(element){
             let cardtxt=element.getElementsByTagName('p')[0].innerText;
             if(cardtxt.includes(inputval)){
                 element.style.display="block";
             }else{
                 element.style.display="none";
             }
        })
})
