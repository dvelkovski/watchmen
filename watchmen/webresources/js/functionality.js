$(document).ready(function() {
    const EVENTS_NODE_NAME = "events";
    $eventStartDate = $("#eventStartDate");
    $eventEndDate = $("#eventEndDate");
    $eventCategory = $("#eventCategory");
    $urlSettings = $("#urlSettings");
    $eventTitle = $("#eventTitle");
    $existingEventStartDate = $("#existingEventStartDate");
    $existingEventEndDate = $("#existingEventEndDate");
    $existingEventTitle = $("#existingEventTitle");
    $existingEventCategory = $("#existingEventCategory");
    $('.datePicker').datepicker({
        format: "yyyy-mm-dd",
        selectMonths: true,
        selectYears: 30
    });


	var calendar = $('#calendar').fullCalendar({
        eventSources: buildEventSourceOptions(),
        dayClick: function(date, jsEvent, view) {
            updateTextField($eventStartDate, date.format());
            updateTextField($eventEndDate, date.format());

            $("#doc_create_new_event").modal("show");
        },
        eventClick: function(calEvent, jsEvent, view) {
            $("#doc_update_event").modal("show");
            updateTextField($existingEventStartDate, moment(calEvent.start).format('YYYY-MM-DD'));
            updateTextField($existingEventEndDate, moment(calEvent.end).format('YYYY-MM-DD'));
            updateTextField($existingEventTitle, calEvent.title);
            updateTextField($existingEventCategory, calEvent.category);
            $("#existingEventNodeName").val(calEvent.nodeName);
        }
    });
    //update event
    $("#updateEventFromCal").click(function(){
        var nodeName = $("#existingEventNodeName").val()
        var path = $urlSettings.val();
        var contextPath = $urlSettings.data("contextPath");

        $.ajax

        ({
            url: '/magnoliaAuthor/.rest/nodes/v1/website' + path + "/"+ EVENTS_NODE_NAME + "/" + nodeName,
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
                            moment($existingEventStartDate.val())
                        ]
                    },
                    {
                        "name": "endDate",
                        "type": "Date",
                        "multiple": false,
                        "value": [
                            moment($existingEventEndDate.val())
                        ]
                    },
                    {
                        "name": "category",
                        "type": "String",
                        "multiple": false,
                        "value": [
                            $existingEventCategory.val()
                        ]
                    },
                    {
                        "name": "title",
                        "type": "String",
                        "multiple": false,
                        "value": [
                            $existingEventTitle.val()
                        ]
                    }
                ]
            }),
            type: 'POST',
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

    //create event
    $("#createEventFromCal").click(function(){
        var nodeName = moment().unix();
        var path = $urlSettings.val();
        var contextPath = $urlSettings.data("context-path");
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
                start : $(elem).data("start"),
                end: $(elem).data("end"),
                nodeName: $(elem).data("nodename"),
                category: $(elem).data("category")
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
function updateTextField($field, value){
    $field.val(value);
    $field.trigger("change");
}