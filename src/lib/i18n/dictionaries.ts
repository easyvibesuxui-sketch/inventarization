import type { Locale } from './config';

/**
 * Site copy for both locales.
 *
 * `en` is the shape of record: `ka` is typed against it, so a missing or
 * misspelled key fails the build instead of rendering as blank space. It is
 * deliberately not `as const` — literal types would make every Georgian string a
 * mismatch rather than a translation.
 */
const en = {
  meta: {
    siteName: 'Inverse',
    homeTitle: 'Inverse — inventory counting and audit services',
    homeDescription:
      'Inverse helps companies in Georgia organise warehouse, retail and production inventory — accurate counts, discrepancies found, a report you can act on.',
    aboutTitle: 'About',
    aboutDescription:
      'A Tbilisi inventory consultancy, built on more than twenty years of hands-on counting and warehouse management.',
    servicesTitle: 'Services',
    servicesDescription:
      'Full physical counts, scheduled partial audits, discrepancy analysis and process consulting.',
    teamTitle: 'Team',
    teamDescription: 'Who is behind Inverse.',
    careersTitle: 'Careers',
    careersDescription: 'Inverse is growing. Open roles and why you might join.',
    newsTitle: 'News',
    newsDescription: 'What we are working on, and where Inverse is going next.',
    contactTitle: 'Contact',
    contactDescription: 'Request a service or ask a question. We reply within 24 hours.',
  },

  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    team: 'Team',
    careers: 'Careers',
    news: 'News',
    contact: 'Contact',
  },

  home: {
    tag: 'Inventory counting and audit services',
    title: 'Accurate inventory for your business',
    subtitle:
      'Inverse helps companies organise warehouse, retail and production inventory — with accurate counts, discrepancies found, and a report anyone can read.',
    ctaPrimary: 'Request a service',
    ctaSecondary: 'Services',
    pagesTitle: 'Around the site',
    pages: {
      about: 'Who we are and why we started Inverse',
      services: 'From a full count to process consulting',
      team: 'Who is behind Inverse',
      careers: 'We are growing the team — join us',
      news: 'What we are working on right now',
      contact: 'Get in touch to request a service',
    },
    finalTitle: "Let's start with your warehouse",
    finalBody:
      'Tell us the scale of your warehouse or shop and we will get back to you within 24 hours.',
    finalCta: 'Request a service',
  },

  about: {
    title: 'Experience that turns counting into a system',
    intro:
      'Inverse is a Tbilisi-based inventory consultancy. We help businesses build a counting process that is accurate, legible and repeatable.',
    storyTitle: 'Our story',
    story: [
      'Inverse came out of a practical need. Stocktaking is usually slow, manual and error-prone, and it needed a systematic approach. More than twenty years in inventory and warehouse management taught us where the time goes and where the errors come from.',
      'Today Inverse works with manufacturers, warehouses, retail chains and pharmaceutical distributors — accurate counts, discrepancy analysis, and a process put in order.',
    ],
    stats: [
      { value: '20+', label: 'Years of experience' },
      { value: '4', label: 'Industries served' },
      { value: '2026', label: 'Founded' },
      { value: 'GE', label: 'Tbilisi, Georgia' },
    ],
    principlesTitle: 'Our principles',
    principles: [
      {
        title: 'Accuracy',
        body: 'The number we hand you has to match reality — not an estimate of it.',
      },
      {
        title: 'Transparency',
        body: 'The report is legible: it shows where the discrepancy is, and why.',
      },
      {
        title: 'Practicality',
        body: 'Our advice comes from work done on real floors, not from theory.',
      },
    ],
  },

  services: {
    title: 'The full range of inventory work',
    intro:
      'From a one-off audit to an ongoing process, scaled to your business.',
    items: [
      {
        title: 'Full physical count',
        body: 'A complete physical count of a warehouse or shop — every SKU verified, with a detailed report.',
        points: [
          'Every category counted',
          'Compared against your records',
          'Final report with a summary',
        ],
      },
      {
        title: 'Partial and scheduled audits',
        body: 'Regular, selective checks on high-risk or high-turnover categories.',
        points: [
          'On a recurring schedule',
          'Focused on high-risk SKUs',
          'Fast results, less downtime',
        ],
      },
      {
        title: 'Discrepancy analysis',
        body: 'A detailed report on the gap between your records and the physical stock, and an analysis of what caused it.',
        points: [
          'Exactly where the discrepancy sits',
          'Root-cause analysis',
          'Recommendations to close it',
        ],
      },
      {
        title: 'Process consulting',
        body: 'Putting your inventory system and warehouse process in order, for improvement that lasts.',
        points: [
          'Assessment of the current process',
          'An improvement plan',
          'Support through implementation',
        ],
      },
    ],
  },

  team: {
    title: 'Who is behind Inverse',
    intro:
      'Hands-on experience in inventory and warehouse management, turned into a service.',
    founderName: 'Giorgi',
    founderRole: 'Founder',
    founderBody:
      'More than twenty years of hands-on experience in inventory and warehouse management. He also leads Novora, a furniture and interior design firm, which is a separate business independent of Inverse.',
    growingTitle: 'The team is growing',
    growing: [
      'We are adding technical and operational capacity to grow the service.',
      'We are building partnerships and advisory relationships with industry specialists.',
      'We are open to new members — see the open roles.',
    ],
  },

  careers: {
    title: 'Growing the team',
    intro:
      'Inverse is growing. We are looking for people who want to make stocktaking more accurate and less painful.',
    openTitle: 'Open roles',
    openNote: 'Planned',
    roles: [
      {
        title: 'Technical co-founder / CTO',
        body: 'Technical capacity for building the product — AI, backend and frontend.',
      },
      {
        title: 'Sales',
        body: 'Operational experience from a real manufacturing or retail business, working directly with customers.',
      },
    ],
    whyTitle: 'Why Inverse',
    why: [
      {
        title: 'A real problem',
        body: 'You see the result of your work on an actual warehouse floor, not only in theory.',
      },
      {
        title: 'A small, flexible team',
        body: 'A chance to join early, where your contribution is visible.',
      },
      {
        title: 'Twenty years of experience beside you',
        body: 'Learning and growing in an environment built on practical knowledge.',
      },
    ],
  },

  news: {
    title: 'What we are working on',
    intro: 'How Inverse is developing — new projects and where we are heading.',
    items: [
      {
        badge: 'Coming soon',
        year: '2026',
        title: 'AI-based video monitoring',
        body: 'We are building a camera-based automatic verification system that recognises products from a shelf photo or video, counts them, and compares the result against your records.',
        points: [
          'Automatic product recognition and counting',
          'Real-time comparison against the record',
          'Barcode confirmation for visually identical items',
        ],
      },
      {
        badge: 'In progress',
        year: '2026',
        title: 'Preparing the pilot',
        body: 'We are preparing a first pilot to test the AI verification method in a working warehouse, before it becomes part of our standard service.',
        points: [],
      },
    ],
  },

  contact: {
    title: 'Get in touch',
    intro:
      'Request a service, or just ask a question. We reply within 24 hours.',
    emailLabel: 'Email',
    email: 'info@inverse.ge',
    locationLabel: 'Location',
    location: 'Tbilisi, Georgia',
    responseLabel: 'Response time',
    response: 'Within 24 hours',
    formTitle: 'Send a message',
    name: 'Name',
    company: 'Company',
    emailField: 'Email',
    phone: 'Phone',
    topic: 'What is this about?',
    topics: {
      service: 'Service request',
      question: 'General question',
      career: 'Careers / CV',
      other: 'Other',
    },
    message: 'Message',
    submit: 'Send',
    sending: 'Sending…',
    success: 'Thank you. We will be in touch within 24 hours.',
    invalidEmail: 'Enter a valid email address.',
    missingMessage: 'Write a short message so we know what you need.',
    fallback:
      'This deployment has no database attached yet, so the form cannot store your details. Write to us directly at info@inverse.ge.',
  },

  footer: {
    tagline: 'Inverse — inventory counting and audit services. Tbilisi, Georgia.',
    rights: 'All rights reserved.',
  },
};

/** Same shape as `en`, checked at compile time. */
type Dictionary = typeof en;

const ka: Dictionary = {
  meta: {
    siteName: 'Inverse',
    homeTitle: 'Inverse — ინვენტარიზაციისა და აღრიცხვის მომსახურება',
    homeDescription:
      'Inverse ეხმარება კომპანიებს საწყობის, საცალო წერტილისა და საწარმოს ინვენტარიზაციის ორგანიზებაში — ზუსტი დათვლით, შეუსაბამობების აღმოჩენითა და გასაგები ანგარიშით.',
    aboutTitle: 'ჩვენ შესახებ',
    aboutDescription:
      'თბილისში დაფუძნებული ინვენტარიზაციის საკონსულტაციო კომპანია, 20+ წლიანი პრაქტიკული გამოცდილებით.',
    servicesTitle: 'მომსახურება',
    servicesDescription:
      'სრული ინვენტარიზაცია, გეგმური აუდიტი, შეუსაბამობის ანალიზი და პროცესის კონსალტინგი.',
    teamTitle: 'გუნდი',
    teamDescription: 'ვინ დგას Inverse-ს უკან.',
    careersTitle: 'კარიერა',
    careersDescription: 'Inverse იზრდება — ღია პოზიციები და რატომ ღირს შემოერთება.',
    newsTitle: 'სიახლეები',
    newsDescription: 'რაზე ვმუშაობთ და საით მივდივართ.',
    contactTitle: 'კონტაქტი',
    contactDescription:
      'მოითხოვეთ მომსახურება ან დასვით კითხვა — 24 საათში დაგიკავშირდებით.',
  },

  nav: {
    home: 'მთავარი',
    about: 'ჩვენ შესახებ',
    services: 'მომსახურება',
    team: 'გუნდი',
    careers: 'კარიერა',
    news: 'სიახლეები',
    contact: 'კონტაქტი',
  },

  home: {
    tag: 'ინვენტარიზაციისა და აღრიცხვის მომსახურება',
    title: 'ზუსტი ინვენტარიზაცია თქვენი ბიზნესისთვის',
    subtitle:
      'Inverse ეხმარება კომპანიებს საწყობის, საცალო წერტილისა და საწარმოს ინვენტარიზაციის ორგანიზებაში — ზუსტი დათვლით, შეუსაბამობების აღმოჩენითა და გასაგები ანგარიშით.',
    ctaPrimary: 'მომსახურების მოთხოვნა',
    ctaSecondary: 'სერვისები',
    pagesTitle: 'გვერდების მიმოხილვა',
    pages: {
      about: 'ვინ ვართ და რატომ დავიწყეთ Inverse',
      services: 'სრული ინვენტარიზაციიდან კონსალტინგამდე',
      team: 'ვინ დგას Inverse-ს უკან',
      careers: 'გუნდს ვზრდით — შემოგვიერთდით',
      news: 'რაზე ვმუშაობთ ამ დროისთვის',
      contact: 'დაგვიკავშირდით მომსახურების მოთხოვნისთვის',
    },
    finalTitle: 'დავიწყოთ თქვენი საწყობით',
    finalBody:
      'გვითხარით თქვენი საწყობის ან მაღაზიის მასშტაბი და დაგიკავშირდებით 24 საათში.',
    finalCta: 'მომსახურების მოთხოვნა',
  },

  about: {
    title: 'გამოცდილება, რომელიც ინვენტარიზაციას სისტემად აქცევს',
    intro:
      'Inverse თბილისში დაფუძნებული ინვენტარიზაციის საკონსულტაციო კომპანიაა — ვეხმარებით ბიზნესებს ზუსტი, გასაგები და განმეორებადი ინვენტარიზაციის პროცესის აწყობაში.',
    storyTitle: 'ჩვენი ისტორია',
    story: [
      'Inverse დაიბადა პრაქტიკული საჭიროებიდან — ინვენტარიზაცია, რომელიც ხშირად ნელი, ხელით და შეცდომისკენ მიდრეკილი პროცესია, საჭიროებდა სისტემურ მიდგომას. 20+ წლიანმა გამოცდილებამ ინვენტარიზაციასა და საწყობის მართვაში გვასწავლა, სად იკარგება დრო და სად ჩნდება შეცდომა.',
      'დღეს Inverse ეხმარება საწარმოო კომპანიებს, საწყობებს, საცალო ქსელებსა და ფარმაცევტულ საწყობებს — ზუსტი დათვლით, შეუსაბამობის ანალიზითა და პროცესის მოწესრიგებით.',
    ],
    stats: [
      { value: '20+', label: 'წლიანი გამოცდილება' },
      { value: '4', label: 'ინდუსტრია მომსახურებაში' },
      { value: '2026', label: 'დაარსების წელი' },
      { value: 'GE', label: 'თბილისი, საქართველო' },
    ],
    principlesTitle: 'ჩვენი პრინციპები',
    principles: [
      {
        title: 'სიზუსტე',
        body: 'ციფრი, რომელსაც მოგაწვდით, უნდა ემთხვეოდეს რეალობას — არა ვარაუდს.',
      },
      {
        title: 'გამჭვირვალობა',
        body: 'ანგარიში გასაგებია — ჩანს, სად არის შეუსაბამობა და რატომ.',
      },
      {
        title: 'პრაქტიკულობა',
        body: 'რჩევები რეალურ გამოცდილებაზეა დაფუძნებული, არა თეორიაზე.',
      },
    ],
  },

  services: {
    title: 'ინვენტარიზაციის სრული სპექტრი',
    intro:
      'ერთჯერადი აუდიტიდან რეგულარულ პროცესის მოწესრიგებამდე — მორგებული თქვენი ბიზნესის მასშტაბზე.',
    items: [
      {
        title: 'სრული ინვენტარიზაცია',
        body: 'საწყობის ან მაღაზიის სრული ფიზიკური დათვლა — ყველა SKU-ს გადამოწმებით და დეტალური ანგარიშით.',
        points: [
          'ყველა კატეგორიის სრული აღრიცხვა',
          'ჩანაწერთან შედარება',
          'საბოლოო ანგარიში შეჯამებით',
        ],
      },
      {
        title: 'ნაწილობრივი და გეგმური აუდიტი',
        body: 'რეგულარული, შერჩევითი შემოწმებები მაღალი რისკის ან მაღალი ბრუნვის კატეგორიებზე.',
        points: [
          'განმეორებადი გრაფიკით',
          'ფოკუსირებული მაღალი რისკის SKU-ებზე',
          'სწრაფი შედეგი, დროის დაზოგვით',
        ],
      },
      {
        title: 'შეუსაბამობის ანალიზი',
        body: 'ჩანაწერსა და რეალურ ნაშთს შორის სხვაობის დეტალური ანგარიში და შესაძლო მიზეზების ანალიზი.',
        points: [
          'ზუსტი შეუსაბამობის ლოკაცია',
          'მიზეზობრივი ანალიზი',
          'რეკომენდაციები აღმოსაფხვრელად',
        ],
      },
      {
        title: 'პროცესის კონსალტინგი',
        body: 'ინვენტარიზაციის სისტემისა და საწყობის მართვის პროცესის მოწესრიგება — გრძელვადიანი გაუმჯობესებისთვის.',
        points: [
          'არსებული პროცესის შეფასება',
          'გაუმჯობესების გეგმა',
          'დანერგვის მხარდაჭერა',
        ],
      },
    ],
  },

  team: {
    title: 'ვინ დგას Inverse-ს უკან',
    intro:
      'პრაქტიკული გამოცდილება ინვენტარიზაციასა და საწყობის მართვაში, რომელსაც ვქცევთ სისტემურ მომსახურებად.',
    founderName: 'გიორგი',
    founderRole: 'დამფუძნებელი',
    founderBody:
      '20+ წლიანი პრაქტიკული გამოცდილება ინვენტარიზაციასა და საწყობის მართვაში. ასევე ხელმძღვანელობს Novora-ს — ავეჯისა და ინტერიერის დიზაინის ფირმას, რომელიც Inverse-ისგან დამოუკიდებელი, ცალკე ბიზნესია.',
    growingTitle: 'გუნდი იზრდება',
    growing: [
      'ვამატებთ ტექნიკურ და საოპერაციო რესურსს მომსახურების მასშტაბის გასაზრდელად.',
      'ვამზადებთ პარტნიორულ და საკონსულტაციო კავშირებს ინდუსტრიის ექსპერტებთან.',
      'ღიად ვართ ახალი წევრებისთვის — იხილეთ ვაკანსიები.',
    ],
  },

  careers: {
    title: 'ვზრდით გუნდს',
    intro:
      'Inverse იზრდება — ვეძებთ ადამიანებს, ვისაც სურს, ინვენტარიზაცია გახადოს უფრო ზუსტი და მარტივი.',
    openTitle: 'ღია პოზიციები',
    openNote: 'იგეგმება',
    roles: [
      {
        title: 'ტექნიკური თანადამფუძნებელი / CTO',
        body: 'ტექნიკური რესურსი პროდუქტის განვითარებისთვის — AI, Backend, Frontend მიმართულებით.',
      },
      {
        title: 'გაყიდვების როლი',
        body: 'საოპერაციო გამოცდილება რეალური საწარმოო ან სავაჭრო ბიზნესიდან — მომხმარებელთან პირდაპირი მუშაობა.',
      },
    ],
    whyTitle: 'რატომ Inverse',
    why: [
      {
        title: 'რეალურ პრობლემაზე მუშაობა',
        body: 'ხედავთ თქვენი მუშაობის შედეგს რეალურ საწყობში, არა მხოლოდ თეორიაში.',
      },
      {
        title: 'მცირე, მოქნილი გუნდი',
        body: 'ადრეულ ეტაპზე შემოსვლის შესაძლებლობა — თქვენი წვლილი ჩანს.',
      },
      {
        title: '20+ წლიანი გამოცდილება გვერდით',
        body: 'სწავლა და ზრდა პრაქტიკულ ცოდნაზე დაფუძნებულ გარემოში.',
      },
    ],
  },

  news: {
    title: 'რაზე ვმუშაობთ',
    intro: 'Inverse-ის განვითარება — ახალი პროექტები და მომავალი მიმართულებები.',
    items: [
      {
        badge: 'მალე',
        year: '2026',
        title: 'AI-ზე დაფუძნებული ვიდეო მონიტორინგი',
        body: 'ვამუშავებთ ახალ პროექტს — კამერაზე დაფუძნებულ ავტომატურ ვერიფიკაციის სისტემას, რომელიც თაროს ფოტოდან ან ვიდეოდან თავად ცნობს პროდუქტს, ითვლის რაოდენობას და ადარებს არსებულ ჩანაწერს.',
        points: [
          'ავტომატური პროდუქტის ამოცნობა და დათვლა',
          'რეალურ დროში შედარება ჩანაწერთან',
          'ვიზუალურად მსგავს ერთეულებზე — ბარკოდის დადასტურება',
        ],
      },
      {
        badge: 'მიმდინარე',
        year: '2026',
        title: 'პილოტის მომზადება',
        body: 'ამჟამად ვამზადებთ პირველ პილოტს — AI ვერიფიკაციის მეთოდის გამოსაცდელად რეალურ საწყობში, სანამ ის ჩვენს სტანდარტულ მომსახურებაში დაინერგება.',
        points: [],
      },
    ],
  },

  contact: {
    title: 'დაგვიკავშირდით',
    intro:
      'მოითხოვეთ მომსახურება, ან უბრალოდ დასვით კითხვა — 24 საათში დაგიკავშირდებით.',
    emailLabel: 'ელფოსტა',
    email: 'info@inverse.ge',
    locationLabel: 'მდებარეობა',
    location: 'თბილისი, საქართველო',
    responseLabel: 'საპასუხო დრო',
    response: '24 საათის განმავლობაში',
    formTitle: 'მოგვწერეთ',
    name: 'სახელი',
    company: 'კომპანია',
    emailField: 'ელფოსტა',
    phone: 'ტელეფონი',
    topic: 'რას ეხება მიმართვა?',
    topics: {
      service: 'მომსახურების მოთხოვნა',
      question: 'ზოგადი კითხვა',
      career: 'კარიერა / CV',
      other: 'სხვა',
    },
    message: 'შეტყობინება',
    submit: 'გაგზავნა',
    sending: 'იგზავნება…',
    success: 'გმადლობთ. 24 საათში დაგიკავშირდებით.',
    invalidEmail: 'შეიყვანეთ სწორი ელფოსტა.',
    missingMessage: 'მოკლედ მიწერეთ, რა გჭირდებათ.',
    fallback:
      'ამ ვერსიას ჯერ ბაზა არ აქვს მიერთებული, ამიტომ ფორმა ვერ შეინახავს მონაცემებს. მოგვწერეთ პირდაპირ: info@inverse.ge.',
  },

  footer: {
    tagline: 'Inverse — ინვენტარიზაციისა და აღრიცხვის მომსახურება. თბილისი, საქართველო.',
    rights: 'ყველა უფლება დაცულია.',
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { ka, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
