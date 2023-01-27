module.exports = {
  apps: [
    {
      script: 'npm start',
    },
  ],

  deploy: {
    production: {
      user: 'demi',
      host: '178.33.69.73',
      ref: 'origin/master',
      repo: 'https://github.com/demirepo/sbor.git',
      path: 'home/demi/web/sbor.e-petrunin.ru/public_html',
      'pre-deploy-local': '',
      'post-deploy':
        'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      ssh_options: 'ForwardAgent=yes',
    },
  },
};
