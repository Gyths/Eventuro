import app from './app.js';
import { config } from './config/env.js';

app.listen(4000, () => {
  console.log(`Server on port ${config.port}`);
});
