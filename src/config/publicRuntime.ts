const publicRuntimeConfig = {
    NODE_ENV: import.meta.env.NODE_ENV || 'production',
    API_URL: import.meta.env.VITE_API_URL || 'http://api.nekolingo.site'
};

export default publicRuntimeConfig;