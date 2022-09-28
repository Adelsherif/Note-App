let textArea = document.getElementById("textArea");
let submiter = document.getElementById("submitButton");
//set localstorage
if(!localStorage.getItem("notes")){localStorage.setItem("notes",JSON.stringify([]))}
//array of notes
let listOfNotes = JSON.parse(localStorage.getItem("notes"));
//to add note
submiter.addEventListener("click" ,function (){
    textArea.value !== "" ?(
        note ={
            id:Math.random(),
            note:textArea.value
        },
        listOfNotes.push(note),
        localStorage.setItem("notes",JSON.stringify(listOfNotes)),
        textArea.value = ""
    ): window.alert("Textarea not contain any thing.")
})

let notes = document.getElementById("notes");
let count = 0;
//to append notes to body
notes.innerHTML = listOfNotes.length > 0 ? listOfNotes.map((note) =>
        `
        <div class="note" key=${note.id} id=${note.id}>
        <div class="text">
            <h5>Note ${++count}</h5>
            <p>${note.note}</p>
        </div>
        <div class="icon">
        <div class="trash"><i class="fa-solid fa-trash fa-2x"></i></div>
        <div class="pen"><i class="fa-solid fa-pen fa-2x"></i></div>
        </div>
        </div>
        `
).join(""): "";

let delet = document.querySelectorAll(".icon .trash");
let edit = document.querySelectorAll(".pen");
//to delete note
delet.forEach((icon)=>{
    icon.addEventListener("click" ,function (){
        icon.parentElement.parentElement.remove();
        listOfNotes = listOfNotes.filter((element) =>{
            return element.id !== parseFloat(icon.parentElement.parentElement.id)
        })
        localStorage.setItem("notes",JSON.stringify(listOfNotes));
    })
})
//to edit note
edit.forEach((ele) =>{
    ele.addEventListener("click" ,function (){
        window.scrollTo(0,0)
        textArea.value = ele.parentElement.previousElementSibling.lastElementChild.innerHTML;
        this.parentElement.parentElement.remove();
        listOfNotes = listOfNotes.filter((element) =>{
            return element.id !== parseFloat(this.parentElement.parentElement.id)
        })
        localStorage.setItem("notes",JSON.stringify(listOfNotes));
    })
})