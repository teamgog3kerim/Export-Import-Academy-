export type Language = 'en' | 'am';

export interface Translations {
  [key: string]: {
    en: string;
    am: string;
  };
}

export const TRANSLATIONS: Translations = {
  // App Shell & Branding
  app_title: {
    en: 'Export-Import Logistics Academy',
    am: 'የላኪና አስመጪ ሎጂስቲክስ አካዳሚ'
  },
  app_subtitle: {
    en: 'Professional Trade Education',
    am: 'የውጭ ንግድና ሎጂስቲክስ ሙያዊ ሥልጠና'
  },
  lang_switch_btn: {
    en: 'Amharic',
    am: 'English'
  },

  // Navigation Items
  nav_overview: {
    en: 'Learning Desk',
    am: 'የመማሪያ ገጽ'
  },
  nav_curriculum: {
    en: 'Curriculum',
    am: 'ሥርዓተ ትምህርት'
  },
  nav_lc_calculator: {
    en: 'Letter of Credit',
    am: 'የብድር ደብዳቤ (L/C)'
  },
  nav_landed_cost: {
    en: 'Landed Cost',
    am: 'የዕቃ ማድረሻ ጠቅላላ ወጪ'
  },
  nav_tax_calculator: {
    en: 'Customs Tax',
    am: 'የጉምሩክ ቀረጥና ታክስ'
  },
  nav_incoterms: {
    en: 'Incoterms® 2020',
    am: 'የኢንኮተርምስ መመሪያ'
  },
  nav_quiz_center: {
    en: 'Quiz Center',
    am: 'የፈተና ማዕከል'
  },
  nav_resources: {
    en: 'Resource Library',
    am: 'የሰነዶች ማዕከል'
  },
  nav_progress: {
    en: 'Study Tracker',
    am: 'የትምህርት ሂደት'
  },
  nav_certificate: {
    en: 'Certificate',
    am: 'የምስክር ወረቀት'
  },
  nav_subscription: {
    en: 'Subscription Plans',
    am: 'የአባልነት ዕቅድ'
  },
  nav_admin: {
    en: 'Admin Dashboard',
    am: 'የአስተዳዳሪ ማዕከል'
  },
  nav_all_lessons: {
    en: 'All lessons',
    am: 'ሁሉም ትምህርቶች'
  },

  // Learning Dashboard
  desk_badge: {
    en: 'Your learning desk',
    am: 'የእርስዎ የመማሪያ ማዕከል'
  },
  hero_title_prefix: {
    en: 'Trade knowledge - Learn Wherever you are,',
    am: 'የንግድ እውቀት — የትም ሆነው ይማሩ፣'
  },
  hero_title_suffix: {
    en: 'put to work.',
    am: 'በተግባር ያውሉ!'
  },
  welcome_back: {
    en: 'Welcome back,',
    am: 'እንኳን በደህና መጡ፣'
  },
  welcome_guest: {
    en: 'Welcome to Export-Import Logistics Academy',
    am: 'ወደ ላኪና አስመጪ ሎጂስቲክስ አካዳሚ እንኳን በደህና መጡ'
  },
  hero_desc_user: {
    en: 'Build practical confidence in Ethiopian import, export, and logistics—one lesson and one calculation at a time.',
    am: 'በኢትዮጵያ የገቢና ወጪ ንግድ እንዲሁም በኮሪደር ሎጂስቲክስ ላይ ተግባራዊ ክህሎትዎን ያሳድጉ።'
  },
  hero_desc_guest: {
    en: 'Build practical confidence in Ethiopian import, export, and corridor operations. Log in with your Telegram account to sync your progress and activate your membership.',
    am: 'በኢትዮጵያ የገቢና ወጪ ንግድ እንዲሁም ሎጂስቲክስ ላይ ተግባራዊ ክህሎት ይገንቡ። ትምህርትዎን ለመከታተልና አባልነትዎን ለማግበር በቴሌግራም ይግቡ።'
  },
  btn_continue_learning: {
    en: 'Continue learning',
    am: 'ትምህርቱን ይቀጥሉ'
  },
  btn_join_telegram: {
    en: 'Join our channel for more business Updates',
    am: 'ለተጨማሪ የቢዝነስ መረጃዎች ቻናላችንን ይቀላቀሉ'
  },
  btn_login_telegram: {
    en: 'Log in with Telegram',
    am: 'በቴሌግራም ይግቡ'
  },
  course_progress: {
    en: 'Course progress',
    am: 'የትምህርት ሂደት'
  },
  lessons_completed: {
    en: 'Lessons completed',
    am: 'የተጠናቀቁ ትምህርቶች'
  },
  quiz_attempts: {
    en: 'Quiz attempts saved',
    am: 'የተፈተኑ ጥያቄዎች'
  },
  learning_pathway: {
    en: 'Learning pathway',
    am: 'የትምህርት መርሃ-ግብር'
  },
  structured_curriculum: {
    en: 'Structured curriculum',
    am: 'የተደራጀ ሥርዓተ-ትምህርት'
  },
  pick_up_practice: {
    en: 'Pick up where practice begins',
    am: 'ካቆሙበት ይቀጥሉ'
  },
  practice_tools: {
    en: 'Practice with trade tools',
    am: 'በንግድ መሣሪያዎች ይለማመዱ'
  },
  practice_tools_desc: {
    en: 'Use the calculators alongside your lessons to connect concepts with working estimates.',
    am: 'ትምህርቱን ከተጨባጭ የሂሳብ ስሌቶች ጋር ለማስተሳሰር የንግድ ማስያዎችን ይጠቀሙ።'
  },
  channel_banner_title: {
    en: 'Join EXIMMAN LEARN Official Telegram Channel',
    am: 'የEXIMMAN LEARN ይፋዊ የቴሌግራም ቻናልን ይቀላቀሉ'
  },
  channel_banner_desc: {
    en: 'Connect with fellow Ethiopian trade professionals. Receive real-time NBE FX directives, customs tariff updates, documentary credit case studies, and academy announcements.',
    am: 'ከኢትዮጵያ የውጭ ንግድ ባለሙያዎች ጋር ይገናኙ። ወቅታዊ የብሔራዊ ባንክ መመሪያዎችን፣ የጉምሩክ ታሪፍ ማሻሻያዎችን እና ጥናቶችን በየቀኑ ያግኙ።'
  },
  join_channel_btn: {
    en: 'Join Channel (@eximmanlearn)',
    am: 'ቻናሉን ይቀላቀሉ (@eximmanlearn)'
  },
  up_next: {
    en: 'Up next',
    am: 'ቀጣይ'
  },
  browse_module: {
    en: 'Browse module',
    am: 'ሞጁሉን ይመልከቱ'
  },
  review_module: {
    en: 'Review module',
    am: 'ሞጁሉን ይከልሱ'
  },

  // Subscription & Paywall
  sub_promo_discount: {
    en: 'Promotional 60% Discount!',
    am: 'የ60% ልዩ ቅናሽ!'
  },
  sub_full_pass: {
    en: 'Full Academy Pass',
    am: 'የአካዳሚው ሙሉ ማለፊያ'
  },
  sub_30_days_title: {
    en: '30-Day Complete Subscription',
    am: 'የ30 ቀናት ሙሉ አባልነት'
  },
  sub_30_days_desc: {
    en: 'Every subscription is valid for 30 days. When 30 days expire, you can renew for 3,900 Birr (Promotional 60% Discount!).',
    am: 'እያንዳንዱ ምዝገባ ለ30 ቀናት ያገለግላል። 30 ቀናት ሲያልቁ በ3,900 ብር (የ60% ልዩ ቅናሽ) ማደስ ይችላሉ።'
  },
  sub_birr_30_days: {
    en: 'Birr / 30 Days',
    am: 'ብር / ለ30 ቀናት'
  },
  sub_subscribe_btn: {
    en: 'Subscribe via telebirr (3,900 Birr · Promotional 60% Discount!)',
    am: 'በቴሌብር ይክፈሉ (3,900 ብር · የ60% ልዩ ቅናሽ!)'
  },
  sub_resubscribe_btn: {
    en: 'Resubscribe for 3,900 Birr (Promotional 60% Discount!)',
    am: 'በድጋሚ ይመዝገቡ (3,900 ብር · የ60% ልዩ ቅናሽ!)'
  },
  sub_expired_banner_title: {
    en: 'Your 30-Day Subscription Has Expired',
    am: 'የ30 ቀናት አባልነትዎ አብቅቷል'
  },
  sub_expired_banner_desc: {
    en: 'Every subscription period lasts 30 days. Resubscribe now for 3,900 Birr (Promotional 60% Discount!) to continue uninterrupted access to all 16 chapters and certificates.',
    am: 'የአባልነት ጊዜው 30 ቀናት ነው። ያልተቋረጠ ትምህርት እና የምስክር ወረቀት ለማግኘት አሁን በ3,900 ብር (የ60% ቅናሽ) ያድሱ።'
  },
  sub_telebirr_instructions: {
    en: 'telebirr Payment Instructions',
    am: 'የቴሌብር ክፍያ መመሪያ'
  },
  sub_step1_title: {
    en: 'Transfer Amount',
    am: 'የሚተላለፍ የገንዘብ መጠን'
  },
  sub_step1_desc: {
    en: 'Open your telebirr mobile app or dial *127# and send 3,900 ETB (promotional 60% discount applied).',
    am: 'የቴሌብር መተግበሪያዎን ይክፈቱ ወይም በ *127# 3,900 ብር ያስተላልፉ (የ60% ቅናሽ ተደርጓል)።'
  },
  sub_step2_title: {
    en: 'Recipient Details',
    am: 'የተቀባይ መረጃ'
  },
  sub_step2_desc: {
    en: 'Send to Abdulkerim · 09 6768 4490',
    am: 'ወደ አብዱልከሪም ይላኩ · 09 6768 4490'
  },
  sub_step3_title: {
    en: 'Upload Receipt Screenshot',
    am: 'የክፍያ ደረሰኝ ስክሪንሾት ያስገቡ'
  },
  sub_step3_desc: {
    en: 'Upload the payment confirmation for instant admin review.',
    am: 'ክፍያዎ እንዲረጋገጥ የተላከበትን ደረሰኝ ስክሪንሾት እዚህ ያስገቡ።'
  },
  sub_account_number: {
    en: 'telebirr Account Number',
    am: 'የቴሌብር ሂሳብ ቁጥር'
  },
  sub_receiver_name: {
    en: 'Account Holder Name',
    am: 'የሂሳብ ባለቤት ስም'
  },
  sub_submit_proof: {
    en: 'Submit Payment Proof for Approval',
    am: 'የከፈሉበትን ማረጋገጫ ያስገቡ'
  },
  sub_pending_notice: {
    en: 'Payment Request Pending Approval',
    am: 'ክፍያዎ በአስተዳዳሪው እየተገመገመ ነው'
  },
  sub_copied: {
    en: 'Copied!',
    am: 'ተቀድቷል!'
  },
  sub_copy_number: {
    en: 'Copy Number',
    am: 'ቁጥር ቅዳ'
  },

  // Course Viewer
  course_back_to_desk: {
    en: 'Back to Learning Desk',
    am: 'ወደ መማሪያ ገጽ ተመለስ'
  },
  course_chapter: {
    en: 'Chapter',
    am: 'ምዕራፍ'
  },
  course_module: {
    en: 'Module',
    am: 'ሞጁል'
  },
  course_lesson_content: {
    en: 'Lesson Content',
    am: 'የትምህርት ይዘት'
  },
  course_practical_case: {
    en: 'Practical Scenario',
    am: 'ተግባራዊ ምሳሌ'
  },
  course_knowledge_quiz: {
    en: 'Knowledge Quiz',
    am: 'የእውቀት መመዘኛ ፈተና'
  },
  course_study_notes: {
    en: 'Study Notes',
    am: 'ማስታወሻዎች'
  },
  course_mark_complete: {
    en: 'Mark Chapter Completed',
    am: 'ትምህርቱን አጠናቅቄአለሁ'
  },
  course_completed_btn: {
    en: 'Chapter Completed',
    am: 'ትምህርቱ ተጠናቋል'
  },
  course_prev_lesson: {
    en: 'Previous Lesson',
    am: 'ቀዳሚ ትምህርት'
  },
  course_next_lesson: {
    en: 'Next Lesson',
    am: 'ቀጣይ ትምህርት'
  },
  course_free_trial: {
    en: 'Free Trial',
    am: 'ነፃ የሙከራ ትምህርት'
  },
  course_locked: {
    en: 'Subscriber Only',
    am: 'ለአባላት ብቻ'
  },

  // User Authentication & Roles
  user_status_active: {
    en: 'Subscriber (Paid)',
    am: 'የተመዘገበ አባል'
  },
  user_status_pending: {
    en: 'Pending Approval',
    am: 'በማረጋገጥ ላይ ያለ'
  },
  user_status_expired: {
    en: 'Expired (Renew 3,900 ETB)',
    am: 'ያለቀበት (በ3,900 ብር ያድሱ)'
  },
  user_status_trial: {
    en: 'Free Trial (Ch 1 & 2)',
    am: 'ነፃ ሙከራ (ምዕራፍ 1 እና 2)'
  },
  user_sign_in_handle: {
    en: 'Sign In with Handle',
    am: 'በተጠቃሚ ስም ይግቡ'
  },
  user_telegram_widget: {
    en: 'Telegram Login Widget',
    am: 'በቴሌግራም በቀጥታ ይግቡ'
  },
  user_logout: {
    en: 'Log Out (Guest Mode)',
    am: 'ውጣ (የእንግዳ ሁነታ)'
  },
  user_switch_admin: {
    en: 'Login as Admin (@EximmanAbdIstad)',
    am: 'እንደ አስተዳዳሪ ይግቡ (@EximmanAbdIstad)'
  },
  user_admin_dashboard: {
    en: 'Admin Dashboard (@EximmanAbdIstad)',
    am: 'የአስተዳዳሪ ማዕከል (@EximmanAbdIstad)'
  }
};

/**
 * Returns localized string for a key, falling back to English or defaultText
 */
export function translate(key: string, lang: Language, defaultText?: string): string {
  const item = TRANSLATIONS[key];
  if (item && item[lang]) {
    return item[lang];
  }
  if (item && item.en) {
    return item.en;
  }
  return defaultText || key;
}

/**
 * High-quality Ethiopian trade curriculum module translations
 */
export const MODULE_TRANSLATIONS: Record<string, { title: { en: string; am: string }; subtitle: { en: string; am: string } }> = {
  'mod-1': {
    title: {
      en: 'Foundations of Ethiopian Foreign Trade & Legal Framework',
      am: 'የኢትዮጵያ የውጭ ንግድ መሠረቶችና የሕግ ማዕቀፍ'
    },
    subtitle: {
      en: 'Regulatory Architecture, Licensing & Single Window (ESW)',
      am: 'የቁጥጥር ሥርዓት፣ የንግድ ፈቃድና የኤሌክትሮኒክ ነጠላ መስኮት (ESW)'
    }
  },
  'mod-2': {
    title: {
      en: 'International Commercial Terms (Incoterms® 2020)',
      am: 'ዓለም አቀፍ የንግድ ውል ቃላት (Incoterms® 2020)'
    },
    subtitle: {
      en: 'Risk, Cost Allocation & Corridor Applicability',
      am: 'የስጋትና የወጪ ድልድል እንዲሁም በኢትዮጵያ ኮሪደር አጠቃቀም'
    }
  },
  'mod-3': {
    title: {
      en: 'Trade Finance & National Bank of Ethiopia (NBE) Directives',
      am: 'የንግድ ፋይናንስና የኢትዮጵያ ብሔራዊ ባንክ መመሪያዎች'
    },
    subtitle: {
      en: 'Letters of Credit, Margin Deposits, CAD & FX Hedging',
      am: 'የብድር ደብዳቤ (L/C)፣ የማርጅን ተቀማጭ፣ ሰነድ በከፊል (CAD) እና የውጭ ምንዛሪ'
    }
  },
  'mod-4': {
    title: {
      en: 'Customs Valuation, Tariff Classification & Tax Assessment',
      am: 'የጉምሩክ ዕቃ ዋጋ ግመታ፣ ታሪፍ አመዳደብና የቀረጥ ስሌት'
    },
    subtitle: {
      en: 'HS Codes, DPV Calculations, 7-Tier Taxes & Exemptions',
      am: 'የኤች.ኤስ ኮዶች፣ የቀረጥ መክፈያ ዋጋ (DPV) እና ባለ 7 እርከን ታክሶች'
    }
  },
  'mod-5': {
    title: {
      en: 'Port Operations, Multimodal Shipping & Dry Ports',
      am: 'የወደብ አሰራር፣ ሁለገብ ትራንስፖርትና የየብስ ወደቦች'
    },
    subtitle: {
      en: 'Djibouti Corridor, ESLSE Operations, Mojo & Demurrage Control',
      am: 'የጅቡቲ ኮሪደር፣ የባህር ትራንስፖርት ድርጅት፣ ሞጆ ወደብና የዲመሬጅ መከላከያ'
    }
  },
  'mod-6': {
    title: {
      en: 'Export Promotion, Quality Standards & Value-Added Commodities',
      am: 'የወጪ ንግድ ማበረታቻ፣ የጥራት ደረጃዎችና እሴት የተጨመረባቸው ምርቶች'
    },
    subtitle: {
      en: 'Coffee, Oilseeds, ECX, Retention Accounts & Export Audit',
      am: 'ቡና፣ የቅባት እህሎች፣ የኢትዮጵያ ምርት ገበያ እና የወጪ ንግድ ኦዲት'
    }
  }
};

/**
 * High-quality Ethiopian trade chapter titles in Amharic
 */
export const CHAPTER_TRANSLATIONS: Record<string, { title: { en: string; am: string } }> = {
  'ch-1': {
    title: {
      en: 'The Ethiopian Foreign Trade Ecosystem & Market Mechanics',
      am: 'የኢትዮጵያ የውጭ ንግድ ሥርዓትና የገበያ አሰራር መርሆዎች'
    }
  },
  'ch-2': {
    title: {
      en: 'Trade Licensing, Registration & Ethiopian Single Window (ESW)',
      am: 'የውጭ ንግድ ፈቃድ ምዝገባና የኢትዮጵያ ነጠላ መስኮት (ESW) አጠቃቀም'
    }
  },
  'ch-3': {
    title: {
      en: 'Incoterms® 2020 Fundamentals: Sea & Multi-Modal Terms',
      am: 'የኢንኮተርምስ 2020 መሠረቶች፦ የባህርና የሁለገብ ትራንስፖርት ውሎች'
    }
  },
  'ch-4': {
    title: {
      en: 'FOB, CFR, CIF & DAP in the Ethiopian Context',
      am: 'ኤፍ.ኦ.ቢ (FOB)፣ ሲ.ኤፍ.አር (CFR)፣ ሲ.አይ.ኤፍ (CIF) እና ዲ.ኤ.ፒ (DAP) በኢትዮጵያ አውድ'
    }
  },
  'ch-5': {
    title: {
      en: 'Methods of Payment: Letters of Credit (L/C), CAD & Advance Payment',
      am: 'ዓለም አቀፍ የክፍያ ዘዴዎች፦ የብድር ደብዳቤ (L/C)፣ CAD እና ቅድመ ክፍያ'
    }
  },
  'ch-6': {
    title: {
      en: 'NBE Directives, Margin Deposit Requirements & Foreign Exchange Queues',
      am: 'የብሔራዊ ባንክ መመሪያዎች፣ የማርጅን ተቀማጭና የውጭ ምንዛሪ ምደባ'
    }
  },
  'ch-7': {
    title: {
      en: 'L/C Opening, Verification, Discrepancies & Settlement Mechanics',
      am: 'የኤል ሲ (L/C) አከፋፈት፣ ሰነድ ማጣራት፣ ልዩነቶችና የክፍያ ስሌት'
    }
  },
  'ch-8': {
    title: {
      en: 'Harmonized System (HS) Tariff Classification Principles',
      am: 'የሸቀጦች ታሪፍ አመዳደብ መርሆዎች (HS Code Classification)'
    }
  },
  'ch-9': {
    title: {
      en: 'Duty Paying Value (DPV) & Customs Valuation Methods',
      am: 'የቀረጥ መክፈያ ዋጋ (DPV) እና የጉምሩክ ዕቃ ዋጋ ማረጋገጫ ዘዴዎች'
    }
  },
  'ch-10': {
    title: {
      en: 'The 7-Tier Tax Cascade: Customs Duty, Excise, VAT & Surtax',
      am: 'ባለ 7 እርከን የታክስ ስሌት፦ የጉምሩክ ቀረጥ፣ ኤክሳይዝ፣ ቫትና ሱር ታክስ'
    }
  },
  'ch-11': {
    title: {
      en: 'Duty-Free Privileges, Investment Incentives & Second-Schedule Schemes',
      am: 'ከቀረጥ ነፃ መብቶች፣ የኢንቨስትመንት ማበረታቻዎችና ልዩ ማዕቀፎች'
    }
  },
  'ch-12': {
    title: {
      en: 'Maritime Logistics, Bill of Lading (B/L) & Containerization',
      am: 'የባህር ትራንስፖርት፣ የቦሌቶ (B/L) ሰነዶችና የኮንቴይነር አያያዝ'
    }
  },
  'ch-13': {
    title: {
      en: 'Djibouti Corridor Operations, Customs Transit & Cross-Border Logistics',
      am: 'የጅቡቲ ኮሪደር አሰራር፣ የጉምሩክ ትራንዚትና የድንበር ማቋረጫ ሎጂስቲክስ'
    }
  },
  'ch-14': {
    title: {
      en: 'Dry Ports Infrastructure, Mojo Hub, Demurrage & Storage Optimization',
      am: 'የየብስ ወደቦች መሠረተ-ልማት፣ የሞጆ ማዕከልና የዲመሬጅ ወጪ ቅነሳ'
    }
  },
  'ch-15': {
    title: {
      en: 'Export Licensing, ECX Warehouse Receipts & Quality Certification',
      am: 'የወጪ ንግድ ፈቃድ፣ የኢትዮጵያ ምርት ገበያ (ECX) ደረሰኞችና የጥራት ቁጥጥር'
    }
  },
  'ch-16': {
    title: {
      en: 'NBE Forex Retention Accounts, Incentive Regimes & Post-Clearance Audits',
      am: 'የውጭ ምንዛሪ ማቆያ ሂሳብ (Retention Account)፣ ማበረታቻዎችና የድህረ-ዕቃ አወጣጥ ኦዲት'
    }
  }
};
