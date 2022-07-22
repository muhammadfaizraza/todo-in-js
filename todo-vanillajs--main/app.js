const firebaseConfig = {
    apiKey: "AIzaSyApujIbp6bSyMpQ8lbf1_Wien1CTWB1bK0",
    authDomain: "todo-63a1f.firebaseapp.com",
    databaseURL: "https://todo-63a1f-default-rtdb.firebaseio.com",
    projectId: "todo-63a1f",
    storageBucket: "todo-63a1f.appspot.com",
    messagingSenderId: "705646818084",
    appId: "1:705646818084:web:bd79eb8e1aa924ff0a79b1"
  };

  var app = firebase.initializeApp(firebaseConfig);

var listBox = document.getElementById('listBox')

function addTodo(){
   var val = document.getElementById('todo').value;
var obj={
    values:val,
  
}
   app.database().ref('/').child('todos').push(obj)
   .then(function(success){
console.log(success,'success')
   })
   .catch(function(err){
console.log(err,'err')
   })
}

app.database().ref('/todos').on("child_added",function(data){
console.log(data.val(),data.key)

var li = document.createElement("li");
var liTxt = document.createTextNode(data.val().values);
li.appendChild(liTxt);
var editBtn = document.createElement("button")
var editBtnTxt = document.createTextNode("EDIT");
editBtn.setAttribute("onclick", "editList(this)");
editBtn.setAttribute("id" , data.key)
editBtn.appendChild(editBtnTxt)
li.appendChild(editBtn)


var delBtn = document.createElement("button")
var delBtnTxt = document.createTextNode("DEL")
delBtn.setAttribute("onclick", "delList(this)")
delBtn.setAttribute("id" , data.key)
delBtn.appendChild(delBtnTxt)
li.appendChild(delBtn)
listBox.appendChild(li)
})


function delAll(){
    listBox.innerHTML = ""
    app.database().ref("/todos").remove()

}

function editList(e){
    var litxt = e.parentNode.firstChild.nodeValue
console.log(litxt,'litxt');
var editLiTxt = prompt("EDIT TODO" , litxt )
console.log(editLiTxt);
e.parentNode.firstChild.nodeValue = editLiTxt;
console.log(e)
console.log(e.id,'e.id')
app.database().ref(`/todos/${e.id}`).update({values:editLiTxt})
.then(function(success){
    console.log(success,'success')
       })
       .catch(function(err){
    console.log(err,'err')
       })
}
function delList(e){
    console.log(e.parentNode)
    e.parentNode.remove()
   
    app.database().ref("todos").child(e.id).remove()
}