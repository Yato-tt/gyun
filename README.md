# Waifu Gallery

Uma aplicação web moderna para navegação e busca de imagens de anime/waifu, construída com React e integrada à API waifu.im.

## 🎯 Sobre o Projeto

Waifu Gallery é uma galeria de imagens responsiva que permite aos usuários explorar, filtrar e salvar imagens de personagens de anime. A aplicação oferece uma experiência fluida com infinite scroll, sistema de tags avançado e interface otimizada para desktop e mobile.

## ✨ Funcionalidades

- **Busca por Tags**: Combine até 2 tags simultaneamente para resultados precisos
- **Filtro SFW/NSFW**: Alterne entre conteúdo seguro e adulto
- **Infinite Scroll**: Carregamento automático de mais imagens ao rolar a página
- **Copiar URL**: Clique em qualquer imagem para copiar o link direto
- **Masonry Layout**: Layout tipo Pinterest com colunas responsivas
- **Preload Otimizado**: Decodificação de imagens antes da renderização
- **Rate Limiting**: Respeita os limites da API (20 req/s)
- **Feedback Visual**: Toasts informativos e loading states

## 🛠️ Tecnologias

- **React** 18.x
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **React Icons** - Ícones
- **React Hot Toast** - Notificações
- **React Masonry CSS** - Layout masonry

## 📡 API

O projeto utiliza a **waifu.im API** como fonte de dados:

- **Endpoint**: `https://api.waifu.im/Images`
- **Documentação**: [waifu.im/docs](https://waifu.im/docs)
- **Rate Limit**: 20 requisições por segundo
- **Features utilizadas**:
  - Filtro por tags (`IncludedTags`)
  - Filtro por tipo (`IsNsfw`)
  - Sistema de paginação

### Por que waifu.im?

- API bem documentada e estável
- Grande variedade de tags e personagens
- Suporte a combinação de múltiplas tags
- Sem necessidade de autenticação
- Rate limits generosos

## 📁 Estrutura do Projeto
```
src/
├── assets/
│   └── imgs/                    # Imagens estáticas (loading, background)
├── components/
│   ├── Button/
│   │   └── Button.jsx          # Botão reutilizável
│   ├── Container/
│   │   └── Container.jsx       # Container modal
│   ├── Galery/
│   │   ├── Galery.jsx          # Wrapper do masonry
│   │   └── Galery.css          # Estilos do masonry
│   ├── Header/
│   │   └── Header.jsx          # Cabeçalho da aplicação
│   ├── ImageGrid/
│   │   └── ImageGrid.jsx       # Grid de imagens com interações
│   └── TagSelector/
│       └── TagSelector.jsx     # Modal de seleção de tags
├── hooks/
│   └── useImageFetch.js        # Hook personalizado para busca de imagens
├── pages/
│   └── Home/
│       └── Home.jsx            # Página principal (orquestração)
├── services/
│   └── api.js                  # Lógica de comunicação com API
├── App.jsx
└── main.jsx
```

## 🏗️ Arquitetura

### Camadas

1. **Services** (`/services`)
   - Comunicação com APIs externas
   - Rate limiting
   - Tratamento de erros
   - Preload de imagens

2. **Hooks** (`/hooks`)
   - Lógica de estado compartilhada
   - Gerenciamento de ciclo de vida
   - Efeitos colaterais

3. **Components** (`/components`)
   - Componentes reutilizáveis
   - UI isolada e testável
   - Sem lógica de negócio

4. **Pages** (`/pages`)
   - Orquestração de componentes
   - Gerenciamento de estado local
   - Coordenação de fluxos

### Fluxo de Dados
```
User Action → Home.jsx → useImageFetch → api.js → waifu.im API
                ↓
           ImageGrid.jsx ← images state
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/waifu-gallery.git

# Entre no diretório
cd waifu-gallery

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

### Build para Produção
```bash
# Gera build otimizado
npm run build

# Preview da build
npm run preview
```

## 🎨 Personalização

### Modificar Tags Disponíveis

Edite `src/components/TagSelector/TagSelector.jsx`:
```javascript
const TAGS = [
  { name: 'Nome da Tag', slug: 'slug-api', nsfw: false },
  // Adicione mais tags aqui
];
```

### Ajustar Rate Limiting

Edite `src/services/api.js`:
```javascript
const RATE_LIMIT_MS = 50; // Altere o intervalo (ms)
```

### Modificar Quantidade de Imagens

Edite `src/hooks/useImageFetch.js`:
```javascript
// Na função fetchBatch, altere o loop
for (let i = 0; i < 6; i++) { // Quantidade por lote
```

## 🔧 Funcionalidades Técnicas

### Rate Limiting

Implementação de controle de taxa para respeitar limites da API:
```javascript
const rateLimit = async () => {
  const elapsed = Date.now() - lastRequest;
  if (elapsed < RATE_LIMIT_MS) {
    await wait(RATE_LIMIT_MS - elapsed);
  }
  lastRequest = Date.now();
};
```

### Preload de Imagens

Decodificação assíncrona antes da renderização para evitar layout shifts:
```javascript
const preloadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = async () => {
      await img.decode();
      resolve(url);
    };
    img.src = url;
  });
};
```

### Infinite Scroll

Detecção de proximidade ao fim da página:
```javascript
if (scrollY + innerHeight >= scrollHeight - 300) {
  loadMore();
}
```

## 📱 Responsividade

- **Mobile**: 2 colunas
- **Tablet (640px+)**: 3 colunas
- **Desktop (768px+)**: 4 colunas
- **Large (1024px+)**: 5 colunas
- **XL (1280px+)**: 6 colunas
- **2XL (1536px+)**: 7 colunas

## 🐛 Troubleshooting

### Imagens não carregam

- Verifique a conexão com a API: `https://api.waifu.im/Images`
- Confirme que não há bloqueio de CORS
- Verifique rate limiting (aguarde alguns segundos)

### Layout quebrado

- Limpe o cache do navegador
- Reinstale dependências: `rm -rf node_modules && npm install`
- Verifique se `react-masonry-css` está instalado

### Performance lenta

- Reduza quantidade de imagens por lote
- Aumente o rate limit delay
- Verifique DevTools > Network para gargalos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abrir um Pull Request

## 👤 Autor

[@Yato-tt](https://github.com/Yato-tt)

## 🙏 Agradecimentos

- [waifu.im](https://waifu.im) pela API gratuita
- Comunidade React por ferramentas incríveis
- [Tailwind CSS](https://tailwindcss.com) por facilitar a estilização

---

⭐ Se este projeto foi útil, considere dar uma estrela!
