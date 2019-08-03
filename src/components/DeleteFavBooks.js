import React from 'react';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Formik } from 'formik';

class DeleteFavBooks extends React.Component {
    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.toggle} className={'modal-primary modal-lg' + this.props.className} >
                <ModalHeader toggle={this.props.toggle}>Delete Entry</ModalHeader>
                <ModalBody>
                    <Alert color="danger">Are you sure you want to delete this book from your favorites?</Alert>
                    <Formik
                    initialValues={{
                        isbn: this.props.data.isbn || '',
                        title: this.props.data.title || '',
                        author: this.props.data.author || '',
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        this.props.save(values.isbn, values.title, values.author);
                        this.props.toggle();
                        setSubmitting(false);
                    }}
                    >
                        {(formikProps) => {
                            const {values, handleBlur, handleSubmit, submitForm} = formikProps;
                            this.bindFormSubmit = submitForm;
                            return (
                                <Form noValidate name={'deleteFavBooks'} onSubmit={handleSubmit}>
                                    <FormGroup row>
                                        <Col xs="6" md="6">
                                            <Label for="title">Title</Label>
                                            <Input type="text" id="title" name="title" placeholder={'Empty book'} value={values.title} onBlur={handleBlur} innerRef={this.focusRef} />
                                        </Col>
                                        <Col xs="6" md="6">
                                            <Label for="author">Author</Label>
                                            <Input type="text" id="author" name="author" placeholder={'Empty author'} value={values.author} onBlur={handleBlur} innerRef={this.focusRef} />
                                        </Col>
                                        <Col xs="6" md="6">
                                            <Label for="isbn">ISBN</Label>
                                            <Input type="text" id="isbn" name="ISBN" placeholder={'Empty ISBN'} value={values.isbn} onBlur={handleBlur} innerRef={this.focusRef} />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            )
                        }}
                    </Formik>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=> {this.bindFormSubmit()}}>Yes</Button>
                    <Button color="secondary" onClick={()=> {this.props.toggle()}}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default DeleteFavBooks;