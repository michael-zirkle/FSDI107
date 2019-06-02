var items = [];
var name = "Michael";
var todoList = [];
var serverURL = `http://127.0.0.1:8080
`;


function hello(text) {
    console.log(text);
}


function init2() {
    //var lbl = document.getElementById("lblTodo")
    var lbl = $("#lbltodo");
    lbl.innerText = "jquery rules??";

    $("#btnSave").click(saveTodo);

    getDataFromServer()
}

function saveTodo() {
    var txt = $(`#txtTodo`);
    console.log(txt);

    var todoText = txt.val();
    if (todoText.length < 1) {
        txt.addClass(`error`);

    } else {
        txt.removeClass(`error`);
        //todoList.push(todoText);
        txt.val(``);


        sendToServer(todoText);

    }
}

function sendToServer(text) {
    var todoItem = {
        text: text,
        user: "Michael",
        status: 0
        

    };
    $.ajax({
        url: serverURL + "/API/todo",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(todoItem),
        success: function (res) {
            res.id = res._id;
            console.log("Started Server communitcation", res);
            displayTodo(res.text, res.id);
            


        }
    });

}



function displayTodo(simpleText, id) {
    var ul = $("#todoList");
    var li = "<li id= '" + id + "' class= list-group-item>" + simpleText + "<button class='btn btn-sm btn-info btn-done' onclick=markDone('" + id + "')> Done!</button></li>";
    ul.append(li);
}

function displayDone(simpleText, id) {
    var ul = $("#doneList");
    var li = "<li id= '" + id + "' class=' list-group-item done-item'>" + simpleText + "</li>";
    ul.append(li);
}

function markDone(id) {
    console.log("done: ", id);

    var theItem;

    for (var i = 0; i < todoList.length; i++) {

        if (todoList[i].id == id) {
            theItem = todoList[i];
            break;
        }


    }
    theItem.status = 1;

    displayDone(theItem.text, theItem.id);

    $("#" + theItem.id).remove();





    $.ajax({
        url: serverURL + "/API/todo",
        type: "PUT",
        data: JSON.stringify(theItem),
        contentType: "application/json",
        success: function (res) {
            console.log("success", res);

        },
        error: function (error) {
            console.error("error", error);
        },
    });
}

function getDataFromServer() {
    $.ajax({
        url: serverURL + "/API/todo",
        type: "GET",

        success: function (res) {

            for (var i = 0; i < res.length; i++) {
                var item = res[i];
                item.id= item._id;
                if (item.user == "Michael") {
                    todoList.push(item)
                    if (item.status && item.status == 1) {
                        displayDone(item.text, item.id);
                    } else {
                        displayTodo(item.text, item.id);
                    }
                }
            }

        }
    });


}

// when the browser finishes loading executes the function
window.onload = init2;