const siteUrl = "https://vihigahospital.go.ke";

module.exports = {

    siteUrl,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["/admin2", "/admin2/*", "/user", "/user/*", "/auth", "/auth/"]
            },
            {userAgent: "*", allow: "/"},
        ],
        additionalSitemaps: [
     
            `${siteUrl}/general-sitemap.xml`,
            `${siteUrl}/categories-sitemap.xml`,
            `${siteUrl}/tags-sitemap.xml`,
            `${siteUrl}/blogs-sitemap.xml`,
        ],
    },
    exclude: [
        "/services-sitemap.xml",
        "/categories-sitemap.xml",
        "/tags-sitemap.xml",
        "/admin2",
        "/admin2/*",
        "/auth",
        "/auth/*",
        "/user",
        "/user/*",
        "/blogs-sitemap.xml"
    ],
};
