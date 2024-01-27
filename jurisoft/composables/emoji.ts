import emojiMap from '../assets/emoji.json';

let emojiReg: null | RegExp = null;
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

const getEmojiReg = () => {
    if (!emojiReg) {
        emojiReg = createRegexp();
    }
    return emojiReg;
};
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