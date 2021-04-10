import { DropdownButton, Dropdown, Form, Button } from 'react-bootstrap';
import styles from './Search.module.css';
import DatePicker from 'react-datepicker';
const Search = () => {
    return (
        <div className={styles.searchBody}>
            <div className={styles.searchSection}>
                <div style={{width: "100%", margin : "5px"}}>
                    <Form.Control
                        name="title"
                        type="text"
                        placeholder="Search"
                    />
                </div>

                <div style={{ display: "flex" }} className={styles.dropdowns}>
                    <DropdownButton id="dropdown-baic-button" variant="secondary" title="Status">
                        <Dropdown.Item >Done</Dropdown.Item>
                        <Dropdown.Item >Active</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className={styles.dropdowns } >
                <DropdownButton id="dropdown-basic-button" title="Sort" variant="secondary" className="ml-3" >
                        <Dropdown.Item >A-Z</Dropdown.Item>
                        <Dropdown.Item >Z-A</Dropdown.Item>
                        <Dropdown.Item >Creation date oldest</Dropdown.Item>
                        <Dropdown.Item >Creation date newest</Dropdown.Item>
                        <Dropdown.Item >Completion date oldest</Dropdown.Item>
                        <Dropdown.Item >Completion date newest</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className={styles.datePicker}>
                    Create lte: <DatePicker

                    />
                </div>
                <div className={styles.datePicker}>
                    Create gte: <DatePicker

                    />
                </div>
                <div className={styles.datePicker}>
                    Complete lte: <DatePicker

                    />
                </div>
                <div className={styles.datePicker}>
                    Complete gte: <DatePicker

                    />
                </div>
                <div style={{width: "80%"}}>
                    <Button style={{width: "80%"}} variant="primary mt-3 ">Search</Button>
                </div>

            </div>
        </div>
    );
}

export default Search;