

const TITLE_APP = process.env.NEXT_PUBLIC_TITLE_APP || "Postmatic";
const LANDINGPAGE_URL = process.env.NEXT_PUBLIC_LANDINGPAGE_URL || "https://postmatic.id";
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://workspace.postmatic.id";
// After signing in, the auth site sends the visitor on to the workspace.
const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL || `https://auth.postmatic.id/login?from=${encodeURIComponent(DASHBOARD_URL)}`;
const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "#";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL || "team@postmatic.id";
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+62 851-1760-6447";
const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS || "Sleman, Indonesia";
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Postmatic";
const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/6285117606447";


const INSTAGRAM = process.env.NEXT_PUBLIC_INSTAGRAM || "#";
const FACEBOOK = process.env.NEXT_PUBLIC_FACEBOOK || "#";
const TWITTER = process.env.NEXT_PUBLIC_TWITTER || "#";
const LINKEDIN = process.env.NEXT_PUBLIC_LINKEDIN || "#";

const COMMUNITY_URL = process.env.NEXT_PUBLIC_COMMUNITY || "https://discord.com/invite/NNGwjhWWxG";

const VIDEO_TUTORIAL_URL = process.env.NEXT_PUBLIC_VIDEO_TUTORIAL_URL || "https://www.youtube.com/embed/rEkeRl3WkFk?rel=0&showinfo=0&autoplay=0";
const VIDEO_INTRODUCTION_URL = process.env.NEXT_PUBLIC_VIDEO_INTRODUCTION_URL || "https://www.youtube.com/embed/LRGvK7NwriE?rel=0&showinfo=0&autoplay=0";

const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION || "";
const YANDEX_SITE_VERIFICATION = process.env.YANDEX_SITE_VERIFICATION || "";
const YAHOO_SITE_VERIFICATION = process.env.YAHOO_SITE_VERIFICATION || "";

export { TITLE_APP, LANDINGPAGE_URL, LOGIN_URL, DASHBOARD_URL, SIGNUP_URL, API_URL, EMAIL, PHONE_NUMBER, ADDRESS, COMPANY_NAME, WHATSAPP_URL, INSTAGRAM, FACEBOOK, TWITTER, LINKEDIN, VIDEO_TUTORIAL_URL, VIDEO_INTRODUCTION_URL, COMMUNITY_URL, GOOGLE_SITE_VERIFICATION, YANDEX_SITE_VERIFICATION, YAHOO_SITE_VERIFICATION };
