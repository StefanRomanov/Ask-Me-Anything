import User from './User';

interface Answer {
    id: string;
    content: string;
    isLiked: boolean;
    isDisliked: boolean;
    isOwner: boolean;
    User: User;
    createdAt: Date;
    updatedAt: Date;
    score: number;
}

export default Answer;
