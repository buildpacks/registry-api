import React from 'react';
import { Card } from 'react-bootstrap';
import { Buildpack } from './Buildpack';
import "./Item.scss";
import { Link } from 'react-router-dom';

export const Item: React.FC<ItemProps> = (props: ItemProps) => {
    return (
        <Card className="Buildpack-Item shadow-sm mb-3">
            <Card.Body className="text-left">
                <div className="mb-2">
                    <Link to={{pathname: `/buildpacks/${props.buildpack.namespace}/${props.buildpack.name}`}}><span className="Buildpack-Name">{props.buildpack.name}</span></Link>
                    <span className="Buildpack-Version font-italic text-muted pl-2">{props.buildpack.version}</span>
                </div>
                <div className="d-flex">
                    <div className="Buildpack-Namespace">{props.buildpack.namespace}</div>
                    {/*<div className="Buildpack-Updated ml-auto font-italic text-muted"></div>/*/}
                </div>
            </Card.Body>
        </Card>
    );
}

interface ItemProps {
    buildpack: Buildpack
}
