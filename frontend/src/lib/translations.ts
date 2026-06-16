// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS (i18n)
// Supports English (en) and Bangla (bn)
// Add or edit strings here to update text across the entire site
// ─────────────────────────────────────────────────────────────────────────────

import { Locale } from "@/types";

export const translations = {
  // ─── ENGLISH ───────────────────────────────────────────────────────────────
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      publications: "Publications",
      media: "Media",
      contact: "Contact",
      downloadCV: "Download CV",
    },

    // Hero Section
    hero: {
      greeting: "Hi, I'm",
      // ⬇ INFO: Change this to your full name
      name: "Md Tahamin Islam",
      // ⬇ INFO: Edit these rotating roles to match your identity
      roles: [
        "ML Engineer",
        "Researcher",
        "Web Developer",
        "Musician",
        "SSC '27",
      ],
      // ⬇ INFO: Edit this short intro (1–2 sentences)
      description:
        "A passionate learner from Dhaka, Bangladesh — exploring machine learning and web development while dreaming of Cambridge and Oxford.",
      ctaWork: "View My Work",
      ctaCV: "Download CV",
      scrollHint: "Scroll to explore",
      location: "Dhaka, Bangladesh",
    },

    // About Section
    about: {
      sectionTag: "Who I Am",
      title: "About Me",
      // ⬇ INFO: Edit this multi-paragraph biography. Keep each paragraph focused.
      bio: [
        "I'm Mahin — a student at Sunup International School (SSC Batch 2027) with a deep passion for machine learning and web development. I believe that the best technology is built at the intersection of rigorous science and creative curiosity.",
        "My journey into machine learning started when I built my first classifier and got hooked on the idea that computers could learn patterns from data. Since then, I've worked on ML projects, participated in Kaggle competitions, and built web applications — all while still in secondary school.",
        "Beyond code, I compose music and create motivational content. I aim to study at a world-class university and contribute to AI research that genuinely benefits people.",
      ],
      skillsTitle: "Skills & Technologies",
      educationTitle: "Education",
      statsTitle: "Quick Stats",
    },

    // Projects Section
    projects: {
      sectionTag: "What I've Built",
      title: "Projects",
      subtitle: "A selection of work spanning ML and web development.",
      filterAll: "All",
      filterML: "Machine Learning",
      filterWeb: "Web Dev",
      viewGithub: "GitHub",
      viewLive: "Live Demo",
      viewMore: "View Details",
      status: {
        completed: "Completed",
        "in-progress": "In Progress",
        planned: "Planned",
      },
      noProjects: "Projects coming soon...",
    },

    // Publications Section
    publications: {
      sectionTag: "My Research",
      title: "Publications",
      subtitle:
        "Academic papers, research notes, and technical write-ups I've authored.",
      viewPDF: "View PDF",
      viewDOI: "View DOI",
      noPublications: "Research papers coming soon...",
    },

    // Media Section
    media: {
      sectionTag: "My Channels",
      title: "Media & Content",
      subtitle:
        "I create content on music, tech, and motivation. Watch, listen, and subscribe.",
      categories: {
        music: "Music",
        motivational: "Motivational",
        tech: "Tech",
      },
      watchOn: "Watch on YouTube",
      followChannel: "Follow Channel",
    },

    // Contact Section
    contact: {
      sectionTag: "Get In Touch",
      title: "Contact Me",
      subtitle:
        "Whether you're a university, recruiter, collaborator, or just curious — I'd love to hear from you.",
      form: {
        name: "Full Name",
        namePlaceholder: "Your full name",
        email: "Email Address",
        emailPlaceholder: "your.email@example.com",
        subject: "Subject",
        subjectPlaceholder: "What is this about?",
        message: "Message",
        messagePlaceholder: "Tell me about your project, opportunity, or question...",
        submit: "Send Message",
        submitting: "Sending...",
        successTitle: "Message Sent!",
        successMsg:
          "Thank you for reaching out. I'll get back to you within 24–48 hours.",
        errorMsg: "Something went wrong. Please try again or email me directly.",
      },
      directContact: "Or reach me directly",
      socials: "Find me online",
    },

    // Footer
    footer: {
      tagline: "Building the future, one model at a time.",
      links: "Quick Links",
      copyright: "© {year} Md Tahamin Islam. All rights reserved.",
      builtWith: "Built with Next.js & ❤️",
    },

    // Common / Shared
    common: {
      learnMore: "Learn More",
      close: "Close",
      loading: "Loading...",
      backToTop: "Back to top",
      present: "Present",
    },
  },

  // ─── BANGLA ────────────────────────────────────────────────────────────────
  bn: {
    // Navigation
    nav: {
      home: "হোম",
      about: "আমার সম্পর্কে",
      projects: "প্রজেক্ট",
      publications: "প্রকাশনা",
      media: "মিডিয়া",
      contact: "যোগাযোগ",
      downloadCV: "CV ডাউনলোড",
    },

    // Hero Section
    hero: {
      greeting: "হ্যালো, আমি",
      name: "মো. তাহামিন ইসলাম",
      roles: [
        "এমএল ইঞ্জিনিয়ার",
        "গবেষক",
        "অ্যালগো ট্রেডার",
        "সঙ্গীতশিল্পী",
        "এসএসসি '২৭",
      ],
      description:
        "ঢাকা, বাংলাদেশ থেকে একজন উৎসাহী শিক্ষার্থী — মেশিন লার্নিং এবং ওয়েব ডেভেলপমেন্ট অন্বেষণ করছি।",
      ctaWork: "আমার কাজ দেখুন",
      ctaCV: "CV ডাউনলোড",
      scrollHint: "নিচে স্ক্রোল করুন",
      location: "ঢাকা, বাংলাদেশ",
    },

    // About Section
    about: {
      sectionTag: "আমি কে",
      title: "আমার সম্পর্কে",
      bio: [
        "আমি মাহিন — সানআপ ইন্টারন্যাশনাল স্কুলের একজন ছাত্র (এসএসসি ব্যাচ ২০২৭)। মেশিন লার্নিং এবং ওয়েব ডেভেলপমেন্টে আমার গভীর আগ্রহ রয়েছে।",
        "মেশিন লার্নিংয়ে আমার যাত্রা শুরু হয়েছিল যখন আমি আমার প্রথম ক্লাসিফায়ার তৈরি করেছিলাম। তারপর থেকে, আমি এমএল প্রজেক্টে কাজ করেছি, কাগল প্রতিযোগিতায় অংশ নিয়েছি এবং ওয়েব অ্যাপ তৈরি করেছি।",
        "কোডের বাইরে, আমি সঙ্গীত রচনা করি এবং অনুপ্রেরণামূলক কন্টেন্ট তৈরি করি।",
      ],
      skillsTitle: "দক্ষতা ও প্রযুক্তি",
      educationTitle: "শিক্ষা",
      statsTitle: "সংক্ষিপ্ত পরিসংখ্যান",
    },

    // Projects Section
    projects: {
      sectionTag: "আমার কাজ",
      title: "প্রজেক্টসমূহ",
      subtitle: "এমএল এবং ওয়েব ডেভেলপমেন্ট-এ আমার নির্বাচিত কাজ।",
      filterAll: "সব",
      filterML: "মেশিন লার্নিং",
      filterWeb: "ওয়েব ডেভ",
      viewGithub: "গিটহাব",
      viewLive: "লাইভ ডেমো",
      viewMore: "বিস্তারিত",
      status: {
        completed: "সম্পন্ন",
        "in-progress": "চলমান",
        planned: "পরিকল্পিত",
      },
      noProjects: "প্রজেক্ট শীঘ্রই আসছে...",
    },

    // Publications Section
    publications: {
      sectionTag: "আমার গবেষণা",
      title: "প্রকাশনা",
      subtitle:
        "আমার লেখা একাডেমিক পেপার, গবেষণা নোট এবং প্রযুক্তিগত লেখা।",
      viewPDF: "PDF দেখুন",
      viewDOI: "DOI দেখুন",
      noPublications: "গবেষণা পেপার শীঘ্রই আসছে...",
    },

    // Media Section
    media: {
      sectionTag: "আমার চ্যানেল",
      title: "মিডিয়া ও কন্টেন্ট",
      subtitle:
        "আমি সঙ্গীত, প্রযুক্তি এবং অনুপ্রেরণা বিষয়ক কন্টেন্ট তৈরি করি।",
      categories: {
        music: "সঙ্গীত",
        motivational: "অনুপ্রেরণামূলক",
        tech: "প্রযুক্তি",
      },
      watchOn: "ইউটিউবে দেখুন",
      followChannel: "চ্যানেল অনুসরণ করুন",
    },

    // Contact Section
    contact: {
      sectionTag: "যোগাযোগ",
      title: "আমাকে বার্তা পাঠান",
      subtitle:
        "আপনি বিশ্ববিদ্যালয়, নিয়োগকর্তা, সহযোগী বা কৌতূহলী — যাই হোন, আমি শুনতে চাই।",
      form: {
        name: "পূর্ণ নাম",
        namePlaceholder: "আপনার পূর্ণ নাম",
        email: "ইমেইল ঠিকানা",
        emailPlaceholder: "your.email@example.com",
        subject: "বিষয়",
        subjectPlaceholder: "বিষয় কী?",
        message: "বার্তা",
        messagePlaceholder: "আপনার প্রজেক্ট, সুযোগ বা প্রশ্ন সম্পর্কে বলুন...",
        submit: "বার্তা পাঠান",
        submitting: "পাঠানো হচ্ছে...",
        successTitle: "বার্তা পাঠানো হয়েছে!",
        successMsg:
          "যোগাযোগ করার জন্য ধন্যবাদ। আমি ২৪–৪৮ ঘণ্টার মধ্যে সাড়া দেব।",
        errorMsg:
          "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন বা সরাসরি ইমেইল করুন।",
      },
      directContact: "বা সরাসরি যোগাযোগ করুন",
      socials: "অনলাইনে আমাকে খুঁজুন",
    },

    // Footer
    footer: {
      tagline: "একটি মডেল দিয়ে, একসময়ে ভবিষ্যৎ গড়ছি।",
      links: "দ্রুত লিঙ্ক",
      copyright: "© {year} মো. তাহামিন ইসলাম। সর্বস্বত্ব সংরক্ষিত।",
      builtWith: "Next.js ও ❤️ দিয়ে তৈরি",
    },

    // Common / Shared
    common: {
      learnMore: "আরও জানুন",
      close: "বন্ধ করুন",
      loading: "লোড হচ্ছে...",
      backToTop: "উপরে ফিরুন",
      present: "বর্তমান",
    },
  },
} as const;

export type TranslationKey = typeof translations.en;

// Helper function — use this in components to get translations
// Usage: const t = useTranslation() → t.hero.title
export function getTranslations(locale: Locale) {
  return translations[locale];
}
