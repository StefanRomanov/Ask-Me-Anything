import User from './User';
import Answer from './Answer';

interface Query {
  id: string;
  title: string;
  description: string;
  score: number;
  tags: string[];
  User: User;
  Answers: Answer[];
}

export default Query;
