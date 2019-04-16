import User from './User';
import Answer from './Answer';

interface Query {
    id: string;
    title: string;
    description: string;
    solved: boolean;
    score: number;
    tags: string[];
    isLiked: boolean;
    isDisliked: boolean;
    isOwner: boolean;
    createdAt: Date;
    updatedAt: Date;
    User: User;
    totalAnswerCount: number;
    Answers: Answer[];
}

export default Query;
