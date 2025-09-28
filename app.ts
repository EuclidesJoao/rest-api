import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Skywalker Backend is running!' });
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default app;