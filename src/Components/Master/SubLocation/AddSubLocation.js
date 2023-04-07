import React, { useEffect, useState } from 'react'
import "../../../App.css"
import { useFormValidation } from "../../../Validations/useFormValidations";
import { returnData, returnErrorColor } from '../../../SharedUI/SharedUI';
import { getfList, save } from '../../../ConfigFiles/SharedFunctions';
import { urls } from '../../../ConfigFiles/Url';

const AddSubLocation = ({ close, closeAndUpdate, updatingData }) => {
  const [locations, setLocations] = useState([])

  const getLocationList = async () => {
    let res = await getfList(urls.location.getAll)
    setLocations(res)
  }

  const submit = async () => {
    let res = await save(urls.sublocation.save, data)
    if (res?.data?.status == true) {
      closeAndUpdate()
    }
  }
  const { data, setV, errors, handleChange, handleSubmit } = useFormValidation({
    initialValues: {
      locationId: "",
      sublocationName: "",
      sublocationCode: "",
    },
    validationSchema: {
      locationId: {
        required: {
          value: true,
          message: "Please select location",
        },
      },
      sublocationName: {
        required: {
          value: true,
          message: "Please enter sublocation name",
        },
      },
      sublocationCode: {
        required: {
          value: true,
          message: "Please enter sublocation code",
        },
      }
    },
    submit: submit,
  });

  useEffect(() => {
    setV(updatingData)
    getLocationList()
  }, [])

  return (
    <div className='overlay'>
      <div className='border h-100 d-flex align-items-center justify-content-center'>
        <div className='border d-flex flex-column w-50 bg bg-white rounded'>
          <div className='border p-3 d-flex justify-content-center fw-semibold fs-4' >
            <div className='text-center'>Add Sublocation</div>
          </div>
          <div className='border d-flex flex-column justify-content-around  gap-3 px-5 py-2'>
            <div className='d-flex align-items-center'>
              <div className='col-md-6 text-end px-3'>Location  : </div>
              <select
                value={returnData(data, "locationId")}
                onChange={handleChange("locationId")}
                className={`form-select ${returnErrorColor(errors?.locationId)}`}
              >
                <option value={""}>Select location</option>
                {locations && locations?.map((e, i) => {
                  return (
                    <option value={e?.locationId}>{e?.locationName}</option>
                  )
                })}
              </select>
            </div>
            <div className='d-flex align-items-center'>
              <div className='col-md-6 text-end px-3'>Sublocation Name : </div>
              <input type='text' value={returnData(data, "sublocationName")} onChange={handleChange("sublocationName")} className={`form-control ${returnErrorColor(errors?.sublocationName)}`} placeholder='Sublocation Name' />
            </div>
            <div className='d-flex align-items-center'>
              <div className='col-md-6 text-end px-3'>Sublocation Code : </div>
              <input type='text' value={returnData(data, "sublocationCode")} onChange={handleChange("sublocationCode")} className={`form-control ${returnErrorColor(errors?.sublocationCode)}`} placeholder='Sublocation Code' />
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

export default AddSubLocation