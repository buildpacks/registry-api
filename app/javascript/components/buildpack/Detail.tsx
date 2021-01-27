import './Detail.scss';

import React from 'react';
import Axios, { AxiosResponse } from 'axios';
import Loader from "react-spinners/RotateLoader";
import { Container, FormControl, InputGroup } from 'react-bootstrap';
import { Item as BuildpackItem } from '../buildpack/Item';

class Detail extends React.Component<{}, { searchTerm: string, searchResults: any[], loading: boolean }> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="Detail">
                <Container>
                    <div className="d-flex my-4 px-3">
                    {/* <SearchList searchItems={this.state.searchResults} /> */}
                    Hello again!
                    </div>
                </Container>
            </div>
        );
    }
}

export default Detail;
