export const formatDate = (dateToFormat: Date | string): string => {
  return new Date(dateToFormat).toDateString();
};

export const parseDateFilter = (date: Date | string): string => {
  if (typeof date === 'string' && isNaN(Date.parse(date))) {
    return '';
  }

  return new Date(date).toISOString().split('T')[0];
};

export const getDateWithBaseTime = (date: Date | string): Date => {
  const parsedDate = parseDateFilter(date);
  return new Date(`${parsedDate}T00:00:00`);
};
