import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RouteResolver } from 'ClientApp/routing/RouteBinder';
import { Home } from './Home';
import { FetchData } from './FetchData';
import { Counter } from './Counter';

export interface NavMenuProps {
    routeResolver: RouteResolver;
}

export class NavMenu extends React.Component<NavMenuProps, {}> {
    _routeResolver: RouteResolver;

    constructor(props?: NavMenuProps) {
        super(props);
        this._routeResolver = this.props.routeResolver;        
    }

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
                    <Link className='navbar-brand' to={ '/' }>Cervus.Web</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ this._routeResolver.action(Home) } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ this._routeResolver.action(Counter) } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ this._routeResolver.action(FetchData) } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}