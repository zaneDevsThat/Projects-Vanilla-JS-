const taskForm = document.getElementById("task-form"); //Main form
const confirmCloseDialog = document.getElementById("confirm-close-dialog"); //dialog box for closing/cancelling the task
const openTaskFormBtn = document.getElementById("open-task-form-btn"); //Add New Task button
const closeTaskFormBtn = document.getElementById("close-task-form-btn"); //close task form; should open confirmCloseDialog
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn"); //
const cancelBtn = document.getElementById("cancel-btn"); //cancel button which cancels the discarding of task
const discardBtn = document.getElementById("discard-btn"); //discard button in the confirmCloseDialog
const tasksContainer = document.getElementById("tasks-container"); // container for title, date and description inputs
const titleInput = document.getElementById("title-input"); //title input in the task form
const dateInput = document.getElementById("date-input"); //date input in the task form
const descriptionInput = document.getElementById("description-input"); //description (text area) in the task form

const taskData = [];
let currentTask = {};

openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  confirmCloseDialog.showModal();
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  taskForm.classList.toggle("hidden");
});


taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,  
  };
});