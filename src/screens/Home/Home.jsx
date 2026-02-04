import React, { useState } from 'react';
import { FaPlus, FaSearch, FaWindowClose, FaCopy } from 'react-icons/fa';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Galery from '../../components/Galery/Galery';

import waifuLoad from '../../assets/imgs/oppais-loading.gif'

function Home() {
  const [viewModal, setViewModal] = useState(false);
  const [tipo, setTipo] = useState('sfw');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('waifu');
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [copiado, setCopiado] = useState(null);

  const nsfw = ['waifu', 'neko', 'trap', 'blowjob'];
  const sfw = [
    'waifu','neko','shinobu','megumin','bully','cuddle','cry','hug','awoo',
    'kiss','lick','pat','smug','bonk','yeet','blush','smile','wave','highfive',
    'handhold','nom','bite','glomp','slap','kill','kick','happy','wink','poke',
    'dance','cringe'
  ];

  const categorias = tipo === 'sfw' ? sfw : nsfw;

  const handleModal = () => setViewModal(!viewModal);
  const handleTipo = () => {
    setTipo(tipo === 'sfw' ? 'nsfw' : 'sfw');
    setCategoriaSelecionada(categorias[0]);
  };

  async function fetchWaifus(tipo, categoria) {
    try {
      const response = await fetch(`https://api.waifu.pics/${tipo}/${categoria}`);
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      return data.url;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // Função para copiar imagem
  const copiarImagem = async (url, index) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(index);
      setTimeout(() => setCopiado(null), 2000);
    } catch (error) {
      console.log('Erro ao copiar:', error);
      // Fallback para mobile
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiado(index);
        setTimeout(() => setCopiado(null), 2000);
      } catch (e) {
        alert('Não foi possível copiar');
      }
    }
  };

  const buscaWaifus = async () => {
    setLoading(true);
    setLoadingMore(true);
    setImagens([]);

    const oneWaifu = new Set();
    let carregados = 0;

    const requests = Array(24).fill().map(() => fetchWaifus(tipo, categoriaSelecionada));

    requests.forEach(async (promise) => {
      try {
        const result = await promise;

        if (result && !oneWaifu.has(result)) {
          oneWaifu.add(result);
          setImagens(prev => [...prev, result]);
          carregados++;

          if (carregados === 6) {
            setLoading(false);
          }

          if (carregados === 24) {
            setLoadingMore(false);
          }
        }
      } catch (error) {
        console.log('Erro ao carregar imagem:', error);
      }
    });

    setTimeout(() => {
      setLoadingMore(false);
    }, 10000);
  };

  return (
    <>
      <Header />

      {/* Loading inicial (tela cheia) - Z-INDEX AJUSTADO */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
          <div className="text-white text-2xl animate-pulse">
            <img className='w-64 h-64 rounded-2xl animate-bounce' src={waifuLoad} alt="Carregando" />
          </div>
        </div>
      )}

      {/* Loading pequeno (canto da tela) */}
      {loadingMore && !loading && (
        <div className="fixed bottom-32 right-4 z-[100]">
          <div className="bg-lime-900 rounded-full p-3 shadow-lg">
            <div className="w-6 h-6 border-4 border-cyan-50 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <Galery>
        {imagens.map((image, index) => (
          <div
            key={index}
            className="mb-4 break-inside-avoid bg-gray-50 rounded-2xl overflow-hidden relative group cursor-pointer"
            onClick={() => copiarImagem(image, index)}
          >
            <img
              src={image}
              alt={`Imagem ${index}`}
              className="w-full h-auto rounded-2xl object-cover"
            />

            {/* Botão de copiar (desktop: hover | mobile: sempre visível com opacidade) */}
            <div className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full md:opacity-0 md:group-hover:opacity-100 opacity-70 transition-opacity duration-200 pointer-events-none">
              <FaCopy size={16} />
            </div>

            {/* Feedback de copiado */}
            {copiado === index && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 animate-fadeIn">
                <div className="bg-green-500 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-lg">
                  ✓ Copiado!
                </div>
              </div>
            )}
          </div>
        ))}
      </Galery>

      {viewModal && (
        <div className="fixed inset-0 flex items-end justify-end bg-black/30 z-[60] transition-opacity duration-300">
          <Container title="Categoria" className="transform translate-y-0 transition-transform duration-300">
            {categorias.map((cat) => (
              <label
                key={cat}
                className="cursor-pointer sm:text-xl md:text-base lg:text-2xl flex items-center gap-2"
              >
                <input
                  type="radio"
                  name="categoria"
                  value={cat}
                  checked={categoriaSelecionada === cat}
                  onChange={(e) => setCategoriaSelecionada(e.target.value)}
                />
                {cat}
              </label>
            ))}
          </Container>
        </div>
      )}

      {/* Botões - Z-INDEX AJUSTADO */}
      <Button
        className="fixed bottom-14 right-0 z-[70] p-4 m-4 rounded-full text-cyan-50 bg-lime-900"
        onClick={buscaWaifus}
        title={<FaSearch size={16} />}
      />

      <Button
        className="fixed bottom-0 right-0 z-[70] p-4 m-4 rounded-full text-cyan-50 bg-amber-300"
        onClick={handleModal}
        title={viewModal ? <FaWindowClose size={16} /> : <FaPlus size={16} />}
      />

      <Button
        className="fixed bottom-0 right-14 z-[70] p-2 m-4 rounded-full text-cyan-50 bg-pink-600"
        onClick={handleTipo}
        title={tipo.toUpperCase()}
      />
    </>
  );
}

export default Home;
