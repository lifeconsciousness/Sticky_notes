const notesContainer = document.querySelector("#app")
const addBtn = document.querySelector(".add-note")
let notesArray = []
let lastIndex

localStorage.setItem("firstTime", "true")
if(localStorage.getItem("firstTime") == "true"){
    lastIndex = 0;
    localStorage.setItem("firstTime", "false")
}


addBtn.addEventListener("click", ()=> addNote());

new Sortable(notesContainer, {
    animation: 200
});

function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes-1") || "[]")
}

getNotes().forEach(note => {
    const noteElementNew = createNoteElement(note.id, note.content)
    notesContainer.insertBefore(noteElementNew, addBtn)
});

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes-1", JSON.stringify(notes))
}

function getLastIndex(){
    return JSON.parse(localStorage.getItem("lastIndexStorage"))
}
function saveLastIndex(ind){
    localStorage.setItem("lastIndexStorage", JSON.stringify(ind))
}



//fist creates id for element, then appends it to the DOM
function addNote(){
    const existingNotes = getNotes()

    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: "",
        index: getLastIndex()
    };

    lastIndex++

    const noteElementAdd = createNoteElement(noteObject.id, noteObject.content, noteObject.index)
    notesContainer.insertBefore(noteElementAdd, addBtn)
    existingNotes.push(noteObject)

    saveLastIndex(lastIndex)
    saveNotes(existingNotes)

    

    console.log(existingNotes)
    console.log(getLastIndex())
}

//creates note element in the memory
function createNoteElement(id, content, index){
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
    noteElement.addEventListener("mouseover", () =>{
        //const existingNotes = getNotes()
        // const existingNotes = 
        
        // saveNotes(existingNotes)

    })

    saveLastIndex(lastIndex)
    return noteElement
}

getNotesArray()
console.log(notesArray)

function getNotesArray(){
    let notesQ = getNotes(); 

    for(let i = 0; i< notesQ.length; i++){
        notesArray[i] = notesQ[i]
    }
}

//make lastIndex variable = 0, store it in localstorage and ++ or --
//attach index to every element using object
//save an array of indices in localstorage
//notesArray[i] = notesQ[indexArray[i]]
//save notes using notesArray


//finds the taget note and updates it
function updateNote(id, newContent){
    const notes = getNotes()
    const targetNote = notes.filter(note => note.id == id)[0]
    targetNote.content = newContent
    saveNotes(notes)
    saveLastIndex(lastIndex)
}


//deletes note
function deleteNote(id, element){
    const existingNotes = getNotes().filter(note => note.id != id)
    saveNotes(existingNotes)
    saveLastIndex(lastIndex)
    notesContainer.removeChild(element)
}
