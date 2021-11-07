class Tasks{
    constructor(taskString){
        this.taskString = taskString;
        this.isDone = false;
    }
}

// Skapar ursprungsobjekt
let task1 = new Tasks("Walk the dog");
let task2 = new Tasks("Answer emails");
let task3 = new Tasks("Water plants");

// Globala variabler
let taskList = [task1, task2, task3];
let newTaskButton = document.getElementById("addTask");
let inputTask = document.getElementById("inputTask");
let taskContainer = document.createElement("ul");
taskContainer.id = "task-container";

window.onload = function(){
    // Eventlisteners som triggar funktioner vid click
    newTaskButton.addEventListener("click", createTask);

    // Skapa upp en lista
    createList();
}

function createList(){
    for (let i = 0; i < taskList.length; i++) {
        
        let listItem = document.createElement("li");
        listItem.id = "task" + [i];
        listItem.innerHTML = taskList[i].taskString;

        //Skapar en checkbox med ett id för platsen listelementet har i arrayen för varje listelement
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        //checkbox.id = "task" + [i];
        listItem.appendChild(checkbox);

        // Kan lägga till eventlistener på varje knapp för att se om något är klart
        checkbox.addEventListener("click", ()=>{
            if(taskList[i].isDone === false){
                listItem.classList.add("marked-text");
                taskList[i].isDone = true;
            }else{
                listItem.classList.remove("marked-text");
                taskList[i].isDone = false;
            }
            console.log(taskList[i]);
        })
        taskContainer.appendChild(listItem);
    }
    document.getElementById("list-wrapper").appendChild(taskContainer);
    console.log(taskList);
}

function createTask(){
    if(inputTask.value.trim() != ""){ // Ändra till isEmpty kanske
        // Skapar objekt med strängvärdet av input
        let newTask = new Tasks(inputTask.value); // Här kan man ändra så att all input har initial versal
        taskList.push(newTask);

        // Tar bort nuvarande lista i ul
        document.getElementById("task-container").innerHTML= null;

        // Lägger in den nya listan i ul
        createList();
        inputTask.value = "";
    }
}