export const MONTH = 1000 * 60 * 60 * 24 * 30

export enum CURRENCIES {
    USD = 'usd',
    EUR = 'eur',
    RUB = 'rub',
    CNY = 'cny',
    JPY = 'jpy'
}

export const CURRENCIES_ARR = [
    CURRENCIES.USD,
    CURRENCIES.EUR,
    CURRENCIES.RUB,
    CURRENCIES.CNY,
    CURRENCIES.JPY
]

export const CLIENT_OPTIONS = {
    clientMeta: {
        // Required
        description: 'Wootzapp Mobile app',
        url: 'https://google.com/',
        name: 'Wootzapp',
        ssl: true,
    },
};

export const WALLET_CONNECT_ORIGIN = 'wc::';