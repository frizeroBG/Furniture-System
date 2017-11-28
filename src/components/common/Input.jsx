import React, { Component } from 'react';


export default class Input extends Component {
    render() {
        const { name, type = 'text', value, onChange, label, error } = this.props;
        let className1 = '';
        let className2 = '';
        if(error === 'true'){
            className1 = ' has-danger'
            className2 = ' is-invalid'
        }
        if(error === 'false'){
            className1 = ' has-success'
            className2 = ' is-valid'
        }
        return (
            <div className={"form-group" + className1}>
                <label className="form-control-label" htmlFor="new-email">{label}</label>
                <input
                    className={"form-control" + className2}
                    onChange={onChange}
                    name={name}
                    id={name}
                    type={type}
                    value={value} />
                    {error === "true" && <div className="form-control-feedback">This input value is invalid</div>}
                    {error === "false" && <div className="form-control-feedback">This input value is valid</div>}
            </div>
        );
    }
}