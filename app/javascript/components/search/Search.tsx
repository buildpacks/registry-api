import './Search.scss';

import React from 'react';
import Axios, { AxiosResponse } from 'axios';
import Loader from "react-spinners/RotateLoader";
import { Container, FormControl, InputGroup } from 'react-bootstrap';
import { Item as BuildpackItem } from '../buildpack/Item';
import { Pagination } from './Pagination';
import { Summary } from './Summary';

function SearchList(props: any) {
    let i = 0;
    const items = props.searchItems.map((item: any) => {
        const newItem = { ...item.latest, ...{ key: i++ } };

        return <BuildpackItem buildpack={newItem} key={i} />
    });
    return (
        <div className="Search-list">
            {items}
        </div>
    );
}

class Search extends React.Component<{}, { searchTerm: string, searchResults: any[], loading: boolean }> {
    constructor(props: any) {
        super(props);
        this.keyPressed = this.keyPressed.bind(this);
        this.state = {
            searchTerm: "",
            searchResults: [],
            loading: false
        }
    }

    render() {
        return (
            <div className="Search">
                <div className="Search-header">
                    <Container className="py-3">
                        <InputGroup onKeyDown={this.keyPressed}>
                            <FormControl
                                placeholder="Search buildpacks"
                                aria-label="Search buildpacks"
                                size="lg"
                            />
                        </InputGroup>
                    </Container>
                </div>
                <Loader
                    size={60}
                    color={"#47529E"}
                    loading={this.state.loading}
                />
                <Container>
                    <div className="d-flex my-4 px-3">
                        <Summary totalCount={this.state.searchResults.length} searchTerm={this.state.searchTerm} />
                        {/*<div className="ml-auto">*/}
                        {/*    <Pagination totalCount={100} limit={10} startIndex={10} />*/}
                        {/*</div>*/}
                    </div>
                    <SearchList searchItems={this.state.searchResults} />
                </Container>
            </div>
        );
    }

    async keyPressed(e: any) {
        if (e.keyCode === 13) {
            this.setState({
                searchTerm: e.target.value,
                searchResults: [],
                loading: e.target.value !== ''
            });
            await this.fetchSearchResults(e.target.value);
        }
    }

    async fetchSearchResults(searchText: string) {
        if (searchText === '') {
            return;
        }

        try {
            const response: AxiosResponse = await Axios.get(`https://cnb-registry-api.herokuapp.com/api/v1/search?matches=${searchText}`);
            if (response.status >= 200 && response.status < 300) {
                this.setState({
                    searchResults: response.data || [],
                    loading: false
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default Search;
