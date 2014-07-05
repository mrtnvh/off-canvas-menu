(function($) {

    $.fn.offCanvasMenu = function(options) {

        var settings = $.extend({

            // These are the defaults.
            container : $(this),
            containerActiveAffix: "active",
            globalName: "js-offCanvasMenu",
            activeState: "is-active",
            effect: "push",
            buttonName: "button",
            overlayName: "overlay",
            iconOpen : "fa-navicon",
            textOpen : "Menu",
            iconClose : "fa-times",
            textClose : "Sluit"

        }, options),


        htmlClasses = {
            containerActive: settings.globalName + "--" + settings.containerActiveAffix,
            button: settings.globalName + "-" + settings.buttonName,
            buttonActive: settings.activeState,
            overlay: settings.globalName + "-" + settings.overlayName,
            effect: settings.globalName + "--effect--" + settings.effect
        },

        cssClasses = {
            containerActive: "." + htmlClasses.containerActiveAffix,
            button: "." + htmlClasses.button,
            overlay: "." + htmlClasses.overlay,
            effect: "." + htmlClasses.effect
        },

        elements = {
            button: $(cssClasses.button),
            container: settings.container,
            overlay: $(cssClasses.overlay)
        },

        toggle = function(elem, effect) {

            var time,
                buttonSettings = {
                        icon : elements.button.find(".Icon"),
                        message : elements.button.find(".js-offCanvasMenu-button-text")
                    },
                checkIdenticalEffects = function(){
                        var elementEffect = elem.data("effect"),
                            containerEffect = elements.container.data("effect");

                        if (containerEffect === elementEffect) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                toggleClasses = function(){
                    if (settings.container.hasClass(htmlClasses.containerActive)) {
                        //elem.removeClass(htmlClasses.activeCssClass);
                        elements.container.removeClass(htmlClasses.containerActive);
                        buttonSettings.icon.removeClass(settings.iconClose).addClass(settings.iconOpen);
                        buttonSettings.message.text("Menu");
                    } else {
                        //elem.addClass(htmlClasses.activeCssClass);
                        elements.container.addClass(htmlClasses.containerActive);
                        buttonSettings.icon.removeClass(settings.iconOpen).addClass(settings.iconClose);
                        buttonSettings.message.text("Sluit");
                    }
                };

            if (checkIdenticalEffects()) {
                time = 0;
            } else {
                time = 400;
            }

            setTimeout( function(time){
                toggleClasses();
            }, time);

            //Update effect data and class
            elements.container.removeClass(function () {
                return (settings.globalName + "--effect--" + $(this).data("effect"));
            });

            elements.container.addClass(settings.globalName + "--effect--" + checkEffect(elem));
            elements.container.data("effect", checkEffect(elem));
        },

        checkEffect = function(elem) {
            if (elem.data("effect").length > 0){
                return elem.data("effect");
            } else {
                return settings.effect;
            }
        };



        // Click event
        // =======================================================

        elements.button.click(function(e) {
            e.preventDefault();
            toggle( $(this) , checkEffect($(this)) );
        });

        //Refactor for use of overlay
        elements.overlay.click(function(e) {
            e.preventDefault();
            $(this).data("effect", checkEffect(settings.container));
            toggle( $(this), checkEffect(settings.container) );
        });



        // On load
        // Provide the correct effect class to the container.
        // =======================================================
        elements.container.addClass(htmlClasses.effect);
        elements.container.data("effect", settings.effect);
    };

}(jQuery));
