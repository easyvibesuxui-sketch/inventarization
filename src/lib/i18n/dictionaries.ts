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
    platformTitle: 'Platform',
    platformDescription:
      'The multi-tenant inventory tool behind the service, with AI verification from a photograph.',
    pricingTitle: 'Pricing',
    pricingDescription:
      'Work out what the Inverse platform costs for your catalogue, sites and check volume.',
  },

  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    team: 'Team',
    careers: 'Careers',
    news: 'News',
    contact: 'Contact',
    platform: 'Platform',
    pricing: 'Pricing',
    signIn: 'Sign in',
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
    more: 'Read more',
    servicesLead:
      'Four services, from a one-off audit to an ongoing process.',
    aboutLead:
      'A Tbilisi consultancy built on more than twenty years of counting and warehouse management.',
    platformLead:
      'Alongside the service, we are building the tool our own counters use.',
    teamLead: 'Practical experience, turned into a service.',
    newsLead: 'What we are working on right now.',
    pricingLead:
      'Platform pricing, for when the tool opens up. Services are quoted per engagement.',
    finalTitle: "Let's start with your warehouse",
    finalBody:
      'Tell us the scale of your warehouse or shop and we will get back to you within 24 hours.',
    finalCta: 'Request a service',
  },

  clients: {
    label: 'Clients',
    title: 'Counted for',
    lead: 'Manufacturers, warehouses, retail chains and distributors across Georgia.',
    items: [
      'Skutskuti',
      'Autopia',
      'moitane.ge',
      'Georgian Food Company',
      'Food House',
      'Extra',
      'Auto+',
      'Orbi',
      'National Music Centre',
    ],
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

  platform: {
    title: 'The platform behind the service',
    intro:
      'Alongside the counting service we are building the tool our own teams use on the floor — and which will open to clients after the pilot.',
    sections: [
      {
        title: 'One record, many sites',
        body: 'Products in folders, locations down to the individual shelf, and quantities held per location. Each client company is isolated inside the database itself, not by application code that could forget a filter.',
      },
      {
        title: 'Verification from a photograph',
        body: 'A counter photographs a shelf; the system reads that still image, counts what it can see of each product on record, and reports how certain it is. It runs on a frozen frame rather than a live stream — which is also what can be stored, re-checked and shown to an auditor later.',
      },
      {
        title: 'A verdict per SKU, not a guess',
        body: 'Green where the count matches, amber where a human should look, red where the record is wrong. Counts reach the record only when a person approves them.',
      },
      {
        title: 'Where a camera is not enough',
        body: 'Two products from the same line can be identical from a metre away and differ only in size. Those are flagged for a barcode scan, with the candidate items named, rather than guessed at.',
      },
    ],
    dashboardTitle: 'What the operator sees',
    dashboard: [
      'Stock by product and by location',
      'Status of every verification run',
      'Low-stock alerts against a reorder point per product',
      'Filtering by location',
    ],
    statusTitle: 'Where it stands',
    statusBody:
      'In pilot preparation for 2026. Until then the method is used inside our own service work.',
  },

  pricingTeaser: {
    title: 'Pricing',
    body: 'Platform pricing, for when the tool opens to clients. Counting services are quoted per engagement — tell us the scale and we will come back with a number.',
    cta: 'Open the calculator',
    perMonth: '/mo',
    custom: 'Custom',
    placeholder: 'These figures are provisional and pending commercial sign-off.',
  },

  plans: {
    free: {
      name: 'Free',
      blurb: 'One shelf, one person, no card.',
      features: ['AI shelf verification', 'Low-stock alerts', 'Community support'],
    },
    starter: {
      name: 'Starter',
      blurb: 'A single shop or small warehouse.',
      features: [
        'Everything in Free',
        'Product folders and categories',
        'Verification history and export',
        'Email support',
      ],
    },
    growth: {
      name: 'Growth',
      blurb: 'Multiple sites and a real counting routine.',
      features: [
        'Everything in Starter',
        'Barcode confirmation workflow',
        'Role-based access',
        'Priority support',
      ],
    },
    enterprise: {
      name: 'Enterprise',
      blurb: 'Distribution-scale inventory.',
      features: [
        'Everything in Growth',
        'SSO and audit logs',
        'Custom integrations',
        'Onboarding and SLA',
      ],
    },
  },

  pricing: {
    intro:
      'Priced in GEL for the Georgian market. Tell the calculator how much you actually count and it will pick the cheapest plan that covers it — including when paying per-check overage beats moving up a tier.',
    skus: 'Products (SKUs)',
    skusHint: 'Distinct items you track',
    locations: 'Locations',
    locationsHint: 'Warehouses, shops, racks',
    users: 'Users',
    usersHint: 'People with a login',
    checks: 'AI verifications / month',
    checksHint: 'One photo analysed = one check',
    payYearly: 'Pay yearly',
    save: 'save',
    recommended: 'Recommended',
    letsTalk: "Let's talk",
    letsTalkBody:
      'At this volume the pricing is worth a conversation rather than a slider.',
    plan: 'Plan',
    extraChecks: 'extra checks',
    billedYearly: 'billed yearly',
    saves: 'saves',
    limitProducts: 'Products',
    limitLocations: 'Locations',
    limitUsers: 'Users',
    limitChecks: 'AI checks / mo',
    unlimited: 'Unlimited',
    disclaimer:
      'Prices on this page are placeholders pending commercial sign-off. They live in one file, so changing them updates the calculator and this table together.',
    reasonExceeds: 'exceeds the tier below.',
    reasonFits: 'Your usage fits inside this plan with room to spare.',
    reasonOverage: 'checks over the included allowance, billed at',
    reasonEnterprise: 'Your volume is past the self-serve tiers.',
    each: 'each',
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
    platformTitle: 'პლატფორმა',
    platformDescription:
      'მრავალ-ტენანტიანი ინვენტარიზაციის ინსტრუმენტი მომსახურების უკან, ფოტოზე დაფუძნებული AI ვერიფიკაციით.',
    pricingTitle: 'ფასები',
    pricingDescription:
      'გამოთვალეთ, რა დაჯდება Inverse-ის პლატფორმა თქვენი კატალოგის, ობიექტებისა და შემოწმებების მიხედვით.',
  },

  nav: {
    home: 'მთავარი',
    about: 'ჩვენ შესახებ',
    services: 'მომსახურება',
    team: 'გუნდი',
    careers: 'კარიერა',
    news: 'სიახლეები',
    contact: 'კონტაქტი',
    platform: 'პლატფორმა',
    pricing: 'ფასები',
    signIn: 'შესვლა',
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
    more: 'ვრცლად',
    servicesLead:
      'ოთხი მომსახურება — ერთჯერადი აუდიტიდან მუდმივ პროცესამდე.',
    aboutLead:
      'თბილისური საკონსულტაციო კომპანია, 20+ წლიანი პრაქტიკული გამოცდილებით.',
    platformLead:
      'მომსახურების პარალელურად ვაშენებთ ინსტრუმენტს, რომელსაც ჩვენივე გუნდი იყენებს.',
    teamLead: 'პრაქტიკული გამოცდილება, ქცეული მომსახურებად.',
    newsLead: 'რაზე ვმუშაობთ ამ დროისთვის.',
    pricingLead:
      'პლატფორმის ფასები — როცა ინსტრუმენტი გაიხსნება. მომსახურება ინდივიდუალურად ფასდება.',
    finalTitle: 'დავიწყოთ თქვენი საწყობით',
    finalBody:
      'გვითხარით თქვენი საწყობის ან მაღაზიის მასშტაბი და დაგიკავშირდებით 24 საათში.',
    finalCta: 'მომსახურების მოთხოვნა',
  },

  clients: {
    label: 'კლიენტები',
    title: 'ვისთვისაც დავთვალეთ',
    lead: 'მწარმოებლები, საწყობები, საცალო ქსელები და დისტრიბუტორები საქართველოში.',
    items: [
      'სკუტსკუტი',
      'აუტოპია',
      'მოიტანე.გე',
      'ქართული კვების კომპანია',
      'კვების სახლი',
      'ექსტრა',
      'აუტო+',
      'ორბი',
      'ეროვნული მუსიკალური ცენტრი',
    ],
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

  platform: {
    title: 'პლატფორმა მომსახურების უკან',
    intro:
      'დათვლის მომსახურების პარალელურად ვაშენებთ ინსტრუმენტს, რომელსაც ჩვენივე გუნდი იყენებს ადგილზე — და რომელიც პილოტის შემდეგ კლიენტებისთვისაც გაიხსნება.',
    sections: [
      {
        title: 'ერთი აღრიცხვა, მრავალი ობიექტი',
        body: 'პროდუქტები საქაღალდეებში, ლოკაციები კონკრეტულ თარომდე და რაოდენობები თითოეულ ლოკაციაზე. თითოეული კლიენტი კომპანია იზოლირებულია თავად ბაზის დონეზე და არა კოდით, რომელსაც ფილტრის დამატება შეიძლება დაავიწყდეს.',
      },
      {
        title: 'ვერიფიკაცია ფოტოდან',
        body: 'თანამშრომელი იღებს თაროს ფოტოს; სისტემა კითხულობს ამ სტოპ-კადრს, ითვლის თითოეული აღრიცხული პროდუქტის ხილულ რაოდენობას და აღნიშნავს, რამდენად დარწმუნებულია. მუშაობს გაჩერებულ კადრზე და არა პირდაპირ ნაკადზე — სწორედ ის ინახება, ხელახლა მოწმდება და მოგვიანებით აუდიტორს ეჩვენება.',
      },
      {
        title: 'ვერდიქტი თითოეულ SKU-ზე, არა ვარაუდი',
        body: 'მწვანე — ემთხვევა. ყვითელი — ადამიანმა უნდა შეხედოს. წითელი — აღრიცხვა მცდარია. ციფრი აღრიცხვაში მხოლოდ ადამიანის დადასტურებით ხვდება.',
      },
      {
        title: 'სად არ კმარა კამერა',
        body: 'ერთი სერიის ორი პროდუქტი მეტრის მანძილიდან იდენტურია და მხოლოდ ზომით განსხვავდება. ასეთები მოინიშნება ბარკოდით შესამოწმებლად, სავარაუდო ერთეულების დასახელებით — და არ გამოიცნობა.',
      },
    ],
    dashboardTitle: 'რას ხედავს ოპერატორი',
    dashboard: [
      'მარაგი პროდუქტისა და ლოკაციის მიხედვით',
      'თითოეული შემოწმების სტატუსი',
      'მარაგის შემცირების შეტყობინება თითოეული პროდუქტის ზღვრის მიხედვით',
      'ფილტრი ლოკაციით',
    ],
    statusTitle: 'რა ეტაპზეა',
    statusBody:
      'პილოტის მომზადების ეტაპზე, 2026. მანამდე მეთოდი ჩვენივე მომსახურების ფარგლებში გამოიყენება.',
  },

  pricingTeaser: {
    title: 'ფასები',
    body: 'პლატფორმის ფასები — როცა ინსტრუმენტი კლიენტებისთვის გაიხსნება. დათვლის მომსახურება ინდივიდუალურად ფასდება — გვითხარით მასშტაბი და ციფრს დაგიბრუნებთ.',
    cta: 'გახსენით კალკულატორი',
    perMonth: '/თვე',
    custom: 'ინდივიდუალური',
    placeholder: 'ეს ციფრები წინასწარია და კომერციულ დამტკიცებას ელოდება.',
  },

  plans: {
    free: {
      name: 'უფასო',
      blurb: 'ერთი თარო, ერთი ადამიანი, ბარათის გარეშე.',
      features: [
        'AI შემოწმება თაროზე',
        'მარაგის შემცირების შეტყობინება',
        'მხარდაჭერა საზოგადოებისგან',
      ],
    },
    starter: {
      name: 'საწყისი',
      blurb: 'ერთი მაღაზია ან პატარა საწყობი.',
      features: [
        'ყველაფერი უფასოდან',
        'პროდუქტების საქაღალდეები და კატეგორიები',
        'შემოწმებების ისტორია და ექსპორტი',
        'მხარდაჭერა ელფოსტით',
      ],
    },
    growth: {
      name: 'ზრდა',
      blurb: 'რამდენიმე ობიექტი და რეგულარული აღრიცხვა.',
      features: [
        'ყველაფერი საწყისიდან',
        'ბარკოდით დადასტურების პროცესი',
        'როლებზე დაფუძნებული წვდომა',
        'პრიორიტეტული მხარდაჭერა',
      ],
    },
    enterprise: {
      name: 'საწარმო',
      blurb: 'სადისტრიბუციო მასშტაბის მარაგი.',
      features: [
        'ყველაფერი ზრდიდან',
        'SSO და აუდიტის ჟურნალი',
        'ინდივიდუალური ინტეგრაციები',
        'დანერგვა და SLA',
      ],
    },
  },

  pricing: {
    intro:
      'ფასები ლარშია, ქართული ბაზრისთვის. უთხარით კალკულატორს, რამდენს ითვლით რეალურად და ის აირჩევს ყველაზე იაფ ტარიფს — მათ შორის მაშინაც, როცა ზედმეტ შემოწმებებში გადახდა ტარიფის აწევაზე იაფია.',
    skus: 'პროდუქტი (SKU)',
    skusHint: 'განსხვავებული ერთეული, რომელსაც აღრიცხავთ',
    locations: 'ლოკაცია',
    locationsHint: 'საწყობი, მაღაზია, სტელაჟი',
    users: 'მომხმარებელი',
    usersHint: 'ადამიანი, ვისაც წვდომა აქვს',
    checks: 'AI შემოწმება / თვე',
    checksHint: 'ერთი გაანალიზებული ფოტო = ერთი შემოწმება',
    payYearly: 'გადაიხადეთ წლიურად',
    save: 'დაზოგეთ',
    recommended: 'რეკომენდებული',
    letsTalk: 'დავსხდეთ და ვისაუბროთ',
    letsTalkBody: 'ამ მოცულობაზე ფასი საუბარს იმსახურებს და არა სლაიდერს.',
    plan: 'ტარიფი',
    extraChecks: 'დამატებითი შემოწმება',
    billedYearly: 'წლიური გადახდით',
    saves: 'ზოგავს',
    limitProducts: 'პროდუქტი',
    limitLocations: 'ლოკაცია',
    limitUsers: 'მომხმარებელი',
    limitChecks: 'AI შემოწმება / თვე',
    unlimited: 'ულიმიტო',
    disclaimer:
      'ამ გვერდზე მოცემული ფასები წინასწარია და კომერციულ დამტკიცებას ელოდება. ისინი ერთ ფაილშია, ამიტომ მათი შეცვლა კალკულატორსაც და ცხრილსაც ერთად განაახლებს.',
    reasonExceeds: 'აჭარბებს ქვედა ტარიფს.',
    reasonFits: 'თქვენი მოხმარება მარაგითაც კი ეტევა ამ ტარიფში.',
    reasonOverage: 'შემოწმება ლიმიტს ზემოთ, ფასით',
    reasonEnterprise: 'თქვენი მოცულობა თვითმომსახურების ტარიფებს სცდება.',
    each: 'თითო',
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
