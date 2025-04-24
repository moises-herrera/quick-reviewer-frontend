import { CardSkeleton } from './CardSkeleton';

const cards = Array.from({ length: 6 }, (_, i) => i + 1);

export const CardsListSkeleton = () => {
  return cards.map((index) => <CardSkeleton key={index} />);
};
