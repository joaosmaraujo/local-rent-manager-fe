module.exports = {
    transpileDependencies: ['vuetify'],
    publicPath: process.env.NODE_ENV === 'production'
    ? '/local-rent-manager-fe/'
    : '/'
};
