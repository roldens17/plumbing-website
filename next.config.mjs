const nextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ],
  turbopack: {
    root: new URL(".", import.meta.url).pathname,
  },
};

export default nextConfig;
