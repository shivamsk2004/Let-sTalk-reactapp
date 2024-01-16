const socket=io()
//username ko set karne ke liye
let names;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__area')
do{
names=prompt('Please enter your name: ')
}while(!names)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:names,
        message:message.trim()
    }
    //Append
    appendMessage(msg,'outgoing')
    textarea.value=''//so the textarea is spaced for writing other messages
    scrollToBottom()

    //Send to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight//for an automatic Scrolling
}
//Used at two places-1)Message Sending 2)Message Recieving