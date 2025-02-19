import { Handler } from '@netlify/functions';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export const handler: Handler = async (event) => {
  const contentType = event.path.split('/')[2]; // blog or properties
  const contentDir = join(process.cwd(), 'content', contentType);

  try {
    const files = readdirSync(contentDir);
    const content = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const fileContent = readFileSync(join(contentDir, file), 'utf8');
        const { data, content } = matter(fileContent);
        return {
          ...data,
          body: content,
          slug: file.replace('.md', '')
        };
      });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(content)
    };
  } catch (error) {
    console.error('Error loading content:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load content' })
    };
  }
};