import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const store = configureStore()

if (localStorage.jwt) {
    setTimeout(() => {
        fetch('/api/getUserFromjwt?', {
            headers: {
                'Authorization': `bearer ${localStorage.jwt}`
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((ajResponse) => {
                ajResponse.data.type = 'GET_USER_DATA_FROM_DB'
                store.dispatch(ajResponse.data)
                console.log(store.getState())
            })
    } , 300)
}

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff7961',
            main: '#E50914',
            dark: '#ba000d',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const App = (
    <MuiThemeProvider theme={theme}>
    <Provider store={store}>
        <AppRouter />
    </Provider>
    </MuiThemeProvider>
)

ReactDOM.render(App, document.getElementById('app'));
