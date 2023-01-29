import { render, screen } from '@testing-library/vue';
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue';

test('renders checked base checkbox with label', () => {
  const value = 'firstValue';

  const label = 'Test Checkbox';

  const options = {
    props: {
      label: 'checkbox',
      value,
      modelValue: [value, 'secondValue'],
    },
    slots: {
      default: label,
    },
  };

  render(BaseCheckbox, options);

  const checkbox = screen.getByLabelText(label) as HTMLInputElement;

  expect(checkbox.checked).toBe(true);
});

test('renders unchecked base checkbox', () => {
  render(BaseCheckbox);

  const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

  expect(checkbox.checked).toBe(false);
});
