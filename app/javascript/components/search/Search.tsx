import './Search.scss';

import React from 'react';
import Axios, { AxiosResponse } from 'axios';
import {Container, FormControl, InputGroup, Spinner} from 'react-bootstrap';
import { Item as BuildpackItem } from '../buildpack/Item';
import { Summary } from './Summary';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom';

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

type HomeProps = RouteComponentProps;

class Search extends React.Component<{}, { searchTerm: string, searchResults: any[], loading: boolean, formValue: string }, HomeProps> {
    constructor(props: HomeProps) {
        super(props);
        this.keyPressed = this.keyPressed.bind(this);
        this.state = {
            searchTerm: "",
            searchResults: [],
            loading: false,
            formValue: ''
        }
    }

    componentDidMount(){
        if(this.props.match.params.sL){
        this.reload(this.props.match.params.sL);}
    }

    render() {
        const spinner =  this.state.loading ? <Spinner animation="border" className="Spinner" /> : null;

        let summary = <Summary totalCount={this.state.searchResults.length} searchTerm={this.state.searchTerm} />;
        if (this.state.loading || (this.state.searchResults.length === 0 && this.state.searchTerm === '')) {
            summary = null;
        }
       
        return (
            <div className="Search">
                <div className="Search-header">
                    <Container className="py-3">
                        <InputGroup onKeyDown={this.keyPressed}>
                            <FormControl
                                placeholder="Search buildpacks"
                                aria-label="Search buildpacks"
                                size="lg"
                                defaultValue={this.state.formValue}
                            />
                        </InputGroup>
                    </Container>
                </div>
                {spinner}
                <Container>
                    {summary}
                    <SearchList searchItems={this.state.searchResults} />
                </Container>
            </div>
        );
    }
    
    async keyPressed(e: any) {
        const searchTerm = (e.target.value + '').trim();
        if (searchTerm === '' || e.keyCode !== 13) {
            return;
        }

        this.props.history.push(`/searches/${searchTerm}`)
        this.setState({
            searchTerm,
            searchResults: [],
            loading: true
        });

        await this.fetchSearchResults(searchTerm);
    }

    async reload(a:any){
        this.setState({
            formValue: a
        });
        
        await this.fetchSearchResults(a);
    }

    async fetchSearchResults(searchText: string) {
        if (searchText === '') {
            return;
        }

        try {
            const apiHost = process.env.CNB_API_HOST || 'https://cnb-registry-api.herokuapp.com';
            const link = `${apiHost}/api/v1/search?matches=${searchText}`;
            const response: AxiosResponse = await Axios.get(link);
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

export default withRouter(Search);
