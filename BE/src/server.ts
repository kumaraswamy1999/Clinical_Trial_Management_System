import app from "./app";
import { env } from "./config/envConfig";

// Load environment variables from .env file
const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
