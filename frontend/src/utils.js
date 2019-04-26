function formatPrice(price) {
    let decimalPlaces = 2;
    const num = parseFloat(price.amount + '.' + price.decimals);
    if (price.decimals === 0) {
        decimalPlaces = 0;
    }
    return price.currency + ' ' + num.toFixed(decimalPlaces).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export { formatPrice };