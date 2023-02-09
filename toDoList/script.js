// gerenciador de tarefas
// escrito por: David Lima dos Santos
// data: 09/02/2023

// form é o input principal da página e está no topo
// taskInput é a entrada do usuário no form
// taskList é a ul da página, onde são adicionadas as tasks
const form = document.querySelector('form')
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('#task-list')

// espera o evento submit do form
form.addEventListener('submit', addTask)

// adiciona tasks à lista, o param 'e' é o evento de submit do form
function addTask(e) {
    // impede o comportamento padrão do submit
    e.preventDefault()

    // atribui o texto que usuário submeteu 
    const task = taskInput.value

    // impede que o usuário entre uma string vazia
    if(task === '') {
        alert('Nenhuma tarefa a adicionar!')
        return
    }

    // cria elemento li na e o adiciona a lista
    const li = document.createElement('li')
    taskList.appendChild(li)
    
    // cria span que recebe o input do usuário e o adiciona ao li
    const span = document.createElement('span')
    span.textContent = task
    li.appendChild(span)

    // cria apenas a div para os botões de edição e remoção
    const divBotoes = document.createElement('div')
    divBotoes.id = 'div-buttons'
    li.appendChild(divBotoes)

    // cria botão para edição do conteúdo da tarefa
    const botaoEditar = document.createElement('button')
    botaoEditar.type = 'taskButton'
    botaoEditar.innerHTML = 'Editar'
    botaoEditar.addEventListener('click', function() {
        // cria um elemento input que irá receber 
        // a string anterior e permitir alteração pelo usuário
        const input = document.createElement('input')
        input.value = span.textContent
        span.parentNode.replaceChild(input, span)

        // cria um listener para caso o usuário clique fora do campo de input, 
        // impedindo-o de enviar uma string vazia
        input.addEventListener('blur', () => {
            if(input.value !== ''){
                span.textContent = input.value
                input.parentNode.replaceChild(span, input)
            }
        })

        // cria um listener para caso o usuário aperte o botão 'enter', 
        // impedindo-o de enviar uma string vazia
        input.addEventListener('keydown', (event) => {
            if(event.key === 'Enter') {
                if (input.value === '') {
                    alert('Nenhuma tarefa a editar!')
                    return
                }
                span.textContent = input.value
                input.parentNode.replaceChild(span, input)
            }
        })
    })

    // cria botão para remoção do conteúdo da tarefa
    const botaoRemover = document.createElement('button')
    botaoRemover.type = 'taskButton'
    botaoRemover.innerHTML = 'Remover'
    botaoRemover.addEventListener('click', () => {
        li.remove()
    })

    // adiciona os botões na div dos botões, que já foi criada na li
    divBotoes.appendChild(botaoEditar)
    divBotoes.appendChild(botaoRemover)

    // limpa a string que o usuário entrou para outras entradas
    taskInput.value = ''
}
