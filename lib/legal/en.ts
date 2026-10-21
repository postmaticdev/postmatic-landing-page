import { LEGAL_COMPANY, type LegalContent } from "./types";

const { name: COMPANY, email: EMAIL, whatsapp: WA, whatsappUrl: WA_URL } = LEGAL_COMPANY;

export const legalContentEn: LegalContent = {
  ui: {
    eyebrow: "Legal",
    lastUpdated: "Last updated",
    summaryTitle: "In short",
    tocTitle: "Contents",
    contactTitle: "Have a question?",
    contactBody: "Our team is happy to explain this document or follow up on your request.",
    relatedTitle: "Related documents",
    docLabels: {
      termsAndConditions: "Terms & Conditions",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      dataDeletion: "Data Deletion",
      cookiePolicy: "Cookie Policy",
    },
  },
  documents: {
    // ------------------------------------------------------------------ Terms & Conditions
    termsAndConditions: {
      title: "Terms & Conditions",
      intro: `These terms are an agreement between you and ${COMPANY} ("Postmatic", "we", "us"), the company that runs Postmatic. By signing up for or using Postmatic, you confirm that you have read, understood, and agree to the terms below.`,
      summary: [
        "There is no minimum age. If you are a minor, use Postmatic with your parent's or guardian's consent.",
        "Keep your account secure. You are responsible for everything that happens in your account.",
        "Postmatic is **pay as you go** with **Postmatic Tokens**. There is no monthly subscription.",
        "Your business data, logos, and photos stay yours. You may use the content Postmatic creates for your business.",
        "We may limit or disable accounts that break these rules or the law.",
      ],
      sections: [
        {
          id: "about-these-terms",
          title: "About these terms",
          blocks: [
            {
              type: "p",
              text: "These Terms & Conditions apply to all Postmatic services, including postmatic.id, the sign-in pages (auth.postmatic.id), the workspace (workspace.postmatic.id), and the documentation (docs.postmatic.id).",
            },
            {
              type: "p",
              text: "The following documents are also part of this agreement: [Terms of Service](/terms-of-service), [Privacy Policy](/privacy-policy), [Cookie Policy](/cookie-policy), and [Data Deletion](/data-deletion).",
            },
            { type: "p", text: "If you do not agree with these terms, please do not use Postmatic." },
          ],
        },
        {
          id: "who-can-use",
          title: "Who can use Postmatic",
          blocks: [
            {
              type: "list",
              items: [
                "Postmatic **has no minimum age**.",
                "If you are a minor under applicable law, you must have your **parent's or guardian's consent** before signing up. Your parent or guardian is also responsible for how your account is used, including token purchases.",
                "If you sign up on behalf of a business or company, you confirm that you are authorized to act for it.",
                "You have not been banned from our services because of a previous violation.",
              ],
            },
          ],
        },
        {
          id: "your-account",
          title: "Your account",
          blocks: [
            {
              type: "list",
              items: [
                "Provide accurate sign-up details and verify your email. You can also sign in with your Google account.",
                "Keep your password private and do not share your account. To work together, invite team members instead.",
                "You are responsible for all activity in your account.",
                "One account can manage more than one business.",
                `If you think someone else is using your account, change your password right away and contact us at ${EMAIL}. You can also review and end sign-in sessions on other devices from your Profile page.`,
              ],
            },
          ],
        },
        {
          id: "tokens-and-payment",
          title: "Postmatic Tokens, pricing, and payment",
          blocks: [
            {
              type: "p",
              text: "Postmatic is **pay as you go**. You buy **Postmatic Tokens**, and tokens are used when you run certain features, such as creating images or content with AI. The number of tokens each feature uses is shown in the app.",
            },
            {
              type: "list",
              items: [
                "Prices, admin fees, taxes, and any discounts are shown before you pay.",
                "Payments are processed by our payment partner, **Midtrans**, using the available methods such as bank Virtual Account transfer or e-wallet/QRIS.",
                "Complete your payment before the deadline shown. Unpaid orders are canceled automatically.",
                "Tokens are added to your account automatically once payment succeeds. We also email you an invoice.",
                "Postmatic Tokens **do not expire**. They stay in your account for as long as it is active.",
                "Tokens cannot be exchanged for cash or moved to another account.",
                "Bonus tokens, promotions, and referral codes follow the terms of each program. We may cancel bonuses obtained through fraud.",
              ],
            },
          ],
        },
        {
          id: "refunds",
          title: "Refunds",
          blocks: [
            {
              type: "p",
              text: "Because tokens can be used as soon as they are bought, token purchases are generally **non-refundable**.",
            },
            {
              type: "p",
              text: `We will help if something went wrong on our side, for example if you were charged twice or your tokens did not arrive after a successful payment. Contact us at ${EMAIL} with your Order ID. If we confirm an error, we will add the tokens you should have received or refund you through our payment partner.`,
            },
          ],
        },
        {
          id: "intellectual-property",
          title: "Content ownership and intellectual property",
          blocks: [
            {
              type: "list",
              items: [
                `**Ours:** the Postmatic app, code, design, brand, and logo belong to ${COMPANY}. You may not copy or use them without our written permission.`,
                "**Yours:** the business data, logos, product photos, and other material you upload remain yours. You give us a limited permission to store and process them, only to run the service for you.",
                "**Created content:** you may use the images and captions Postmatic creates for you for your business, including commercial use. We do not claim ownership of them.",
                "You are responsible for making sure the material you upload and the content you publish do not infringe anyone else's rights, such as copyright, trademarks, or rights over a person's photo.",
              ],
            },
          ],
        },
        {
          id: "not-allowed",
          title: "What you must not do",
          blocks: [
            {
              type: "list",
              items: [
                "Use Postmatic for illegal activities, including fraud and gambling.",
                "Try to hack, break into, disrupt, or overload our systems.",
                "Reverse engineer, copy, or automatically extract data from the app without permission.",
                "Resell or rent out access to Postmatic without our written approval.",
                "Create fake accounts, impersonate others, or abuse promotions and the referral program.",
                "Create or share prohibited content, as described in the [Terms of Service](/terms-of-service).",
              ],
            },
          ],
        },
        {
          id: "suspension",
          title: "Suspension and termination",
          blocks: [
            {
              type: "p",
              text: "We may limit, suspend, or disable accounts that break these Terms & Conditions, the Terms of Service, or the law. For minor issues, we will try to warn you first.",
            },
            {
              type: "p",
              text: "You can stop using Postmatic at any time and ask us to delete your account. See [Data Deletion](/data-deletion) for how.",
            },
          ],
        },
        {
          id: "liability",
          title: "Limitation of liability",
          blocks: [
            {
              type: "list",
              items: [
                "Postmatic is provided as is. We work hard to keep it running well, but we cannot guarantee it will always be free of interruptions or errors.",
                "We do not guarantee specific marketing results, such as sales, followers, or engagement.",
                "We are not responsible for outages, rule changes, or actions by third-party platforms such as Facebook, Instagram, LinkedIn, or our payment partner.",
                "To the extent the law allows, our total liability for your losses is limited to the amount you paid us in the 3 months before the event.",
              ],
            },
          ],
        },
        {
          id: "indemnity",
          title: "Your responsibility to others",
          blocks: [
            {
              type: "p",
              text: "If someone makes a claim against us because of content you uploaded or published, or because you broke this agreement, you agree to take responsibility for that claim and to cover the losses it causes us.",
            },
          ],
        },
        {
          id: "governing-law",
          title: "Governing law and disputes",
          blocks: [
            { type: "p", text: "This agreement is governed by the laws of the Republic of Indonesia." },
            {
              type: "p",
              text: `If a dispute arises, we will first try to resolve it through discussion. Please contact us at ${EMAIL}. If no agreement is reached within 30 days, the dispute will be settled at the Sleman District Court (Pengadilan Negeri Sleman), Indonesia.`,
            },
          ],
        },
        {
          id: "changes",
          title: "Changes to these terms",
          blocks: [
            {
              type: "p",
              text: "We may update these Terms & Conditions from time to time. For important changes, we will let you know by email or in the app. By continuing to use Postmatic after a change takes effect, you agree to the latest version.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ Terms of Service
    termsOfService: {
      title: "Terms of Service",
      intro:
        "This page explains how Postmatic works and the rules for using it. These terms complement our [Terms & Conditions](/terms-and-conditions).",
      summary: [
        "Postmatic helps you create images and captions with AI, schedule content, and post it automatically to your business social media accounts.",
        "AI-generated content is not always accurate. **Always review it** before publishing.",
        "You decide which content gets published, and you are responsible for it.",
        "When you connect a social media account, Postmatic only posts content according to the permissions and settings you choose.",
        "Content that is illegal or harms others is not allowed.",
      ],
      sections: [
        {
          id: "our-service",
          title: "What we provide",
          blocks: [
            {
              type: "list",
              items: [
                "**Business Knowledge:** where you keep your business profile, products, logo, brand colors, target audience, and tone of voice. This information guides the content we create.",
                "**Auto-fill from your website:** Postmatic reads the business website you enter to help fill in your profile. You can review and change the results.",
                "**AI content creation:** creates image designs, captions, and hashtags based on your business data and the ideas or trends you choose.",
                "**Scheduling and auto-posting:** schedules and posts content to the accounts you connect. Currently supported: Facebook Pages, Instagram (professional accounts), and LinkedIn.",
                "**Teamwork:** invite team members to your business and manage their roles and access.",
              ],
            },
          ],
        },
        {
          id: "ai-content",
          title: "About AI-generated content",
          blocks: [
            {
              type: "p",
              text: "Content in Postmatic is created with the help of artificial intelligence (AI) from our AI provider partners. To use it safely, keep the following in mind:",
            },
            {
              type: "list",
              items: [
                "AI results can be inaccurate, for example a wrong price, product name, or other detail. **Double-check** before publishing.",
                "AI results can resemble content that already exists online. Avoid using results that clearly copy another brand or someone else's work.",
                "Do not use AI content to make misleading claims, such as false health or financial promises.",
                "Tokens are used when a content creation process runs. If you believe tokens were deducted incorrectly, contact us.",
              ],
            },
          ],
        },
        {
          id: "social-accounts",
          title: "Connecting social media accounts",
          blocks: [
            {
              type: "list",
              items: [
                "Accounts are connected through the platform's official permission screens (Meta for Facebook and Instagram, and LinkedIn). We **never ask for or store** your social media passwords.",
                "By connecting an account, you allow Postmatic to post content on that account's behalf, within the permissions you approved on the platform.",
                "Postmatic only posts content that you create, schedule, or turn on for automatic posting.",
                "Connections can expire or be revoked by the platform. If that happens, reconnect the account from the Business Knowledge page.",
                "You must follow each platform's rules. We are not responsible if a platform rejects or removes content, or restricts your account.",
                "You can disconnect at any time from Postmatic, or revoke access from the platform's settings. See [Data Deletion](/data-deletion) for how.",
              ],
            },
          ],
        },
        {
          id: "scheduling",
          title: "Scheduling and automatic posting",
          blocks: [
            {
              type: "list",
              items: [
                "Make sure the content, target account, and schedule are correct before saving.",
                "Posts may be delayed or fail because of platform issues, expired account connections, or system maintenance. You can check the status of each post in the app.",
                "Automatic features, such as automatic content creation, use tokens according to the settings you turn on. Turn them off if you do not want tokens to be used.",
              ],
            },
          ],
        },
        {
          id: "prohibited-content",
          title: "Prohibited content",
          blocks: [
            { type: "p", text: "You may not use Postmatic to create, store, or publish content that:" },
            {
              type: "list",
              items: [
                "breaks Indonesian law or the law where the content is published;",
                "contains hate speech, discrimination, harassment, or threats of violence;",
                "contains pornography, sexual content, or anything involving the exploitation of children;",
                "promotes gambling, scams, fraudulent investments, drugs, illegal weapons, or other prohibited goods;",
                "infringes copyright, trademarks, or other people's privacy, including using someone's photo or personal data without permission;",
                "spreads hoaxes or misleading information that could harm others;",
                "is spam or breaks the rules of social media platforms.",
              ],
            },
            {
              type: "p",
              text: "We may remove such content from our systems and limit or disable accounts that break these rules.",
            },
          ],
        },
        {
          id: "teams",
          title: "Teams and access roles",
          blocks: [
            {
              type: "list",
              items: [
                "Business owners can invite team members, set their roles, and remove them.",
                "Business owners are responsible for who has access to their business and what those people do there.",
                "Members removed from a team lose access to that business, but their personal Postmatic account stays active.",
              ],
            },
          ],
        },
        {
          id: "your-data",
          title: "The data you add",
          blocks: [
            {
              type: "p",
              text: "Make sure you have the right to use all data and images you upload, including logos and product photos. If people appear in a photo, make sure you have their permission. How we protect your data is explained in our [Privacy Policy](/privacy-policy).",
            },
          ],
        },
        {
          id: "availability",
          title: "Availability and changes",
          blocks: [
            {
              type: "list",
              items: [
                "We aim to keep Postmatic available at all times, but it may occasionally be interrupted by maintenance, technical problems, or issues with our partners.",
                "We may add, change, or remove features. If a change significantly affects you, we will let you know in advance.",
                "To prevent abuse, we apply reasonable usage limits, such as the number of requests within a period of time.",
              ],
            },
          ],
        },
        {
          id: "support",
          title: "Help and support",
          blocks: [
            {
              type: "p",
              text: `Guides are available at [docs.postmatic.id](https://docs.postmatic.id). For direct help, contact us by email at ${EMAIL} or on [WhatsApp ${WA}](${WA_URL}).`,
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ Privacy Policy
    privacyPolicy: {
      title: "Privacy Policy",
      intro: `This policy explains what data we collect when you use Postmatic, what we use it for, who we share it with, and your rights over it. Postmatic is run by ${COMPANY}, which acts as the controller of your personal data under Indonesia's Personal Data Protection Law (Law No. 27 of 2022, "PDP Law").`,
      summary: [
        "We only collect the data needed to run Postmatic: account data, business data, content, and transactions.",
        "**We do not sell your personal data.**",
        "Data is only shared with partners that help run the service, such as AI providers, our payment partner, data storage, and the social media platforms you connect.",
        "We never ask for or store your social media passwords.",
        "You can view, correct, and request deletion of your data at any time.",
      ],
      sections: [
        {
          id: "data-we-collect",
          title: "Data we collect",
          blocks: [
            { type: "p", text: "**Data you give us directly:**" },
            {
              type: "list",
              items: [
                "**Account data:** name, email address, password (stored encrypted, never as plain text), profile photo, and phone number if you add one.",
                "**If you sign in with Google:** your name, email address, and profile photo from your Google account.",
                "**Business data:** business name, logo, category, description, website, business phone number, brand colors, target audience, tone of voice, hashtags, products and product photos, avatars, knowledge documents, and the news sources (RSS) you follow.",
                "**Content:** the ideas or prompts you write, the images and captions created, post schedules, and posting history.",
                "**Team members:** the email addresses of people you invite to your business.",
                "**Communication:** messages you send to our support team through the website, email, or WhatsApp.",
              ],
            },
            { type: "p", text: "**Data from services you connect:**" },
            {
              type: "list",
              items: [
                "**Social media accounts (Facebook Pages, Instagram professional accounts, LinkedIn):** account or page name and ID, account profile photo, and the access token the platform issues so Postmatic can post with your permission.",
                "**Payments:** order number, product, token amount, total, payment method, Virtual Account number or payment code, and payment status. **We do not store your card details.** They are processed directly by Midtrans.",
                "**Business website:** if you use auto-fill from a website, we read the public pages of the website you enter and store a summary of the information.",
              ],
            },
            { type: "p", text: "**Data recorded automatically:**" },
            {
              type: "list",
              items: [
                "**Technical and security data:** IP address, device and browser type, access times, sign-in sessions, and a record of important account activity.",
                "**Bot checks:** our sign-in and sign-up pages use Cloudflare Turnstile to confirm that a real person is signing up.",
                "**Referral program:** referral codes you use or share, and how they are used.",
              ],
            },
          ],
        },
        {
          id: "how-we-use-data",
          title: "How we use your data",
          blocks: [
            {
              type: "list",
              items: [
                "To run Postmatic's features, such as creating content that fits your business, saving schedules, and posting to the accounts you connect.",
                "To process payments, add tokens, and send invoices.",
                "To send important emails, such as account verification, password resets, team invitations, security alerts, and payment confirmations.",
                "To keep the service secure, for example by blocking suspicious sign-ins, spam, and abuse.",
                "To help you when you contact our support team.",
                "To improve and develop the service.",
                "To send Postmatic news or promotions. You can ask us to stop at any time.",
              ],
            },
            {
              type: "p",
              text: "We process data based on your consent, to perform our service agreement with you, to meet legal obligations, and for legitimate interests such as keeping the service secure.",
            },
          ],
        },
        {
          id: "sharing",
          title: "Who we share data with",
          blocks: [
            {
              type: "p",
              text: "**We do not sell or rent your personal data.** Data is only shared with partners that help us run the service, and only as much as they need:",
            },
            {
              type: "list",
              items: [
                "**AI providers** (OpenAI, Google Gemini, and other AI model providers we use): receive your prompts and the relevant business and product data to create images and text.",
                "**Payment partner** (Midtrans): receives your name, email, order details, and amount to process payments.",
                "**Social media platforms you connect** (Meta for Facebook and Instagram, and LinkedIn): receive the content you publish.",
                "**Google:** if you choose to sign in with your Google account.",
                "**Storage and infrastructure:** cloud services that store files and images, servers, and email services that deliver our messages.",
                "**Customer support:** the email and WhatsApp services we use to reply to you.",
                "**Security:** Cloudflare, for bot checks.",
                "**Authorities:** when required by law or an official order.",
              ],
            },
            {
              type: "p",
              text: "Some of our partners are located outside Indonesia, so your data may be processed abroad. We only work with partners that apply adequate data protection.",
            },
          ],
        },
        {
          id: "security",
          title: "How we protect your data",
          blocks: [
            {
              type: "list",
              items: [
                "All connections to Postmatic use HTTPS (encrypted).",
                "Passwords are stored using one-way encryption, so even we cannot see them.",
                "Access to data is limited to the team members who need it.",
                "When you disconnect a social media account, we delete its access token immediately.",
              ],
            },
            {
              type: "p",
              text: "Even so, no system is 100% secure. If a data breach affects you, we will notify you and the authorities as required by the PDP Law.",
            },
          ],
        },
        {
          id: "retention",
          title: "How long we keep data",
          blocks: [
            {
              type: "list",
              items: [
                "Account and business data are kept while your account is active.",
                "After you ask us to delete your account, your data is deleted or anonymized as described on the [Data Deletion](/data-deletion) page.",
                "Transaction records and invoices are kept for as long as tax and accounting rules require.",
                "Security records are kept for a limited time to prevent and investigate abuse.",
              ],
            },
          ],
        },
        {
          id: "your-rights",
          title: "Your rights",
          blocks: [
            { type: "p", text: "Under the PDP Law, you have the right to:" },
            {
              type: "list",
              items: [
                "know about and get a copy of your personal data;",
                "correct data that is wrong or incomplete, and you can change most of it yourself in the app;",
                "ask us to delete your data;",
                "withdraw consent you have given;",
                "ask us to restrict or stop processing your data for certain purposes;",
                "object to how we process your data.",
              ],
            },
            {
              type: "p",
              text: `To use these rights, email ${EMAIL} from the email address registered with Postmatic. We may need to verify your identity first.`,
            },
          ],
        },
        {
          id: "children",
          title: "Minors",
          blocks: [
            {
              type: "p",
              text: "Postmatic has no minimum age. Under the PDP Law, signing up and processing the data of minors requires a parent's or guardian's consent. If we learn that a child's data was registered without that consent, we may ask the parent or guardian to confirm, or delete the data.",
            },
          ],
        },
        {
          id: "cookies",
          title: "Cookies",
          blocks: [
            {
              type: "p",
              text: "We use cookies and browser storage to keep you signed in and to remember your settings. See our [Cookie Policy](/cookie-policy) for details.",
            },
          ],
        },
        {
          id: "policy-changes",
          title: "Changes to this policy",
          blocks: [
            {
              type: "p",
              text: "We may update this policy when our service or the rules change. The date of the last update is always shown at the top of this page. For important changes, we will let you know by email or in the app.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ Data Deletion
    dataDeletion: {
      title: "Data Deletion",
      intro:
        "You have the right to delete your data from Postmatic. This page explains what you can delete yourself, how to request account deletion, and how to remove Postmatic's access from Facebook, Instagram, Google, and LinkedIn.",
      summary: [
        "**Delete it yourself:** products, content, avatars, news sources, team members, social media connections, and even your whole business can be deleted directly in the workspace.",
        `**Delete your account:** email ${EMAIL} from your registered email address.`,
        "**Facebook and Instagram:** if you remove Postmatic in your Facebook or Instagram settings, we delete the connection data automatically.",
        "Content already posted to social media stays on that platform and must be deleted there.",
      ],
      sections: [
        {
          id: "delete-yourself",
          title: "Data you can delete yourself",
          blocks: [
            { type: "p", text: "Sign in to the [Postmatic workspace](https://workspace.postmatic.id) and choose your business. From there you can:" },
            {
              type: "list",
              items: [
                "**Delete products, content, avatars, and news sources (RSS)** from their pages.",
                "**Disconnect social media accounts** in the platform section of the Business Knowledge page. We delete the account's access token immediately.",
                "**Remove team members** in the business member settings.",
                "**Delete a business** (business owners only). Once deleted, the business and its contents can no longer be accessed by anyone, including team members.",
                "**End sign-in sessions** on other devices from your Profile page.",
              ],
            },
          ],
        },
        {
          id: "delete-account",
          title: "Deleting your Postmatic account completely",
          blocks: [
            {
              type: "steps",
              items: [
                `Email **${EMAIL}** from the email address registered with Postmatic.`,
                "Use the subject **Account Deletion Request**.",
                "Include your account email address and, if relevant, the names of the businesses you want deleted too.",
                "We will confirm that the request really comes from the account owner, then process it within the time required by applicable law.",
                "You will receive a confirmation email once the deletion is complete.",
              ],
            },
            { type: "p", text: "**What gets deleted:** your account and profile, the businesses you own with their products, content, avatars, and schedules, your social media connections, and your sign-in sessions." },
            {
              type: "p",
              text: "**What we keep:** transaction records and invoices, for as long as tax and accounting rules require, and security records for a limited time. This data is not used for anything else.",
            },
            {
              type: "note",
              text: "Please note: any remaining Postmatic Tokens are forfeited and cannot be refunded once your account is deleted. If you are only a team member (not the owner), deleting your account removes you from the team, and the business stays with its owner.",
            },
          ],
        },
        {
          id: "facebook-instagram",
          title: "Removing access from Facebook and Instagram",
          blocks: [
            {
              type: "p",
              text: "You can remove Postmatic directly from your Facebook or Instagram settings. When you do, Meta sends a deletion request to Postmatic and we **automatically delete** that account's connection data, including its access token.",
            },
            { type: "p", text: "**Facebook:**" },
            {
              type: "steps",
              items: [
                "Open Facebook and go to **Settings & privacy → Settings**.",
                "Select **Apps and websites**.",
                "Find **Postmatic** and click **Remove**.",
              ],
            },
            { type: "p", text: "**Instagram:**" },
            {
              type: "steps",
              items: [
                "Open Instagram and go to **Settings and privacy**.",
                "Select **Apps and websites** (in some versions this is under Accounts Center).",
                "Find **Postmatic** and choose **Remove**.",
              ],
            },
            {
              type: "p",
              text: "Once the request is processed, Facebook shows a confirmation code and a link to check the deletion status. Menu names may differ slightly depending on the app version.",
            },
          ],
        },
        {
          id: "google-linkedin",
          title: "Removing Google and LinkedIn access",
          blocks: [
            {
              type: "list",
              items: [
                "**Google:** go to [myaccount.google.com/permissions](https://myaccount.google.com/permissions), select Postmatic, and remove access. This stops Google sign-in but does not delete your Postmatic account. To delete your account, follow the steps in the previous section.",
                "**LinkedIn:** disconnect from the Business Knowledge page, or remove Postmatic's access in your LinkedIn settings under **Data privacy → Permitted services**.",
              ],
            },
          ],
        },
        {
          id: "published-content",
          title: "Content already published",
          blocks: [
            {
              type: "p",
              text: "Deleting data in Postmatic does not delete posts that are already live on Facebook, Instagram, or LinkedIn. Those posts live on each platform and must be deleted directly from your social media account.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ Cookie Policy
    cookiePolicy: {
      title: "Cookie Policy",
      intro:
        "This page explains the cookies and browser storage used on the Postmatic website (postmatic.id), the sign-in pages, and the workspace, and how you can control them.",
      summary: [
        "We mainly use cookies to **keep you signed in** and to remember your settings (language, theme, cookie choices).",
        "**We currently do not use third-party advertising or tracking cookies** on our sites.",
        "If we add analytics or advertising tools in the future, they will only run after you agree.",
        "You can manage or delete cookies at any time in your browser.",
      ],
      sections: [
        {
          id: "what-are-cookies",
          title: "What cookies are",
          blocks: [
            {
              type: "p",
              text: "Cookies are small files your browser saves when you visit a website. Besides cookies, websites can also use **local storage** in your browser to remember settings. Both help a site recognize you and remember your choices.",
            },
          ],
        },
        {
          id: "essential-cookies",
          title: "Essential cookies (keeping you signed in)",
          blocks: [
            { type: "p", text: "These cookies are needed for sign-in to work. Without them, you cannot sign in to Postmatic." },
            {
              type: "list",
              items: [
                "**postmaticAccessToken** and **postmaticRefreshToken**: keep you signed in on the Postmatic sign-in pages and workspace. They last until your session ends or you sign out.",
                "**postmaticGoogleLoginPending**: protects Google sign-in from abuse. It lasts only 15 minutes.",
                "**Cloudflare Turnstile**: our sign-in and sign-up pages use Turnstile to tell people and bots apart. It may use its own cookies or browser storage.",
              ],
            },
          ],
        },
        {
          id: "preference-cookies",
          title: "Cookies and storage for preferences",
          blocks: [
            {
              type: "list",
              items: [
                "**NEXT_LOCALE**: remembers the language you pick with the language switcher.",
                "**theme**: remembers whether you chose light or dark mode.",
                "**cookieConsent** and **cookiePrefs**: remember your choice on the cookie notice, so it does not keep appearing.",
                "**Workspace display settings**: small settings saved in your browser, such as layout choices, so they stay the same when you return.",
              ],
            },
          ],
        },
        {
          id: "analytics-ads",
          title: "Analytics and advertising cookies",
          blocks: [
            {
              type: "p",
              text: "Our cookie notice offers choices for analytics and advertising cookies. **We do not currently use any third-party analytics or advertising tools**, so these choices do not turn anything on yet.",
            },
            {
              type: "p",
              text: "If we add such tools in the future, they will only run with your consent, and we will update this policy first.",
            },
          ],
        },
        {
          id: "manage-cookies",
          title: "How to manage cookies",
          blocks: [
            {
              type: "list",
              items: [
                "Use the **Manage cookies** button on our cookie notice.",
                "Delete or block cookies in your browser settings (Chrome, Safari, Firefox, Edge, and others).",
                "If you delete essential cookies, you will be signed out and will need to sign in again.",
              ],
            },
          ],
        },
        {
          id: "cookie-changes",
          title: "Changes to this policy",
          blocks: [
            {
              type: "p",
              text: "We will update this page if the cookies we use change. The date of the last update is shown at the top of this page. Please also read our [Privacy Policy](/privacy-policy).",
            },
          ],
        },
      ],
    },
  },
};
