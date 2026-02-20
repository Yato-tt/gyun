import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaWindowClose } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import TagSelector from '../../components/TagSelector/TagSelector';
import { useImageFetch } from '../../hooks/useImageFetch';

import waifuLoad from '../../assets/imgs/oppais-loading.gif';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isNsfw, setIsNsfw] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const { images, loading, loadingMore, search, loadMore, clear } = useImageFetch();

  const handleTypeToggle = () => {
    setIsNsfw(prev => !prev);
    setSelectedTags([]);
    clear();
  };

  const handleTagToggle = (slug) => {
    setSelectedTags(prev =>
      prev.includes(slug)
        ? prev.filter(t => t !== slug)
        : prev.length < 2
          ? [...prev, slug]
          : prev
    );

    if (selectedTags.length >= 2 && !selectedTags.includes(slug)) {
      toast.error('Máximo de 2 tags permitidas', {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  const handleSearch = async () => {
    const result = await search(isNsfw, selectedTags);

    if (!result.success) {
      toast.error('Nenhuma imagem encontrada para esta busca', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return true;
      } catch {
        toast.error('Não foi possível copiar');
        return false;
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;

      if (scrollY + innerHeight >= scrollHeight - 300) {
        if (images.length > 0 && !loadingMore && !loading) {
          loadMore(isNsfw, selectedTags).then(result => {
            if (result && !result.success && result.count === 0) {
              toast('Não há mais imagens para esta combinação de tags', {
                icon: 'ℹ️',
                duration: 3000,
                position: 'bottom-center',
                style: {
                  background: '#3b82f6',
                  color: '#fff',
                },
              });
            }
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [images.length, loadingMore, loading, isNsfw, selectedTags, loadMore]);

  return (
    <div className="min-h-screen">
      <Toaster />
      <Header />

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
          <img
            className="w-64 h-64 rounded-2xl animate-bounce"
            src={waifuLoad}
            alt="Loading"
          />
        </div>
      )}

      {loadingMore && !loading && (
        <div className="fixed bottom-32 right-4 z-10">
          <div className="bg-lime-900 rounded-full p-3 shadow-lg">
            <div className="w-6 h-6 border-4 border-cyan-50 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      <ImageGrid images={images} onCopy={handleCopy} />

      {showModal && (
        <TagSelector
          isNsfw={isNsfw}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClose={() => setShowModal(false)}
        />
      )}

      <Button
        className="fixed bottom-14 right-0 z-18 p-4 m-4 rounded-full text-cyan-50 bg-lime-900"
        onClick={handleSearch}
        title={<FaSearch size={16} />}
      />

      <Button
        className="fixed bottom-0 right-0 z-18 p-4 m-4 rounded-full text-cyan-50 bg-amber-300"
        onClick={() => setShowModal(prev => !prev)}
        title={showModal ? <FaWindowClose size={16} /> : <FaPlus size={16} />}
      />

      <Button
        className="fixed bottom-0 right-14 z-18 p-2 m-4 rounded-full text-cyan-50 bg-pink-600"
        onClick={handleTypeToggle}
        title={isNsfw ? 'NSFW' : 'SFW'}
      />
    </div>
  );
}

export default Home;
