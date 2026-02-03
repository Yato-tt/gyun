import React, { useState } from 'react';
import { FaPlus, FaSearch, FaWindowClose } from 'react-icons/fa';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Galery from '../../components/Galery/Galery';

import waifuLoad from '../../assets/imgs/oppais-loading.gif'

function Home() {
  const [viewModal, setViewModal] = useState(false);
  const [tipo, setTipo] = useState('sfw'); // 'sfw' ou 'nsfw'
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('waifu');
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false); // novo estado de loading

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
    setCategoriaSelecionada(categorias[0]); // reset categoria
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

  const buscaWaifus = async () => {
    setLoading(true);
    setImagens([]);

    const requests = Array(24).fill().map(() => fetchWaifus(tipo, categoriaSelecionada));

    for await (const result of requests) {
      if (result) {
        setImagens(prev => [...prev, result]);
      }
    }

    // const results = await Promise.all(requests);
    // setImagens(results.filter(Boolean));

    setLoading(false);
  };

  return (
    <>
      <Header />

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-3">
          <div className="text-white text-2xl animate-pulse"><img className='w-64 h-64 rounded-2xl animate-bounce' src={waifuLoad} alt="Carregando" /></div>
        </div>
      )}

      <Galery>
        {imagens.map((image, index) => (
          <div key={index} className="mb-4 break-inside-avoid bg-gray-50 rounded-2xl overflow-hidden">
            <img src={image} alt={`Imagem ${index}`} className="w-full h-auto rounded-2xl object-cover" />
          </div>
        ))}
      </Galery>

      {viewModal && (
        <div className="fixed inset-0 flex items-end justify-end bg-black/30 z-3 transition-opacity duration-300">
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

      {/* Botões */}
      <Button
        className="fixed bottom-14 right-0 z-4 p-4 m-4 rounded-full text-cyan-50 bg-lime-900"
        onClick={buscaWaifus}
        title={<FaSearch size={16} />}
      />

      <Button
        className="fixed bottom-0 right-0 z-4 p-4 m-4 rounded-full text-cyan-50 bg-amber-300"
        onClick={handleModal}
        title={viewModal ? <FaWindowClose size={16} /> : <FaPlus size={16} />}
      />

      <Button
        className="fixed bottom-0 right-14 z-4 p-2 m-4 rounded-full text-cyan-50 bg-pink-600"
        onClick={handleTipo}
        title={tipo.toUpperCase()}
      />
    </>
  );
}

export default Home;
