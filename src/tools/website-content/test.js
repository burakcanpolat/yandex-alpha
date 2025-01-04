import firecrawlTool from './index.js';

async function testFirecrawl() {
    try {
        const testUrl = 'https://blog.inekle.com/bilimin-dehalarindan-albert-einstein/';
        console.log(`Testing Firecrawl for URL: ${testUrl}\n`);
        
        // Save to markdown
        console.log('Scraping and saving content...');
        const outputDir = './scraped_content';
        const savedPath = await firecrawlTool.saveContentToMarkdown(testUrl, outputDir);
        console.log(`Content saved to: ${savedPath}\n`);

        // Read and verify the saved file
        const savedContent = await import('fs').then(fs => fs.promises.readFile(savedPath, 'utf8'));
        console.log('Saved content preview (first 500 chars):');
        console.log('------------------------');
        console.log(savedContent.substring(0, 500), '...\n');

    } catch (error) {
        console.error('\nError occurred:', error.message);
        if (error.response) {
            console.error('Response error:', {
                status: error.response.status,
                data: error.response.data
            });
        }
    }
}

testFirecrawl(); 