import { Handler } from '@netlify/functions';
import { syncProperties } from '../../src/lib/services/propertySync';

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    await syncProperties();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Properties synchronized successfully' })
    };
  } catch (error) {
    console.error('Error in sync-properties function:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to synchronize properties' })
    };
  }
};