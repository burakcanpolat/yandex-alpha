import FirecrawlApp from '@mendable/firecrawl-js';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

class FirecrawlTool {
    constructor() {
        const apiKey = process.env.FIRECRAWL_API_KEY;
        if (!apiKey) {
            throw new Error('FIRECRAWL_API_KEY is not set in environment variables');
        }
        this.app = new FirecrawlApp({ apiKey });
    }

    async getWebsiteContent(url) {
        try {
            console.log('Sending request to Firecrawl...');
            
            const scrapeResult = await this.app.scrapeUrl(url, {
                formats: ['markdown']
            });

            if (!scrapeResult.success) {
                throw new Error(`Failed to scrape: ${scrapeResult.error}`);
            }

            return scrapeResult;
        } catch (error) {
            console.error('Error fetching website content:', error.message);
            if (error.response) {
                console.error('Response details:', error.response);
            }
            throw error;
        }
    }

    async saveContentToMarkdown(url, outputPath) {
        try {
            const result = await this.getWebsiteContent(url);

            // Create filename from URL
            const urlObj = new URL(url);
            const filename = `${urlObj.hostname}${urlObj.pathname.replace(/\//g, '_')}.md`;
            const fullPath = outputPath ? path.join(outputPath, filename) : filename;

            // Extract content and metadata from the response
            const metadata = {
                title: result.metadata?.title || 'Untitled',
                url: url,
                date: new Date().toISOString(),
                source_url: result.metadata?.sourceURL || url
            };

            // Prepare markdown content with YAML frontmatter
            const markdownContent = [
                '---',
                Object.entries(metadata)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join('\n'),
                '---\n',
                result.markdown || ''  // The markdown content is directly in the root
            ].join('\n');

            // Ensure directory exists
            if (outputPath) {
                await fs.mkdir(outputPath, { recursive: true });
            }

            // Save the file
            await fs.writeFile(fullPath, markdownContent);
            return fullPath;
        } catch (error) {
            console.error('Error saving markdown content:', error.message);
            throw error;
        }
    }
}

// Create and export a single instance
const firecrawlTool = new FirecrawlTool();
export default firecrawlTool; 