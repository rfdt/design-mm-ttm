import * as channelsActions from './channels/channelsActions';
import * as errorActions from './errors/errorsActions';
import * as userActions from './user/userActions';
export const actions = {
    ...channelsActions,
    ...errorActions,
    ...userActions
}
