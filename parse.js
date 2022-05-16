
Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
    'hw8NOilP8NEV2XVa2F6FMGcijtAbVEGGlKpG7GGC', // This is your Application ID
    'vvkLe0zh1PbjJe0BG6SyafCuoqW5IllUKCiRtkpl'
);

alert("oi");
const div = document.getElementById("div");
const inputDescri = document.getElementById("addTask");
const btnInsert = document.getElementById("insert");

let vetTask = [];

function generateList() {
    div.innerHTML = "";
    for (let i = 0; i < vetTask.length; ++i) {

        const divContainer = document.createElement("div");
        divContainer.className = "container"

        const txt = document.createTextNode(
        `${vetTask[i].get("description")}`
        );
        const div2 = document.createElement("div");
        div2.className = "noRisk"

        const check = document.createElement("input");
        check.type = "checkbox";
        check.id = "check";
        check.checked = vetTask[i].get("done");
        check.onclick = (evt) => checkTask(evt, vetTask[i], div2);

        const btnRemove = document.createElement("button");
        btnRemover.className= "fa fa-trash"
        btnRemover.onclick = (evt2) => removeTask(evt2, vetTask[i]);

        divContainer.appendChild(check);
        div2.appendChild(txt);
        divContainer.appendChild(div2);
        divContainer.appendChild(btnRemove);
        div.appendChild(divContainer);
    }
}

const list = async () => {
    const task = Parse.Object.extend('task');
    const query = new Parse.Query(task);
    try {
        const results = await query.find();
        vetTask = results;
        generateList();
    } catch (error) {
        console.error('Error while fetching Tarefa', error);
    }
};

const inserir = async () => {
    const myNewObject = new Parse.Object('task');
    myNewObject.set('description', inputDescri.value);
    myNewObject.set('done', false);
    inputDescri.value = "";
    inputDescri.focus();
    try {
        const result = await myNewObject.save();
        console.log('task created', result);
        list();
    } catch (error) {
        console.error('Error while creating Tarefa: ', error);
    }
};

const checkTask = async (evt, task, div2) => {
    tarefa.set('done', evt.target.checked);

    if (evt.target.checked) {
        div2.className = "risk";
    } else {
        div2.className = "noRisk"
    }

    try {
        const response = await task.save();
        console.log(response.get('done'));
        console.log('task updated', response)
    } catch (error) {
        console.error('Error while updating task', error);
    }
};

const removeTask = async (evt2, task) => {
    task.set(evt2.target.remove);
    try {
        const response = await task.destroy();
        console.log('Delete ParseObject', response);
        list();
    } catch (error) {
        console.error('Error while updating task', error);
    }
};

btnInsert.onclick = insert;
list();
generateList();
