[#macro textField name="" id="" class="" label="" hint="" type="text"]
    <div class="form-group form-group-label form-group-green">
        <label class="floating-label" for="doc_floating_label_example_green">${label}</label>
        <input class="form-control ${class}" id="${id}" type="${type}" name="${name}">
        <div class="form-help">
            <code>${hint}</code>
        </div>
    </div>
[/#macro]
[#--
<div class="form-group form-group-label form-group-green">
    <label class="floating-label" for="doc_floating_label_example_green">Green Input</label>
    <input class="form-control" id="doc_floating_label_example_green" type="text">
    <div class="form-help">
        <code>${hint}</code>
    </div>
</div>--]
