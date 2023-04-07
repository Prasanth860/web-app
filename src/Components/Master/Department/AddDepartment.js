import React, { useEffect } from 'react'
import "../../../App.css"
import { useFormValidation } from "../../../Validations/useFormValidations";
import { returnData, returnErrorColor } from '../../../SharedUI/SharedUI';
import { save } from '../../../ConfigFiles/SharedFunctions';
import { urls } from '../../../ConfigFiles/Url';

const AddDepartment = ({ close, closeAndUpdate, updatingData }) => {
  const submit = async () => {
    let res = await save(urls.department.save, data)
    if (res?.data?.status == true) {
      closeAndUpdate()
    }
  }
  const { data, setV, errors, handleChange, handleSubmit } = useFormValidation({
    initialValues: {
      departmentName: "",
      departmentCode: "",
      colorCode: ""
    },
    validationSchema: {
      departmentName: {
        required: {
          value: true,
          message: "Please enter department name",
        },
      },
      departmentCode: {
        required: {
          value: true,
          message: "Please enter department code",
        },
      },
      colorCode: {
        required: {
          value: true,
          message: "Please choose color",
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
            <div className='text-center'>Add Department</div>
          </div>
          <div className='border d-flex flex-column justify-content-around  gap-3 px-5 py-2'>
            <div className='d-flex align-items-center'>
              <div className='col-md-6 text-end px-3'>Department Name : </div>
              <input type='text' value={returnData(data, "departmentName")} onChange={handleChange("departmentName")} className={`form-control ${returnErrorColor(errors?.departmentName)}`} placeholder='Department Name' />
            </div>
            <div className='d-flex align-items-center'>
              <div className='col-md-6 text-end px-3'>Department Code : </div>
              <input type='text' value={returnData(data, "departmentCode")} onChange={handleChange("departmentCode")} className={`form-control ${returnErrorColor(errors?.departmentCode)}`} placeholder='Department Code' />
            </div>
            <div className='d-flex align-items-center'>
              <div className='col-md-6 text-end px-3'>Color code : </div>
              <input type='color' value={returnData(data, "colorCode")} onChange={handleChange("colorCode")} className={`form-control ${returnErrorColor(errors?.colorCode)}`} placeholder='Department Name' />
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

export default AddDepartment