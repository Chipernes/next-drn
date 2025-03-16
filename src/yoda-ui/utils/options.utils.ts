import { MultiSelectIdsType, SelectOption } from 'basics/options/options.types';

export const findOptionById = (options: SelectOption[], id: string | number) => {
  if (!id) return null;
  return options.find((option) => option.id === id) || null;
};

export const findMultipleOptionsByIds = (
  freeOption: boolean,
  options: SelectOption[],
  idsList?: MultiSelectIdsType,
): SelectOption[] => {
  const allOptions: SelectOption[] = [];
  if (idsList && idsList.length > 0) {
    idsList.forEach((id) => {
      if (typeof id === 'string' || typeof id === 'number') {
        const optionFound = findOptionById(options as SelectOption[], id);
        if (optionFound) {
          allOptions.push(optionFound);
        } else if (freeOption) {
          allOptions.push({ id, label: id.toString() });
        }
      } else {
        allOptions.push(id);
      }
    });
  }
  return allOptions;
};

export const mapToSelectOptions = (data: string[]) => data.map((option) => ({ id: option, label: option }));
