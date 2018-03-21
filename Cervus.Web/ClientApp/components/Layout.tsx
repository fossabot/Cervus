import * as React from 'react';
import { NavMenu } from './NavMenu';
import { RouteResolver } from 'ClientApp/routing/RouteBinder';

export interface LayoutProps {
    children?: React.ReactNode;
    routeResolver: RouteResolver;
}

export class Layout extends React.Component<LayoutProps, {}> {
    _routeResolver: RouteResolver;

    constructor(props?: LayoutProps) {
        super(props);
        
        this._routeResolver = this.props.routeResolver
    }

    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu routeResolver={ this._routeResolver } />
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
