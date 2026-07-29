/*-----------------------------------------------------------------------------------
    Template Name: Inicia - Real Estate HTML Template
    Author: ThemeAlpine 
    Author URI: https://themeforest.net/user/themealpine
    Version: 1.0

    =============================
    Table of Contents:
    ============================
    - Preloader
    - Mouse Cursor Animation
    - Smooth Scroll Using lenis
    - GSAP and ScrollTrigger Registration
    - Back To Top
    - AOS Init
    - GLightbox
    - GSAP Text Animations
    - Marquee left
    - Marquee Right
    - Odometer
    - Faq Accordion
    - Global Tab
    - Progress Bar
    - Image Hover Effect Using Threejs And Hover Effect Plugin
    - GSAP Move Left
    - GSAP Move Right
    - Testimonial One Slider
    - Testimonial Two Slider
    - Project Two Slider
    - Partner Two Slider

-----------------------------------------------------------------------------------*/

(function ($) {
    'use strict';

    /*===== - Preloader  =====*/
    $(window).on("load", function (event) {
        setTimeout(function () {
            $(".preloader").fadeToggle();
        }, 200);
    });

    /*===== - Mouse Cursor Animation  =====*/
    if ($(".mouseCursor").length > 0) {
        function itCursor() {
            var myCursor = jQuery(".mouseCursor");
            if (myCursor.length) {
                if ($("body")) {
                    const e = document.querySelector(".cursor-inner"),
                        t = document.querySelector(".cursor-outer");
                    let n,
                        i = 0,
                        o = !1;
                    window.onmousemove = function (s) {
                        if (!o) {
                            t.style.transform =
                                "translate(" + s.clientX + "px, " + s.clientY + "px)";
                        }
                        e.style.transform =
                            "translate(" + s.clientX + "px, " + s.clientY + "px)";
                        n = s.clientY;
                        i = s.clientX;
                    };
                    $("body").on("mouseenter", "button, a, .cursor-pointer", function () {
                        e.classList.add("cursor-hover");
                        t.classList.add("cursor-hover");
                    });
                    $("body").on("mouseleave", "button, a, .cursor-pointer", function () {
                        if (
                            !(
                                $(this).is("a", "button") &&
                                $(this).closest(".cursor-pointer").length
                            )
                        ) {
                            e.classList.remove("cursor-hover");
                            t.classList.remove("cursor-hover");
                        }
                    });
                    e.style.visibility = "visible";
                    t.style.visibility = "visible";
                }
            }
        }
        itCursor();
    }

    /*==== - Smooth Scroll Using lenis =====*/
    if (typeof Lenis !== "undefined") {
        const lenis = new Lenis({
            duration: 1.2,
            smooth: true,
            direction: 'vertical',
            gestureDirection: 'vertical',
            smoothTouch: false,
            touchMultiplier: 2,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    };


    //*===== - GSAP and ScrollTrigger Registration =====*/
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }
    if (typeof SplitText !== "undefined") {
        gsap.registerPlugin(SplitText);
    }

    /*===== - Back To Top =====*/
    if ($(".cloudflow-progress-circle path").length && !window.clinifyxProgressInitialized) {
        window.clinifyxProgressInitialized = true;

        var $progressPath = $(".cloudflow-progress-circle path");
        var pathLength = $progressPath[0].getTotalLength();

        $progressPath.css({
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
        });

        $(window).on("scroll.clinifyxProgress", function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength) / height;
            $progressPath.css("strokeDashoffset", progress);

            if (scroll > 200) {
                $(".cloudflow-progress-wrap").addClass("active");
            } else {
                $(".cloudflow-progress-wrap").removeClass("active");
            }
        });

        $(".cloudflow-progress-wrap").on("click.clinifyxProgress", function (e) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, 600);
        });
    }

    /*====== - AOS Init ======*/
    $(window).on('load', function () {
        AOS.init({
            once: true,
            offset: 120,
            duration: 600,
            easing: 'ease-out-cubic',
        });
    });

    /*===== - GLightbox =====*/
    if (typeof GLightbox !== "undefined") {
        const lightbox = GLightbox({
            selector: '.ta-glightbox',
            videoAutoplay: false
        });
    };

    /* ===== - GSAP Text Animations  =====*/
    function initSplitTextAnimations() {
        if ($('.text-anime-1').length) {
            var txtheading = $(".text-anime-1");
            if (txtheading.length == 0) return;
            gsap.registerPlugin(SplitText); txtheading.each(function (index, el) {
                el.split = new SplitText(el, {
                    type: "lines,words,chars",
                    linesClass: "split-line"
                });
                if ($(el).hasClass('text-anime-1')) {
                    gsap.set(el.split.chars, {
                        opacity: .4,
                        color: "#000000",
                        y: "-3",
                    });
                }
                el.anim = gsap.to(el.split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "top 60%",
                        markers: false,
                        scrub: 1,
                    },

                    x: "0",
                    y: "0",
                    color: "inherit",
                    opacity: 1,
                    duration: .7,
                    stagger: 0.2,
                });

            });
        };
    };

    document.fonts.ready.then(() => {
        initSplitTextAnimations();
    });

    /*===== - Marquee left =====*/
    if ($('.marquee-left').length > 0) {
        $('.marquee-left').marquee({
            duration: 35000,
            gap: 20,
            direction: 'left',
            duplicated: true,
            startVisible: true,
            pauseOnHover: true
        });
    };

    /*===== - Marquee Right =====*/
    if ($('.marquee-right').length > 0) {
        $('.marquee-right').marquee({
            duration: 35000,
            direction: 'right',
            duplicated: true,
            startVisible: true,
            pauseOnHover: true
        });
    };

    /*===== - Odometer =======*/
    if ($(".odometer").length > 0) {
        $('.odometer').appear();

        $(document.body).on('appear', '.odometer', function () {
            var $this = $(this); // only current odometer
            var countNumber = $this.attr("data-count");

            $this.html(countNumber);
        });
    }

    /*===== - Faq Accordion ======*/
    $('.faq-item .heading').on('click', function () {
        let parent = $(this).parent();

        if (parent.hasClass('active')) {
            // Close the current item
            parent.removeClass('active');
            parent.find('.content').stop(true, true).animate(
                { height: 0, opacity: 0 },
                400,
                function () { $(this).css('display', 'none'); }
            );
        } else {
            // Close other items
            $('.faq-item.active').removeClass('active').each(function () {
                $(this).find('.content').stop(true, true).animate(
                    { height: 0, opacity: 0 },
                    400,
                    function () { $(this).css('display', 'none'); }
                );
            });

            // Open current item
            parent.addClass('active');
            let content = parent.find('.content');
            content.stop(true, true).css({ display: 'block', height: 'auto', opacity: 0 });
            let autoHeight = content.outerHeight();
            content.css('height', 0).animate({ height: autoHeight, opacity: 1 }, 400, function () {
                $(this).css('height', 'auto'); // allow dynamic height after animation
            });
        }
    });

    /*==== - Global Tab =====*/
    $('.ta-tab-nav li').on('click', function () {
        var $clicked = $(this);
        var $wrapper = $clicked.closest('.ta-tab');

        // Remove active class from nav
        $wrapper.find('.ta-tab-nav li').removeClass('active');
        $clicked.addClass('active');

        var target = $clicked.data('tab');

        // Fade transition for tab panes
        $wrapper.find('.ta-tab-pane.active').stop(true, true).fadeOut(50, function () {
            $(this).removeClass('active');

            // Fade in the clicked tab
            $wrapper.find('#' + target).stop(true, true).fadeIn(50, function () {
                $(this).addClass('active');
            });
        });
    });

    /*==== - Progress Bar  =====*/
    function initProgressBars(selector = '.progress-item', options = {}) {
        const {
            duration = 1.4,
            ease = 'power3.out',
            start = 'top 80%',
            stagger = 0.15,
        } = options;

        const items = gsap.utils.toArray(selector);

        items.forEach((item, i) => {
            const percent = parseFloat(item.dataset.percent) || 0;
            const fill = item.querySelector('.progress-fill');
            const badge = item.querySelector('.progress-badge');

            // Set badge text dynamically (so it's always in sync with data-percent)
            if (badge) badge.textContent = percent + '%';

            // Counter object for animated number inside badge
            const counter = { val: 0 };

            ScrollTrigger.create({
                trigger: item,
                start,
                once: true,
                onEnter() {
                    const delay = i * stagger;

                    // ── Fill bar ──────────────────────────────
                    gsap.fromTo(fill,
                        { width: '0%' },
                        {
                            width: percent + '%',
                            duration,
                            ease,
                            delay,
                        }
                    );

                    // ── Badge: fade + slide in ────────────────
                    gsap.to(badge, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                        delay: delay + duration * 0.3,
                    });

                    // ── Badge: count-up number ────────────────
                    gsap.to(counter, {
                        val: percent,
                        duration,
                        ease,
                        delay,
                        onUpdate() {
                            badge.textContent = Math.round(counter.val) + '%';
                        },
                    });
                },
            });
        });
    }
    initProgressBars('.progress-item', {
        duration: 1.5,
        ease: 'power3.out',
        start: 'top 85%',
        stagger: 0.18,
    });

    /*==== - Image Hover Effect Using Threejs And Hover Effect Plugin  =====*/
    $('.hover-box').each(function () {
        var $item = $(this);

        new hoverEffect({
            parent: this,
            intensity: parseFloat($item.data('intensity')),
            image1: $item.data('img1'),
            image2: $item.data('img2'),
            displacementImage: $item.data('displacement'),
            speedIn: 1.3,
            speedOut: 1.3,
            easing: Expo.easeOut,
            hover: true
        });
    });

    /*===== - GSAP Move Left =====*/
    gsap.utils.toArray('.move-left').forEach((el) => {
        gsap.fromTo(
            el,
            { x: "-20%", scale: 0.5, rotate: '-15deg' },
            {
                x: "20%",
                scale: 1.1,
                rotate: '0deg',
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    end: "top 50%",
                    scrub: 1.5,
                }
            }
        );
    });

    /*===== - GSAP Move Right =====*/
    gsap.utils.toArray('.move-right').forEach((el) => {
        gsap.fromTo(
            el,
            { x: "20%", scale: 0.5, rotate: '-15deg' },
            {
                x: "-20%",
                scale: 1.1,
                rotate: '0deg',
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    end: "top 50%",
                    scrub: 1.5
                }
            }
        );
    });

    /*==== - Testimonial One Slider  =====*/
    if ($('.testiOneSwiper').length > 0) {
        new Swiper(".testiOneSwiper", {
            spaceBetween: 24,
            slidesPerView: 1,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    };

    /*==== - Testimonial Two Slider  =====*/
    if ($('.testiTwoSwiper').length > 0) {
        new Swiper(".testiTwoSwiper", {
            spaceBetween: 24,
            slidesPerView: 1,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    };

    /*==== - Project Two Slider  =====*/
    if ($('.projectTwo').length > 0) {
        new Swiper(".projectTwo", {
            spaceBetween: 24,
            slidesPerView: 1,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                575: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 3,
                },
                1399: {
                    slidesPerView: 4,
                },
            },
        });
    };

     /*==== - Partner Two Slider  =====*/
    if ($('.partnerTwo').length > 0) {
        new Swiper(".partnerTwo", {
            // spaceBetween: 3,
            slidesPerView: 2,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                575: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 4,
                },
                1199: {
                    slidesPerView: 5,
                },
                1399: {
                    slidesPerView: 6,
                },
            },
        });
    };

})(jQuery);
