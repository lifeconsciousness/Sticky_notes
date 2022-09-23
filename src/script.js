const notesContainer = document.querySelector("#app")
const addBtn = document.querySelector(".add-note")

addBtn.addEventListener("click", ()=> addNote());

new Sortable(notesContainer, {
    animation: 200
});

function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]")
}

getNotes().forEach(note => {
    const noteElementNew = createNoteElement(note.id, note.content)
    notesContainer.insertBefore(noteElementNew, addBtn)
});

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes))
}

//fist creates id for element, then appends it to the DOM
function addNote(){
    const existingNotes = getNotes()

    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: ""
    };

    const noteElementAdd = createNoteElement(noteObject.id, noteObject.content)
    notesContainer.insertBefore(noteElementAdd, addBtn)

    existingNotes.push(noteObject)
    saveNotes(existingNotes)
}

//creates note element in the memory
function createNoteElement(id, content){
    //const noteElement = document.createElement("textarea")
    const noteElement = document.createElement("div")
    noteElement.classList.add("note")
    const textElement = document.createElement("textarea")
    noteElement.appendChild(textElement)
    textElement.value = content


    noteElement.addEventListener("keyup", ()=>{
        updateNote(id, textElement.value)
    })
    noteElement.addEventListener("dblclick", () =>{
        deleteNote(id, noteElement)
    })
    return noteElement
}

let gridCoordinates = []

//finds the taget note and updates it
function updateNote(id, newContent){
    const notes = getNotes()
    const targetNote = notes.filter(note => note.id == id)[0]
    targetNote.content = newContent
    saveNotes(notes)
}


//deletes note
function deleteNote(id, element){
    const existingNotes = getNotes().filter(note => note.id != id)
    saveNotes(existingNotes)
    notesContainer.removeChild(element)
}


//every time the user releases mouseup all grid coordinates are being saved
//on load elements positioned according to the array of grid coordinates
