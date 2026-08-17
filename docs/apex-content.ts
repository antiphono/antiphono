/**
 * APEX ROADSTER — structured content
 * All copy per TASK_SPEC.txt. Asset paths under /assets + /video.
 */

export const NAV_LINKS = [
  { label: "Roadster", href: "#roadster" },
  { label: "Design", href: "#design" },
  { label: "Technology", href: "#technology" },
  { label: "Experience", href: "#experience" },
  { label: "Journal", href: "#journal" },
] as const;

export const HERO = {
  eyebrow: "Apex Roadster / 01",
  line: "Motion, reduced to its purest form.",
  support: "An electric roadster shaped by air, precision and instinct.",
  meta: ["Zero Emissions", "Dual-Motor Performance", "Concept 2026"],
  cta: "Discover the Roadster",
  video: "/video/apex-hero-video.mp4",
  poster: "/assets/hero-poster.webp",
} as const;

export const VISION = {
  label: "01 / Vision",
  headline: ["The", "Next", "Form of", "Performance"],
  body: "Apex explores what a roadster can become when every surface, response and interaction is designed as one continuous system.",
  media: "/assets/front-light-macro.webp",
  mediaAlt: "Close-up of the Apex Roadster front light signature",
} as const;

export const DRIVER = {
  label: "02 / Engineering",
  headline: "Engineered Around the Driver",
  body: "The Apex Roadster removes the distance between intention and response. Every control, surface and line of sight has been placed around a single idea: immediate connection.",
  secondary:
    "A lightweight electric architecture, adaptive dynamics and a driver-focused cabin work together without visual or mechanical excess.",
  cta: "Read the Philosophy",
  media: "/assets/interior-cockpit.webp",
  mediaAlt: "Apex Roadster cockpit with minimal light-gray materials",
} as const;

export const INTERLUDE_FILM = {
  video: "/video/apex-hero-video.mp4",
  poster: "/assets/rear-three-quarter.webp",
} as const;

export const MANIFESTO = {
  label: "About / Apex",
  headline: ["Beautifully", "Built For", "Motion"],
  body: "We believe the future of performance should feel lighter, quieter and more human. Apex brings advanced electric engineering into a form that is emotional, intuitive and enduring.",
  statement: "Less interface. More instinct.",
  mediaWide: "/assets/wide-dark-cinematic.webp",
  mediaWideAlt: "Apex Roadster in a dark cinematic studio",
  mediaSmall: "/assets/side-profile.webp",
  mediaSmallAlt: "Apex Roadster side profile",
  mediaVertical: "/assets/vertical-detail.webp",
  mediaVerticalAlt: "Vertical detail crop of the Apex Roadster bodywork",
} as const;

export interface Feature {
  index: string;
  title: string;
  description: string;
  media: string;
  mediaAlt: string;
  meta: [string, string];
}

export const SYSTEMS: { label: string; features: Feature[] } = {
  label: "Roadster Systems",
  features: [
    {
      index: "01",
      title: "Aeroflow",
      description:
        "An active aerodynamic system that continuously balances cooling, stability and drag.",
      media: "/assets/front-three-quarter.webp",
      mediaAlt: "Front-quarter body detail of the Apex Roadster with aero channeling",
      meta: ["Active Aerodynamics", "Real-Time Adaptation"],
    },
    {
      index: "02",
      title: "Vector Drive",
      description:
        "Independent torque control delivers precise response through every phase of a corner.",
      media: "/assets/wheel-aero-channel.webp",
      mediaAlt: "Rear wheel and aerodynamic channel of the Apex Roadster",
      meta: ["Dual-Motor System", "Adaptive Torque"],
    },
    {
      index: "03",
      title: "Halo Light",
      description:
        "A continuous light signature designed as both an identity and a communication surface.",
      media: "/assets/rear-light-macro.webp",
      mediaAlt: "Macro of the Apex Roadster full-width rear light",
      meta: ["Intelligent Lighting", "Low-Energy Optics"],
    },
    {
      index: "04",
      title: "Quiet Cabin",
      description:
        "A minimal cockpit that surfaces information only when the driver needs it.",
      media: "/assets/steering-detail.webp",
      mediaAlt: "Apex Roadster steering interface and material detail",
      meta: ["Contextual Interface", "Tactile Controls"],
    },
  ],
};

export const MATERIAL = {
  media: "/assets/silver-reflection.webp",
  mediaAlt: "Abstract silver reflection across the Apex Roadster bodywork",
} as const;

export const PURPOSE = {
  label: "Our Purpose / 02",
  headline: ["Create", "The New", "Standard"],
  body: "Apex brings designers, engineers and drivers together to build a more direct kind of performance.",
  cta: "Our Approach",
  media: "/assets/design-studio.webp",
  mediaAlt: "Apex design studio with the Roadster under development",
} as const;

export interface JournalItem {
  date: string;
  category: string;
  title: string;
}

export const JOURNAL: { heading: string; cta: string; items: JournalItem[] } = {
  heading: "Journal",
  cta: "View All",
  items: [
    {
      date: "04.08.2026",
      category: "Design",
      title: "Apex Roadster makes its first public appearance",
    },
    {
      date: "28.07.2026",
      category: "Engineering",
      title: "Inside the aerodynamic language of Apex",
    },
    {
      date: "17.07.2026",
      category: "Technology",
      title: "A new approach to driver-focused intelligence",
    },
    {
      date: "02.07.2026",
      category: "Materials",
      title: "Developing a lighter and quieter interior",
    },
  ],
};

export const RESERVATION = {
  headline: ["Meet The", "Apex Roadster"],
  body: "Join the private preview list for specifications, development stories and future availability.",
  circularCta: "Request Access",
  secondaryLink: "Configure Apex",
} as const;

export const FOOTER = {
  legal: "Apex Motion Systems © 2026",
  groups: [
    {
      title: "Explore",
      links: ["Roadster", "Design", "Technology", "Experience", "Journal"],
    },
    {
      title: "Contact",
      links: ["Private Preview", "Press", "Partnerships"],
    },
    { title: "Legal", links: ["Privacy", "Terms", "Accessibility"] },
  ],
  social: ["Instagram", "X", "YouTube"],
  finalLine: "Designed around motion.",
} as const;
