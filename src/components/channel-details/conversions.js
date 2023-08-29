import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';

export const docToFormValues = (channel, languages) => ({
  key: channel?.key ?? '',
  roles: channel?.roles ?? [],
  customData: channel?.custom?.customFieldsRaw ?? [],


  name: LocalizedTextInput.createLocalizedString(
    languages,
    transformLocalizedFieldToLocalizedString(channel?.nameAllLocales ?? [])
  ),
  description: LocalizedTextInput.createLocalizedString(
    languages,
    transformLocalizedFieldToLocalizedString(channel?.descriptionAllLocales ?? [])
  ),
});

export const formValuesToDoc = (formValues) => ({
  key: formValues.key,
  roles: formValues.roles,
  name: LocalizedTextInput.omitEmptyTranslations(formValues.name),
  description: LocalizedTextInput.omitEmptyTranslations(formValues.description),
  tradingHoursMonday: formValues.trading_hours_monday,
  pickingHoursMonday: formValues.picking_hours_monday,
  tradingHoursTuesday: formValues.trading_hours_tuesday,
  pickingHoursTuesday: formValues.picking_hours_tuesday,

  tradingHoursWednesday: formValues.trading_hours_wednesday,
  pickingHoursWednesday: formValues.picking_hours_wednesday,
  tradingHoursThursday: formValues.trading_hours_thursday,
  pickingHoursThursday: formValues.picking_hours_thursday


});




