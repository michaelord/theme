// https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c

import {useLocalStorage} from 'components/hooks';
import React from 'react';

import * as Types from 'components/types';

type Props = {
	theme?: string;
	debug?: boolean;
	children?: Types.Children;
};

type ContextProps = {};
const defaults: ContextProps = {};

const ThemeContext = React.createContext(defaults);
const {Consumer, Provider} = ThemeContext;

export const ThemeProvider = (props: Props) => {
	const {children} = props;

	const [theme, setTheme] = useLocalStorage(props.theme, 'theme');
	const [debug, setDebug] = useLocalStorage('off', 'debug');

	const toggleDebug = () => {
		setDebug(debug === 'on' ? 'off' : 'on');
	};

	return (
		<Provider
			value={{
				theme,
				setTheme,
				debug,
				toggleDebug,
			}}
		>
			<div data-theme={theme} className={debug === 'on' ? 'debug' : undefined}>
				{children}
			</div>
		</Provider>
	);
};

export const ThemeConsumer = ({children}: {children}) => (
	<Consumer>{(context: ContextProps) => children(context)}</Consumer>
);
