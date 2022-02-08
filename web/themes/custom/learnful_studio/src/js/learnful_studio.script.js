// import 'popper.js';
// import 'bootstrap';
import 'simplebar';
import 'simplebar/dist/simplebar.css';

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.enableToolTips = {
    attach: function (context) {
      $('[data-toggle="tooltip"]').tooltip();
    }
  };

  Drupal.behaviors.flags = {
    attach: function (context) {
      $('.flag-bookmark.action-unflag').hover(
        function(){
          // $('a', this).removeClass('btn-light');
          // $('a', this).addClass('btn-danger');
          $('a > .material-icons', this).text('bookmark_remove');
        }, function() {
          // $('a', this).removeClass('btn-danger');
          // $('a', this).addClass('btn-light');
          $('a > .material-icons', this).text('bookmark_added');
        }
      );
      // $('body.node .flag-bookmark').ready(function(){
      //   e.stopPropagation();
      //   $('body.node .flag-bookmark.action-flag').append("<span>Add to bookmarks</span>");
      //   $('body.node .flag-bookmark.action-unflag').append("<span>Remove from bookmarks</span>");
      // });

      // $('body.node .flag-bookmark.action-flag').one(function(){
      //   $('body.node .flag-bookmark.action-flag').append("<span>Add to bookmarks</span>");
      //   $('body.node .flag-bookmark.action-unflag').append("<span>Remove from bookmarks</span>");
      // });
      
      $('.item-actions > .flag').each(function(){
        $('span.ftxt', this).css('display','none');
      })

      
    }
  };

  Drupal.behaviors.h5pElements = {
    attach: function (context) {
      $(document).ready(function () {
        // Using setTimeout to run after other ready callbacks
        setTimeout(function () {
     
          // Listen for event triggered when changing "panels" in the accordion.
          $('#drupal-bootstrap4-modal').on('shown.bs.modal', function (event) {
     
            // Make sure the panel has automatic height
            // ui.newPanel.css('height', 'auto');
            // console.log(event);
            // console.log(this);
     
            // Triggering a resize event on the window will make H5Ps resize.
            // H5P.jQuery(window).trigger('resize');
            window.dispatchEvent(new Event('resize'));
            H5P.init();
          });
        }, 0);
      });     
    }
  };

  Drupal.behaviors.contactForms = {
    attach: function (context) {
      $('a.use-ajax.contact-form').attr('data-dialog-type', 'bootstrap4_modal');      
    }
  };

  Drupal.behaviors.collapseDetails = {
    attach: function (context, settings) {
      window.onload = function(){
        $('details#edit-contact').removeAttr('open');
      }
      
    }
  }

  Drupal.behaviors.dashboardSearch = {
    attach: function (context, settings) {

      $('.dashboard-h5p #edit-key').attr('placeholder', 'Search by keyword. Hit [enter] to search.')
      
    }
  }

  Drupal.behaviors.responsiveElements = {
    attach: function (context) {
      
      // Toggle Views Filters Block on Mobile
      Drupal.responsiveElements.toggle_filters_library();
      
    }
  };

  Drupal.responsiveElements = {
    toggle_filters_library: function () {
      var toggleBtn = $('a#toggle-filters-mobile');
      toggleBtn.on('click', function () {
        $("#sidebar_left").toggleClass('open');
        $('body').toggleClass('no_scroll');
      });
    }
  };


  Drupal.behaviors.exposedFilters = {
    attach: function(context) {
      // Remove TID's onload.
      Drupal.exposedFilters.remove_tid();

      // Remove TID's onchange.
      jQuery('body').find('.form-autocomplete').on('autocompleteclose', function() {
        Drupal.exposedFilters.remove_tid();
      });

      // Add descriptions for certain exposed filters
      Drupal.exposedFilters.add_descriptions();

    }
  };

  Drupal.behaviors.copyButtons = {
    attach: function(context) {

      $("#copy-adaptid").on("click", function(){
        var button = $(this)
        var adaptid = button.siblings("p");
        navigator.clipboard.writeText(adaptid.text());
        button.text("Copied!");
    
        setTimeout(function() {
          button.text("Copy")
        }, 3000);
      });
    }
  };

  Drupal.exposedFilters = {
    remove_tid: function () {
      var field_autocomplete = jQuery('body').find('.form-autocomplete');
      field_autocomplete.each(function (event, node) {
        var val = $(this).val();
        var match = val.match(/\((.*?)\)$/);
        if (match) {
          $(this).data('real-value', val);
          $(this).val(val.replace(' ' + match[0], ''));
        }
      });
    },

    add_descriptions: function () {
      var collFilters = $('form[action="/browse/collections"]');
      var h5pFilters = $('form[action="/library"]');

      $('details[data-drupal-selector="edit-tags-collapsible"] .card-body', collFilters).once().each(function() {
        $(this).append('<p class="small text-muted">Enter multiple tags separated by commas to search for more than 1 tag.</p>');
      });

      $('details[data-drupal-selector="edit-key-collapsible"] .card-body', collFilters).once().each(function() {
        $(this).append('<p class="small text-muted">Search titles and descriptions using a keyword.</p>');
      });

      // $('details[data-drupal-selector="edit-type-collapsible"] .card-body', h5pFilters).one(function() {
      //   $(this).append('<p class="small text-muted">Search by H5P Content Type. Example: "Interactive Video". Start typing at least 3 letters for autocomplete options. You can review a list of content types available on <a href="https://h5p.org/content-types-and-applications" target="_blank">h5p.org</a>.</p>');
      // });

      $('details[data-drupal-selector="edit-type-collapsible"] .card-body', h5pFilters).once().each(function() {
        $(this).append('<p class="small text-muted">Search by H5P Content Type. Example: "Interactive Video". Start typing at least 3 letters for autocomplete options. You can review a list of content types available on <a href="https://h5p.org/content-types-and-applications" target="_blank">h5p.org</a>.</p>');
      })

      $('details[data-drupal-selector="edit-key-collapsible"] .card-body', h5pFilters).once().each(function() {
        $(this).append('<p class="small text-muted">Use a keyword to search titles, descriptions, author names, licenses, and other fields. Begin typing at least 3 letters for autocomplete options.</p>');
      });

      $('details[data-drupal-selector="edit-tags-collapsible"] .card-body', h5pFilters).once().each(function() {
        $(this).append('<p class="small text-muted">Enter multiple tags separated by commas to search for more than 1 tag.</p>');
      });
      
      $('details[data-drupal-selector="edit-auth-collapsible"] .card-body', h5pFilters).once().each(function() {
        $(this).append('<p class="small text-muted">Search by author name. Must be an exact match for results.</p>');
      });

    }

  };



})(jQuery, Drupal);
