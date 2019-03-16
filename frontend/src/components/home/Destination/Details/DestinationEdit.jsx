import React from 'react';
import { Redirect } from 'react-router-dom';

import DestinationsService from '../../../../services/get-destinations';
import './DestinationEdit.css';

class DestinationEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            image: "",
            title: "",
            id: "",
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    async getDestinationFromDatabase (id) {
        try {
            const destination = await new DestinationsService().getCurrentDestination(id);
            
            this.setState({
                description: destination.description,
                image: destination.image,
                title: destination.title,
                id: destination._id
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/" />
            ) 
        }

        return (
            <form className="editDestination" onSubmit={(event) => {
                event.preventDefault();
                const editedData = {
                    title: this.state.title,
                    description: this.state.description,
                    image: this.state.image
                }

                this.props.editDestination(this.state.id, editedData);

                if (this.state.title && this.state.title.length > 3) {
                    if (this.state.description && this.state.description.length > 9) {
                        if (this.state.image && this.state.image.length >= 14 && (this.state.image.startsWith('https://') || this.state.image.startsWith('http://'))) { 
                            this.setState({
                                redirect: true
                            })
                        }
                    }
                }
            }} >
                
                <div className="container">
                    <div className="edit-form">
                        <h2>Edit destination</h2>
                        <hr className="to-right" />
                        <hr className="to-left" />
                        <div className="container-edit">
            
                            <label>Title</label>
                            <input type="text" name="title" onChange={this.handleChange} defaultValue={this.state.title} />
                
                            <label>Description</label>
                            <input type="text" name="description" onChange={this.handleChange} defaultValue={this.state.description} />

                            <label>Image URL</label>
                            <input type="text" name="image" onChange={this.handleChange} defaultValue={this.state.image} />
                    
                            <button type="submit">Edit</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    
    componentDidMount() {
        const id = this.props.location.pathname.split('/').pop();
        this.getDestinationFromDatabase(id);
    }
}

export default DestinationEdit;
