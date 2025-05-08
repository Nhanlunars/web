import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageMaintenance.scss';
import * as actions from "../../../store/actions";

class TableManageMaintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maintenancesRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchMaintenanceRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listMaintenances !== this.props.listMaintenances) {
            this.setState({
                maintenancesRedux: this.props.listMaintenances
            })
        }
    }

    handleDeleteMaintenance = (maintenance) => {
        this.props.deleteAMaintenanceRedux(maintenance.id);
    }

    handleEditMaintenance = (maintenance) => {
        this.props.handleEditMaintenanceFromParentKey(maintenance)
    }

    render() {
        let arrMaintenances = this.state.maintenancesRedux;
        return (
            <React.Fragment>
                <table id="TableManageMaintenance">
                    <tbody>
                        <tr>
                            <th>Charger id</th>
                            <th>Type id</th>
                            <th>maintenance_date</th>
                            <th>completion_date</th>
                            <th>maintenance_type</th>
                            <th>technician_name</th>
                            <th>maintenance_cost</th>
                            <th>Actions</th>
                        </tr>
                        {arrMaintenances && arrMaintenances.length > 0 &&
                            arrMaintenances.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.charger.charger_name}</td>
                                        <td>{item.type.type_name}</td>
                                        <td>{item.maintenance_date}</td>
                                        <td>{item.completion_date}</td>
                                        <td>{item.maintenance_type}</td>
                                        <td>{item.technician_name}</td>
                                        <td>{item.maintenance_cost}</td>
                                        <td>
                                            <button onClick={() => this.handleEditMaintenance(item)} className='btn-edit' ><i className='fas fa-pencil-alt'></i> </button>
                                            <button onClick={() => this.handleDeleteMaintenance(item)}
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
        listMaintenances: state.admin.maintenances
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMaintenanceRedux: () => dispatch(actions.fetchAllMaintenancesStart()),
        deleteAMaintenanceRedux: (id) => dispatch(actions.deleteAMaintenance(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageMaintenance);
