function convert() {
    var f= $("#txtF").val();
    console.log("Wants to convert: ", f);

    ajax({
        url: 'http://127.0.0.1:8080/API/temp',
        type: "POST",
        data: JSON.stringify({value: f}),
        success: function(res){
            console.log(res);
            $("#txtC").val(res);
        },
        error:function(error){
            console.error(error);
        }
    });
}

function init() {
    $("#btnDo").click(convert);
}