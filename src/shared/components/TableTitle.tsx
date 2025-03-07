import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export interface TableTitleProps {
  title: string;
}

export const TableTitle: FC<TableTitleProps> = ({ title }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/accounts');
    }
  };

  return (
    <div className="flex items-center gap-x-3 mb-4">
      <Button variant="ghost" size="icon" onClick={goBack}>
        <ArrowLeft />
      </Button>

      <h2 className="text-2xl font-semibold truncate">{title}</h2>
    </div>
  );
};
