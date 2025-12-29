


// SEO Manager for UrbanOraTech
class SEOManager {
    constructor() {
        this.siteConfig = {
            siteName: "UrbanOraTech",
            baseUrl: "https://urbanoratech.com",
            defaultImage: "/assets/images/logo/og-image.png",
            twitterHandle: "@urbanoratech",
            siteDescription: "Master future-ready skills, explore tech careers, and access smart tools for the digital age."
        };
        
        this.pageMetadata = {
            '/': {
                title: "UrbanOraTech | Future Skills & Smart Careers Hub",
                description: "Master future-ready skills, explore tech careers, and access smart tools for the digital age. Your hub for AI, Web Development, Data Science & more.",
                keywords: "tech skills, career roadmap, AI learning, web development, data science, future jobs"
            },
            '/pages/skills/': {
                title: "Skills Roadmaps | UrbanOraTech",
                description: "Structured learning roadmaps for AI Engineering, Web Development, Data Science, Cybersecurity, and more future-ready skills.",
                keywords: "skill roadmap, learning path, tech skills, programming, development"
            },
            '/pages/skills/ai-engineer.html': {
                title: "AI Engineer Roadmap | Complete Learning Path",
                description: "Master AI Engineering with our comprehensive roadmap. Learn Machine Learning, Deep Learning, NLP, and AI deployment step by step.",
                keywords: "ai engineer, machine learning, deep learning, ai roadmap, artificial intelligence"
            },
            '/pages/tools/': {
                title: "Tech Tools Directory | UrbanOraTech",
                description: "Curated directory of essential tech tools for AI, development, design, productivity, and career growth.",
                keywords: "tech tools, software tools, development tools, ai tools, design tools"
            },
            '/pages/blogs/': {
                title: "Tech Blog & Articles | UrbanOraTech",
                description: "Latest insights on tech trends, career advice, skill development, and industry updates.",
                keywords: "tech blog, career advice, industry trends, tech news, learning tips"
            },
            '/pages/about.html': {
                title: "About UrbanOraTech | Our Mission",
                description: "Learn about UrbanOraTech's mission to democratize tech education and help people build future-ready careers.",
                keywords: "about us, mission, vision, team, tech education"
            }
        };
    }
    
    init() {
        this.updateMetaTags();
        this.injectStructuredData();
        this.setCanonicalURL();
    }
    
    updateMetaTags() {
        const currentPath = window.location.pathname;
        const pageMeta = this.pageMetadata[currentPath] || this.pageMetadata['/'];
        
        // Update meta tags
        document.title = pageMeta.title;
        
        // Description
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
            descMeta = document.createElement('meta');
            descMeta.name = "description";
            document.head.appendChild(descMeta);
        }
        descMeta.content = pageMeta.description;
        
        // Keywords
        let keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (!keywordsMeta) {
            keywordsMeta = document.createElement('meta');
            keywordsMeta.name = "keywords";
            document.head.appendChild(keywordsMeta);
        }
        keywordsMeta.content = pageMeta.keywords;
        
        // Open Graph
        this.updateOpenGraph(pageMeta);
        
        // Twitter Cards
        this.updateTwitterCards(pageMeta);
    }
    
    updateOpenGraph(pageMeta) {
        const ogTags = {
            'og:title': pageMeta.title,
            'og:description': pageMeta.description,
            'og:url': this.siteConfig.baseUrl + window.location.pathname,
            'og:image': this.siteConfig.defaultImage,
            'og:type': 'website',
            'og:site_name': this.siteConfig.siteName
        };
        
        Object.entries(ogTags).forEach(([property, content]) => {
            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('property', property);
                document.head.appendChild(meta);
            }
            meta.content = content;
        });
    }
    
    updateTwitterCards(pageMeta) {
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': pageMeta.title,
            'twitter:description': pageMeta.description,
            'twitter:image': this.siteConfig.defaultImage,
            'twitter:creator': this.siteConfig.twitterHandle,
            'twitter:site': this.siteConfig.twitterHandle
        };
        
        Object.entries(twitterTags).forEach(([name, content]) => {
            let meta = document.querySelector(`meta[name="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = name;
                document.head.appendChild(meta);
            }
            meta.content = content;
        });
    }
    
    setCanonicalURL() {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = this.siteConfig.baseUrl + window.location.pathname;
    }
    
    injectStructuredData() {
        // Breadcrumb Schema
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": this.generateBreadcrumbs()
        };
        
        // Add to page
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(script);
    }
    
    generateBreadcrumbs() {
        const path = window.location.pathname;
        const parts = path.split('/').filter(p => p);
        const breadcrumbs = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": this.siteConfig.baseUrl
            }
        ];
        
        let currentPath = '';
        parts.forEach((part, index) => {
            currentPath += '/' + part;
            const name = this.formatBreadcrumbName(part);
            breadcrumbs.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": name,
                "item": this.siteConfig.baseUrl + currentPath
            });
        });
        
        return breadcrumbs;
    }
    
    formatBreadcrumbName(text) {
        return text
            .replace('.html', '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
}

// Initialize SEO Manager
document.addEventListener('DOMContentLoaded', () => {
    const seoManager = new SEOManager();
    seoManager.init();
});




