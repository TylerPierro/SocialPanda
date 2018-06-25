import { groupsTypes } from "../actions/groups/groups.types";

export function loadMessagesComponent(location, tag) {
    return {
        meta: {
            transition: () => ({
                path: `/messages/` //${action.payload.location}/${action.payload.tag}`
                //   query: {
                //     some: 'queryParam'
                //   },
                //   state: {
                //     some: 'state'
                //   }
            })
        },
        payload: {
            location: location,
            tag: tag
        },
        // type: groupTypes.MSG_SWITCH
    };
}