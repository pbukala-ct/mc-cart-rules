import {
  transformLocalizedStringToLocalizedField,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';

export const getErrorMessage = (error) =>
  error.graphQLErrors?.map((e) => e.message).join('\n') || error.message;

export const extractErrorFromGraphQlResponse = (graphQlResponse) => {
  if (
    typeof graphQlResponse.networkError?.result !== 'string' &&
    graphQlResponse.networkError?.result?.errors?.length > 0
  ) {
    return graphQlResponse.networkError.result.errors;
  }

  if (graphQlResponse.graphQLErrors?.length > 0) {
    return graphQlResponse.graphQLErrors;
  }

  return graphQlResponse;
};

const getNameFromPayload = (payload) => ({
  name: transformLocalizedStringToLocalizedField(payload.name),
});

const getDescriptionFromPayload = (payload) => ({
  description: transformLocalizedStringToLocalizedField(payload.description),
});


const getHours = (payload) => ( {
  // console.log(payload);
  name: payload.name,
  value:  JSON.stringify(payload.value) //"[\"11:00\",\"23:30\"]"
})

const convertActionName = (actionName, actionPayload) => ({
  [actionName]: actionName === 'changeName' ? getNameFromPayload(actionPayload) : actionName === 'changeDescription' ?   getDescriptionFromPayload(actionPayload) : actionName === 'setCustomField' ? getHours(actionPayload) :    actionPayload
});




export const createGraphQlUpdateActions = (actions) =>
  actions.reduce(
    (previousActions, { action: actionName, ...actionPayload }) => [
      ...previousActions,
       convertActionName(actionName, actionPayload)

    ],
    []
  )

  ;

export const convertToActionData = (draft) => ({
  ...draft,
  name: transformLocalizedFieldToLocalizedString(draft.nameAllLocales || []),
  description: transformLocalizedFieldToLocalizedString(draft.descriptionAllLocales || []),
});
