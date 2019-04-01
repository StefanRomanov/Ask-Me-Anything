import User from './User';

interface Answer {
  id: number;
  text: string;
  user: User;
  dateAdded: Date;
  score: number;
}

export default Answer;
