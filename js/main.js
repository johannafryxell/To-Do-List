class Tasks{
    constructor(taskString, id){
        this.taskString = taskString;
        this.isDone = false;
        this.id = id;
    }
}

let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

let newTaskButton = document.getElementById("addTask");
let inputTask = document.getElementById("inputTask");
let taskContainer = document.createElement("ul");
taskContainer.id = "task-container";
let completed = document.getElementById("sortCompleted");
let latestAdded = document.getElementById("sortLatest");
latestAdded.className = "chosenSort";

window.onload = function(){
    newTaskButton.addEventListener("click", createTask);
    completed.addEventListener("click", sortTasksComplete);
    latestAdded.addEventListener("click", sortLatestAdded);

    createList();
}

function createList(){
    localStorage.setItem("taskList", JSON.stringify(taskList));

    for (let i = 0; i < taskList.length; i++) {
        
        let listItem = document.createElement("li");
        listItem.id = "task" + [i];
        listItem.innerHTML = taskList[i].taskString;

        let toggleBox = document.createElement("div");
        listItem.appendChild(toggleBox);
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkboxClass";
        toggleBox.appendChild(checkbox);

        let removeButton = document.createElement("span");
        let removeButtonContent = document.createTextNode("\u00D7");
        removeButton.className = "remove";
        removeButton.appendChild(removeButtonContent);
        toggleBox.appendChild(removeButton);

        removeButton.addEventListener("click", ()=>{
            removeTask(i);            
        })

        if(taskList[i].isDone === true){
            listItem.classList.add("marked-text");
            checkbox.checked = true;
        }

        checkbox.addEventListener("click", ()=>{
            markDone(i);
        })        

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
 
    if(inputTask.value.trim() != "" && inputTask.value.length < 20){

        let newTask = new Tasks(inputTask.value, getNewId(taskList));
        taskList.unshift(newTask);
        document.getElementById("task-container").innerHTML= null;
        createList();
        inputTask.value = "";

    }else{
        alert("You need to write something between 1-20 characters!");
    }
}

function sortTasksComplete(){
    taskList.sort(function(a, b){return a.isDone - b.isDone});
        
    document.getElementById("task-container").innerHTML= null;
    createList();

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

    if(!taskList[i].isDone){
        listItem.classList.add("marked-text");
        taskList[i].isDone = true;
    }else{
        listItem.classList.remove("marked-text");
        taskList[i].isDone = false;
    }

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