import { Alpine, AlpinePrefix, defineComponent } from "../alpine";

Alpine.data(
  "siteHeader",
  defineComponent(() => {
    let lastScrollTop = 0;
    return {
      stickyType: "on_scroll_up",

      init() {
        Alpine.bind(this.$root, this.root);
        this.stickyType =
          (this.$root.dataset.stickyType as any) || "on_scroll_up";
        this.updateHeaderSticky();
      },

      updateHeaderSticky() {
        if (this.stickyType === "none") {
          return;
        }

        const header = this.$root;

        const headerHeight = header.offsetHeight;
        const scrolled =
          window.pageYOffset || document.documentElement.scrollTop;

        document.body.style.setProperty("--header-height", `${headerHeight}px`);

        if (this.stickyType === "always") {
          header.classList.add("header-sticky");
        } else if (this.stickyType === "on_scroll_up") {
          if (scrolled > headerHeight) {
            header.classList.add("header-sticky");

            if (scrolled < lastScrollTop) {
              header.classList.add("header-sticky--show");
            } else {
              header.classList.remove("header-sticky--show");
            }
          } else {
            header.classList.remove("header-sticky");
          }
        }

        lastScrollTop = scrolled;
      },
      root: {
        [`${AlpinePrefix}on:scroll.window.debounce`]() {
          this.updateHeaderSticky();
        },
        [`${AlpinePrefix}-on:scroll.window.throttle.100ms`]() {
          this.updateHeaderSticky();
        },
      },
    };
  }),
);
