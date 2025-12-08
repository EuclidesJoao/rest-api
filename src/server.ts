import app from "./app";
import dotenv from 'dotenv';
import { openSwaggerOnce } from "./infrastructure/utils/open-swagger";
dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/docs`);
  //openSwaggerOnce(`http://localhost:${PORT}/api-docs`);
})