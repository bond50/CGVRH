const replacePlaceholders = (text, replacements) => {
    return text.replace(/\$\{(\w+)\}/g, (match, p1) => replacements[p1] || match);
};

module.exports = { replacePlaceholders };