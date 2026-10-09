import * as migration_20250509_195711 from './20250509_195711';

export const migrations = [
  {
    up: migration_20250509_195711.up,
    down: migration_20250509_195711.down,
    name: '20250509_195711'
  },
];
