import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';

const server = new ApolloServer({
  schema,
  context: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NjM4MTY5fQ.2InwTQe1g22H1q_LIpL1agqb61fiQViNI_WyLbl_1Jg',
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`🚀 Server is running on http://localhost:${PORT}/ ✅`))
  .catch(console.error);
