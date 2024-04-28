import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useReducer } from 'react';
import { useEthers } from '../../hooks';
import { NotificationsContext } from './context';
import { DEFAULT_NOTIFICATIONS } from './model';
import { notificationReducer } from './reducer';
import { useIsMounted } from '../../hooks/useIsMounted';
import { nanoid } from 'nanoid';
export function NotificationsProvider({ children }) {
    const [notifications, dispatch] = useReducer(notificationReducer, DEFAULT_NOTIFICATIONS);
    const isMounted = useIsMounted();
    const { chainId, account } = useEthers();
    useEffect(() => {
        if (account && chainId) {
            dispatch({
                type: 'ADD_NOTIFICATION',
                chainId: chainId,
                notification: {
                    type: 'walletConnected',
                    id: nanoid(),
                    submittedAt: Date.now(),
                    address: account,
                },
            });
        }
    }, [account, chainId]);
    const addNotification = useCallback(({ notification, chainId }) => {
        if (isMounted()) {
            dispatch({
                type: 'ADD_NOTIFICATION',
                chainId,
                notification: Object.assign(Object.assign({}, notification), { id: nanoid() }),
            });
        }
    }, [dispatch]);
    const removeNotification = useCallback(({ notificationId, chainId }) => {
        if (isMounted()) {
            dispatch({
                type: 'REMOVE_NOTIFICATION',
                chainId,
                notificationId,
            });
        }
    }, [dispatch]);
    return (_jsx(NotificationsContext.Provider, { value: { addNotification, notifications, removeNotification }, children: children }));
}
//# sourceMappingURL=provider.js.map