import User from './User';

interface Answer {
  id: number;
  content: string;
  User: User;
  dateAdded: Date;
  score: number;
}

export default Answer;
