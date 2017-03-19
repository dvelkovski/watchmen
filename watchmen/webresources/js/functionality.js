$(document).ready(function() {
    const EVENTS_NODE_NAME = "events";
    $eventStartDate = $("#eventStartDate");
    $eventEndDate = $("#eventEndDate");
    $eventCategory = $("#eventCategory");
    $urlSettings = $("#urlSettings");
    $eventTitle = $("#eventTitle");
    $('.datePicker').datepicker({
        format: "yyyy-mm-dd",
        selectMonths: true,
        selectYears: 30
    });


	var calendar = $('#calendar').fullCalendar({
        eventSources: buildEventSourceOptions(),
        dayClick: function(date, jsEvent, view) {

            $eventStartDate.val(date.format());
            $eventStartDate.trigger("change");

            $eventEndDate.val(date.format());
            $eventEndDate.trigger("change");
            $("#doc_modal_example_default").modal("show");
        }
    });
    $("#createEventFromCal").click(function(){
        var nodeName = moment().unix();
        var path = $urlSettings.val();
        var contextPath = $urlSettings.data("contextPath");
        console.log('/magnoliaAuthor/.rest/nodes/v1/website/' + path + "/"+ EVENTS_NODE_NAME);
        $.ajax

        ({
            url: '/magnoliaAuthor/.rest/nodes/v1/website' + path + "/"+ EVENTS_NODE_NAME,
            data: JSON.stringify({
                "name": nodeName,
                "type": "mgnl:contentNode",

                "path": path + "/" + EVENTS_NODE_NAME +"/" + nodeName,
                "property": [
                    {
                        "name": "startDate",
                        "type": "Date",
                        "multiple": false,
                        "value": [
                            moment($eventStartDate.val())
                        ]
                    },
                    {
                        "name": "endDate",
                        "type": "Date",
                        "multiple": false,
                        "value": [
                            moment($eventEndDate.val())
                        ]
                    },
                    {
                        "name": "category",
                        "type": "String",
                        "multiple": false,
                        "value": [
                            $eventCategory.val()
                        ]
                    },
                    {
                        "name": "title",
                        "type": "String",
                        "multiple": false,
                        "value": [
                            $eventTitle.val()
                        ]
                    }
                ]
            }),
            type: 'PUT',
            contentType: 'application/json',
            success: function()
            {
                var event={id:1 , title: $eventTitle.val(), start:  moment($eventEndDate.val()), color:$('#eventCategory option:selected').data('color')};
                calendar.fullCalendar( 'renderEvent', event, true);
                $(".snackbar").snackbar({
                    alive: 6000,
                    content: "<div class='aaa'>success</div>"
                });


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