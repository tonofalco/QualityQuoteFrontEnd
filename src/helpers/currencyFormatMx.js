

export const currencyFormatMx = (value) =>
    parseFloat(value).toLocaleString(
        'es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

