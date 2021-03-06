ko.bindingHandlers.quicksand = {
    /**
     * Create the hidden working space to facilitate the Quicksand animation.
     * 
     * @param Element element  The DOM element with the KnockoutJS data bind.
     * @param jQuery $repeatingElements  The HTML used to render each array element.
     * @return jQuery  The Quicksand working space.
     */
    createWorkspace: function(element, $repeatingElements) {
        // Generate a unique ID for the DOM element that will facilitate the Quicksand animation.
        var quicksandWorkspaceId = 'ko-quicksand-' + (new Date).getTime();
        // Store the unique ID for reference during the "update" event.
        ko.utils.domData.set(element, 'ko-quicksand-workspace-id', quicksandWorkspaceId);
        
        // Look up the outermost element type in the rendering template and store it for reference during the "update" event.
        ko.utils.domData.set(element, 'ko-quicksand-container-tag', $repeatingElements[0].tagName);
        
        // Create the hidden DOM element that will facilitate the Quicksand animation.
        var $quicksandWorkspace = jQuery('<div/>', {
            id: quicksandWorkspaceId,
            style: 'display: none'
        });
        // Append it to the DOM for use during the "update" event.
        $quicksandWorkspace.appendTo('body');
        
        return $quicksandWorkspace;
    },
    /**
     * Get the hidden working space used to facilitate the Quicksand animation.
     * 
     * @param Element element  The DOM element with the KnockoutJS data bind.
     * @return jQuery  The Quicksand working space.
     */
    getWorkspace: function(element) {
        return jQuery('#' + ko.utils.domData.get(element, 'ko-quicksand-workspace-id'));
    },
    /**
     * Get the name of the HTML tag that encompasses each array element.
     * 
     * @param Element element  The DOM element with the KnockoutJS data bind.
     * @return string  The container tag name.
     */
    getContainerTag: function(element) {
        return ko.utils.domData.get(element, 'ko-quicksand-container-tag');
    },
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // Look up the provided template for rendering each element of the array.
        var $repeatingElements = jQuery(element).children();
        
        var $quicksandWorkspace = ko.bindingHandlers.quicksand.createWorkspace(element, $repeatingElements);
        
        // Populate the workspace with the rendering template so it mirrors the contents of element.
        $repeatingElements.clone().appendTo($quicksandWorkspace);
        
        // Register the hidden DOM element for updates by Knockout.
        return ko.bindingHandlers['foreach']['init']($quicksandWorkspace[0], valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // Unwrap the observable to subscribe to updates.  Check if the data property is implicit or explicit.
        ko.utils.unwrapObservable(valueAccessor().hasOwnProperty('data') ? valueAccessor().data : valueAccessor());
        
        var $quicksandWorkspace = ko.bindingHandlers.quicksand.getWorkspace(element);
        
        // Update the hidden DOM element using Knockout.
        ko.bindingHandlers['foreach']['update']($quicksandWorkspace[0], valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        
        var quicksandOptions = valueAccessor().hasOwnProperty('options') ? valueAccessor().options : {};
        
        // Run Quicksand to copy the contents of the hidden DOM element to the visible element using the Quicksand animation.
        jQuery(element).quicksand($quicksandWorkspace.children(ko.bindingHandlers.quicksand.getContainerTag(element)), quicksandOptions);
    }
};
ko.bindingHandlers.quicksandTemplate = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // Look up the provided template for rendering each element of the array.
        if(allBindingsAccessor().quicksandTemplate.hasOwnProperty('name')) {
            // The repeating template is defined in a named <script> block.
            var $repeatingElements = jQuery(
                jQuery.parseHTML(
                    jQuery.trim(
                        jQuery('#' + allBindingsAccessor().quicksandTemplate.name).html()
                    )
                )
            );
            var $quicksandWorkspace = ko.bindingHandlers.quicksand.createWorkspace(element, $repeatingElements);
        } else {
            // The repeating template is the children of element.
            var $repeatingElements = jQuery(element).children();
            
            var $quicksandWorkspace = ko.bindingHandlers.quicksand.createWorkspace(element, $repeatingElements);
            
            // Populate the workspace with the rendering template so it mirrors the contents of element.
            $repeatingElements.clone().appendTo($quicksandWorkspace);
        }
        
        // Register the hidden DOM element for updates by Knockout.
        return ko.bindingHandlers['template']['init']($quicksandWorkspace[0], valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // Unwrap the observable to subscribe to updates.
        ko.utils.unwrapObservable(valueAccessor().foreach);
        
        var $quicksandWorkspace = ko.bindingHandlers.quicksand.getWorkspace(element);
        
        // Update the hidden DOM element using Knockout.
        ko.bindingHandlers['template']['update']($quicksandWorkspace[0], valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        
        var quicksandOptions = valueAccessor().hasOwnProperty('options') ? valueAccessor().options : {};
        
        // Run Quicksand to copy the contents of the hidden DOM element to the visible element using the Quicksand animation.
        jQuery(element).quicksand($quicksandWorkspace.children(ko.bindingHandlers.quicksand.getContainerTag(element)), quicksandOptions);
    }
};