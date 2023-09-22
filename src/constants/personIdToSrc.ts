import { PersonId } from '@/types';
import { personAvatars } from './userAvatars';

export const personIdToImageSrc: Record<PersonId, string> = {
    teacher: personAvatars.teacher.src,
    dad: personAvatars.dad.src,
    fakeNews: personAvatars.fakeNews.src,
};
