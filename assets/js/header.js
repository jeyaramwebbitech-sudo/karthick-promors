$(function () {
  'use strict';

  var DELAY = 180;  /* ms hover-out grace period */
  var T = {};   /* timer store keyed by string */

  /* ════════════════════════════════════════════════
     1. STICKY HEADER
  ════════════════════════════════════════════════ */
  var $hdr = $('#masthead');
  var raf = false;

  $(window).on('scroll.tfb', function () {
    if (!raf) {
      requestAnimationFrame(function () {
        $hdr.toggleClass('is-sticky', $(window).scrollTop() > 60);
        raf = false;
      });
      raf = true;
    }
  }).trigger('scroll.tfb');

  /* ════════════════════════════════════════════════
     2. DESKTOP DROPDOWNS
     Timer per item: entering child cancels parent close.
     Mega-menu columns excluded from L2/L3 logic.
  ════════════════════════════════════════════════ */

  /* --- L1: top-level items --- */
  $('.nav-menu > li.has-sub').each(function (i) {
    var $li = $(this);
    var k = 'l1_' + i;

    $li.on('mouseenter.tfbL1', function () {
      clearTimeout(T[k]);
      /* close all other L1 items */
      $('.nav-menu > li.has-sub').not($li).each(function (j) {
        clearTimeout(T['l1_' + j]);
        $(this).removeClass('tfb-open');
      });
      $li.addClass('tfb-open');
    });

    $li.on('mouseleave.tfbL1', function () {
      T[k] = setTimeout(function () {
        $li.removeClass('tfb-open');
      }, DELAY);
    });
  });

  /* --- L2: sub-menu items with children, NOT inside mega columns --- */
  $('.nav-menu .sub-menu > li.has-sub')
    .not('.mega-menu .sub-menu > li')
    .each(function (i) {
      var $li = $(this);
      var k = 'l2_' + i;

      $li.on('mouseenter.tfbL2', function () {
        clearTimeout(T[k]);
        /* close siblings at same level */
        $li.siblings('li.has-sub').each(function (j) {
          clearTimeout(T['l2_' + j]);
          $(this).removeClass('tfb-open');
        });
        $li.addClass('tfb-open');
      });

      $li.on('mouseleave.tfbL2', function () {
        T[k] = setTimeout(function () {
          $li.removeClass('tfb-open');
        }, DELAY);
      });
    });

  /* --- L3: third-level items, NOT inside mega columns --- */
  $('.nav-menu .sub-menu .sub-menu > li.has-sub')
    .not('.mega-menu .sub-menu > li')
    .each(function (i) {
      var $li = $(this);
      var k = 'l3_' + i;

      $li.on('mouseenter.tfbL3', function () {
        clearTimeout(T[k]);
        $li.siblings('li.has-sub').each(function (j) {
          clearTimeout(T['l3_' + j]);
          $(this).removeClass('tfb-open');
        });
        $li.addClass('tfb-open');
      });

      $li.on('mouseleave.tfbL3', function () {
        T[k] = setTimeout(function () {
          $li.removeClass('tfb-open');
        }, DELAY);
      });
    });

  /* close all dropdowns on outside click */
  $(document).on('click.tfbOutside', function (e) {
    if (!$(e.target).closest('.nav-menu').length) {
      $('.nav-menu li.has-sub').removeClass('tfb-open');
    }
  });

  /* ════════════════════════════════════════════════
     3. HAMBURGER + MOBILE DRAWER
  ════════════════════════════════════════════════ */
  var $drawer = $('#mobileDrawer');
  var $overlay = $('#mobileOverlay');
  var $ham = $('#hamburger');
  // var $hamIcon = $('#hamIcon');
  var $mClose = $('#mobileClose');

  function openDrawer() {
    $drawer.addClass('is-open').attr('aria-hidden', 'false');
    $overlay.addClass('is-open');
    $ham.attr('aria-expanded', 'true');
    // $hamIcon.removeClass('fa-bars').addClass('fa-xmark');
    $('body').addClass('no-scroll');
    setTimeout(function () { $mClose.trigger('focus'); }, 60);
  }

  function closeDrawer() {
    $drawer.removeClass('is-open').attr('aria-hidden', 'true');
    $overlay.removeClass('is-open');
    $ham.attr('aria-expanded', 'false');
    // $hamIcon.removeClass('fa-xmark').addClass('fa-bars');
    $('body').removeClass('no-scroll');
    $ham.trigger('focus');
  }

  $ham.on('click.tfbHam', function (e) {
    e.stopPropagation();
    $drawer.hasClass('is-open') ? closeDrawer() : openDrawer();
  });

  $mClose.on('click.tfbMClose', closeDrawer);
  $overlay.on('click.tfbOverlay', closeDrawer);

  /* focus trap inside drawer */
  $drawer.on('keydown.tfbTrap', function (e) {
    if (e.key !== 'Tab') return;
    var $focusable = $drawer.find('a, button').filter(':visible');
    var first = $focusable.first()[0];
    var last = $focusable.last()[0];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  /* ════════════════════════════════════════════════
     4. MOBILE ACCORDION
  ════════════════════════════════════════════════ */
  $(document).on('click.tfbAcc', '.mob-toggle', function (e) {
    e.stopPropagation();
    var $btn = $(this);
    var $sub = $btn.closest('li').children('.sub-menu').first();
    if (!$sub.length) return;

    var isOpen = $sub.hasClass('is-open');

    if (isOpen) {
      /* collapse */
      $sub.slideUp(220, function () {
        $sub.removeClass('is-open').css('display', '');
      });
      $btn.removeClass('is-open').attr('aria-expanded', 'false');
    } else {
      /* expand */
      $sub.addClass('is-open').hide().slideDown(240);
      $btn.addClass('is-open').attr('aria-expanded', 'true');
    }
  });

  /* ════════════════════════════════════════════════
     5. SEARCH OVERLAY
  ════════════════════════════════════════════════ */
  var $sOverlay = $('#searchOverlay');
  var $sField = $('#searchField');
  var $sToggle = $('#searchToggle');
  var $sClose = $('#searchClose, .search-submit');

  function openSearch() {
    $sOverlay.addClass('is-open').attr('aria-hidden', 'false');
    $sToggle.attr('aria-expanded', 'true');
    setTimeout(function () { $sField.trigger('focus'); }, 120);
  }

  function closeSearch() {
    $sOverlay.removeClass('is-open').attr('aria-hidden', 'true');
    $sToggle.attr('aria-expanded', 'false');
    $sToggle.trigger('focus');
  }

  $sToggle.on('click.tfbSearch', function () {
    $sOverlay.hasClass('is-open') ? closeSearch() : openSearch();
  });

  $sClose.on('click.tfbSearch', closeSearch);

  /* close search on outside click */
  $sOverlay.on('click.tfbSearch', function (e) {
    if ($(e.target).is($sOverlay)) closeSearch();
  });

  /* ════════════════════════════════════════════════
     6. ESCAPE KEY — closes everything
  ════════════════════════════════════════════════ */
  $(document).on('keydown.tfbEsc', function (e) {
    if (e.key !== 'Escape') return;
    closeSearch();
    closeDrawer();
    $('.nav-menu li.has-sub').removeClass('tfb-open');
  });

  /* ════════════════════════════════════════════════
     7. SMOOTH SCROLL for anchor links
  ════════════════════════════════════════════════ */
  $(document).on('click.tfbScroll', 'a[href^="#"]', function (e) {
    var $target = $($(this).attr('href'));
    if ($target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $target.offset().top - ($hdr.outerHeight() + 16)
      }, 480);
    }
  });

}); /* end jQuery ready */