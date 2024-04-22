import Splide from "@splidejs/splide";
import { defineComponent, Alpine } from "../alpine";
import { BREAKPOINTS } from "../config";

Alpine.data(
  "slideshow",
  defineComponent(() => {
    return {
      init() {
        const type = this.$el.dataset.type || "loop";
        const auto = parseInt(this.$el.dataset.autoplay || "0");
        const haveArrows = this.$el.dataset.arrows === "true";
        const havePagination = this.$el.dataset.pagination === "true";
        const perPageRaw = this.$el.dataset.perView || "1";
        const perPage = perPageRaw.split(",").map((v) => parseInt(v));
        const gapRaw = this.$el.dataset.gap || "16px";
        const gap = gapRaw.split(",");
        const slidePaddingRaw = this.$el.dataset.slidePadding || "0px";
        const slidePadding = slidePaddingRaw.split(",");

        new Splide(this.$el, {
          type: type,
          rewind: true,
          perPage: perPage[0],
          gap: gap[0],
          padding: slidePadding[0],
          mediaQuery: "min",
          autoplay: !isNaN(auto) && auto > 0,
          interval: auto,
          arrows: haveArrows,
          pagination: havePagination,
          breakpoints: {
            [BREAKPOINTS.TABLET]: {
              perPage: perPage[1] || perPage[0],
              gap: gap[1] || gap[0],
              padding: slidePadding[1] || slidePadding[0],
            },
            [BREAKPOINTS.DESKTOP]: {
              perPage: perPage[2] || perPage[1] || perPage[0],
              gap: gap[2] || gap[1] || gap[0],
              padding: slidePadding[2] || slidePadding[1] || slidePadding[0],
              height: 480,
            },
          },
          classes: {
            pagination: "slideshow__pagination",
            page: "slideshow__pagination-item",
            prev: "slideshow__arrow--prev",
            next: "slideshow__arrow--next",
            arrows: "slideshow__arrows",
            arrow: "slideshow__arrow",
          },
        }).mount();
      },
    };
  }),
);

Alpine.data(
  "reviewSlideshow",
  defineComponent(() => {
    let observer: IntersectionObserver;
    return {
      init() {
        observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            new Splide(this.$el, {
              pagination: false,
              arrows: true,
              autoplay: true,
              interval: 5000,
              direction: "ttb",
              height: "350px",
              autoHeight: true,
              focus: "center",
              perPage: 3,
              gap: 16,
              type: "loop",
              mediaQuery: "min",

              breakpoints: {
                500: {
                  height: "500px",
                },
              },
            }).mount();
            observer.disconnect();
          }
        }, {});
        observer.observe(this.$el);
      },
    };
  }),
);

Alpine.data(
  "instaSlideshow",
  defineComponent(() => {
    let observer: IntersectionObserver;
    return {
      init() {
        observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            new Splide(this.$el, {
              arrows: false,
              pagination: false,
              padding: "25%",
              focus: "center",
              type: "loop",
              gap: 12,
              mediaQuery: "min",
              autoplay: true,
              interval: 5000,

              breakpoints: {
                [BREAKPOINTS.TABLET]: {
                  gap: 30,
                  padding: "10%",
                },
              },
            }).mount();
            observer.disconnect();
          }
        }, {});
        observer.observe(this.$el);
      },
    };
  }),
);
