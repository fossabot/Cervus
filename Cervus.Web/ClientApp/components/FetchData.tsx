import 'isomorphic-fetch';
import * as BindingConstants from "../utils/BindingConstants";
import * as React from 'react';
import { ApiInfo } from '../utils/ApiInfo';
import { lazyInject } from '../storeFront';
import { RouteComponentProps } from 'react-router';

interface FetchDataExampleState {
    forecasts: WeatherForecast[];
    loading: boolean;
}

interface ChuckNorrisJokeState {
    joke?: ChuckNorrisJoke;
    loading: boolean;
}

export class FetchData extends React.Component<RouteComponentProps<{}>, ChuckNorrisJokeState> {

    @lazyInject(BindingConstants.ApiInfoId)
    private apiInfo: ApiInfo;

    constructor() {
        super();
        this.state = {
            joke: undefined,
            loading: true
        };

        fetch(this.apiInfo.getApiUrl() + '/jokes/random')
            .then(response => response.json() as Promise<ChuckNorrisJoke>)
            .then(data => {
                this.setState({ joke: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderJoke(this.state.joke);

        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            { contents }
        </div>;
    }

    private static renderJoke(joke?: ChuckNorrisJoke) {
        if (!joke) {
            return <div></div>;
        }

        return <div>
            <h1 className='table'>{joke.value}</h1>
            {joke.category && <text>{joke.value}</text>}
        </div>;
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

interface ChuckNorrisJoke {
    category?: string;
    icon_url: string;
    id: string;
    url: string;
    value: string;
}