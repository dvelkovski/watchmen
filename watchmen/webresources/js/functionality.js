$(document).ready(function() {
    $('.datePicker').datepicker({
        format: "yyyy-mm-dd",
        selectMonths: true,
        selectYears: 30
    });

    getEventsFromCategory();
	$('#calendar').fullCalendar({
        eventSources: buildEventSourceOptions(),
        dayClick: function(date, jsEvent, view) {
            $("#doc_modal_example_default").modal("show");
        }
    });
    $("#createEventFromCal").click(function(){
        var nodeName = moment().unix();
        console.log(nodeName);
        $.ajax

        ({
            url: '/magnoliaAuthor/.rest/nodes/v1/website/home/planners/public-planner/main/0/events',
            data: JSON.stringify({
                "name": nodeName,
                "type": "mgnl:contentNode",
                "path": "/home/planners/public-planner/main/0/events/"+ nodeName,
                "property": [
                    {
                        "name": "startDate",
                        "type": "Date",
                        "multiple": false,
                        "value": [
                            moment()
                        ]
                    },
                    {
                        "name": "title",
                        "type": "String",
                        "multiple": false,
                        "value": [
                           $("#eventTitle").val()
                        ]
                    }
                ]
            }),
            type: 'PUT',
            method: 'put',
            contentType: 'application/json',
            success: function()
            {
                alert("success");
            },
            error: function(error){
                alert(error.responseText);
            }
        });
    });

});
function getEventsFromCategory(category){
    var arr = [];
    $("#events-wrapper span.event").each(function(index, elem){
        if($(elem).data("category") == category){
            var eventObj = {
                title : $(elem).data("title"),
                start : $(elem).data("start")
            }
            arr.push(eventObj);
        }
    });
    return arr;
}
function buildEventSourceOptions(){
    var arr = [];
    $("#events-wrapper span.event-category").each(function(index, elem){
        var catName = $(elem).data("catname");
            var eventFromCatObj = {
                events : getEventsFromCategory(catName),
                color: $(elem).data("color")
            }
            arr.push(eventFromCatObj);

    });
    return arr;
}