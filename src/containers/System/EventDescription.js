import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { createEventDescription } from "../../services/eventServices";
import { getAllEvents } from "../../services/eventServices";
import { getAllCodes } from "../../services/userServices";
import { languages } from "../../utils/constant";
import * as actions from "../../../src/store/actions";
import Select from "react-select";

const mdParser = new MarkdownIt();

class EventDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            selectedPosition: null,
            selectedEvent: null,
            image: "",
            positions: [],
            events: []
        };
    }
    async componentDidMount() {
        try {
            const response = await getAllEvents();
            console.log("API Response:", response); // Kiểm tra response
    
            if (response && response.data && response.data.errCode === 0) {
                const events = response.data.data;
                console.log("Events data:", events); // Kiểm tra data
                
                this.setState({
                    events: this.buildSelectOptions(events)
                });
            } else {
                toast.error("Failed to fetch event types");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error loading data");
        }
    }

    buildSelectOptions = (items) => {
        return items.map(item => ({
            value: item.id,
            label: item.name
        }));
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    };
    handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({ image: reader.result });
        };
    };

    handleSaveContent = async () => {
        const { contentHTML, contentMarkdown, description, 
                 selectedEvent, image } = this.state;

        if (!selectedEvent) {
            toast.error("Please select an event");
            return;
        }
        console.log("check state", this.state)

        try {
            const response = await createEventDescription({
                contentHTML,
                contentMarkdown,
                description,
                eventId: selectedEvent.value,
                image
            });

            if (response && response.data.errCode === 0) {
                toast.success("Save description successfully!");
                this.setState({
                    contentMarkdown: "",
                    contentHTML: "",
                    description: "",
                    selectedPosition: null,
                    selectedEvent: null,
                    image: ""
                });
            } else {
                toast.error(response.data.errMessage);
            }
        } catch (error) {
            console.error("Error saving content:", error);
            toast.error("Error saving content");
        }
    };
    render() {
        
        const { selectedEvent, events } = this.state;

        return (
            <div className="event-description-container p-4">
                <h2 className="text-center mb-4">Event Description Editor</h2>
                
                <div className="row mb-4">
                    <div className="col-md-6">
                        <label className="form-label">Events:</label>
                        <Select
                            value={selectedEvent}
                            onChange={(option) => this.setState({ selectedEvent: option })}
                            options={events}
                            className="basic-select"
                            placeholder="Select events"
                            isSearchable={true}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label">Short Description:</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={this.state.description}
                        onChange={(e) => this.setState({ description: e.target.value })}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="form-label">Featured Image:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.image}
                        accept="image/*"
                        onChange={(e) => this.setState({ image: e.target.value })}
                    />
                </div>

                <div className="markdown-editor mb-4">
                    <label className="form-label">Detailed Description:</label>
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button
                    className="btn btn-primary"
                    onClick={this.handleSaveContent}
                >
                    Save Description
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language
});

export default connect(mapStateToProps)(EventDescription);