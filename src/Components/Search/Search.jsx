import { DropdownButton, Dropdown, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import actionTypes from '../../Redux/actionTypes';
import styles from './Search.module.css';
import DatePicker from 'react-datepicker';
import { sortOrFilterTasksThunk } from '../../Redux/action';
import dateFormatter from '../../Helpers/date';

const Search = (props) => {
    const {
        //functions
        changeDropDownValue,
        changeSearchInput,
        handleSetDate,
        handleSubmit,
        resetSearchForm,
        ...state

    } = props;
    const {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = state;
    const handleS = () => {
        const queryData = {};
        for (let key in state) {
            if (state[key]) {
                queryData[key] = typeof state[key] === "object" ? dateFormatter(state[key]) : state[key];
            }
        }
        handleSubmit(queryData);
    }
    console.log('status', status)
    return (
        <div className={styles.searchBody}>
            <div className={styles.searchSection}>
                <div style={{ width: "100%", margin: "5px" }}>
                    <Form.Control
                        name="title"
                        type="text"
                        placeholder="Search"
                        onChange={(e) => changeSearchInput(e.target.value)}
                        value={search}
                    />
                </div>
                <div style={{ display: "flex" }} className={styles.dropdowns}>
                    <DropdownButton title={!!!status ? "Status" : status.toUpperCase()} id="dropdown-baic-button" variant="secondary" >
                        <Dropdown.Item onClick={(e) => changeDropDownValue("done", "status")} >Done</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("active", "status")} >Active</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => changeDropDownValue("", "status")} >Reset</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className={styles.dropdowns} >
                <DropdownButton id="dropdown-basic-button" title={!!!sort ? "Sort" : sort.toUpperCase().replaceAll("_", " ")} variant="secondary" className="ml-3" style={{ width: "200px" }}>
                    <Dropdown.Item onClick={(e) => changeDropDownValue("a-z", "sort")}>A-Z</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => changeDropDownValue("z-a", "sort")}>Z-A</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => changeDropDownValue("creation_date_oldest", "sort")}>creation_date_oldest</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => changeDropDownValue("creation_date_newest", "sort")}>creation_date_newest</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => changeDropDownValue("completion_date_oldest", "sort")} >completion_date_oldest</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => changeDropDownValue("completion_date_newest", "sort")}>completion_date_newest</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => changeDropDownValue("", "sort")}>Reset</Dropdown.Item>
                </DropdownButton>
                </div>
                <div className={styles.datePicker}>
                    create_lte: <DatePicker
                        selected={create_lte ? create_lte : null}
                        onChange={date => handleSetDate("create_lte", date)}
                    />
                </div>
                <div className={styles.datePicker}>
                    Create gte: <DatePicker
                        selected={create_gte ? create_gte : null}
                        onChange={date => handleSetDate("create_gte", date)}
                    />
                </div>
                <div className={styles.datePicker}>
                    Complete lte: <DatePicker
                        selected={create_gte ? complete_lte : null}
                        onChange={date => handleSetDate("complete_lte", date)}
                    />
                </div>
                <div className={styles.datePicker}>
                    Complete gte: <DatePicker
                        selected={create_gte ? complete_gte : null}
                        onChange={date => handleSetDate("complete_gte", date)}
                    />
                </div>
                <div style={{ width: "60%", display : "flex" }}>
                    <Button onClick={handleS} style={{ width: "80%" }} variant="primary mt-3 ">Search</Button>
                    <Button variant="outline-info mt-3 ml-5"  onClick={resetSearchForm}> Reset</Button>
                </div>

            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = state.searchState;
    return {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeDropDownValue: (value, dropDownType) => dispatch({
            type: actionTypes.SET_STATUS,
            dropDownType,
            value
        }),
        changeSearchInput: (value) => dispatch({
            type: actionTypes.CHANGE_SEARCH_VALUE,
            value
        }),
        handleSetDate: (dateType, date) => dispatch({
            type: actionTypes.SET_SORT_DATE,
            dateType,
            date
        }),
        handleSubmit: (queryData) => dispatch(sortOrFilterTasksThunk(queryData)),
        resetSearchForm: () => dispatch({ type: actionTypes.RESET_SEARCH_FORM })
    }
}

const SearchProvider = connect(mapStateToProps, mapDispatchToProps)(Search)

export default SearchProvider