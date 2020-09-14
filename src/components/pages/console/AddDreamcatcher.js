import React, { Component } from "react"
import { connect } from "react-redux"
import { addDreamcatcher } from "../../../store/actions/dreamActions"
import { Redirect } from "react-router-dom"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



class AddDreamcatcher extends Component {
    state = {
        img: "",
        model: "",
        price: null,
        diameter: "",
        category: "",
        amount: "",
        description: "",
    }
    handleChange = (event) => {
        if (event.target == null) {
            if (event.value.includes('0')) {
                this.setState({
                    diameter: event.value,
                })
            } else {
                this.setState({
                    category: event.value,
                })
            }

        } else {
            const price = event.target.id === "price" ? " ש\"ח " : "";
            this.setState({
                [event.target.id]: event.target.value + price
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addDreamcatcher(this.state);
    }


    render() {
        const adminEmail = "sagi@gmail.com"
        const { auth } = this.props;

        if (!auth.uid || auth.email !== adminEmail)
            return <Redirect to="/" />

        const categoryOptions = [
            'מחזיק מפתחות', 'מפית', 'מארז', 'לוכד חלומות', 'סט'
        ]
        const catDefOption = categoryOptions[0];
        const dreamcatcher = categoryOptions[3];

        return (
            <div className="container" >
                <form className="white" onSubmit={this.handleSubmit} dir="rtl">
                    <h5 className="grey-text text-darken-3">הוסף פריט לחנות</h5>

                    <label htmlFor="img" style={labelStyle}>העתק כתובת קישור לתמונה</label>
                    <div className="input-field">
                        <textarea id="img" onChange={this.handleChange}></textarea>
                    </div>
                    <label htmlFor="model" style={labelStyle}>שם הדגם</label>
                    <div className="input-field" style={inputStyle}>
                        <input id="model" onChange={this.handleChange}></input>
                    </div>

                    <label htmlFor="price" style={labelStyle}>מחיר</label>
                    <div className="input-field" style={inputStyle}>
                        <input id="price" onChange={this.handleChange}></input>
                    </div>
                    <label htmlFor="diameter" style={labelStyle}>קטגוריה</label>
                    <div className="input-field" style={inputStyle}>
                        <Dropdown options={categoryOptions} onChange={this.handleChange}
                            value={catDefOption} placeholder="Select an option" />
                    </div>

                    {this.state.category === dreamcatcher ?
                        <DiameterDropDown def={diamDefOption} func={this.handleChange} /> : null}

                    <label htmlFor="amount" style={labelStyle}>כמות במלאי</label>
                    <div className="input-field" style={inputStyle}>
                        <input id="amount" onChange={this.handleChange}></input>
                    </div>

                    <label htmlFor="description" style={labelStyle}>תיאור</label>
                    <div className="input-field">
                        <textarea id="description" style={{ minHeight: "200px" }} onChange={this.handleChange}></textarea>
                    </div>

                    <div className="input-field" id="submit-button">
                        <button className="btn black lighten-1">הוסף</button>
                    </div>

                </form>

            </div >
        );
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        addDreamcatcher: dreamcatcher => dispatch(addDreamcatcher(dreamcatcher))
    }
}


const DiameterDropDown = (props) => {
    return (
        <div>
            <label htmlFor="diameter" style={labelStyle}>קוטר</label>
            <div className="input-field" style={inputStyle}>
                <Dropdown options={diameterOptions} onChange={props.func}
                    value={props.diamDefOption} placeholder="בחר קוטר" />
            </div>
        </div>);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDreamcatcher)


const diameterOptions = [
    '30', '40', '50', '60', '70'
];
const diamDefOption = diameterOptions[0];

const labelStyle = {
    fontSize: "16px",
}

const inputStyle = {
    width: "200px"
}
