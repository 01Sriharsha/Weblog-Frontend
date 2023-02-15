import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { FormGroup, Label } from 'reactstrap'

export default function InputComp(props) {
    return (
        <FormGroup>
            <Label for={props.id}>{props.label}</Label>
            <Field type={props.type} name={props.name} id={props.id} placeholder={props.placeholder} className="form-control" as={props.as}/>
            {
                (props.isServerError)
                    //Executes only when client validation fails by any chance
                    ? <span className='text-danger' style={{ fontSize: '0.8rem' }}>
                        {props.serverErrorMsg} </span>
                    : <ErrorMessage className='text-danger' name={props.name} component={'span'}
                        style={{ fontSize: '0.75rem' }} />
            }
        </FormGroup>
    )
}
