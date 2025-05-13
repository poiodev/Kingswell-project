$(document).ready(function () {

    const stickyWrapper = $('.sticky-headers-wrapper');
    const topHeader = $('.top-header');
    const navbar = $('.navbar');
    const heroSection = $('.hero');
    const mainContent = $('main');
    const scrollThreshold = 50;
    let initialStickyWrapperHeight = 0;

    function updateInitialLayout() {
        if (stickyWrapper.length && heroSection.length) {
            initialStickyWrapperHeight = stickyWrapper.outerHeight();
            heroSection.css('padding-top', initialStickyWrapperHeight + 'px');
        }
    }

    function handleScroll() {
        const currentScroll = $(window).scrollTop();
        if (currentScroll > scrollThreshold) {
            if (!stickyWrapper.hasClass('fixed-headers')) {
                stickyWrapper.addClass('fixed-headers');
                navbar.addClass('navbar-scrolled');
                mainContent.css('padding-top', initialStickyWrapperHeight + 'px');
            }
        } else {
            if (stickyWrapper.hasClass('fixed-headers')) {
                stickyWrapper.removeClass('fixed-headers');
                navbar.removeClass('navbar-scrolled');
                mainContent.css('padding-top', '0px');
            }
        }
    }

    function setupSmoothScroll() {
        $('#btn-explora').on('click', function (e) {
            e.preventDefault();
            const targetElement = $($(this).attr('href'));

            if (targetElement.length) {
                const destination = targetElement.offset().top - initialStickyWrapperHeight;

                $('html, body').animate({ scrollTop: destination }, 800, function () {
                    $(window).trigger('scroll');
                });
            }
        });
    }

    function setupNavbarCollapseListener() {
        $('#mainNavbar').on('shown.bs.collapse hidden.bs.collapse', function () {
            updateInitialLayout();
            if (stickyWrapper.hasClass('fixed-headers')) {
                mainContent.css('padding-top', stickyWrapper.outerHeight() + 'px');
                initialStickyWrapperHeight = stickyWrapper.outerHeight();
            }
        });
    }

    updateInitialLayout();
    $(window).on('resize', updateInitialLayout);
    $(window).on('scroll', handleScroll);
    $(window).trigger('scroll');
    setupSmoothScroll();
    setupNavbarCollapseListener();
});
