import {
  useMcQuery,
  useMcMutation,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { createSyncChannels } from '@commercetools/sync-actions';
import {
  createGraphQlUpdateActions,
  extractErrorFromGraphQlResponse,
  convertToActionData,
} from '../../helpers';
import FetchChannelsQuery from './fetch-channels.ctp.graphql';
import FetchChannelDetailsQuery from './fetch-channel-details.ctp.graphql';
import UpdateChannelDetailsMutation from './update-channel-details.ctp.graphql';

export const useChannelsFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading } = useMcQuery(FetchChannelsQuery, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    channelsPaginatedResult: data?.channels,
    error,
    loading,
  };
};

export const useChannelDetailsFetcher = (channelId) => {
  const { data, error, loading } = useMcQuery(FetchChannelDetailsQuery, {
    variables: {
      channelId,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    channel: data?.channel,
    error,
    loading,
  };
};

export const useChannelDetailsUpdater = () => {
  const [updateChannelDetails, { loading }] = useMcMutation(
    UpdateChannelDetailsMutation
  );

  const syncStores = createSyncChannels();
  const execute = async ({ originalDraft, nextDraft }) => {
    const actions = syncStores.buildActions(
      nextDraft,
      convertToActionData(originalDraft)
    );
    try {

      // removing ocustom type - no idea why this is here!!!
    // actions.splice(1);
    const cleanActions =  actions.filter(item => item.action !== "setCustomType");


   if(nextDraft.tradingHoursMonday){
    cleanActions.push(
      {
        action: "setCustomField",
        name: "trading_hours_monday",
        value:  nextDraft.tradingHoursMonday.split(" - ")
      }
    );
   }

   if(nextDraft.pickingHoursMonday){
    cleanActions.push(
      {
        action: "setCustomField",
        name: "picking_hours_monday",
        value:  nextDraft.pickingHoursMonday.split(" - ")
      }
    );
   }

   if(nextDraft.tradingHoursTuesday){
    cleanActions.push(
      {
        action: "setCustomField",
        name: "trading_hours_tuesday",
        value:  nextDraft.tradingHoursTuesday.split(" - ")
      }
    );
   }

   if(nextDraft.pickingHoursTuesday){
    cleanActions.push(
      {
        action: "setCustomField",
        name: "picking_hours_tuesday",
        value:  nextDraft.pickingHoursTuesday.split(" - ")
      }
    );
   }

   //-----



   if(nextDraft.tradingHoursWednesday){
    cleanActions.push(
      {
        action: "setCustomField",
        name: "trading_hours_wednesday",
        value:  nextDraft.tradingHoursWednesday.split(" - ")
      }
    );
   }

   if(nextDraft.pickingHoursWednesday){
    cleanActions.push(
      {
        action: "setCustomField",
        name: "picking_hours_wednesday",
        value:  nextDraft.pickingHoursWednesday.split(" - ")
      }
    );
   }


   //----


   if(nextDraft.tradingHoursThursday){
    cleanActions.push(
      {
        action: "setCustomField",
        name: "trading_hours_thursday",
        value:  nextDraft.tradingHoursThursday.split(" - ")
      }
    );
   }

   if(nextDraft.pickingHoursThursday){
    cleanActions.push(
      {
        action: "setCustomField",
        name: "picking_hours_thursday",
        value:  nextDraft.pickingHoursThursday.split(" - ")
      }
    );
   }

        
      console.log("!        ACTIONS: " +JSON.stringify(cleanActions))
      console.log("===== nextDraft: " + JSON.stringify(nextDraft))

      return await updateChannelDetails({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
  
        variables: {
          channelId: originalDraft.id,
          version: originalDraft.version,
          actions: createGraphQlUpdateActions(cleanActions),
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return {
    loading,
    execute,
  };
};
