[#assign siteRoot = cmsfn.siteRoot(content)]
[#assign firstLevelItems = navfn.navItems(siteRoot)!]
<nav aria-hidden="true" class="menu" id="doc_menu" tabindex="-1">
    <div class="menu-scroll">
        <div class="menu-content">
            <a class="menu-logo" href="index.html">Material</a>
            <ul class="nav">
                [#list firstLevelItems as navItem]
                    [#if navfn.hasTemplateSubtype(navItem, "dropdownWrapper")]
                        <li>
                            <a class="collapsed waves-attach" data-toggle="collapse" href="#${navItem.@name}">${navItem.navigationTitle!navItem.title!navItem.@name}</a>
                            [#assign openNavItem = navfn.isOpen(content, navItem)] [#-- Open navigation item is the one which is ancestor of current page--]
                            <ul class="collapse [#if openNavItem]in[/#if] menu-collapse" id="${navItem.@name}">
                                [#assign secondLevelItems = navfn.navItems(navItem)!]
                                [#list secondLevelItems as navItem]
                                    [#assign activeNavItem = navfn.isActive(content, navItem)] [#-- Active navigation item is the one which is same as current page--]
                                    <li [#if activeNavItem]class="active"[/#if]>
                                        <a class="waves-attach" href="${navfn.link(navItem)!"#"}">${navItem.navigationTitle!navItem.title!navItem.@name}</a>
                                    </li>
                                [/#list]
                            </ul>
                        </li>
                    [#else]
                        <li>
                            <a href="${navfn.link(navItem)!"#"}">${navItem.navigationTitle!navItem.title!navItem.@name}</a>
                        </li>
                    [/#if]

                [/#list]

            </ul>
        </div>
    </div>
</nav>