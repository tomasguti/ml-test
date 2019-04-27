import sanitizeHtml from 'sanitize-html';
import QueryString from 'query-string';

/**
 * Transforms a price object into a readable string.
 * @param {Object} price from the backend
 * @param {boolean} includeDecimals includes the decimal values
 * @return {String} the formatted price in spanish notation
 */
function formatPrice(price, includeDecimals) {
    if (!price.amount) return '';

    let num;
    if (includeDecimals) {
        num = parseFloat(price.amount + ',' + price.decimals).toFixed();
    } else {
        num = price.amount.toFixed(0);
    }

    const humanNotation = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return price.currency + ' ' + humanNotation;
}

/**
 * Decodes and sanitizes the search input.
 * @param {P} props the React Component properties
 */
function parseSearch(props) {
    const parsed = QueryString.parse(props.location.search);
    let sanitized;
    if (parsed.search) {
        sanitized = sanitizeHtml(parsed.search, { allowedTags: [], allowedAttributes: {} });
    }
    return sanitized ? sanitized : '';
}

export { formatPrice, parseSearch };