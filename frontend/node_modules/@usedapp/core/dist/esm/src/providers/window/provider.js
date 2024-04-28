import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { WindowContext } from './context';
/**
 * @internal Intended for internal use - use it on your own risk
 */
export function WindowProvider({ children }) {
    const [isActiveWindow, setActiveWindow] = useState(true);
    useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }
        const visibilityChangeListener = () => {
            switch (document.visibilityState) {
                case 'hidden':
                    setActiveWindow(false);
                    break;
                case 'visible':
                    setActiveWindow(true);
                    break;
            }
        };
        document.addEventListener('visibilitychange', visibilityChangeListener);
        return () => document.removeEventListener('visibilitychange', visibilityChangeListener);
    }, []);
    return _jsx(WindowContext.Provider, { value: isActiveWindow, children: children });
}
//# sourceMappingURL=provider.js.map