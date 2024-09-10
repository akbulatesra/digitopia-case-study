import { useMemo } from 'react';

interface UseGenerateColorFromLengthProps {
  length: number | undefined;
  minColor: number;
  maxColor: number;
}

export const useGenerateColorFromLength = ({
  length,
  minColor,
  maxColor,
}: UseGenerateColorFromLengthProps) => {
  return useMemo(() => {
    if (length === undefined || length <= 0) {
      return [];
    }

    const colors = [];
    for (let i = 0; i < length; i++) {
      const ratio = i / (length - 1);

      const r = Math.round(
        ((minColor >> 16) & 0xff) * (1 - ratio) +
          ((maxColor >> 16) & 0xff) * ratio
      );
      const g = Math.round(
        ((minColor >> 8) & 0xff) * (1 - ratio) +
          ((maxColor >> 8) & 0xff) * ratio
      );
      const b = Math.round(
        (minColor & 0xff) * (1 - ratio) + (maxColor & 0xff) * ratio
      );

      colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colors;
  }, [length, minColor, maxColor]);
};
