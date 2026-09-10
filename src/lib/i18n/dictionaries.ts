import type { Locale } from './config';

/**
 * Marketing copy for both locales.
 *
 * `en` is the shape of record: `ka` is typed against it, so a missing or
 * misspelled key fails the build instead of rendering as blank space.
 * It is deliberately not `as const` — literal types would make every Georgian
 * string a mismatch rather than a translation.
 */
const en = {
  meta: {
    title: 'Inverse — AI inventory verification',
    description:
      'Inventory management for SMBs in Georgia and the Caucasus, with an AI verification step: photograph a shelf and Inverse counts what is really on it.',
    pricingTitle: 'Pricing',
    pricingDescription:
      'Work out what Inverse costs for your catalogue, sites and check volume.',
  },
  nav: {
    how: 'How it works',
    product: 'Product',
    pricing: 'Pricing',
    faq: 'FAQ',
    signIn: 'Sign in',
    start: 'Start free',
  },
  hero: {
    eyebrow: 'Inventory verification · Tbilisi',
    title: 'Your records say 12. The shelf says 9.',
    body: 'Inverse is inventory management for small and mid-sized businesses in Georgia and the Caucasus, with an AI verification step built in: photograph a shelf and it counts what is actually on it against what your records claim.',
    primary: 'Start free',
    secondary: 'See how it works',
    note: 'No card required · Georgian and English',
  },
  problem: {
    title: 'Why the numbers stop matching',
    body: 'Nothing dramatic goes wrong. The gap opens slowly, and it opens in the same three places every time.',
    items: [
      {
        title: 'Counting by hand eats days',
        body: 'A full count means closing the floor, pulling people off their work, and reading thousands of labels one by one. So it happens twice a year instead of twice a month.',
      },
      {
        title: 'The spreadsheet drifts',
        body: 'A sale, a return, a broken item, a supplier who sent nine instead of ten. Each one is small. Six months of them is a number nobody trusts.',
      },
      {
        title: 'Nobody notices until a customer does',
        body: 'The error surfaces when you promise stock you do not have — or when you reorder something already sitting in the back.',
      },
    ],
  },
  how: {
    title: 'How it works',
    body: 'Four steps. The longest one takes about as much time as taking a photo.',
    steps: [
      {
        title: 'Record what should be there',
        body: 'Products in folders, locations down to the individual shelf. Import what you already have, or start from scratch.',
      },
      {
        title: 'Photograph what is there',
        body: 'Phone, tablet or a head-worn camera. Freeze one frame — the analysis runs on that exact still, not on a live stream.',
      },
      {
        title: 'Claude counts the shelf',
        body: 'It reports how many units of each product it can see, how sure it is, and whether two variants were separable at all.',
      },
      {
        title: 'You get a verdict per SKU',
        body: 'Green where the count matches, amber where it needs a human, red where the record is wrong. Apply the counts in one click when you agree.',
      },
    ],
  },
  product: {
    title: 'What you actually use',
    body: 'Three screens carry the work.',
    items: [
      {
        title: 'Dashboard',
        body: 'Units on record, what is below its reorder point, and what the last checks flagged.',
      },
      {
        title: 'Verification',
        body: 'Pick a shelf, capture a frame, send. The result comes back in under a minute.',
      },
      {
        title: 'Check result',
        body: 'Every SKU with its expected count, the counted number, and the confidence behind it.',
      },
    ],
  },
  honesty: {
    title: 'Where vision alone is not enough',
    body: 'Two hairbrushes from the same line can be identical from a metre away and differ only in size. Inverse does not guess at those.',
    detail:
      'It marks them for a barcode scan and names which SKUs are in play. A count that looks confident is never quietly wrong — and the model never decides on its own whether your record is acceptable. It reports what it sees; the comparison is made by rules you can read.',
    points: [
      'Look-alike variants are flagged, not guessed',
      'Every count carries a confidence score',
      'Counts reach your stock only when a person approves them',
    ],
  },
  features: {
    title: 'Built for more than one company',
    body: 'Inverse is multi-tenant from the first row of the database.',
    items: [
      {
        title: 'Isolation enforced by Postgres',
        body: 'Every table is scoped by company through Row Level Security, not by application code that could forget a filter.',
      },
      {
        title: 'Roles that mean something',
        body: 'Owner, admin, member and viewer. A viewer can read the catalogue and never write to it.',
      },
      {
        title: 'Folders and categories',
        body: 'Organise thousands of SKUs the way your team already talks about them.',
      },
      {
        title: 'Low-stock alerts',
        body: 'A reorder point per product, and a dashboard that tells you what crossed it.',
      },
      {
        title: 'Full verification history',
        body: 'Every check keeps its photo, its counts and its confidence — an audit trail, not just a result.',
      },
      {
        title: 'Built for Georgia',
        body: 'Georgian and English throughout, priced in GEL, made in Tbilisi by Novora.',
      },
    ],
  },
  pricingTeaser: {
    title: 'Pricing',
    body: 'Start free. Move up only when your catalogue, your sites or your counting routine actually outgrow a tier.',
    cta: 'Open the calculator',
    perMonth: '/mo',
    custom: 'Custom',
    placeholder:
      'These figures are provisional and pending commercial sign-off.',
  },
  faq: {
    title: 'Questions',
    items: [
      {
        q: 'How accurate is the AI count?',
        a: 'Accurate enough to replace a first pass, not to replace judgement. Every count comes with a confidence score, and anything the model is unsure about — a partly hidden shelf, glare, two variants that look the same — comes back amber for a human rather than as a number you might trust by mistake.',
      },
      {
        q: 'Does it work with video or smart glasses?',
        a: 'It works with a still frame from any camera, including a head-worn one. The analysis deliberately runs on one frozen frame rather than a live stream, because that is what the vision model reads — and because a still is what you can store, re-check and show to an auditor later.',
      },
      {
        q: 'What about products that look identical?',
        a: 'They are flagged for a barcode scan instead of being guessed at, with the candidate SKUs named. You can also give each product a short visual note — "matte black handle, gold band" — which the model reads before counting.',
      },
      {
        q: 'Is my data separated from other companies?',
        a: 'Yes, and the separation is enforced inside Postgres rather than in application code. Every table is scoped by company through Row Level Security, and rows cannot reference a parent belonging to another tenant even if something tried to write one.',
      },
      {
        q: 'Do I have to replace my current system?',
        a: 'No. Many teams start by using Inverse only for the verification step, keeping their existing records, and importing later once the counts have earned their trust.',
      },
      {
        q: 'What does it cost to run a check?',
        a: 'Each plan includes a monthly allowance of checks, and additional checks are billed per check. The calculator on the pricing page works out which is cheaper for your volume — sometimes paying overage beats moving up a tier.',
      },
    ],
  },
  cta: {
    title: 'Try it on one shelf',
    body: 'Leave your email and we will get you set up on a real shelf in your own warehouse — no migration, no commitment.',
    placeholder: 'you@company.ge',
    button: 'Request access',
    sending: 'Sending…',
    success: 'Thank you. We will be in touch shortly.',
    company: 'Company',
    companyPlaceholder: 'Your company',
    fallback:
      'This preview has no database attached yet, so the form cannot store your details. Write to us directly instead.',
    invalidEmail: 'Enter a valid email address.',
  },
  footer: {
    tagline: 'Inverse — a Novora product. Tbilisi, Georgia.',
    product: 'Product',
    rights: 'All rights reserved.',
  },
  // Labels inside the illustrated product mockups.
  // Plan prose. The figures themselves live in src/lib/pricing.ts.
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
  mockup: {
    unitsOnRecord: 'Units on record',
    activeProducts: 'Active products',
    lowStock: 'Low stock',
    flagged: 'Flagged',
    lowStockAlerts: 'Low stock alerts',
    reorderAt: 'reorder at',
    captureFrame: 'Capture frame',
    verifyAgainst: 'Verify against',
    holdSteady: 'Hold steady, then capture',
    results: 'Results',
    expected: 'Expected',
    counted: 'Counted',
    confidence: 'Confidence',
    verdict: 'Verdict',
    match: 'Match',
    review: 'Check',
    mismatch: 'Mismatch',
    barcodeNote: 'Scan the barcode to confirm the variant',
  },
};

/** Same shape as `en`, checked at compile time. */
type Dictionary = typeof en;

const ka: Dictionary = {
  meta: {
    title: 'Inverse — ინვენტარიზაცია AI-ით',
    description:
      'საწყობის მართვის სისტემა ქართული და კავკასიის მცირე ბიზნესისთვის, ჩაშენებული AI შემოწმებით: გადაუღე თაროს ფოტო და Inverse დათვლის რა დევს რეალურად.',
    pricingTitle: 'ფასები',
    pricingDescription:
      'გამოთვალე რა დაგიჯდება Inverse შენი კატალოგის, ობიექტებისა და შემოწმებების რაოდენობის მიხედვით.',
  },
  nav: {
    how: 'როგორ მუშაობს',
    product: 'პროდუქტი',
    pricing: 'ფასები',
    faq: 'კითხვები',
    signIn: 'შესვლა',
    start: 'დაიწყე უფასოდ',
  },
  hero: {
    eyebrow: 'ინვენტარიზაცია · თბილისი',
    title: 'აღრიცხვა ამბობს 12. თარო ამბობს 9.',
    body: 'Inverse არის საწყობის მართვის სისტემა საქართველოსა და კავკასიის რეგიონის მცირე და საშუალო ბიზნესისთვის, ჩაშენებული AI შემოწმებით: გადაუღე თაროს ფოტო და ის დათვლის, რა დევს რეალურად — და შეადარებს იმას, რასაც შენი აღრიცხვა ამბობს.',
    primary: 'დაიწყე უფასოდ',
    secondary: 'ნახე როგორ მუშაობს',
    note: 'ბარათი არ სჭირდება · ქართული და ინგლისური',
  },
  problem: {
    title: 'რატომ წყვეტს ციფრები დამთხვევას',
    body: 'არაფერი დრამატული არ ხდება. სხვაობა ნელა იზრდება და ყოველთვის ერთსა და იმავე სამ ადგილას.',
    items: [
      {
        title: 'ხელით დათვლა დღეებს ჭამს',
        body: 'სრული ინვენტარიზაცია ნიშნავს ობიექტის დაკეტვას, ხალხის სამუშაოდან მოწყვეტას და ათასობით ეტიკეტის სათითაოდ წაკითხვას. ამიტომ ის წელიწადში ორჯერ ტარდება და არა თვეში ორჯერ.',
      },
      {
        title: 'ცხრილი ნელ-ნელა შორდება რეალობას',
        body: 'გაყიდვა, დაბრუნება, დაზიანებული საქონელი, მომწოდებელი რომელმაც ცხრა გამოგზავნა და არა ათი. თითოეული წვრილმანია. ნახევარი წლის შემდეგ კი ციფრს აღარავინ ენდობა.',
      },
      {
        title: 'შეცდომა კლიენტამდე აღწევს',
        body: 'პრობლემა მაშინ ჩნდება, როცა ჰპირდები მარაგს, რომელიც არ გაქვს — ან ხელახლა უკვეთავ იმას, რაც უკვე საწყობში გიდევს.',
      },
    ],
  },
  how: {
    title: 'როგორ მუშაობს',
    body: 'ოთხი ნაბიჯი. ყველაზე გრძელი იმდენ დროს იკავებს, რამდენსაც ფოტოს გადაღება.',
    steps: [
      {
        title: 'აღრიცხე რა უნდა იდოს',
        body: 'პროდუქტები საქაღალდეებში, ლოკაციები კონკრეტულ თარომდე. ატვირთე ის, რაც უკვე გაქვს, ან დაიწყე ნულიდან.',
      },
      {
        title: 'გადაუღე ფოტო რა დევს',
        body: 'ტელეფონი, ტაბლეტი ან სათვალეზე დამაგრებული კამერა. გააჩერე ერთი კადრი — ანალიზი სწორედ ამ სტოპ-კადრზე მუშაობს და არა პირდაპირ ნაკადზე.',
      },
      {
        title: 'Claude ითვლის თაროს',
        body: 'ის აღწერს, თითოეული პროდუქტის რამდენ ერთეულს ხედავს, რამდენად დარწმუნებულია და საერთოდ თუ შეძლო ორი მსგავსი ვარიანტის გარჩევა.',
      },
      {
        title: 'იღებ ვერდიქტს თითოეულ SKU-ზე',
        body: 'მწვანე — ემთხვევა. ყვითელი — ადამიანის თვალი სჭირდება. წითელი — აღრიცხვა მცდარია. თუ ეთანხმები, ერთი დაჭერით ატარებ ცვლილებას მარაგში.',
      },
    ],
  },
  product: {
    title: 'რასაც რეალურად იყენებ',
    body: 'სამი ეკრანი ატარებს მთელ სამუშაოს.',
    items: [
      {
        title: 'მთავარი პანელი',
        body: 'რამდენი ერთეულია აღრიცხვაზე, რა ჩამოსცდა შევსების ზღვარს და რა მონიშნა ბოლო შემოწმებებმა.',
      },
      {
        title: 'შემოწმება',
        body: 'აირჩიე თარო, გააჩერე კადრი, გააგზავნე. შედეგი წუთზე ნაკლებში ბრუნდება.',
      },
      {
        title: 'შემოწმების შედეგი',
        body: 'ყველა SKU მოსალოდნელი რაოდენობით, დათვლილი რიცხვით და იმ სანდოობით, რომელიც მის უკან დგას.',
      },
    ],
  },
  honesty: {
    title: 'სად არ კმარა მხოლოდ ხედვა',
    body: 'ერთი სერიის ორი ჯაგრისი მეტრის მანძილიდან იდენტურია და მხოლოდ ზომით განსხვავდება. Inverse ასეთებს არ გამოიცნობს.',
    detail:
      'ის ნიშნავს მათ ბარკოდით შესამოწმებლად და ასახელებს, რომელი SKU-ებია სავარაუდო. თავდაჯერებულად გამოყურებული რიცხვი არასდროს არის ჩუმად მცდარი — და მოდელი თავად არ წყვეტს, მისაღებია თუ არა შენი აღრიცხვა. ის აღწერს რასაც ხედავს; შედარებას კი აკეთებს წესი, რომელიც შეგიძლია წაიკითხო.',
    points: [
      'მსგავსი ვარიანტები მოინიშნება და არა გამოიცნობა',
      'ყოველ დათვლას თან ახლავს სანდოობის ქულა',
      'ციფრი მარაგში მხოლოდ ადამიანის დადასტურებით ხვდება',
    ],
  },
  features: {
    title: 'აშენებულია ერთზე მეტი კომპანიისთვის',
    body: 'Inverse მრავალ-ტენანტიანია ბაზის პირველივე სტრიქონიდან.',
    items: [
      {
        title: 'იზოლაცია Postgres-ის დონეზე',
        body: 'ყველა ცხრილი კომპანიით არის შემოსაზღვრული Row Level Security-ით და არა კოდით, რომელსაც ფილტრის დამატება შეიძლება დაავიწყდეს.',
      },
      {
        title: 'როლები, რომლებსაც აზრი აქვს',
        body: 'მფლობელი, ადმინი, წევრი და დამკვირვებელი. დამკვირვებელი კითხულობს კატალოგს და ვერასდროს წერს მასში.',
      },
      {
        title: 'საქაღალდეები და კატეგორიები',
        body: 'დაალაგე ათასობით SKU ისე, როგორც შენი გუნდი უკვე საუბრობს მათზე.',
      },
      {
        title: 'მარაგის შემცირების შეტყობინება',
        body: 'შევსების ზღვარი თითოეულ პროდუქტზე და პანელი, რომელიც გეუბნება რამ გადალახა ის.',
      },
      {
        title: 'შემოწმებების სრული ისტორია',
        body: 'ყოველი შემოწმება ინახავს ფოტოს, რიცხვებს და სანდოობას — ეს აუდიტის კვალია და არა უბრალოდ შედეგი.',
      },
      {
        title: 'შექმნილია საქართველოსთვის',
        body: 'ქართული და ინგლისური მთელ სისტემაში, ფასები ლარში, დამზადებულია თბილისში, Novora-ს მიერ.',
      },
    ],
  },
  pricingTeaser: {
    title: 'ფასები',
    body: 'დაიწყე უფასოდ. გადადი ზემოთ მხოლოდ მაშინ, როცა შენი კატალოგი, ობიექტები ან შემოწმებების რიტმი რეალურად გასცდება ტარიფს.',
    cta: 'გახსენი კალკულატორი',
    perMonth: '/თვე',
    custom: 'ინდივიდუალური',
    placeholder:
      'ეს ციფრები წინასწარია და საბოლოო კომერციულ დამტკიცებას ელოდება.',
  },
  faq: {
    title: 'კითხვები',
    items: [
      {
        q: 'რამდენად ზუსტია AI დათვლა?',
        a: 'იმდენად, რომ პირველი გადათვლა ჩაანაცვლოს — და არა იმდენად, რომ განსჯა ჩაანაცვლოს. ყოველ რიცხვს თან ახლავს სანდოობის ქულა, ხოლო ყველაფერი, რაშიც მოდელი დარწმუნებული არაა — ნაწილობრივ დაფარული თარო, ბრჭყვიალა შეფუთვა, ორი ერთნაირი ვარიანტი — ბრუნდება ყვითლად, ადამიანისთვის, და არა ისეთ ციფრად, რომელსაც შეცდომით ენდობი.',
      },
      {
        q: 'მუშაობს ვიდეოსთან ან სმარტ-სათვალესთან?',
        a: 'მუშაობს ნებისმიერი კამერის სტოპ-კადრთან, მათ შორის თავზე დამაგრებულთან. ანალიზი განზრახ ერთ გაჩერებულ კადრზე ეშვება და არა პირდაპირ ნაკადზე — რადგან ხედვის მოდელი სწორედ ამას კითხულობს, და რადგან სწორედ სტოპ-კადრია ის, რაც შეგიძლია შეინახო, ხელახლა შეამოწმო და მოგვიანებით აუდიტორს აჩვენო.',
      },
      {
        q: 'რა ხდება ერთნაირად გამოიყურებად პროდუქტებზე?',
        a: 'ისინი მოინიშნება ბარკოდით შესამოწმებლად და არ გამოიცნობა, სავარაუდო SKU-ების დასახელებით. ასევე შეგიძლია თითოეულ პროდუქტს მისცე მოკლე ვიზუალური აღწერა — „მქრქალი შავი სახელური, ოქროსფერი ზოლი" — რომელსაც მოდელი დათვლამდე კითხულობს.',
      },
      {
        q: 'ჩემი მონაცემები გამიჯნულია სხვა კომპანიებისგან?',
        a: 'დიახ, და გამიჯვნა უზრუნველყოფილია თავად Postgres-ში და არა აპლიკაციის კოდში. ყველა ცხრილი კომპანიით არის შემოსაზღვრული Row Level Security-ით, ხოლო ჩანაწერი ვერ მიუთითებს სხვა ტენანტის ჩანაწერზე მაშინაც კი, თუ ვინმე შეეცდება ასეთის ჩაწერას.',
      },
      {
        q: 'აუცილებელია არსებული სისტემის ჩანაცვლება?',
        a: 'არა. ბევრი გუნდი იწყებს Inverse-ის მხოლოდ შემოწმების ეტაპზე გამოყენებით, ინახავს არსებულ აღრიცხვას და მონაცემებს გადმოიტანს მოგვიანებით — მას შემდეგ, რაც ციფრები ნდობას დაიმსახურებს.',
      },
      {
        q: 'რა ჯდება ერთი შემოწმება?',
        a: 'თითოეული ტარიფი მოიცავს შემოწმებების თვიურ ლიმიტს, ზედმეტი კი ცალობით ანგარიშდება. ფასების გვერდზე კალკულატორი გამოთვლის, რომელია შენი მოცულობისთვის იაფი — ზოგჯერ ზედმეტში გადახდა უფრო მომგებიანია, ვიდრე ტარიფის აწევა.',
      },
    ],
  },
  cta: {
    title: 'გამოსცადე ერთ თაროზე',
    body: 'დატოვე ელფოსტა და დაგეხმარებით, გამართო შენივე საწყობის რეალურ თაროზე — მიგრაციის და ვალდებულების გარეშე.',
    placeholder: 'you@company.ge',
    button: 'მოითხოვე წვდომა',
    sending: 'იგზავნება…',
    success: 'გმადლობთ. მალე დაგიკავშირდებით.',
    company: 'კომპანია',
    companyPlaceholder: 'შენი კომპანია',
    fallback:
      'ამ ვერსიას ჯერ ბაზა არ აქვს მიერთებული, ამიტომ ფორმა ვერ შეინახავს მონაცემებს. დაგვიკავშირდი პირდაპირ.',
    invalidEmail: 'შეიყვანე სწორი ელფოსტა.',
  },
  footer: {
    tagline: 'Inverse — Novora-ს პროდუქტი. თბილისი, საქართველო.',
    product: 'პროდუქტი',
    rights: 'ყველა უფლება დაცულია.',
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
      'ფასები ლარშია, ქართული ბაზრისთვის. უთხარი კალკულატორს რამდენს ითვლი რეალურად და ის აირჩევს ყველაზე იაფ ტარიფს — მათ შორის მაშინაც, როცა ზედმეტ შემოწმებებში გადახდა ტარიფის აწევაზე იაფია.',
    skus: 'პროდუქტი (SKU)',
    skusHint: 'განსხვავებული ერთეული, რომელსაც აღრიცხავ',
    locations: 'ლოკაცია',
    locationsHint: 'საწყობი, მაღაზია, სტელაჟი',
    users: 'მომხმარებელი',
    usersHint: 'ადამიანი, ვისაც წვდომა აქვს',
    checks: 'AI შემოწმება / თვე',
    checksHint: 'ერთი გაანალიზებული ფოტო = ერთი შემოწმება',
    payYearly: 'გადაიხადე წლიურად',
    save: 'დაზოგე',
    recommended: 'რეკომენდებული',
    letsTalk: 'დავსხდეთ და ვისაუბროთ',
    letsTalkBody:
      'ამ მოცულობაზე ფასი საუბარს იმსახურებს და არა სლაიდერს.',
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
    reasonFits: 'შენი მოხმარება მარაგითაც კი ეტევა ამ ტარიფში.',
    reasonOverage: 'შემოწმება ლიმიტს ზემოთ, ფასით',
    reasonEnterprise: 'შენი მოცულობა თვითმომსახურების ტარიფებს სცდება.',
    each: 'თითო',
  },
  mockup: {
    unitsOnRecord: 'ერთეული აღრიცხვაზე',
    activeProducts: 'აქტიური პროდუქტი',
    lowStock: 'მარაგი იწურება',
    flagged: 'მონიშნული',
    lowStockAlerts: 'მარაგის შეტყობინებები',
    reorderAt: 'ზღვარი',
    captureFrame: 'გააჩერე კადრი',
    verifyAgainst: 'შეამოწმე',
    holdSteady: 'დააფიქსირე და გადაუღე',
    results: 'შედეგები',
    expected: 'მოსალოდნელი',
    counted: 'დათვლილი',
    confidence: 'სანდოობა',
    verdict: 'ვერდიქტი',
    match: 'ემთხვევა',
    review: 'შესამოწმებელი',
    mismatch: 'არ ემთხვევა',
    barcodeNote: 'დაასკანერე ბარკოდი ვარიანტის დასადასტურებლად',
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { ka, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
