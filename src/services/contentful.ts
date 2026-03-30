import { createClient } from 'contentful';

const SPACE_ID = '2zjtbgyxzsdf';
const ACCESS_TOKEN = '2zjtbgyxzsdf';
const CONTENT_TYPE = 'article';

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: any; // Rich text
  image: string;
  date: string;
}

export const getArticles = async (locale: string = 'fr'): Promise<Article[]> => {
  try {
    console.log(`Fetching articles from Contentful with locale: ${locale}...`);
    const response: any = await client.getEntries({
      content_type: CONTENT_TYPE,
      order: ['-sys.createdAt'],
      include: 2,
      locale: locale,
    });

    const assets = response.includes?.Asset || [];
    console.log(`Found ${response.items.length} articles and ${assets.length} assets.`);

    return response.items.map((item: any) => {
      const assetId = item.fields.imageDeUne?.sys?.id;
      if (!assetId) {
        console.warn(`Article "${item.fields.title}" has no imageDeUne field or sys.id.`);
      }

      const asset = assets.find((a: any) => a.sys.id === assetId);
      if (assetId && !asset) {
        console.error(`Asset with ID ${assetId} not found in includes.Asset for article "${item.fields.title}".`);
      }

      const rawUrl = asset?.fields?.file?.url;
      if (asset && !rawUrl) {
        console.error(`Asset ${assetId} found but has no file.url for article "${item.fields.title}".`);
      }

      const imageUrl = rawUrl ? (rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl) : '';
      const optimizedUrl = imageUrl ? `${imageUrl}?fm=webp&q=85` : '';

      return {
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        category: item.fields.category || 'Culture',
        excerpt: item.fields.excerpt || '',
        content: item.fields.content,
        image: optimizedUrl,
        date: item.sys.createdAt,
      };
    });
  } catch (error) {
    console.error('CRITICAL CONTENTFUL ERROR:', error);
    // Log specific details if available
    if (error && typeof error === 'object' && 'message' in error) {
      console.error('Error Message:', (error as any).message);
    }
    // Fallback mock data for demonstration if API fails
    return [
      {
        id: '1',
        title: 'Les secrets d\'Allauch : Un village perché entre ciel et mer',
        slug: 'secrets-allauch',
        category: 'Culture',
        excerpt: 'Découvrez l\'histoire fascinante de ce village provençal authentique, ses traditions et ses panoramas à couper le souffle.',
        content: null,
        image: 'https://picsum.photos/seed/allauch/1200/800',
        date: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Randonnée dans les Calanques de Marseille',
        slug: 'randonnee-calanques',
        category: 'Nature',
        excerpt: 'Un guide complet pour explorer les sentiers sauvages et les eaux turquoise du parc national.',
        content: null,
        image: 'https://picsum.photos/seed/calanques/800/600',
        date: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '3',
        title: 'La gastronomie provençale : Plus qu\'un repas, un art de vivre',
        slug: 'gastronomie-provence',
        category: 'Gastronomie',
        excerpt: 'De l\'huile d\'olive aux herbes de Provence, plongez dans les saveurs qui font la renommée de notre région.',
        content: null,
        image: 'https://picsum.photos/seed/food/800/600',
        date: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: '4',
        title: 'Les champs de lavande en fleurs à Valensole',
        slug: 'lavande-valensole',
        category: 'Nature',
        excerpt: 'Le spectacle éphémère du plateau de Valensole, une mer de violet à perte de vue.',
        content: null,
        image: 'https://picsum.photos/seed/lavender/800/600',
        date: new Date(Date.now() - 259200000).toISOString(),
      }
    ];
  }
};

export const getArticleBySlug = async (slug: string, locale: string = 'fr'): Promise<Article | null> => {
  try {
    console.log(`Fetching article with slug: ${slug} and locale: ${locale}...`);
    const response: any = await client.getEntries({
      content_type: CONTENT_TYPE,
      'fields.slug': slug,
      limit: 1,
      include: 2,
      locale: locale,
    });

    if (response.items.length > 0) {
      const item: any = response.items[0];
      const assets = response.includes?.Asset || [];
      const assetId = item.fields.imageDeUne?.sys?.id;
      const asset = assets.find((a: any) => a.sys.id === assetId);
      const rawUrl = asset?.fields?.file?.url;
      
      if (!rawUrl) {
        console.error(`Image not found for article: ${item.fields.title}. Asset ID: ${assetId}`);
      }

      const imageUrl = rawUrl ? (rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl) : '';
      const optimizedUrl = imageUrl ? `${imageUrl}?fm=webp&q=85` : '';

      return {
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        category: item.fields.category || 'Culture',
        excerpt: item.fields.excerpt || '',
        content: item.fields.content,
        image: optimizedUrl,
        date: item.sys.createdAt,
      };
    }
    
    // Fallback mock data if slug matches our mock
    const articles = await getArticles();
    return articles.find(a => a.slug === slug) || null;
  } catch (error) {
    console.error('CRITICAL CONTENTFUL ERROR (Slug):', error);
    const articles = await getArticles();
    return articles.find(a => a.slug === slug) || null;
  }
};
