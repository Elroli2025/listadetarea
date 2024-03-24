const input = document.querySelector('.input');
const form = document.querySelector('.form');
const wcomp = document.querySelector('.tc');
const wincomp = document.querySelector('.tic');
const wtt = document.querySelector('.tt');
const button = document.querySelector('.button');
const list = document.querySelector('#list');


let tareacompletada = 0;
let tareaincompleta = 0;

function actcont() {
    wcomp.innerHTML = tareacompletada;
    wincomp.innerHTML = tareaincompleta;
    wtt.innerHTML = tareacompletada + tareaincompleta;
}

form.addEventListener('submit', e =>{
    e.preventDefault();
    if (input.value != '') {
        const li = document.createElement('li');
        li.classList.add('task');
        list.appendChild(li);
        li.innerHTML = `
        <button class="delete-button" >&#10006</button>
        <p class="text">${input.value}</p>
        <button class="check-button check-edit ">&#10003</button>
        `;
        input.value = '';
        localStorage.setItem('listaTareas', list.innerHTML);
        tareaincompleta++;
        actcont();
    };
});
list.addEventListener('click', e =>{
    if (e.target.closest('.delete-button')) {
        const li = e.target.closest('li');
        if (li.classList.contains('selected')){
            tareacompletada--;
        }else{
            tareaincompleta--;
        }
        li.remove();
        actcont();
        localStorage.setItem('listaTareas', list.innerHTML);
    }
    if (e.target.closest('.check-button')) {
        const checkEdit = e.target.closest('.check-button')
        const li = e.target.closest('li');
        const editText = li.children[1];
        if (checkEdit.classList.contains('checked')) {
            checkEdit.classList.remove('checked');
            checkEdit.classList.add('check-edit');
            li.classList.remove('selected');
            li.classList.add('task');
            editText.classList.add('text');
            editText.classList.remove('text-checked');
            tareaincompleta++;
            tareacompletada--;
            localStorage.setItem('listaTareas', list.innerHTML);
        }else{
            checkEdit.classList.add('checked');
            checkEdit.classList.remove('check-edit');
            li.classList.add('selected');
            li.classList.remove('task');
            editText.classList.remove('text');
            editText.classList.add('text-checked');
            tareacompletada++;
            tareaincompleta--;
            localStorage.setItem('listaTareas', list.innerHTML);
        };
        actcont();
    };

});
(()=>{
    if (localStorage.length !== 0) {
        const localList = localStorage.getItem('listaTareas');
        list.innerHTML = localList;

        const splitted = localList.split("<li");
        const selected = splitted.filter(part => part.includes("selected"));
        const notSelected = splitted.filter(part => part.includes("task"));
        tareacompletada = selected.length;
        tareaincompleta = notSelected.length;
        actcont();
    }else{
        console.log('xxxxx');
    }
})();
