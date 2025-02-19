const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

exports.handler = async (event) => {
  const contentType = event.path.split('/')[2]; // blog or properties
  const contentDir = path.join(__dirname, '..', 'content', contentType);

  try {
    const files = fs.readdirSync(contentDir);
    const content = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const fileContent = fs.readFileSync(path.join(contentDir, file), 'utf8');
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load content' })
    };
  }
};