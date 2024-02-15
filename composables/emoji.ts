import emojiMap from '../assets/emoji.json';

let emojiReg: null | RegExp = null;
/**
 * @description Cria uma expressão regular para encontrar emojis
 */
const createRegexp = () => {
    const keys = Object.keys(emojiMap);
    keys.sort(function (a, b) {
        return b.length - a.length;
    });
    keys.forEach(function (item, index, array) {
        array[index] = item.replace(/\*/g, '\\*');
    });
    return new RegExp(`(${keys.join('|')})`, 'g');
};

/**
 * @description Retorna a expressão regular para encontrar emojis
 */
const getEmojiReg = () => {
    if (!emojiReg) {
        emojiReg = createRegexp();
    }
    return emojiReg;
};
/**
 * @description Converte emojis para HTML
 */
const unifiedToHTML = (text = '') => {
    return text.replace(getEmojiReg(), function (_, raw) {
        const [className, ariaLabel] = emojiMap[raw as keyof typeof emojiMap];
        return `<span class="emoji emoji${className}" aria-label="${ariaLabel}" alt="${raw} role="img"></span>`;
    });
};
export function useEmoji() {
    return {
        unifiedToHTML
    }
}