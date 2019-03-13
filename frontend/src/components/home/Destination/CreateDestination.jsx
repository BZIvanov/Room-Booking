import React from 'react';


import './CreateDestination.css';

class CreateDestination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: null,
            image: null,
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    render() {
        return (           
            <form className="createDestination" onSubmit={(event) => {
                event.preventDefault();
                this.props.createDestination(this.state);
                
            }} >
                
                <div className="container">
                    <div className="create-form">
                        <h2>Create new destination</h2>
                        <hr className="to-right" />
                        <hr className="to-left" />
                        <div className="container-create">
            
                            <label>Title</label>
                            <input type="text" name="title" onChange={this.handleChange} placeholder="Specify a title" />
                
                            <label>Description</label>
                            <input type="text" name="description" onChange={this.handleChange} placeholder="Specify a description" />

                            <label>Image URL</label>
                            <input type="text" name="image" onChange={this.handleChange} placeholder="Provide and image URL" />
                    
                            <button type="submit">Create</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default CreateDestination;
