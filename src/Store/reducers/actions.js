import * as channelsActions from './channels/channelsActions'
import * as errorActions from './errors/errorsActions';
export const actions = {
    ...channelsActions,
    ...errorActions
}