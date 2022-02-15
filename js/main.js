class Tasks{
    constructor(taskString, id){
        this.taskString = taskString;
        this.isDone = false;
        this.id = id;
    }
}

// Hämtar lista från localStorage eller skapar en ny tom
let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

// Globala variabler
let newTaskButton = document.getElementById("addTask");
let inputTask = document.getElementById("inputTask");
let taskContainer = document.createElement("ul");
taskContainer.id = "task-container";
let completed = document.getElementById("sortCompleted");
let latestAdded = document.getElementById("sortLatest");
latestAdded.className = "chosenSort";

window.onload = function(){
    // Eventlisteners som triggar funktioner vid click
    newTaskButton.addEventListener("click", createTask);
    completed.addEventListener("click", sortTasksComplete);
    latestAdded.addEventListener("click", sortLatestAdded);

    // Skapa upp en lista
    createList();
}

function createList(){
    localStorage.setItem("taskList", JSON.stringify(taskList));

    // Loopar igenom listan av objekt och skapar upp element i DOM
    for (let i = 0; i < taskList.length; i++) {
        
        let listItem = document.createElement("li");
        listItem.id = "task" + [i];
        listItem.innerHTML = taskList[i].taskString;

        // Skapar en div för de två klickbara elementen
        let toggleBox = document.createElement("div");
        listItem.appendChild(toggleBox);
        
        // Skapar en checkbox med ett id för platsen listelementet har i arrayen för varje listelement
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkboxClass";
        toggleBox.appendChild(checkbox);

        // Skapar en stängningsknapp
        let removeButton = document.createElement("span");
        let removeButtonContent = document.createTextNode("\u00D7");
        removeButton.className = "remove";
        removeButton.appendChild(removeButtonContent);
        toggleBox.appendChild(removeButton);

        // Lägger till eventlistener på stängningsknapp
        removeButton.addEventListener("click", ()=>{
            removeTask(i);            
        })

        // Gör att en avklarad task fortsätter vara markerad då listan skapas på nytt
        if(taskList[i].isDone === true){
            listItem.classList.add("marked-text");
            checkbox.checked = true;
        }

        // Lägger till eventlistener på varje checkbox för att se om något är klart
        checkbox.addEventListener("click", ()=>{
            markDone(i);
        })        

        // Lägger till listelementet i ul:en
        taskContainer.appendChild(listItem);
    }
    document.getElementById("list-wrapper").appendChild(taskContainer);
}

function getNewId(list) {
    let maxId = 0;
    for (const item of list) {
      if (item.id > maxId) {
        maxId = item.id;
      }
    }
    return maxId + 1;
}

function createTask(){    
    event.preventDefault();
    // Tar bort mellanslag från sträng och kollar om den är tom och inte för lång
    if(inputTask.value.trim() != "" && inputTask.value.length < 20){
        // Skapar objekt med strängvärdet av input
        let newTask = new Tasks(inputTask.value, getNewId(taskList));
        
        //Lägger till objektet längst fram i listan
        taskList.unshift(newTask);

        // Tar bort nuvarande lista i ul
        document.getElementById("task-container").innerHTML= null;

        // Lägger in den nya listan i ul
        createList();
        inputTask.value = "";

    }else{
        // Förklarar varför inget händer i listan
        alert("You need to write something between 1-20 characters!");
    }
}

function sortTasksComplete(){
    // Jämför objektens isDone attribut för att sortera
    taskList.sort(function(a, b){return a.isDone - b.isDone});
        
    document.getElementById("task-container").innerHTML= null;
    createList();

    // Sätter klass på rätt sorteringsval
    if (completed.classList[0]==null){
        completed.className = "chosenSort";
    }
    latestAdded.classList.remove("chosenSort");
}

function sortLatestAdded(){
    taskList.sort(function(a, b){return b.id - a.id});
    document.getElementById("task-container").innerHTML= null;
    createList();

    if (latestAdded.classList[0]==null){
        latestAdded.className = "chosenSort";
    }

    completed.classList.remove("chosenSort");
}

function markDone(i){
    let listItem = document.getElementById("task"+[i]);
// Sätter klass på elementet och ändrar boolean till true
    if(!taskList[i].isDone){
        listItem.classList.add("marked-text");
        taskList[i].isDone = true;
    }else{
        listItem.classList.remove("marked-text");
        taskList[i].isDone = false;
    }
    // Lägger elementet på rätt plats i listan ifall listan är sorterad efter status
    if(completed.className =="chosenSort"){
        sortTasksComplete();
    }
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function removeTask(i){
    taskList.splice([i], 1);
           
    document.getElementById("task-container").innerHTML= null;
    createList();
}