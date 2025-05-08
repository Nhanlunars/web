import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageFeedback.scss';
import * as actions from "../../../store/actions";

class TableManageFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbacksRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchFeedbackRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listFeedbacks !== this.props.listFeedbacks) {
            this.setState({
                feedbacksRedux: this.props.listFeedbacks
            })
        }
    }

    handleDeleteFeedback = (feedback) => {
        this.props.deleteAFeedbackRedux(feedback.id);
    }

    handleEditFeedback = (feedback) => {
        this.props.handleEditFeedbackFromParentKey(feedback)
    }

    render() {
        let arrFeedbacks = this.state.feedbacksRedux;
        return (
            <React.Fragment>
                <table id="TableManageFeedback">
                    <tbody>
                        <tr>
                            <th>User id</th>
                            <th>Charger id</th>
                            <th>Type id</th>
                            <th>rating</th>
                            <th>comment</th>
                            <th>Actions</th>
                        </tr>
                        {arrFeedbacks && arrFeedbacks.length > 0 &&
                            arrFeedbacks.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.user.firstName} {item.user.lastName}</td>
                                        <td>{item.charger.charger_name}</td>
                                        <td>{item.type.type_name}</td>
                                        <td>{item.rating}</td>

                                        <td>{item.comment}</td>
                                        <td>
                                            <button onClick={() => this.handleEditFeedback(item)} className='btn-edit' ><i className='fas fa-pencil-alt'></i> </button>
                                            <button onClick={() => this.handleDeleteFeedback(item)}
                                                className='btn-delete' ><i className='fas fa-trash'></i> </button>
                                        </td>
                                    </tr>
                                )
                            })


                        }

                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}




const mapStateToProps = state => {
    return {
        listFeedbacks: state.admin.feedbacks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchFeedbackRedux: () => dispatch(actions.fetchAllFeedbacksStart()),
        deleteAFeedbackRedux: (id) => dispatch(actions.deleteAFeedback(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageFeedback);
