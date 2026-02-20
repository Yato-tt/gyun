const BASE_URL = 'https://api.waifu.im/Images';
const RATE_LIMIT_MS = 50;
let lastRequest = 0;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const rateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequest;

  if (timeSinceLastRequest < RATE_LIMIT_MS) {
    await wait(RATE_LIMIT_MS - timeSinceLastRequest);
  }

  lastRequest = Date.now();
};

export const fetchImage = async (isNsfw, tags = []) => {
  await rateLimit();

  const params = new URLSearchParams();

  tags.forEach(tag => params.append('IncludedTags', tag));
  if (isNsfw) params.append('IsNsfw', 'True');

  try {
    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) return null;

    const data = await response.json();
    return data?.items?.[0]?.url || null;
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

export const preloadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = async () => {
      try {
        await img.decode();
        resolve(url);
      } catch {
        resolve(url);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};
