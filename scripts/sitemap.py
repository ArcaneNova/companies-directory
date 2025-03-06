from datetime import datetime
import os

# Configuration
BASE_URL = "https://mycompanydirectory.net"
OUTPUT_DIR = "public"
current_date = datetime.now().strftime("%Y-%m-%d")

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Generate sitemap.xml
with open(os.path.join(OUTPUT_DIR, "sitemap.xml"), "w", encoding="utf-8") as f:
    # XML header and opening tags
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n')
    f.write('        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n')
    f.write('        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n')
    f.write('        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n')
    
    # Add static sitemap
    f.write('    <url>\n')
    f.write(f'        <loc>{BASE_URL}/sitemaps/sitemap-static.xml</loc>\n')
    f.write(f'        <lastmod>{current_date}</lastmod>\n')
    f.write('        <changefreq>weekly</changefreq>\n')
    f.write('        <priority>1.0</priority>\n')
    f.write('    </url>\n')
    
    # Add sitemap index
    f.write('    <url>\n')
    f.write(f'        <loc>{BASE_URL}/sitemaps/sitemap-index.xml</loc>\n')
    f.write(f'        <lastmod>{current_date}</lastmod>\n')
    f.write('        <changefreq>daily</changefreq>\n')
    f.write('        <priority>0.8</priority>\n')
    f.write('    </url>\n')
    
    # Add company sitemaps
    for i in range(1, 53):
        f.write('    <url>\n')
        f.write(f'        <loc>{BASE_URL}/sitemaps/sitemap-companies-{i}.xml</loc>\n')
        f.write(f'        <lastmod>{current_date}</lastmod>\n')
        f.write('        <changefreq>daily</changefreq>\n')
        f.write('        <priority>0.8</priority>\n')
        f.write('    </url>\n')
    
    # Close root element
    f.write('</urlset>\n')

print(f"Successfully generated sitemap.xml in {OUTPUT_DIR} directory!")