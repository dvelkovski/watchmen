[#macro textField name="" id="" class="" label="" hint="" type="text"]
    <div class="form-group form-group-label form-group-green">
        <label class="floating-label" for="${id}">${label}</label>
        <input class="form-control ${class}" id="${id}" type="${type}" name="${name}">
        <div class="form-help">
            <code>${hint}</code>
        </div>
    </div>
[/#macro]

[#macro selectField name="" id="" class="" label="" hint="" options=[] propValue="" propLabel="" attributes=[]]
    <div class="form-group form-group-label form-group-green">
        <label class="floating-label form-group-green" for="${id}">${label}</label>
        <select class="form-control" id="${id}">
            [#list options as option]
                <option value="${option[propValue]}" [#if attributes?size>0][#list attributes as attribute]data-${attribute}=${option[attribute]}[/#list][/#if]>${option[propLabel]}</option>
            [/#list]
        </select>
    </div>
[/#macro]
