import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageHistory.scss';
import * as actions from "../../../store/actions";

class TableManageHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historysRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchHistoryRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listHistorys !== this.props.listHistorys) {
            this.setState({
                historysRedux: this.props.listHistorys
            })
        }
    }

    handleDeleteHistory = (history) => {
        this.props.deleteAHistoryRedux(history.id);
    }

    handleEditHistory = (history) => {
        this.props.handleEditHistoryFromParentKey(history)
    }

    render() {
        let arrHistorys = this.state.historysRedux;
        return (
            <React.Fragment>
                <table id="TableManageHistory">
                    <tbody>
                        <tr>
                            <th>User id</th>
                            <th>Charger id</th>
                            <th>Type id</th>
                            <th>Time start</th>
                            <th>Time end</th>
                            <th>Number start</th>
                            <th>Number end</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>
                        {arrHistorys && arrHistorys.length > 0 &&
                            arrHistorys.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.user_id}</td>
                                        <td>{item.charger_id}</td>
                                        <td>{item.type_id}</td>
                                        <td>{item.start_time}</td>
                                        <td>{item.end_time}</td>
                                        <td>{item.number_start}</td>
                                        <td>{item.number_end}</td>
                                        <td>{item.cost}</td>
                                        <td>
                                            <button onClick={() => this.handleEditHistory(item)} className='btn-edit' ><i className='fas fa-pencil-alt'></i> </button>
                                            <button onClick={() => this.handleDeleteHistory(item)}
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
        listHistorys: state.admin.historys
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchHistoryRedux: () => dispatch(actions.fetchAllHistorysStart()),
        deleteAHistoryRedux: (id) => dispatch(actions.deleteAHistory(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHistory);
