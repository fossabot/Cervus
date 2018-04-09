import * as React from "react";
import { RouteComponentProps } from "react-router";

import * as BindingConstants from "../ioc/BindingConstants";
import { DefaultReactProps } from "../types";
import { NavMenu } from "./NavMenu";

export class StoreFrontLayout extends React.Component<DefaultReactProps, {}> {

    public render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    <NavMenu />
                </div>
                <div className="col-sm-9">
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}
