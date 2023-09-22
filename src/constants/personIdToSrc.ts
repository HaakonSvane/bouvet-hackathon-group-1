import { PersonId } from '@/types';
import { userAvatars } from './userAvatars';

export const personIdToImageSrc: Record<PersonId, string> = {
    teacher: userAvatars.user1.src,
};
