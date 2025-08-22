export interface PluralForms {
  one: string;
  few: string;
  many: string;
}

export const pluralize = (count: number, forms: PluralForms): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return `${count} ${forms.many}`;
    }

    if (lastDigit === 1) {
        return `${count} ${forms.one}`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${count} ${forms.few}`;
    }

    return `${count} ${forms.many}`;
};