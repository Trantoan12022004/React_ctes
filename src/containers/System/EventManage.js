import React, { Component } from "react";
import { connect } from "react-redux";
import "./EventManage.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {createEvent} from "../../services/eventServices"
class EventManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeEventCode: "",
            name: "",
            date: "",
            address: "",
            quantityMember: 0,
            cost: 0,
            statusCode: "",
        };
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    checkValidateInput = () => {
        let isValid = true;
        const requiredFields = {
            name: "Event name",
            date: "Event date",
            address: "Event address",
            typeEventCode: "Event type",
            statusCode: "Event status"
        };

        for (let field in requiredFields) {
            if (!this.state[field]) {
                isValid = false;
                toast.error(`Missing required parameter: ${requiredFields[field]}`);
                break;
            }
        }

        return isValid;
    };

    handleSaveEvent = async () => {
        let isValid = this.checkValidateInput();
        if (!isValid) return;

        try {
            let response = await createEvent({
                typeEventCode: this.state.typeEventCode,
                name: this.state.name,
                date: this.state.date,
                address: this.state.address,
                quantityMember: this.state.quantityMember,
                cost: this.state.cost,
                statusCode: this.state.statusCode,
            });

            if (response && response.data.errCode === 0) {
                toast.success("Create new event successfully!");
                this.setState({
                    typeEventCode: "",
                    name: "",
                    date: "",
                    address: "",
                    quantityMember: 0,
                    cost: 0,
                    statusCode: "",
                });
            } else {
                toast.error(response.data.errMessage);
            }
        } catch (error) {
            toast.error("Something went wrong...");
            console.error("Error creating event:", error);
        }
    };

    render() {
        return (
            <div className="event-manage-container">
                <div className="container-fluid px-5">
                    <div className="title text-center">
                        <h2>Event Management</h2>
                    </div>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Event Type</label>
                            <select
                                className="form-select"
                                value={this.state.typeEventCode}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "typeEventCode")
                                }
                            >
                                <option value="">Choose event type...</option>
                                <option value="E1">Small Event</option>
                                <option value="E2">Medium Event</option>
                                <option value="E3">Large Event</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Event Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "name")
                                }
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.date}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "date")
                                }
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.address}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "address")
                                }
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Quantity Member</label>
                            <input
                                type="number"
                                className="form-control"
                                min="0"
                                value={this.state.quantityMember}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "quantityMember")
                                }
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Cost</label>
                            <input
                                type="number"
                                className="form-control"
                                step="0.01"
                                min="0"
                                value={this.state.cost}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "cost")
                                }
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={this.state.statusCode}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "statusCode")
                                }
                            >
                                <option value="">Choose status...</option>
                                <option value="S1">Ongoing</option>
                                <option value="S2">Completed</option>
                                <option value="S3">Canceled</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.handleSaveEvent()}
                            >
                                Save Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

export default connect(mapStateToProps)(EventManage);