import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.API_PRODUCTION
    : publicRuntimeConfig.API_DEVELOPMENT;
export const GOOGLE_ANALYTICS_KEY = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.GOOGLE_ANALYTICS
    : publicRuntimeConfig.GOOGLE_ANALYTICS;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
export const CLOUDINARY_NAME = publicRuntimeConfig.CLOUDINARY_NAME;


export const SITE_URL = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.SITE_URL
    : publicRuntimeConfig.SITE_URL_DEV;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.DOMAIN_PRODUCTION
    : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;


