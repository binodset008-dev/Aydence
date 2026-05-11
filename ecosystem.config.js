module.exports = {
  apps: [
    {
      name: 'aydence',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 'max', // Use 'max' to use all available CPU cores, or set a number (e.g., 4)
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
      }
    },
  ],
};
