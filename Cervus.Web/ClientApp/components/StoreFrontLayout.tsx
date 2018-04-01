import * as BindingConstants from "../utils/BindingConstants";
import * as React from 'react';
import { NavMenu } from './NavMenu';
import { DefaultReactProps } from '../types';
import { RouteComponentProps } from 'react-router';

export class StoreFrontLayout extends React.Component<DefaultReactProps, {}> {

    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu />
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}