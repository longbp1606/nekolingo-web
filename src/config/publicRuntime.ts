const publicRuntimeConfig = {
    NODE_ENV: import.meta.env.NODE_ENV || 'production',
    API_URL: process.env.VITE_API_URL
};

export default publicRuntimeConfig;