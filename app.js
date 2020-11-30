console.log('Welcome to magice note app');
showNotes();
//if users add note at localstorege
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
    
    let addText = document.getElementById("addText");
    let addTitle = document.getElementById("addTitle");
    
    let notes = localStorage.getItem("notes");
         
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    //creating object.
    let myObj={
         title: addTitle.value,
         text: addText.value,
    }
    //notesObj.push(addText.value);
    notesObj.push(myObj); //array of Object.
    localStorage.setItem("notes", JSON.stringify(notesObj));//notes is key it use to fetch the value from local storage.
    addText.value = " "; //use to clear the lable after add the note
    //addTitle.value =" ";    // ,,
    //console.log(notesObj);
    showNotes();
});
//function to show elements from local storege.
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</butoon>
                </div>
            </div>`;//Object Litral use to show the card after refersh.
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show you "Add some notes in text area"`;
    }
    addTitle.value="";//use to clear title lable setion after adding a note.
}

//function to delete node.
function deleteNode(index) {
    //console.log('I am reading', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//search item
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value;
    ///console.log("Input event fire", inputVal);
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })

});