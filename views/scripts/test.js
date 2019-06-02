var serverURL = `http://127.0.0.1:8080
`;

function test(){
    console.log('clicked');

    $.ajax({
        url: serverURL + "/API/test",
        type: "GET",

        success: function (res) {
            console.log("Good", res);
        },
        error: function (error){
            console.error("error on AJAx", error);
        }
});
}

function init() {
    console.log ('test page ready');

    $("#btnTest").click(test);
}

window.onload = init;