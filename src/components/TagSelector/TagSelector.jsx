import React from 'react';
import Container from '../Container/Container';

const TAGS = [
  { name: 'Genshin Impact', slug: 'genshin-impact', nsfw: false },
  { name: 'Kamisato Ayaka', slug: 'kamisato-ayaka', nsfw: false },
  { name: 'Maid', slug: 'maid', nsfw: false },
  { name: 'Marin Kitagawa', slug: 'marin-kitagawa', nsfw: false },
  { name: 'Mori Calliope', slug: 'mori-calliope', nsfw: false },
  { name: 'Raiden Shogun', slug: 'raiden-shogun', nsfw: false },
  { name: 'Selfies', slug: 'selfies', nsfw: false },
  { name: 'Uniform', slug: 'uniform', nsfw: false },
  { name: 'Waifu', slug: 'waifu', nsfw: false },
  { name: 'Ass', slug: 'ass', nsfw: true },
  { name: 'Ecchi', slug: 'ecchi', nsfw: true },
  { name: 'Ero', slug: 'ero', nsfw: true },
  { name: 'Hentai', slug: 'hentai', nsfw: true },
  { name: 'MILF', slug: 'milf', nsfw: true },
  { name: 'Oppai', slug: 'oppai', nsfw: true },
  { name: 'Oral', slug: 'oral', nsfw: true },
  { name: 'Paizuri', slug: 'paizuri', nsfw: true }
];

const MAX_SELECTIONS = 2;

function TagSelector({ isNsfw, selectedTags, onTagToggle, onClose }) {
  const visibleTags = isNsfw ? TAGS : TAGS.filter(tag => !tag.nsfw);

  const handleToggle = (slug) => {
    if (selectedTags.includes(slug)) {
      onTagToggle(slug);
    } else if (selectedTags.length < MAX_SELECTIONS) {
      onTagToggle(slug);
    }
  };

  return (
    <div className="fixed inset-0 flex items-end justify-end bg-black/30 z-15">
      <Container title="Tags">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {visibleTags.map((tag) => {
            const isSelected = selectedTags.includes(tag.slug);
            const isDisabled = selectedTags.length >= MAX_SELECTIONS && !isSelected;

            return (
              <label
                key={tag.slug}
                className={`cursor-pointer flex items-center gap-2 p-2 rounded transition-all ${
                  isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  value={tag.slug}
                  checked={isSelected}
                  onChange={() => handleToggle(tag.slug)}
                  disabled={isDisabled}
                  className="w-4 h-4 accent-pink-600 disabled:cursor-not-allowed"
                />
                <span className="text-sm md:text-base">{tag.name}</span>
              </label>
            );
          })}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          {selectedTags.length}/{MAX_SELECTIONS} tags selecionadas
        </div>
      </Container>
    </div>
  );
}

export default TagSelector;
