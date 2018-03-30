import * as BindingConstants from "../utils/BindingConstants";
import * as React from 'react';
import { lazyInject } from '../storeFront';
import { Link, NavLink } from 'react-router-dom';
import { Home } from './Home';
import { FetchData } from './FetchData';
import { Counter } from './Counter';
import { RouteSolver, DefaultReactProps } from '../types';

export class NavMenu extends React.Component<DefaultReactProps, {}> {

    @lazyInject(BindingConstants.RouteSolverId)
    private readonly routeResolver: RouteSolver;

    public render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>Cervus.Web</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={this.routeResolver.action(Home)} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={this.routeResolver.action(Counter)} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={this.routeResolver.action(FetchData)} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}