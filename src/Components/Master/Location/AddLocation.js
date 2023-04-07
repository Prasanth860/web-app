import React, { useEffect } from 'react'
import "../../../App.css"
import { useFormValidation } from "../../../Validations/useFormValidations";
import { returnData, returnErrorColor } from '../../../SharedUI/SharedUI';
import { save } from '../../../ConfigFiles/SharedFunctions';
import { urls } from '../../../ConfigFiles/Url';

const AddLocation = ({ close, closeAndUpdate, updatingData }) => {

  const submit = async () => {
    let res = await save(urls.location.save, data)
    if (res?.data?.status == true) {
      closeAndUpdate()
    }
  }
  const { data, setV, errors, handleChange, handleSubmit } = useFormValidation({
    initialValues: {
      locationName: "",
      locationCode: "",
    },
    validationSchema: {
      locationName: {
        required: {
          value: true,
          message: "Please enter location name",
        },
      },
      locationCode: {
        required: {
          value: true,
          message: "Please enter location code",
        },
      }
    },
    submit: submit,
  });

  useEffect(() => {
    setV(updatingData)
  }, [])

  return (
    <div className='overlay'>
      <div className='border h-100 d-flex align-items-center justify-content-center'>
        <div className='border d-flex flex-column w-50 bg bg-white rounded'>
          <div className='border p-3 d-flex justify-content-center fw-semibold fs-4' >
            <div className='text-center'>Add Location</div>
          </div>
          <div className='border d-flex flex-column justify-content-around  gap-3 px-5 py-2'>
            <div className='d-flex align-items-center'>
              <div className='col-md-6 text-end px-3'>Location Name : </div>
              <input type='text' value={returnData(data, "locationName")} onChange={handleChange("locationName")} className={`form-control ${returnErrorColor(errors?.locationName)}`} placeholder='Location Name' />
            </div>
            <div className='d-flex align-items-center'>
              <div className='col-md-6 text-end px-3'>Location Code : </div>
              <input type='text' value={returnData(data, "locationCode")} onChange={handleChange("locationCode")} className={`form-control ${returnErrorColor(errors?.locationCode)}`} placeholder='Location Code' />
            </div>
          </div>
          <div className='border col-md-12  justify-content-end d-flex gap-2 p-3 '>
            <button className='cabtn1 px-3 py-1' onClick={close}>Close</button>
            <button className='subtn px-3 py-1' onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddLocation