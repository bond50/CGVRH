exports.generateExcerpt = (htmlText, maxLength) => {
    // Remove HTML tags using a regular expression
    const plainText = htmlText.replace(/<\/?[^>]+(>|$)/g, '');

    // Check if the length is greater than or equal to maxLength
    if (plainText.length >= maxLength) {
        // If yes, return the excerpt with ellipsis
        return `${plainText.substring(0, maxLength)}...`;
    } else {
        // If no, return the plain text
        return plainText;
    }
};