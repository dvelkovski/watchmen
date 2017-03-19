[#include "/watchmen/templates/macros/textFieldMacro.ftl"/]
[#assign events = content.events!/]
[#assign availableCategories = content.categories!/]
<div class="mt100"><h1 class="content-sub-heading">${content.title!"Public Planner"}</h1></div>
<div id="events-wrapper" class="events-wrapper">
    [#if availableCategories?has_content]
        [#list availableCategories as category]
        [#assign catPath = "/events/" +category/]
            [#assign eventCategory = cmsfn.contentByPath(catPath, "category")]
            <span class="event-category" data-catName="${category}" data-color="${eventCategory.color!"blue"}"></span>
        [/#list]
    [/#if]
    [#if events?has_content]
        [#list cmsfn.asContentMapList(events?children) as event]
            <span class="event" data-start="${event.startDate?string["yyyy-MM-dd"]}"
                  data-end="${event.endDate?string["yyyy-MM-dd"]}" data-color="${event.color!}" data-title="${event.title!}" data-category="${event.category!}"></span>
        [/#list]
    [/#if]

</div>
<div id='calendar'></div>
<div aria-hidden="true" class="modal fade" id="doc_modal_example_default" role="dialog" tabindex="-1" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-heading">
                <a class="modal-close" data-dismiss="modal">×</a>
                <h2 class="modal-title">Modal Title</h2>
            </div>
            <div class="modal-inner">
                [@textField name="eventTitle" id="eventTitle" label="Event title" hint="Enter event title" type="text"/]
                [@textField name="eventStartDate" id="eventStartDate" label="Event start date" class="datePicker" hint="Enter event start date" type="text"/]
                [@textField name="eventEndDate" id="eventEndDate" label="Event start date" class="datePicker" hint="Enter event end date" type="text"/]
            </div>
            <div class="modal-footer">
                <p class="text-right"><button class="btn btn-flat btn-brand waves-attach waves-button waves-effect" data-dismiss="modal" type="button">Close</button><button class="btn btn-flat btn-brand waves-attach waves-button waves-effect" data-dismiss="modal" id="createEventFromCal" type="button">OK</button></p>
            </div>
        </div>
    </div>
</div>