import app from './app.js';
import { config } from './config/env.js';
import './controllers/reminder.controller.js';

app.listen(4000, () => {
  console.log(`Server on port ${config.port}`);
});
