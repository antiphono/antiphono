/* Central content datasets — all images use local /images/ paths */

const PROJECTS = [
  {
    slug: "policyfly",
    title: "PolicyFly — InsurTech platform & design system",
    client: "PolicyFly",
    categories: ["InsurTech", "Design System", "Product Design"],
    active: true,
    year: "2018–Present",
    visual: "fintech",
    coverImage: "/images/policyfly/PF_header.jpg",
    deliverables: ["Product Research", "UX Design", "UI Design", "Design System"],
    summary: "An all-in-one insurance administration platform — from design system foundations to multi-line product launches.",
    overview: ["PolicyFly is rebuilding insurance administration for insurers who need to move fast without sacrificing compliance. As UI/UX lead, the work spans a Material Design-grounded system that ensures consistency from print collateral to complex underwriting workflows across multiple platforms.", "The design system was built to scale with a rapidly growing product suite — new lines of business, new entitlement states, new device targets. Every component decision had to serve both the designer building screens and the engineer implementing them, with no ambiguity in between.", "Over multiple years and product launches, the focus has remained the same: making sophisticated insurance workflows feel less like bureaucracy and more like a product people actually want to use."],
    sections: [
      { type: "fullwidth", image: "/images/policyfly/1b.PolicyDocs_Menu.jpg", alt: "1B.Policydocs Menu" },
      { type: "fullwidth", image: "/images/policyfly/1i_Tasks (phase1)_Change Due Date.jpg", alt: "1I Tasks (Phase1) Change Due Date" },
      { type: "fullwidth", image: "/images/policyfly/1o_Vehicle-Schedule_Delete Item.jpg", alt: "1O Vehicle Schedule Delete Item" },
      { type: "fullwidth", image: "/images/policyfly/1q_Tasks (phase1)_Completed Tasks.jpg", alt: "1Q Tasks (Phase1) Completed Tasks" },
      { type: "fullwidth", image: "/images/policyfly/2a.PolicyDocs_1400.jpg", alt: "2A.Policydocs 1400" },
      { type: "fullwidth", image: "/images/policyfly/3h_Tasks List (phase1)_Assign.jpg", alt: "3H Tasks List (Phase1) Assign" },
      { type: "fullwidth", image: "/images/policyfly/PF_brand.jpg", alt: "Brand" },
      { type: "fullwidth", image: "/images/policyfly/PF_design-system.jpg", alt: "Design System" },
      { type: "fullwidth", image: "/images/policyfly/PF_features.jpg", alt: "Features" },
      { type: "fullwidth", image: "/images/policyfly/PF_header.jpg", alt: "Header" },
      { type: "fullwidth", image: "/images/policyfly/PF_header2.jpg", alt: "Header2" },
      { type: "fullwidth", image: "/images/policyfly/PF_header3.png", alt: "Header3" },
      { type: "fullwidth", image: "/images/policyfly/PF_overview.jpg", alt: "Overview" },
      { type: "fullwidth", image: "/images/policyfly/PF_quoting.jpg", alt: "Quoting" },
      { type: "fullwidth", image: "/images/policyfly/PF_schedules2.jpg", alt: "Schedules2" },
      { type: "fullwidth", image: "/images/policyfly/PF_video.jpg", alt: "Video" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-02 at 22.50.30.png", alt: "Screenshot 2020 10 02 At 22.50.30" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-04 at 22.25.04.png", alt: "Screenshot 2020 10 04 At 22.25.04" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-04 at 22.25.12.png", alt: "Screenshot 2020 10 04 At 22.25.12" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-04 at 22.25.19.png", alt: "Screenshot 2020 10 04 At 22.25.19" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-04 at 22.25.31.png", alt: "Screenshot 2020 10 04 At 22.25.31" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-04 at 22.26.29.png", alt: "Screenshot 2020 10 04 At 22.26.29" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-04 at 22.27.35.png", alt: "Screenshot 2020 10 04 At 22.27.35" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-04 at 22.27.40.png", alt: "Screenshot 2020 10 04 At 22.27.40" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-05 at 00.14.29.png", alt: "Screenshot 2020 10 05 At 00.14.29" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-05 at 00.15.49.png", alt: "Screenshot 2020 10 05 At 00.15.49" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-05 at 10.16.13.png", alt: "Screenshot 2020 10 05 At 10.16.13" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-05 at 10.16.24.png", alt: "Screenshot 2020 10 05 At 10.16.24" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-05 at 10.18.15.png", alt: "Screenshot 2020 10 05 At 10.18.15" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-05 at 10.22.45.png", alt: "Screenshot 2020 10 05 At 10.22.45" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-05 at 11.01.33.png", alt: "Screenshot 2020 10 05 At 11.01.33" },
      { type: "fullwidth", image: "/images/policyfly/Screenshot 2020-10-05 at 11.02.04.png", alt: "Screenshot 2020 10 05 At 11.02.04" },
      { type: "fullwidth", image: "/images/policyfly/Underlying_GL(b)-5.jpg", alt: "Underlying Gl(B) 5" },
      { type: "fullwidth", image: "/images/policyfly/application.jpg", alt: "Application" },
      { type: "fullwidth", image: "/images/policyfly/header.jpg", alt: "Header" },
      { type: "grid", cols: 2, images: [
        { image: "/images/policyfly/PF_PNI.jpg", alt: "Pni" },
        { image: "/images/policyfly/PF_activity.jpg", alt: "Activity" },
        { image: "/images/policyfly/PF_application.jpg", alt: "Application" },
        { image: "/images/policyfly/PF_colours.jpg", alt: "Colours" },
        { image: "/images/policyfly/PF_home.jpg", alt: "Home" },
        { image: "/images/policyfly/PF_landing-pages.jpg", alt: "Landing Pages" },
        { image: "/images/policyfly/PF_print.jpg", alt: "Print" },
        { image: "/images/policyfly/PF_print2.jpg", alt: "Print2" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/policyfly/PF_reporting.jpg", alt: "Reporting" },
        { image: "/images/policyfly/PF_schedules.jpg", alt: "Schedules" },
        { image: "/images/policyfly/PF_tasks.jpg", alt: "Tasks" },
        { image: "/images/policyfly/PF_tasks2.jpg", alt: "Tasks2" },
        { image: "/images/policyfly/Screenshot 2020-10-04 at 23.05.32.png", alt: "Screenshot 2020 10 04 At 23.05.32" },
        { image: "/images/policyfly/Screenshot 2020-10-04 at 23.13.21.png", alt: "Screenshot 2020 10 04 At 23.13.21" }
      ] },
      { type: "slider", label: "Detail Views", slides: [
          { image: "/images/policyfly/PF_DesignSystem_Buttons.jpg", caption: "Buttons" },
          { image: "/images/policyfly/PF_DesignSystem_Colors.jpg", caption: "Colors" },
          { image: "/images/policyfly/PF_DesignSystem_Feedback.jpg", caption: "Feedback" },
          { image: "/images/policyfly/PF_DesignSystem_Icons.jpg", caption: "Icons" },
          { image: "/images/policyfly/PF_DesignSystem_Menus.jpg", caption: "Menus" },
          { image: "/images/policyfly/PF_DesignSystem_Navigation.jpg", caption: "Navigation" },
          { image: "/images/policyfly/PF_DesignSystem_Text Fields.jpg", caption: "Text Fields" },
          { image: "/images/policyfly/PF_DesignSystem_Typography.jpg", caption: "Typography" },
          { image: "/images/policyfly/Print.png", caption: "Print" },
          { image: "/images/policyfly/Print2.png", caption: "Print2" },
          { image: "/images/policyfly/Screenshot 2020-10-02 at 22.16.06.png", caption: "Screenshot 2020 10 02 At 22.16.06" }
      ] }
    ],
  },

  {
    slug: "winter-olympics-on-7",
    title: "Winter Olympics on 7 — OTT streaming platform",
    client: "Seven Network",
    categories: ["OTT Streaming", "Product Strategy", "UX Design"],
    active: false,
    year: "2018",
    visual: "robotics",
    coverImage: "/images/winter-games/PC_keyvisual.jpg",
    deliverables: ["Product Strategy", "User Experience", "Interface & Brand Design"],
    summary: "Thousands of hours of live and on-demand Olympic coverage, streamed to every screen — built and shipped for PyeongChang 2018.",
    overview: ["Following the success of Seven's Rio Olympics digital campaign, the brief was to design and deliver a new high-quality OTT product set for the PyeongChang Winter Games — compelling Australian sports stories on every screen, across native apps, web and IPTV platforms.", "Research began with what users actually wanted from their viewing experience across different devices. Extensive user, market and expert investigation mapped the hierarchy of features that would shape the ecosystem: live event widgets, social content, competitions, and a premium entitlement tier unlocking HD streaming and reduced advertising.", "Each platform app adhered to native design principles to reduce the learning curve for new users. Low content density kept each session highly discoverable, and wayfinding between events was kept deliberately intuitive — because during the Games, every second of friction is a missed moment."],
    sections: [
      { type: "fullwidth", image: "/images/winter-games/PC_header.jpg", alt: "Header" },
      { type: "fullwidth", image: "/images/winter-games/PC_keyvisual-1.jpg", alt: "Keyvisual 1" },
      { type: "fullwidth", image: "/images/winter-games/PC_playback2-1.jpg", alt: "Playback2 1" },
      { type: "fullwidth", image: "/images/winter-games/PC_responsive.jpg", alt: "Responsive" },
      { type: "fullwidth", image: "/images/winter-games/PC_store.jpg", alt: "Store" },
      { type: "fullwidth", image: "/images/winter-games/PC_store_1.jpg", alt: "Store 1" },
      { type: "fullwidth", image: "/images/winter-games/PC_store_2.jpg", alt: "Store 2" },
      { type: "fullwidth", image: "/images/winter-games/PC_logo.jpg", alt: "Logo" },
      { type: "slider", label: "Platform Screens", slides: [
          { image: "/images/winter-games/PC_platform1.jpg", caption: "Platform1" },
          { image: "/images/winter-games/PC_platform10.jpg", caption: "Platform10" },
          { image: "/images/winter-games/PC_platform11.jpg", caption: "Platform11" },
          { image: "/images/winter-games/PC_platform2.jpg", caption: "Platform2" },
          { image: "/images/winter-games/PC_platform3.jpg", caption: "Platform3" },
          { image: "/images/winter-games/PC_platform4.jpg", caption: "Platform4" },
          { image: "/images/winter-games/PC_platform5.jpg", caption: "Platform5" },
          { image: "/images/winter-games/PC_platform6.jpg", caption: "Platform6" },
          { image: "/images/winter-games/PC_platform7.jpg", caption: "Platform7" },
          { image: "/images/winter-games/PC_platform8.jpg", caption: "Platform8" },
          { image: "/images/winter-games/PC_platform9.jpg", caption: "Platform9" }
      ] },
      { type: "slider", label: "Showcase", slides: [
          { image: "/images/winter-games/PC_Showcase1.png", caption: "Showcase1" },
          { image: "/images/winter-games/PC_Showcase2.png", caption: "Showcase2" },
          { image: "/images/winter-games/PC_Showcase3.png", caption: "Showcase3" },
          { image: "/images/winter-games/PC_Showcase4.png", caption: "Showcase4" }
      ] },
      { type: "slider", label: "Information Architecture", slides: [
          { image: "/images/winter-games/PC_IA1.jpg", caption: "Ia1" },
          { image: "/images/winter-games/PC_IA2.jpg", caption: "Ia2" },
          { image: "/images/winter-games/PC_IA3.jpg", caption: "Ia3" },
          { image: "/images/winter-games/PC_IA4.jpg", caption: "Ia4" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/winter-games/PC_UI.jpg", alt: "Ui" },
        { image: "/images/winter-games/PC_account.jpg", alt: "Account" },
        { image: "/images/winter-games/PC_appstore.jpg", alt: "Appstore" },
        { image: "/images/winter-games/PC_chromecast.jpg", alt: "Chromecast" },
        { image: "/images/winter-games/PC_competition.jpg", alt: "Competition" },
        { image: "/images/winter-games/PC_keyvisual.jpg", alt: "Keyvisual" },
        { image: "/images/winter-games/PC_payment.jpg", alt: "Payment" },
        { image: "/images/winter-games/PC_widgets.jpg", alt: "Widgets" }
      ] },
      { type: "slider", label: "Detail Views", slides: [
          { image: "/images/winter-games/PC_store1.jpg", caption: "Store1" },
          { image: "/images/winter-games/PC_store2.jpg", caption: "Store2" },
          { image: "/images/winter-games/PC_store3.jpg", caption: "Store3" },
          { image: "/images/winter-games/PC_store4.jpg", caption: "Store4" },
          { image: "/images/winter-games/PC_store5.jpg", caption: "Store5" },
          { image: "/images/winter-games/PC_store6.jpg", caption: "Store6" }
      ] }
    ],
  },

  {
    slug: "oscar-winter",
    title: "Oscar Winter — Luxury e-commerce for engagement rings",
    client: "Oscar Winter",
    categories: ["E-commerce", "UX Design", "Brand Design"],
    active: false,
    year: "2019",
    visual: "fintech",
    coverImage: "/images/oscar-winter/OW_key-visual.jpg",
    deliverables: ["Product Strategy", "User Experience", "Interface & Brand Design"],
    summary: "Brought the attentiveness of a high-end jeweller consultation online — for millennial couples shopping for the most personal purchase of their lives.",
    overview: ["Oscar Winter is a luxury retail platform allowing customers to design and purchase high-quality engagement and wedding rings online at an accessible price. Initially launching to a US audience, the experience targets the desires and habits of millennial consumers who expect elegance without complexity — and who research everything before they buy.", "In addition to a carefully crafted identity, the site houses extensive education and certification documentation to establish trust within a highly personal purchase decision. Through extensive user research and testing, the experience affords users unprecedented control of product specifications with controls that are intelligent but never cold.", "Gem shoppers can explore the complete Oscar Winter diamond list with sophisticated filtering to source the perfect stone. Those less familiar with precious gems are presented with a guided product selection process designed to reflect the in-store experience of a high-end jeweller."],
    sections: [
      { type: "fullwidth", image: "/images/oscar-winter/OW_Model.jpg", alt: "Model" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_brand.jpg", alt: "Brand" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_checkout.jpg", alt: "Checkout" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_designprinciples-1.jpg", alt: "Designprinciples 1" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_designprinciples.jpg", alt: "Designprinciples" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_filters.jpg", alt: "Filters" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_header.jpg", alt: "Header" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_key-visual.jpg", alt: "Key Visual" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_marketing.jpg", alt: "Marketing" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_pathtopurchase.jpg", alt: "Pathtopurchase" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_search-wishlist.jpg", alt: "Search Wishlist" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_journeys.jpg", alt: "Journeys" },
      { type: "fullwidth", image: "/images/oscar-winter/OW_keyscreens.jpg", alt: "Keyscreens" },
      { type: "slider", label: "Brand Identity", slides: [
          { image: "/images/oscar-winter/OW_manifesto1.jpg", caption: "Manifesto1" },
          { image: "/images/oscar-winter/OW_manifesto2.jpg", caption: "Manifesto2" },
          { image: "/images/oscar-winter/OW_manifesto3.jpg", caption: "Manifesto3" },
          { image: "/images/oscar-winter/OW_manifesto4.jpg", caption: "Manifesto4" },
          { image: "/images/oscar-winter/OW_manifesto5.jpg", caption: "Manifesto5" },
          { image: "/images/oscar-winter/OW_manifesto6.jpg", caption: "Manifesto6" },
          { image: "/images/oscar-winter/OW_manifesto7.jpg", caption: "Manifesto7" },
          { image: "/images/oscar-winter/OW_manifesto8.jpg", caption: "Manifesto8" }
      ] },
      { type: "slider", label: "Platform Modules", slides: [
          { image: "/images/oscar-winter/OW_module1.jpg", caption: "Module1" },
          { image: "/images/oscar-winter/OW_module2.jpg", caption: "Module2" },
          { image: "/images/oscar-winter/OW_module3.jpg", caption: "Module3" },
          { image: "/images/oscar-winter/OW_module4.jpg", caption: "Module4" }
      ] },
      { type: "slider", label: "Showcase", slides: [
          { image: "/images/oscar-winter/OW_Showcase1.png", caption: "Showcase1" },
          { image: "/images/oscar-winter/OW_Showcase2.png", caption: "Showcase2" },
          { image: "/images/oscar-winter/OW_Showcase3.png", caption: "Showcase3" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/oscar-winter/OW_diamondexp.jpg", alt: "Diamondexp" },
        { image: "/images/oscar-winter/OW_diamondlist.jpg", alt: "Diamondlist" },
        { image: "/images/oscar-winter/OW_premade.jpg", alt: "Premade" },
        { image: "/images/oscar-winter/OW_recommendation.jpg", alt: "Recommendation" }
      ] }
    ],
  },

  {
    slug: "live-network",
    title: "Live Network — White-label publishing platform",
    client: "Pacific",
    categories: ["Digital Publishing", "Product Strategy", "UX Design"],
    active: false,
    year: "2017",
    visual: "logistics",
    coverImage: "/images/live-network/Live_keyvisual.jpg",
    deliverables: ["Product Strategy", "User Experience", "Interface & Brand Design"],
    summary: "16 editorial brands. 16 live sites. 6 weeks. After acquiring Yahoo's digital publishing rights, we built the platform that made it possible.",
    overview: ["After procuring the digital publishing rights from Yahoo!, the challenge was to plan and rapidly develop an intuitive white label publishing platform allowing Pacific to enter the digital market across 16 editorial brands simultaneously. The approach had to be scalable while retaining the formats and flavour of each unique brand experience.", "The initial launch featured multiple content formats housed within a purpose-built modular framework and open source backend. Future iterations focused on sophisticated commercial and editorial features — responsive ad formats, branded content formats, and native sponsorship opportunities creating a comprehensive offering for advertisers.", "Behavioural data helped evolve the editorial experience over time. The key objective was to retain readers for longer, decreasing reliance on social channels for traffic. Session times increased significantly through infinite content scrolling, tactical content drivers and direct remarketing channels."],
    sections: [
      { type: "fullwidth", image: "/images/live-network/LN_header2.png", alt: "Header2" },
      { type: "fullwidth", image: "/images/live-network/Live_UX.jpg", alt: "Ux" },
      { type: "fullwidth", image: "/images/live-network/Live_backend.jpg", alt: "Backend" },
      { type: "fullwidth", image: "/images/live-network/Live_editorial.jpg", alt: "Editorial" },
      { type: "fullwidth", image: "/images/live-network/Live_framework.jpg", alt: "Framework" },
      { type: "fullwidth", image: "/images/live-network/Live_header.jpg", alt: "Header" },
      { type: "fullwidth", image: "/images/live-network/Live_hero.jpg", alt: "Hero" },
      { type: "fullwidth", image: "/images/live-network/Live_keyvisual-1.jpg", alt: "Keyvisual 1" },
      { type: "fullwidth", image: "/images/live-network/Live_keyvisual-2.jpg", alt: "Keyvisual 2" },
      { type: "fullwidth", image: "/images/live-network/Live_live.jpg", alt: "Live" },
      { type: "fullwidth", image: "/images/live-network/Live_sponsorship.jpg", alt: "Sponsorship" },
      { type: "fullwidth", image: "/images/live-network/Live_sponsorship2.jpg", alt: "Sponsorship2" },
      { type: "slider", label: "Screens", slides: [
          { image: "/images/live-network/Live_carousel-1.jpg", caption: "Carousel 1" },
          { image: "/images/live-network/Live_carousel-2.jpg", caption: "Carousel 2" },
          { image: "/images/live-network/Live_carousel-3.jpg", caption: "Carousel 3" },
          { image: "/images/live-network/Live_carousel-4.jpg", caption: "Carousel 4" },
          { image: "/images/live-network/Live_carousel2.jpg", caption: "Carousel2" },
          { image: "/images/live-network/Live_carousel3.jpg", caption: "Carousel3" },
          { image: "/images/live-network/Live_carousel4.jpg", caption: "Carousel4" }
      ] },
      { type: "slider", label: "Brand Logos", slides: [
          { image: "/images/live-network/Live_logo1.jpg", caption: "Logo1" },
          { image: "/images/live-network/Live_logo10.jpg", caption: "Logo10" },
          { image: "/images/live-network/Live_logo11.jpg", caption: "Logo11" },
          { image: "/images/live-network/Live_logo12.jpg", caption: "Logo12" },
          { image: "/images/live-network/Live_logo2.jpg", caption: "Logo2" },
          { image: "/images/live-network/Live_logo3.jpg", caption: "Logo3" },
          { image: "/images/live-network/Live_logo4.jpg", caption: "Logo4" },
          { image: "/images/live-network/Live_logo5.jpg", caption: "Logo5" },
          { image: "/images/live-network/Live_logo6.jpg", caption: "Logo6" },
          { image: "/images/live-network/Live_logo7.jpg", caption: "Logo7" },
          { image: "/images/live-network/Live_logo8.jpg", caption: "Logo8" },
          { image: "/images/live-network/Live_logo9.jpg", caption: "Logo9" }
      ] },
      { type: "slider", label: "Showcase", slides: [
          { image: "/images/live-network/Live_Showcase1.png", caption: "Showcase1" },
          { image: "/images/live-network/Live_Showcase2.png", caption: "Showcase2" },
          { image: "/images/live-network/Live_Showcase3.png", caption: "Showcase3" }
      ] },
      { type: "slider", label: "Platform Stack", slides: [
          { image: "/images/live-network/Live_stack1.jpg", caption: "Stack1" },
          { image: "/images/live-network/Live_stack10.jpg", caption: "Stack10" },
          { image: "/images/live-network/Live_stack11.jpg", caption: "Stack11" },
          { image: "/images/live-network/Live_stack12.jpg", caption: "Stack12" },
          { image: "/images/live-network/Live_stack13.jpg", caption: "Stack13" },
          { image: "/images/live-network/Live_stack14.jpg", caption: "Stack14" },
          { image: "/images/live-network/Live_stack2.jpg", caption: "Stack2" },
          { image: "/images/live-network/Live_stack3.jpg", caption: "Stack3" },
          { image: "/images/live-network/Live_stack4.jpg", caption: "Stack4" },
          { image: "/images/live-network/Live_stack5.jpg", caption: "Stack5" },
          { image: "/images/live-network/Live_stack6.jpg", caption: "Stack6" },
          { image: "/images/live-network/Live_stack7.jpg", caption: "Stack7" },
          { image: "/images/live-network/Live_stack8.jpg", caption: "Stack8" },
          { image: "/images/live-network/Live_stack9.jpg", caption: "Stack9" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/live-network/Live_admap.jpg", alt: "Admap" },
        { image: "/images/live-network/Live_keyvisual.jpg", alt: "Keyvisual" },
        { image: "/images/live-network/Live_marketing.jpg", alt: "Marketing" },
        { image: "/images/live-network/Live_media.jpg", alt: "Media" }
      ] }
    ],
  },

  {
    slug: "beautycrew",
    title: "BeautyCrew — Beauty community & editorial platform",
    client: "Pacific",
    categories: ["Editorial Platform", "UX Design", "Brand Design"],
    active: false,
    year: "2017",
    visual: "health",
    coverImage: "/images/beauty-crew/BC_Showcase1.png",
    deliverables: ["Product Strategy", "User Experience", "Interface & Brand Design"],
    summary: "Aggregated the editorial power of Seven's beauty brands into one community platform — elegant, age-agnostic, and designed to make content shoppable.",
    overview: ["BeautyCrew set out to change the way consumers interact with beauty through a community approach to editorial, referral and retail. The platform established a firm foothold aggregating the reach, editorial power and brand equity of Seven's beauty and fashion brands, amplified by a market-leading mobile web experience.", "The product, brand and content experience is intentionally elegant but age-agnostic — its audience is extremely diverse, spanning teens to age preventers. The central ethos of the content strategy was to engage users in conversation, with editorial designed and worded to encourage dialogue within the community.", "Retail placements are integrated throughout various stages of the editorial experience to encourage and validate purchase decisions. The ReviewCrew feature actively rewards knowledge exchange — user reviews help people understand the quality of the latest cosmetics before they buy."],
    sections: [
      { type: "fullwidth", image: "/images/beauty-crew/BC_Comment.jpg", alt: "Comment" },
      { type: "fullwidth", image: "/images/beauty-crew/BC_Comment2 copy.jpg", alt: "Comment2" },
      { type: "fullwidth", image: "/images/beauty-crew/BC_Comment2.jpg", alt: "Comment2" },
      { type: "fullwidth", image: "/images/beauty-crew/BC_Editorial.jpg", alt: "Editorial" },
      { type: "fullwidth", image: "/images/beauty-crew/BC_featured.jpg", alt: "Featured" },
      { type: "fullwidth", image: "/images/beauty-crew/BC_header.jpg", alt: "Header" },
      { type: "fullwidth", image: "/images/beauty-crew/BC_header_2.jpg", alt: "Header 2" },
      { type: "fullwidth", image: "/images/beauty-crew/BC_prototyping.jpg", alt: "Prototyping" },
      { type: "fullwidth", image: "/images/beauty-crew/CG_customer-experience.jpg", alt: "Customer Experience" },
      { type: "fullwidth", image: "/images/beauty-crew/CG_products.jpg", alt: "Products" },
      { type: "slider", label: "Screens", slides: [
          { image: "/images/beauty-crew/BC_carousel_1-1.jpg", caption: "Carousel 1 1" },
          { image: "/images/beauty-crew/BC_carousel_1.jpg", caption: "Carousel 1" },
          { image: "/images/beauty-crew/BC_carousel_10-1.jpg", caption: "Carousel 10 1" },
          { image: "/images/beauty-crew/BC_carousel_10.jpg", caption: "Carousel 10" },
          { image: "/images/beauty-crew/BC_carousel_11-1.jpg", caption: "Carousel 11 1" },
          { image: "/images/beauty-crew/BC_carousel_11.jpg", caption: "Carousel 11" },
          { image: "/images/beauty-crew/BC_carousel_12-1.jpg", caption: "Carousel 12 1" },
          { image: "/images/beauty-crew/BC_carousel_12.jpg", caption: "Carousel 12" },
          { image: "/images/beauty-crew/BC_carousel_2-1.jpg", caption: "Carousel 2 1" },
          { image: "/images/beauty-crew/BC_carousel_2.jpg", caption: "Carousel 2" },
          { image: "/images/beauty-crew/BC_carousel_3-1.jpg", caption: "Carousel 3 1" },
          { image: "/images/beauty-crew/BC_carousel_3.jpg", caption: "Carousel 3" },
          { image: "/images/beauty-crew/BC_carousel_4-1.jpg", caption: "Carousel 4 1" },
          { image: "/images/beauty-crew/BC_carousel_4.jpg", caption: "Carousel 4" },
          { image: "/images/beauty-crew/BC_carousel_5-1.jpg", caption: "Carousel 5 1" },
          { image: "/images/beauty-crew/BC_carousel_5.jpg", caption: "Carousel 5" },
          { image: "/images/beauty-crew/BC_carousel_6-1.jpg", caption: "Carousel 6 1" },
          { image: "/images/beauty-crew/BC_carousel_6.jpg", caption: "Carousel 6" },
          { image: "/images/beauty-crew/BC_carousel_7-1.jpg", caption: "Carousel 7 1" },
          { image: "/images/beauty-crew/BC_carousel_7.jpg", caption: "Carousel 7" },
          { image: "/images/beauty-crew/BC_carousel_8-1.jpg", caption: "Carousel 8 1" },
          { image: "/images/beauty-crew/BC_carousel_8.jpg", caption: "Carousel 8" },
          { image: "/images/beauty-crew/BC_carousel_9-1.jpg", caption: "Carousel 9 1" },
          { image: "/images/beauty-crew/BC_carousel_9.jpg", caption: "Carousel 9" }
      ] },
      { type: "slider", label: "Showcase", slides: [
          { image: "/images/beauty-crew/BC_Showcase1.png", caption: "Showcase1" },
          { image: "/images/beauty-crew/BC_Showcase2.png", caption: "Showcase2" },
          { image: "/images/beauty-crew/BC_Showcase3.png", caption: "Showcase3" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/beauty-crew/BC_account.jpg", alt: "Account" },
        { image: "/images/beauty-crew/BC_conversation.jpg", alt: "Conversation" },
        { image: "/images/beauty-crew/CG_parcel.jpg", alt: "Parcel" },
        { image: "/images/beauty-crew/CG_rate-review.jpg", alt: "Rate Review" }
      ] }
    ],
  },

  {
    slug: "7travel",
    title: "7travel — Shoppable travel editorial platform",
    client: "SevenWest Media",
    categories: ["Travel Tech", "Product Strategy", "UX Design"],
    active: false,
    year: "2016",
    visual: "logistics",
    coverImage: "/images/7travel/PORT_7trevel_parallax-head.jpg",
    deliverables: ["Product Strategy", "User Experience", "Interface & Brand Design"],
    summary: "The travel stories Seven had always told on TV became shoppable online — synchronised with the broadcast schedule, discoverable any time.",
    overview: ["7Travel fuses the power and reach of the 7 Network's TV brands with a mirrored digital platform, inspiring consumers to transact on their holiday ideas. By synchronising the editorial schedule with the broadcast EPG, millions of traditional media viewers brought a second device to their content experience — suddenly the travel stories Seven had always shared became shoppable, anywhere, any time.", "7Travel drives acquired TV, social and organic users into a three-stage journey: Learn, Inspire, Transact. The feed of destination cards on-site live-updates to reflect travel content broadcast on 7's linear channels and social feeds.", "We observed that some users knew where they wanted to go, while others knew what type of experience they wanted. A sophisticated content calendar was developed around tags that matched destinations — creating a simple path for users to discover content whether they explored destination-first or category-first."],
    sections: [
      { type: "fullwidth", image: "/images/7travel/7t_countries.jpg", alt: "Countries" },
      { type: "fullwidth", image: "/images/7travel/7t_inspiration.jpg", alt: "Inspiration" },
      { type: "fullwidth", image: "/images/7travel/7t_keyvisual-1.jpg", alt: "Keyvisual 1" },
      { type: "fullwidth", image: "/images/7travel/7t_screens.jpg", alt: "Screens" },
      { type: "fullwidth", image: "/images/7travel/7t_search-2.jpg", alt: "Search 2" },
      { type: "fullwidth", image: "/images/7travel/7t_search.jpg", alt: "Search" },
      { type: "fullwidth", image: "/images/7travel/7travel.jpg", alt: "7Travel" },
      { type: "fullwidth", image: "/images/7travel/PORT_7trevel_parallax-head.jpg", alt: "Port 7Trevel Parallax Head" },
      { type: "fullwidth", image: "/images/7travel/Screen-Shot-2018-03-26-at-1.52.24-pm.png", alt: "Screen Shot 2018 03 26 At 1.52.24 Pm" },
      { type: "fullwidth", image: "/images/7travel/Screen-Shot-2018-03-26-at-1.52.34-pm.png", alt: "Screen Shot 2018 03 26 At 1.52.34 Pm" },
      { type: "fullwidth", image: "/images/7travel/Screen-Shot-2018-03-26-at-1.52.53-pm.png", alt: "Screen Shot 2018 03 26 At 1.52.53 Pm" },
      { type: "fullwidth", image: "/images/7travel/Screen-Shot-2018-03-26-at-1.53.03-pm.png", alt: "Screen Shot 2018 03 26 At 1.53.03 Pm" },
      { type: "slider", label: "Brand System", slides: [
          { image: "/images/7travel/Brand-caro1.jpg", caption: "1" },
          { image: "/images/7travel/Brand-caro2.jpg", caption: "2" },
          { image: "/images/7travel/Brand-caro3.jpg", caption: "3" },
          { image: "/images/7travel/Brand-caro4.jpg", caption: "4" },
          { image: "/images/7travel/Brand-caro5.jpg", caption: "5" },
          { image: "/images/7travel/Brand-caro6.jpg", caption: "6" },
          { image: "/images/7travel/Brand-caro7.jpg", caption: "7" },
          { image: "/images/7travel/Brand-caro8.jpg", caption: "8" }
      ] },
      { type: "slider", label: "Screens", slides: [
          { image: "/images/7travel/7t_carousel1.jpg", caption: "Carousel1" },
          { image: "/images/7travel/7t_carousel10.jpg", caption: "Carousel10" },
          { image: "/images/7travel/7t_carousel11.jpg", caption: "Carousel11" },
          { image: "/images/7travel/7t_carousel2.jpg", caption: "Carousel2" },
          { image: "/images/7travel/7t_carousel3.jpg", caption: "Carousel3" },
          { image: "/images/7travel/7t_carousel4.jpg", caption: "Carousel4" },
          { image: "/images/7travel/7t_carousel5.jpg", caption: "Carousel5" },
          { image: "/images/7travel/7t_carousel6.jpg", caption: "Carousel6" },
          { image: "/images/7travel/7t_carousel7.jpg", caption: "Carousel7" },
          { image: "/images/7travel/7t_carousel8.jpg", caption: "Carousel8" },
          { image: "/images/7travel/7t_carousel9.jpg", caption: "Carousel9" }
      ] },
      { type: "slider", label: "Journeys", slides: [
          { image: "/images/7travel/7t_journeys1.jpg", caption: "Journeys1" },
          { image: "/images/7travel/7t_journeys2.jpg", caption: "Journeys2" },
          { image: "/images/7travel/7t_journeys3.jpg", caption: "Journeys3" },
          { image: "/images/7travel/7t_journeys4.jpg", caption: "Journeys4" }
      ] },
      { type: "slider", label: "Showcase", slides: [
          { image: "/images/7travel/7T_Showcase1.png", caption: "Showcase1" },
          { image: "/images/7travel/7T_Showcase2.png", caption: "Showcase2" },
          { image: "/images/7travel/7T_Showcase3.png", caption: "Showcase3" },
          { image: "/images/7travel/7T_Showcase4.png", caption: "Showcase4" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/7travel/7t_account.jpg", alt: "Account" },
        { image: "/images/7travel/7t_companion.jpg", alt: "Companion" },
        { image: "/images/7travel/7t_destination-feed.jpg", alt: "Destination Feed" },
        { image: "/images/7travel/7t_editorial-list.jpg", alt: "Editorial List" },
        { image: "/images/7travel/7t_editorial.jpg", alt: "Editorial" },
        { image: "/images/7travel/7t_keyvisual.jpg", alt: "Keyvisual" },
        { image: "/images/7travel/annual-international.jpg", alt: "Annual International" },
        { image: "/images/7travel/backpacker.jpg", alt: "Backpacker" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/7travel/holiday.jpg", alt: "Holiday" },
        { image: "/images/7travel/holidays.jpg", alt: "Holidays" }
      ] }
    ],
  },

  {
    slug: "yesville",
    title: "Yesville — Loyalty platform for Optus",
    client: "Optus",
    categories: ["Loyalty Platform", "UX Design", "Gamification"],
    active: false,
    year: "2014",
    visual: "fintech",
    coverImage: "/images/yesville/YV_keyvisual.jpg",
    deliverables: ["Product Strategy", "User Experience", "Interface & Brand Design"],
    summary: "A rewards platform for Australia's second-largest telco — designed to say thank you in ways customers actually feel.",
    overview: ["The Yesville web app is the centrepiece of a new customer rewards proposition by Optus. Amplified by an extensive customer base and the brand's existing digital presence, the central logic of the product is to learn about its users and reward them in ways they actually find rewarding — not generic discounts, but genuinely personalised experiences.", "The core sentiment of Yesville is gratitude. Content and products are sourced globally to offer at varying stages of the program for users to earn and redeem. The tone of voice and interactions instil a sense of playfulness — constantly reaffirming gamification and gratitude.", "Aligning with and extending Optus's corporate brand assets, a clean and welcoming UI encourages positive interaction. Users are identified and onboarded in a way that allows the platform to personalise their experience immediately — only content and rewards matching the user's interests are shown."],
    sections: [
      { type: "fullwidth", image: "/images/yesville/YV_UI.jpg", alt: "Ui" },
      { type: "fullwidth", image: "/images/yesville/YV_archi.jpg", alt: "Archi" },
      { type: "fullwidth", image: "/images/yesville/YV_editorial2.jpg", alt: "Editorial2" },
      { type: "fullwidth", image: "/images/yesville/YV_featured.jpg", alt: "Featured" },
      { type: "fullwidth", image: "/images/yesville/YV_header.jpg", alt: "Header" },
      { type: "fullwidth", image: "/images/yesville/YV_home-parallax.jpg", alt: "Home Parallax" },
      { type: "fullwidth", image: "/images/yesville/YV_keyvisual.jpg", alt: "Keyvisual" },
      { type: "slider", label: "Screens", slides: [
          { image: "/images/yesville/YV_carousel-10.jpg", caption: "Carousel 10" },
          { image: "/images/yesville/YV_carousel-11.jpg", caption: "Carousel 11" },
          { image: "/images/yesville/YV_carousel-12.jpg", caption: "Carousel 12" },
          { image: "/images/yesville/YV_carousel-13.jpg", caption: "Carousel 13" },
          { image: "/images/yesville/YV_carousel-3.jpg", caption: "Carousel 3" },
          { image: "/images/yesville/YV_carousel-4.jpg", caption: "Carousel 4" },
          { image: "/images/yesville/YV_carousel-5.jpg", caption: "Carousel 5" },
          { image: "/images/yesville/YV_carousel-6.jpg", caption: "Carousel 6" },
          { image: "/images/yesville/YV_carousel-7.jpg", caption: "Carousel 7" },
          { image: "/images/yesville/YV_carousel-8.jpg", caption: "Carousel 8" },
          { image: "/images/yesville/YV_carousel-9.jpg", caption: "Carousel 9" }
      ] },
      { type: "slider", label: "Showcase", slides: [
          { image: "/images/yesville/YV_Showcase1-1.png", caption: "Showcase1 1" },
          { image: "/images/yesville/YV_Showcase1.png", caption: "Showcase1" },
          { image: "/images/yesville/YV_Showcase2.png", caption: "Showcase2" },
          { image: "/images/yesville/YV_Showcase3.png", caption: "Showcase3" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/yesville/YV_account.jpg", alt: "Account" },
        { image: "/images/yesville/YV_landing.jpg", alt: "Landing" },
        { image: "/images/yesville/YV_loyalty.jpg", alt: "Loyalty" },
        { image: "/images/yesville/YV_persona-bob.jpg", alt: "Persona Bob" },
        { image: "/images/yesville/YV_persona-jen.jpg", alt: "Persona Jen" },
        { image: "/images/yesville/YV_persona-sam.jpg", alt: "Persona Sam" }
      ] }
    ],
  },

  {
    slug: "open-live",
    title: "Open Live — Independent music platform",
    client: "Reborn",
    categories: ["Music Tech", "Product Design", "UX Design"],
    active: false,
    year: "2016",
    visual: "robotics",
    coverImage: "/images/open-live/OL_keyvisual.jpg",
    deliverables: ["User Experience", "Interface & Brand Design"],
    summary: "Closed the gap between artist and fan — a live music platform with patented IOT hardware and a streaming app built for discovery.",
    overview: ["Open Live actively aims to close the gap between the Artist and Music Fan through unique physical and digital technology. Through its patented hardware and accompanying application, it allows Artists to create new revenue streams through live performances and merchandising with no capital outlay — and gives fans IOT-powered access to the live music they love.", "The UX and UI are designed to encourage discoverability for music lovers, creating clean funnels for streaming, saving and purchasing. The platform aims to extend access to live music moments beyond bars, theatres and stadiums — capturing those sessions and making them available anywhere, any time.", "Artist profiles facilitate simple publishing and music management for musicians. The experience creates a deep connection and direct marketing channel between artists and music lovers. Artists can even record directly into the platform using its patented Gingerbreadman cloud software."],
    sections: [
      { type: "fullwidth", image: "/images/open-live/OL_artist.jpg", alt: "Artist" },
      { type: "fullwidth", image: "/images/open-live/OL_discoverabilit.jpg", alt: "Discoverabilit" },
      { type: "fullwidth", image: "/images/open-live/OL_family.jpg", alt: "Family" },
      { type: "fullwidth", image: "/images/open-live/OL_header-1.jpg", alt: "Header 1" },
      { type: "fullwidth", image: "/images/open-live/OL_header.jpg", alt: "Header" },
      { type: "fullwidth", image: "/images/open-live/OL_keyvisual-1.jpg", alt: "Keyvisual 1" },
      { type: "fullwidth", image: "/images/open-live/OL_live.jpg", alt: "Live" },
      { type: "fullwidth", image: "/images/open-live/OL_styleguide.jpg", alt: "Styleguide" },
      { type: "fullwidth", image: "/images/open-live/OL_tracks.jpg", alt: "Tracks" },
      { type: "fullwidth", image: "/images/open-live/OL_user.jpg", alt: "User" },
      { type: "fullwidth", image: "/images/open-live/OL_workflow.jpg", alt: "Workflow" },
      { type: "slider", label: "Screens", slides: [
          { image: "/images/open-live/OL_carousel1.jpg", caption: "Carousel1" },
          { image: "/images/open-live/OL_carousel2.jpg", caption: "Carousel2" },
          { image: "/images/open-live/OL_carousel3.jpg", caption: "Carousel3" },
          { image: "/images/open-live/OL_carousel4.jpg", caption: "Carousel4" }
      ] },
      { type: "slider", label: "Dashboard", slides: [
          { image: "/images/open-live/OL_dash1.jpg", caption: "Dash1" },
          { image: "/images/open-live/OL_dash2.jpg", caption: "Dash2" },
          { image: "/images/open-live/OL_dash3.jpg", caption: "Dash3" },
          { image: "/images/open-live/OL_dash4.jpg", caption: "Dash4" },
          { image: "/images/open-live/OL_dash5.jpg", caption: "Dash5" }
      ] },
      { type: "slider", label: "Showcase", slides: [
          { image: "/images/open-live/OL_Showcase1.png", caption: "Showcase1" },
          { image: "/images/open-live/OL_Showcase2.png", caption: "Showcase2" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/open-live/OL_account.jpg", alt: "Account" },
        { image: "/images/open-live/OL_artist-music.jpg", alt: "Artist Music" },
        { image: "/images/open-live/OL_checkout.jpg", alt: "Checkout" },
        { image: "/images/open-live/OL_gingerbread.jpg", alt: "Gingerbread" }
      ] }
    ],
  },

  {
    slug: "commgames",
    title: "Commonwealth Games on 7 — OTT streaming platform",
    client: "Seven Network",
    categories: ["OTT Streaming", "UX Design", "Product Design"],
    active: false,
    year: "2018",
    visual: "robotics",
    coverImage: "/images/commgames/GC_keyvisual.jpg",
    deliverables: ["Product Strategy", "User Experience", "Interface & Brand Design"],
    summary: "Australia's biggest sporting moment on every screen — a comprehensive streaming platform for the Gold Coast 2018 Commonwealth Games.",
    overview: ["Following the success of Seven's PyeongChang digital campaign, the brief for Gold Coast 2018 was to go bigger — more sports, more screens, more moments. The platform needed to deliver thousands of hours of live and on-demand Commonwealth Games coverage across athletics, aquatics, cycling, wrestling and over 18 other sports.", "User research identified distinct viewing patterns — the dedicated sports follower, the casual fan tracking Australian medal stories, and families watching together across multiple devices. Each scenario demanded different navigation and content hierarchies, brought together in a single adaptive interface.", "The result scaled seamlessly from mobile first-check to living room Chromecast streaming, with personalised medal tracking, sport-by-sport scheduling, and a premium subscription tier offering HD streams and ad-free viewing for the dedicated viewer."],
    sections: [
      { type: "fullwidth", image: "/images/commgames/7commgames.jpg", alt: "7Commgames" },
      { type: "fullwidth", image: "/images/commgames/GC_header.jpg", alt: "Header" },
      { type: "fullwidth", image: "/images/commgames/GC_keyvisual-2.jpg", alt: "Keyvisual 2" },
      { type: "fullwidth", image: "/images/commgames/GC_playback.jpg", alt: "Playback" },
      { type: "fullwidth", image: "/images/commgames/GC_playback2.jpg", alt: "Playback2" },
      { type: "fullwidth", image: "/images/commgames/GC_responsive.jpg", alt: "Responsive" },
      { type: "fullwidth", image: "/images/commgames/PF_keyvisual.jpg", alt: "Keyvisual" },
      { type: "slider", label: "App Screens", slides: [
          { image: "/images/commgames/GC_4col1.jpg", caption: "4Col1" },
          { image: "/images/commgames/GC_4col2.jpg", caption: "4Col2" },
          { image: "/images/commgames/GC_4col3.jpg", caption: "4Col3" },
          { image: "/images/commgames/GC_4col4.jpg", caption: "4Col4" }
      ] },
      { type: "slider", label: "Screens", slides: [
          { image: "/images/commgames/GC_carousel-1.jpg", caption: "Carousel 1" },
          { image: "/images/commgames/GC_carousel-2.jpg", caption: "Carousel 2" },
          { image: "/images/commgames/GC_carousel-3.jpg", caption: "Carousel 3" },
          { image: "/images/commgames/GC_carousel-4.jpg", caption: "Carousel 4" },
          { image: "/images/commgames/GC_carousel-5.jpg", caption: "Carousel 5" },
          { image: "/images/commgames/GC_carousel-6.jpg", caption: "Carousel 6" },
          { image: "/images/commgames/GC_carousel-7.jpg", caption: "Carousel 7" },
          { image: "/images/commgames/PF_carousel.jpg", caption: "Carousel" }
      ] },
      { type: "fullwidth", image: "/images/commgames/GC_keyscreens.jpg", alt: "Keyscreens" },
      { type: "fullwidth", image: "/images/commgames/GC_logo.jpg", alt: "Logo" },
      { type: "slider", label: "Platform Screens", slides: [
          { image: "/images/commgames/GC_platform1.jpg", caption: "Platform1" },
          { image: "/images/commgames/GC_platform10.jpg", caption: "Platform10" },
          { image: "/images/commgames/GC_platform2.jpg", caption: "Platform2" },
          { image: "/images/commgames/GC_platform4.jpg", caption: "Platform4" },
          { image: "/images/commgames/GC_platform5.jpg", caption: "Platform5" },
          { image: "/images/commgames/GC_platform7.jpg", caption: "Platform7" },
          { image: "/images/commgames/GC_platform8.jpg", caption: "Platform8" },
          { image: "/images/commgames/GC_platform9.jpg", caption: "Platform9" }
      ] },
      { type: "slider", label: "Showcase", slides: [
          { image: "/images/commgames/GC_Showcase1.png", caption: "Showcase1" },
          { image: "/images/commgames/GC_Showcase2.png", caption: "Showcase2" },
          { image: "/images/commgames/GC_Showcase3.png", caption: "Showcase3" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/commgames/GC_UI.jpg", alt: "Ui" },
        { image: "/images/commgames/GC_account.jpg", alt: "Account" },
        { image: "/images/commgames/GC_chromecast.jpg", alt: "Chromecast" },
        { image: "/images/commgames/GC_keyvisual.jpg", alt: "Keyvisual" },
        { image: "/images/commgames/GC_premium.jpg", alt: "Premium" },
        { image: "/images/commgames/GC_widgets.jpg", alt: "Widgets" }
      ] }
    ],
  },

  {
    slug: "editor-group",
    title: "Editor Group — Brand identity & digital platform",
    client: "Editor Group",
    categories: ["Brand Design", "Web Design", "Design System"],
    active: false,
    year: "2023",
    visual: "logistics",
    coverImage: "/images/editor-group/EG_Hero.jpg",
    deliverables: ["Brand Strategy", "Visual Identity", "Web Design", "Design System"],
    summary: "A complete brand overhaul and website redesign for one of Australia's most respected B2B media and advisory groups.",
    overview: ["Editor Group sits at the intersection of B2B media, research and advisory services — a positioning that required a brand equal parts rigorous and accessible. The brief was to modernise a trusted but dated identity while retaining the authority that their audience expects.", "The visual system was built around clarity and credibility. A restrained palette, purposeful typography hierarchy and a modular grid system allow complex editorial content to breathe while maintaining the visual density that signals expertise. Circular imagery became a distinctive motif, differentiating the brand's human-centred storytelling.", "The website design system emerged from the brand foundation — a component library covering every content type from long-form articles to event listings, case studies and team profiles. Every pattern was tested against real content to ensure the system could flex without breaking."],
    sections: [
      { type: "fullwidth", image: "/images/editor-group/EG_Articles.jpg", alt: "Articles" },
      { type: "fullwidth", image: "/images/editor-group/EG_Challenge.jpg", alt: "Challenge" },
      { type: "fullwidth", image: "/images/editor-group/EG_Design-System.jpg", alt: "Design System" },
      { type: "fullwidth", image: "/images/editor-group/EG_Hero.jpg", alt: "Hero" },
      { type: "fullwidth", image: "/images/editor-group/EG_Hero.png", alt: "Hero" },
      { type: "fullwidth", image: "/images/editor-group/EG_Hero2.png", alt: "Hero2" },
      { type: "fullwidth", image: "/images/editor-group/EG_Landing.jpg", alt: "Landing" },
      { type: "fullwidth", image: "/images/editor-group/EG_Product-Research.jpg", alt: "Product Research" },
      { type: "fullwidth", image: "/images/editor-group/EG_Rebrand.jpg", alt: "Rebrand" },
      { type: "fullwidth", image: "/images/editor-group/EG_product research.png", alt: "Product Research" },
      { type: "fullwidth", image: "/images/editor-group/Group 33.png", alt: "Group 33" },
      { type: "fullwidth", image: "/images/editor-group/Screenshot 2023-06-09 at 13.22.44.png", alt: "Screenshot 2023 06 09 At 13.22.44" },
      { type: "fullwidth", image: "/images/editor-group/Screenshot 2023-06-09 at 13.22.55.png", alt: "Screenshot 2023 06 09 At 13.22.55" },
      { type: "fullwidth", image: "/images/editor-group/Screenshot 2023-06-09 at 13.23.07.png", alt: "Screenshot 2023 06 09 At 13.23.07" },
      { type: "fullwidth", image: "/images/editor-group/Screenshot 2023-06-09 at 13.23.27.png", alt: "Screenshot 2023 06 09 At 13.23.27" },
      { type: "fullwidth", image: "/images/editor-group/Screenshot 2023-06-09 at 13.23.40.png", alt: "Screenshot 2023 06 09 At 13.23.40" },
      { type: "fullwidth", image: "/images/editor-group/Screenshot 2023-06-09 at 13.24.36.png", alt: "Screenshot 2023 06 09 At 13.24.36" },
      { type: "fullwidth", image: "/images/editor-group/Screenshot 2023-06-09 at 13.25.15.png", alt: "Screenshot 2023 06 09 At 13.25.15" },
      { type: "fullwidth", image: "/images/editor-group/Screenshot 2023-06-09 at 13.25.49.png", alt: "Screenshot 2023 06 09 At 13.25.49" },
      { type: "fullwidth", image: "/images/editor-group/Screenshot 2023-06-09 at 13.26.27.png", alt: "Screenshot 2023 06 09 At 13.26.27" },
      { type: "fullwidth", image: "/images/editor-group/circles.png", alt: "Circles" },
      { type: "fullwidth", image: "/images/editor-group/density.png", alt: "Density" },
      { type: "fullwidth", image: "/images/editor-group/lists.png", alt: "Lists" },
      { type: "fullwidth", image: "/images/editor-group/navigation.png", alt: "Navigation" },
      { type: "fullwidth", image: "/images/editor-group/purposeful imagery.png", alt: "Purposeful Imagery" },
      { type: "fullwidth", image: "/images/editor-group/repetition.png", alt: "Repetition" },
      { type: "fullwidth", image: "/images/editor-group/sectioning.png", alt: "Sectioning" },
      { type: "fullwidth", image: "/images/editor-group/what,how.png", alt: "What,How" },
      { type: "fullwidth", image: "/images/editor-group/words.png", alt: "Words" },
      { type: "slider", label: "Brand Guidelines", slides: [
          { image: "/images/editor-group/02 - Guidelines - Background.png", caption: "02 Guidelines Background" },
          { image: "/images/editor-group/03 - Guidelines - Background.png", caption: "03 Guidelines Background" },
          { image: "/images/editor-group/08 - Guidelines - Colour Palette.png", caption: "08 Guidelines Colour Palette" },
          { image: "/images/editor-group/09 - Guidelines - Typography.png", caption: "09 Guidelines Typography" },
          { image: "/images/editor-group/10 - Guidelines - Type Usage.png", caption: "10 Guidelines Type Usage" },
          { image: "/images/editor-group/11 - Guidelines - Type Colour.png", caption: "11 Guidelines Type Colour" },
          { image: "/images/editor-group/12 - Guidelines - Imagery.png", caption: "12 Guidelines Imagery" },
          { image: "/images/editor-group/13 - Guidelines - Photographic Circles.png", caption: "13 Guidelines Photographic Circles" },
          { image: "/images/editor-group/15 - Guidelines - Website Interface.png", caption: "15 Guidelines Website Interface" }
      ] },
      { type: "slider", label: "Brand Logos", slides: [
          { image: "/images/editor-group/04 - Guidelines - Primary Logo.png", caption: "04 Guidelines Primary Logo" },
          { image: "/images/editor-group/05 - Guidelines - Logo Variations.png", caption: "05 Guidelines Logo Variations" },
          { image: "/images/editor-group/06 - Guidelines - Logo Variations.png", caption: "06 Guidelines Logo Variations" },
          { image: "/images/editor-group/07 - Guidelines - Logo Usage.png", caption: "07 Guidelines Logo Usage" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/editor-group/EG_Case-Studies.jpg", alt: "Case Studies" },
        { image: "/images/editor-group/EG_Homepage.jpg", alt: "Homepage" },
        { image: "/images/editor-group/EG_Services.jpg", alt: "Services" },
        { image: "/images/editor-group/EG_Team.jpg", alt: "Team" },
        { image: "/images/editor-group/Screenshot 2023-06-09 at 13.48.07.png", alt: "Screenshot 2023 06 09 At 13.48.07" },
        { image: "/images/editor-group/Screenshot 2023-06-09 at 13.53.57.png", alt: "Screenshot 2023 06 09 At 13.53.57" }
      ] },
      { type: "slider", label: "Detail Views", slides: [
          { image: "/images/editor-group/Article Card.png", caption: "Article Card" },
          { image: "/images/editor-group/Buttons.png", caption: "Buttons" },
          { image: "/images/editor-group/EG_Desktop_Articles.png", caption: "Desktop Articles" },
          { image: "/images/editor-group/EG_Desktop_Home.png", caption: "Desktop Home" },
          { image: "/images/editor-group/EG_Desktop_Home_744px.png", caption: "Desktop Home 744Px" },
          { image: "/images/editor-group/EG_Mobile_About_Team Expanded.png", caption: "Mobile About Team Expanded" },
          { image: "/images/editor-group/EG_Mobile_Article Template.png", caption: "Mobile Article Template" },
          { image: "/images/editor-group/EG_Mobile_Article Template_article.png", caption: "Mobile Article Template Article" },
          { image: "/images/editor-group/EG_Mobile_Case Studies.png", caption: "Mobile Case Studies" },
          { image: "/images/editor-group/EG_Mobile_Home.png", caption: "Mobile Home" },
          { image: "/images/editor-group/Group 32.png", caption: "Group 32" },
          { image: "/images/editor-group/Screenshot 2023-06-09 at 13.47.51.png", caption: "Screenshot 2023 06 09 At 13.47.51" },
          { image: "/images/editor-group/Text Field.png", caption: "Text Field" }
      ] }
    ],
  },

  {
    slug: "hearsay",
    title: "Hearsay — AI-powered meeting intelligence",
    client: "Hearsay",
    categories: ["AI Product Design", "UX Design", "Product Strategy"],
    active: false,
    year: "2023",
    visual: "health",
    coverImage: "/images/hearsay/HS_Hero.jpg",
    deliverables: ["Product Research", "UX Design", "UI Design", "Prototyping"],
    summary: "Designed the experience for an AI meeting assistant that captures, transcribes and surfaces the insights that matter — so teams can focus on the conversation, not the notes.",
    overview: ["Hearsay began with a simple observation: the most valuable part of any meeting rarely makes it into the notes. An AI assistant that could capture everything was only half the solution — the real design challenge was surfacing what mattered, to the right person, at the right time.", "The meeting flow was designed around natural transitions: pre-meeting preparation, live attendance, and post-meeting review. Each phase had distinct user goals and attention states — the interface had to step back during the live session and come forward at the moments of value.", "The Hearsay workspace gives teams visibility into the conversations that shape decisions. Highlights, action items, and key moments are automatically extracted and attributed — turning what used to be a memory exercise into a shared, searchable record of how the business actually works."],
    sections: [
      { type: "fullwidth", image: "/images/hearsay/HS_Challenge.jpg", alt: "Challenge" },
      { type: "fullwidth", image: "/images/hearsay/HS_Hero.jpg", alt: "Hero" },
      { type: "fullwidth", image: "/images/hearsay/HS_Prototypes.jpg", alt: "Prototypes" },
      { type: "fullwidth", image: "/images/hearsay/HS_meeting-flow.jpg", alt: "Meeting Flow" },
      { type: "fullwidth", image: "/images/hearsay/Hearsay_Live Conversation.jpg", alt: "Hearsay Live Conversation" },
      { type: "fullwidth", image: "/images/hearsay/Hearsay_Login.png", alt: "Hearsay Login" },
      { type: "fullwidth", image: "/images/hearsay/Hearsay_Workspace Conversations_PreConversation.jpg", alt: "Hearsay Workspace Conversations Preconversation" },
      { type: "fullwidth", image: "/images/hearsay/Screenshot 2023-06-09 at 16.25.48.png", alt: "Screenshot 2023 06 09 At 16.25.48" },
      { type: "fullwidth", image: "/images/hearsay/Screenshot 2023-06-09 at 17.17.13.png", alt: "Screenshot 2023 06 09 At 17.17.13" },
      { type: "fullwidth", image: "/images/hearsay/live-meeting.jpg", alt: "Live Meeting" },
      { type: "fullwidth", image: "/images/hearsay/live-meeting.png", alt: "Live Meeting" },
      { type: "fullwidth", image: "/images/hearsay/new-meeting.jpg", alt: "New Meeting" },
      { type: "fullwidth", image: "/images/hearsay/Hearsay_Dashboard.jpg", alt: "Hearsay Dashboard" },
      { type: "fullwidth", image: "/images/hearsay/HS_Keyscreens.jpg", alt: "Keyscreens" },
      { type: "grid", cols: 2, images: [
        { image: "/images/hearsay/Group 38.png", alt: "Group 38" },
        { image: "/images/hearsay/Group 39.png", alt: "Group 39" },
        { image: "/images/hearsay/HS_Insights.jpg", alt: "Insights" },
        { image: "/images/hearsay/HS_Meeting.jpg", alt: "Meeting" },
        { image: "/images/hearsay/HS_Outtakes.jpg", alt: "Outtakes" },
        { image: "/images/hearsay/HS_Transcript.jpg", alt: "Transcript" },
        { image: "/images/hearsay/Screenshot 2023-06-09 at 16.47.04.png", alt: "Screenshot 2023 06 09 At 16.47.04" },
        { image: "/images/hearsay/Screenshot 2023-06-09 at 16.47.18.png", alt: "Screenshot 2023 06 09 At 16.47.18" }
      ] },
      { type: "grid", cols: 2, images: [
        { image: "/images/hearsay/calendar.png", alt: "Calendar" },
        { image: "/images/hearsay/meeting.png", alt: "Meeting" }
      ] },
      { type: "slider", label: "Detail Views", slides: [
          { image: "/images/hearsay/highlights.png", caption: "Highlights" },
          { image: "/images/hearsay/insights.png", caption: "Insights" },
          { image: "/images/hearsay/transcript.png", caption: "Transcript" }
      ] }
    ],
  },

  {
    slug: "peq",
    title: "ParentalEQ — Co-parenting support platform",
    client: "ParentalEQ",
    categories: ["Product Design", "UX Design"],
    active: false,
    year: "2021",
    visual: "health",
    coverImage: "/images/peq/screencapture-web-archive-org-web-20210702204836-https-parentaleq-com-2023-06-09-10_50_19.png",
    deliverables: ["Product Strategy", "UX Design", "Interface Design"],
    summary: "A digital platform designed to support separated parents in building healthier co-parenting relationships — keeping children at the centre of every interaction.",
    overview: ["ParentalEQ was built on a recognition that the tools separated parents needed simply didn't exist. Shared calendars weren't designed for the complexity of custody arrangements. Messaging apps weren't designed to reduce conflict. Court documents weren't designed to be understood.", "The platform brought together the practical tools of co-parenting — scheduling, communication records, expense tracking — with a tone of voice and experience deliberately calibrated to reduce friction. Every design decision was tested against real scenarios from real separated families.", "The mobile-first experience extended to a web platform and native app, ensuring parents could manage arrangements on whatever device was at hand — whether picking up kids from school or in a lawyer's waiting room."],
    sections: [
      { type: "slider", label: "Platform", slides: [
          { image: "/images/peq/screencapture-play-google-store-apps-details-2023-06-09-10_51_58.png", caption: "Screencapture Play Google Store Apps Details 2023 06 09 10 51 58" },
          { image: "/images/peq/screencapture-web-archive-org-web-20210702204836-https-parentaleq-com-2023-06-09-10_50_19.png", caption: "Screencapture Web Archive Org Web 20210702204836 Https Parentaleq Com 2023 06 09 10 50 19" },
          { image: "/images/peq/screencapture-web-archive-org-web-20211208190607-https-parentaleq-com-2023-06-09-10_22_45.png", caption: "Screencapture Web Archive Org Web 20211208190607 Https Parentaleq Com 2023 06 09 10 22 45" }
      ] }
    ],
  },

];

/* ===== Launch case studies ===== */
/* Fields used by the work gallery and case study page cards.
   Body copy lives in the static HTML files under /work/. */
const caseStudies = [
  {
    slug: "policyfly",
    client: "PolicyFly",
    named: true,
    sector: "InsurTech",
    yearStart: 2018,
    yearEnd: "present",
    headline: "", /* TODO Ben */
    summary: "", /* TODO Ben */
    services: ["UX design", "Product design", "Design systems"],
    thumbnail: "",
    featured: true
  },
  {
    slug: "hearsay",
    client: "Hearsay",
    named: true,
    sector: "SaaS and technology",
    yearStart: 2024,
    yearEnd: 2024,
    headline: "", /* TODO Ben */
    summary: "", /* TODO Ben */
    services: ["Product design", "Product strategy", "AI feature design"],
    thumbnail: "",
    featured: true
  },
  {
    slug: "winter-olympics-on-7",
    client: "Winter Olympics on 7",
    named: true,
    sector: "OTT streaming",
    yearStart: 2018,
    yearEnd: 2018,
    headline: "", /* TODO Ben */
    summary: "", /* TODO Ben */
    services: ["Product strategy", "Product design", "UX design", "UI design", "Analytics and measurement"],
    thumbnail: "",
    featured: true
  },
  {
    slug: "beautycrew",
    client: "BeautyCrew",
    named: true,
    sector: "Ecommerce and cosmetics",
    yearStart: 2018,
    yearEnd: 2018,
    headline: "", /* TODO Ben */
    summary: "", /* TODO Ben */
    services: ["Product design", "Product strategy"],
    thumbnail: "",
    featured: false
  }
];

const ARTICLES = [];

const REPORTS = [
  {
    title: "Designing Trust into Agentic Interfaces",
    year: "2026",
    abstract: "A field study on how delegation cues, undo affordances, and action previews change user trust in autonomous agents.",
    file: "reports/designing-trust-agentic-interfaces.pdf",
    filesize: "1.2 MB"
  },
  {
    title: "Calibrating Confidence: UI Patterns for Probabilistic Output",
    year: "2026",
    abstract: "Comparing eleven confidence-display patterns across 600 participants to find what users actually calibrate against.",
    file: "reports/calibrating-confidence-ui-patterns.pdf",
    filesize: "1.4 MB"
  },
  {
    title: "The Latency Tax: Response Time and Perceived Competence",
    year: "2025",
    abstract: "How streaming, skeletons, and thinking-states change perceived intelligence independent of model accuracy.",
    file: "reports/latency-tax-response-time.pdf",
    filesize: "0.9 MB"
  }
];
