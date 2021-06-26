import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.API_PRODUCTION
    : publicRuntimeConfig.API_DEVELOPMENT;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const  FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
export const CLOUDINARY_NAME =  publicRuntimeConfig.CLOUDINARY_NAME
export const  FILE_DOWNLOAD_API =  publicRuntimeConfig.API_DOWNLOAD_DEVELOPMENT


export const DOMAIN = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.DOMAIN_PRODUCTION
    : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;