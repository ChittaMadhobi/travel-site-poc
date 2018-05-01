import $ from 'jquery';

class MobileMenu {
    constructor() {
        // Using jquery, select the site-header to place a modifier (darker) background for small screens
        this.siteHeader = $(".site-header");
        /* jquery spghatii we should not write
           A. slecting a item from DOM: $(".site-header__menu-icon") selects  the  DOM class icon site-header__menu-icon in html
           B. Event handling : click(function()
           C. Define functionality : console.log ('...');
           
        $(".site-header__menu-icon").click(function() {
            console.log("Clicked the menu square!");
        });
        */
        this.menuIcon = $(".site-header__menu-icon");  // a property to store our DOM element via jquery
        
        // Create a shortcut to the div (above) to add a new class to the hidden div (in small devices - in CSS)
        this.menuContent = $('.site-header__menu-content');
        this.events();
    }

    // Let us define a separate event method 
    events() {
        // In order for this.toggleTheMenu to be used by other method, let's bind it as 
        // this.menuIcon.click(this.toggleTheMenu);
        //this.menuIcon.click(this.toggleTheMenu.bind("Hello World"));
        // We want to bind to 'this' instance of the object as ...
        this.menuIcon.click(this.toggleTheMenu.bind(this));
        //console.log(this);
    }

    // Let's define a function method that happens associaetd with an event. E.g.when the event 'click' happens
    toggleTheMenu() {
        // Let's toggle  the new item (appear as a modifier in div via BEN methodology)
        // To be mindful, this is called from an DOM-event (this.toggleTheMenu) and not the events() method.
        // Hence we need to
        // console.log(this);
        // this.remove(); say we want to remove this (site-header__menu-content - the square button ) from the page.  
        
        // We want to access the object so we can manipulate the object. We want to have fine grained control
        // over the keyword 'this.toggleTheMenu'. 
        // alert(this);  Used for testing ... let's remove that.

        this.menuContent.toggleClass("site-header__menu-content--is-visible");
        this.siteHeader.toggleClass("site-header--is-expanded");  
        this.menuIcon.toggleClass("site-header__menu-icon--close-x");
        // Darken the background via a modifier
    }

}

export default MobileMenu;