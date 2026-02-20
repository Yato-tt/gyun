import { useState, useRef } from 'react';
import { fetchImage, preloadImage } from '../services/api';

export const useImageFetch = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const currentSearchRef = useRef({ type: '', tags: [] });
  const isLoadingRef = useRef(false);

  const fetchBatch = async (isNsfw, tags, existingImages) => {
    const imageSet = new Set(existingImages);
    const newImages = [];

    for (let i = 0; i < 6; i++) {
      if (currentSearchRef.current.type !== (isNsfw ? 'nsfw' : 'sfw') ||
          JSON.stringify(currentSearchRef.current.tags) !== JSON.stringify(tags)) {
        break;
      }

      const url = await fetchImage(isNsfw, tags);

      if (url && !imageSet.has(url)) {
        imageSet.add(url);
        newImages.push(url);
      }
    }

    if (newImages.length > 0) {
      const preloaded = await Promise.all(
        newImages.map(url => preloadImage(url))
      );
      return preloaded.filter(Boolean);
    }

    return [];
  };

  const loadWaves = async (waveCount, isNsfw, tags, append = false) => {
    if (isLoadingRef.current) return { success: false, count: 0 };

    isLoadingRef.current = true;

    let accumulated = append ? [...images] : [];
    let totalLoaded = 0;

    for (let i = 0; i < waveCount; i++) {
      if (currentSearchRef.current.type !== (isNsfw ? 'nsfw' : 'sfw') ||
          JSON.stringify(currentSearchRef.current.tags) !== JSON.stringify(tags)) {
        break;
      }

      const batch = await fetchBatch(isNsfw, tags, accumulated);

      if (batch.length > 0) {
        accumulated = [...accumulated, ...batch];
        setImages(accumulated);
        totalLoaded += batch.length;

        if (i === 0 && !append) {
          setLoading(false);
        }
      } else {
        if (totalLoaded === 0 && !append) {
          isLoadingRef.current = false;
          return { success: false, count: 0 };
        }
        break;
      }
    }

    isLoadingRef.current = false;
    return { success: true, count: totalLoaded };
  };

  const search = async (isNsfw, tags) => {
    if (loading || loadingMore) return;

    setLoading(true);
    setImages([]);
    isLoadingRef.current = false;

    currentSearchRef.current = {
      type: isNsfw ? 'nsfw' : 'sfw',
      tags
    };

    const result = await loadWaves(4, isNsfw, tags, false);
    setLoading(false);

    return result;
  };

  const loadMore = async (isNsfw, tags) => {
    if (loading || loadingMore || images.length === 0) return;

    if (currentSearchRef.current.type !== (isNsfw ? 'nsfw' : 'sfw') ||
        JSON.stringify(currentSearchRef.current.tags) !== JSON.stringify(tags)) {
      return;
    }

    setLoadingMore(true);
    const result = await loadWaves(2, isNsfw, tags, true);
    setLoadingMore(false);

    return result;
  };

  const clear = () => {
    setImages([]);
    isLoadingRef.current = false;
  };

  return {
    images,
    loading,
    loadingMore,
    search,
    loadMore,
    clear
  };
};
