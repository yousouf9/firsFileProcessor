module.exports = {
  apps: [
    {
      name: "FIRS-TAX-FILE-READER",
      script: "./bin/www",
      instances: "1",
      autorestart: true,
      watch: true,
      watch_delay:1000,
      ignore_watch:['node_modules', 'uncaughtExceptions.log'],
      max_memory_restart: "1G",
      exec_mode: "fork",
      instance_var: "INSTANCE_ID"
    }
  ]
};
