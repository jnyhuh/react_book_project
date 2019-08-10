import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, Col, Row, Button } from 'reactstrap';
import { Helmet } from 'react-helmet';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import * as actions from '../store/actions';
import DeleteFavBooks from 'components/DeleteFavBooks';
import auth0Client from '../Auth';
import Page from 'components/Page';


const {SearchBar} = Search;
const TITLE = 'Favorite Books';

class FavBooksPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: null,
            user: null,
            modalShow: false,
            showRecord: false,
        };
    }
    
    componentWillMount() {
        if(auth0Client.isAuthenticated()){
            this.props.onFetchFavBooks(auth0Client.getProfile().name)
        }        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.notifySend({msg: nextProps.error})
        }
    }
    
    toggleFavBookDeleteHandler = () => {
        this.setState(prevState => {
            return { modalShow: !prevState.modalShow }
        });
    };

    deleteFavBookHandler = (isbn, title, author) => {
        this.setState(prevState => {
            const updatedRecord = {
                ...this.state.data,
                showRecord: !prevState.showRecord,
                isbn: isbn,
                title: title,
                author: author,
            };
            return { data: updatedRecord }
        });
        this.props.onDeleteFavBooks(auth0Client.getProfile().name, this.state.data.isbn)
    }

    onDelete = (ISBN, title, author) => {
        this.setState(prevState => {
            return {
                modalShow: !prevState.modalShow,
                data: {
                    isbn: ISBN,
                    title: title,
                    author: author,
                }
            }
        })
    }

    dataLoading = () => {
        if (this.props.loading) {
            return <p style={{textAlign: 'center'}}>Loading...</p>
        }
        else {
            return <p style={{textAlign: 'center'}}>No Favorited Books available</p>
        }
    };

    render() {
        if (!auth0Client.isAuthenticated()) return (<Card>
            <CardHeader>
                <i className="icon-menu"/>Please sign in to view your books.
                <div className="card-header-actions">
                </div>
            </CardHeader>
            </Card>);
        const columns = [
            {
                dataField: 'TITLE',
                text: 'Title',
                sort: true,
            },
            {
                dataField: 'AUTHOR',
                text: 'Author',
                sort: true,
            },
            {
                dataField: 'ISBN',
                text: 'ISBN',
                sort: true,
            },
            {
                text: 'Delete',
                align: 'center',
                formatter: (cell, row) => {
                    return(
                        <span>
                            <Button color="danger" onClick={() => this.onDelete(row.ISBN, row.TITLE, row.AUTHOR)}>delete</Button>
                        </span>
                    )
                },
            },
        ];

        const paginationOptions = {
            sizePerPage: 20, 
            showTotal: true,
        };

        let deleteModal = null;
        if (this.state.data) {
            deleteModal = (
                <DeleteFavBooks show={this.state.modalShow} save={this.deleteFavBookHandler} toggle={this.toggleFavBookDeleteHandler} data={this.state.data}/>
            )
        }

        return (
            <Page  
                className="Books"
                title="My Books"
            >
            
                <Col md="12" sm="12" xs="12"></Col>
                    <div className='animated faceIn'>
                        <Helmet><title>{TITLE}</title></Helmet>
                        {deleteModal}
                        <Card>
                            <CardHeader>
                                <i className="icon-menu"/>Favorite Books
                                <div className="card-header-actions">
                                </div>
                            </CardHeader>
                            <CardBody>
                                <ToolkitProvider 
                                keyField='ISBN' 
                                data={this.props.favBooks} 
                                columns={columns} 
                                search>
                                    {props => (
                                        <div>
                                            <SearchBar {...props.searchProps} />
                                            <hr/>
                                            <BootstrapTable
                                            {...props.baseProps}
                                            bootstrap4
                                            noDataIndication={this.dataLoading}
                                            pagination={paginationFactory(paginationOptions)}
                                            />
                                        </div>
                                    )}
                                </ToolkitProvider>
                            </CardBody>
                        </Card>
                    </div>
            
            </Page>
        );
    }
    }

const mapStateToProps = state => {
    return {
        favBooks: state.favBooks.data,
        loading: state.favBooks.loading,
        error: state.favBooks.error,
        user: state.favBooks.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        notifySend: (item) => dispatch(actions.notifySend(item)),
        notifyDismiss: (item) => dispatch(actions.notifyDismiss(item)),
        onFetchFavBooks: (user) => dispatch(actions.fetchFavBooks(user)),
        onDeleteFavBooks: (user, isbn) => dispatch(actions.deleteFavBooks(user, isbn)),
        onFetchUser: () => dispatch(actions.fetchUser()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavBooksPage)