import type { TaggedTemplateExpression } from "estree"
import { v4 as uuidV4 } from "uuid"

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#add-to-do-form")
const input = document.querySelector<HTMLInputElement>("#new-to-do")

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date,
}

const tasks: Task [] = loadTasks()

tasks.forEach(addListItem)

form?.addEventListener("submit", e =>{
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(), 
  }
  tasks.push(newTask)

  addListItem(newTask)
  input.value = ""
})

function addListItem(task:Task) : boolean{
  const item =  document.createElement("li")
  const label =  document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", ()  => {
    task.completed = checkbox.checked
    console.log(tasks)
    saveTasks()
  })
  checkbox.type = "checkbox"
  label.append(checkbox,task.title);
  item.append(label)
  list?.append(item)
  return true
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task [] {
  const loadedTasks = localStorage.getItem("TASKS")
  if (loadedTasks == null) return []
  return JSON.parse(loadedTasks)
}