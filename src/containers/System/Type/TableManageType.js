import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageType.scss';
import * as actions from "../../../store/actions";

class TableManageType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typesRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchTypeRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listTypes !== this.props.listTypes) {
            this.setState({
                typesRedux: this.props.listTypes
            })
        }
    }

    handleDeleteType = (type) => {
        this.props.deleteATypeRedux(type.id);
    }

    handleEditType = (type) => {
        this.props.handleEditTypeFromParentKey(type)
    }

    render() {
        let arrTypes = this.state.typesRedux;
        return (
            <React.Fragment>
                <table id="TableManageType">
                    <tbody>
                        <tr>
                            <th>Type name</th>
                            <th>Charger id</th>
                            <th>Describe</th>
                            <th>Default price</th>
                            <th>Actions</th>
                        </tr>
                        {arrTypes && arrTypes.length > 0 &&
                            arrTypes.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.type_name}</td>
                                        <td>{item.charger_id}</td>
                                        <td>{item.describe}</td>
                                        <td>{item.default_price}</td>
                                        <td>
                                            <button onClick={() => this.handleEditType(item)} className='btn-edit' ><i className='fas fa-pencil-alt'></i> </button>
                                            <button onClick={() => this.handleDeleteType(item)}
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
        listTypes: state.admin.types
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTypeRedux: () => dispatch(actions.fetchAllTypesStart()),
        deleteATypeRedux: (id) => dispatch(actions.deleteAType(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageType);
