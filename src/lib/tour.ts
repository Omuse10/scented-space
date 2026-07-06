import { driver, type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import "@/styles/tour.css";

const TOUR_FLAG = "hasSeenTour";
let tourStartTimer: number | null = null;
let autoStartedInRuntime = false;
const AUTO_START_RETRY_LIMIT = 8;
const AUTO_START_RETRY_MS = 500;

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

function getSteps(): DriveStep[] {
  const mobile = isMobile();

  const steps: DriveStep[] = [
    {
      element: "[data-tour='main-nav']",
      popover: {
        title: "Main Navigation",
        description:
          "This is your elegant map through the house, from discovery to complete rituals. Use it to move effortlessly between collections.",
        side: "bottom",
        align: mobile ? "start" : "center",
      },
    },
    {
      element: "[data-tour='hero-section']",
      popover: {
        title: "Featured Fragrance Moment",
        description:
          "Here begins the mood of The Scented Space. Let this opening scene guide the feeling you want to wear today.",
        side: mobile ? "bottom" : "left",
        align: mobile ? "start" : "center",
      },
    },
    {
      element: "[data-tour='product-add-ritual']",
      popover: {
        title: "Add to Ritual",
        description:
          "Use this button to place a product directly into your ritual collection. Build your set as you discover what suits your skin and mood.",
        side: mobile ? "top" : "top",
        align: mobile ? "start" : "center",
      },
    },
    {
      element: "[data-tour='mood-filter']",
      popover: {
        title: "Browse by Mood",
        description:
          "Explore by feeling with Nahla, Alina, Samara, Zafira, Velvet Elegance, Whispering Petals, and Thea. It is the quickest way to find your signature tone.",
        side: mobile ? "top" : "left",
        align: mobile ? "start" : "center",
      },
    },
    {
      element: "[data-tour='cart-icon']",
      popover: {
        title: "Your Ritual Cart",
        description:
          "Your selected pieces gather here while you compose your ritual. Open anytime to review and refine before checkout.",
        side: "bottom",
        align: mobile ? "end" : "center",
      },
    },
  ];

  return steps.filter((step) => {
    if (!step.element || typeof step.element !== "string") return false;
    return Boolean(document.querySelector(step.element));
  });
}

export function startTour({ force = false }: { force?: boolean } = {}) {
  if (typeof window === "undefined") return;
  if (!force && window.localStorage.getItem(TOUR_FLAG) === "true") return;

  const steps = getSteps();
  if (steps.length === 0) return;

  const tour = driver({
    animate: true,
    smoothScroll: true,
    allowClose: true,
    allowKeyboardControl: true,
    showProgress: true,
    showButtons: ["previous", "next", "close"],
    stagePadding: 8,
    stageRadius: 12,
    overlayOpacity: 0.52,
    nextBtnText: "Next",
    prevBtnText: "Back",
    doneBtnText: "Done",
    onNextClick: (_element, _step, { driver }) => {
      driver.moveNext();
    },
    onPrevClick: (_element, _step, { driver }) => {
      driver.movePrevious();
    },
    onCloseClick: (_element, _step, { driver }) => {
      driver.destroy();
    },
    onDoneClick: (_element, _step, { driver }) => {
      driver.destroy();
    },
    onDestroyStarted: () => {
      window.localStorage.setItem(TOUR_FLAG, "true");
    },
    onDestroyed: () => {
      window.localStorage.setItem(TOUR_FLAG, "true");
    },
    steps,
  });

  tour.drive();
  window.localStorage.setItem(TOUR_FLAG, "true");
}

export function initTourOnFirstVisit(_pathname: string) {
  if (typeof window === "undefined") return;
  if (autoStartedInRuntime) return;

  if (tourStartTimer) {
    window.clearTimeout(tourStartTimer);
    tourStartTimer = null;
  }

  const tryStart = (attempt = 0) => {
    const steps = getSteps();
    if (steps.length > 0) {
      startTour({ force: true });
      autoStartedInRuntime = true;
      return;
    }

    if (attempt >= AUTO_START_RETRY_LIMIT) return;
    tourStartTimer = window.setTimeout(() => {
      tryStart(attempt + 1);
    }, AUTO_START_RETRY_MS);
  };

  tourStartTimer = window.setTimeout(() => {
    tryStart(0);
  }, 1000);
}