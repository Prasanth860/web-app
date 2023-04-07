import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import { MdModeEditOutline } from "react-icons/md"
import TableContainer from "../../../SharedComponents/TableContainer/TableContainer";
import { getfList } from '../../../ConfigFiles/SharedFunctions';
import { urls } from '../../../ConfigFiles/Url';
import AddSubLocation from './AddSubLocation';

const AllSubLocation = () => {
  const [values, setValues] = useState([])
  const [model, setModel] = useState(false)
  const [updatingData, setUpdatingData] = useState({})
  const [update, setUpdate] = useState(Date.now())

  const getSubLocationList = async () => {
    let res = await getfList(urls.sublocation.getAll)
    setValues(res)
  }

  const changeModel = () => {
    setModel(!model)
    setUpdatingData({})
  }

  const changeandUpdateModel = () => {
    setModel(!model)
    setUpdatingData({})
    setUpdate(Date.now())
  }

  useEffect(() => {
    getSubLocationList()
  }, [update])

  let columns = useMemo(
    () => [
      {
        Header: "Sublocation name",
        accessor: "sublocationName",
      },
      {
        Header: "Code",
        accessor: "sublocationCode",
      },
      {
        Header: "Action",
        accessor: (q) => {
          return (
            <div>
              <MdModeEditOutline className='pointer' onClick={() => {
                setUpdatingData(q)
                setModel(!model)
              }} />
            </div>
          )
        },
        disableSortBy: true,
        disableFilters: true,
        disableGlobalFilter: true
      },
    ],
    []
  )

  return (
    <div className='p-2 d-flex flex-column'>
      {model && <AddSubLocation close={changeModel} closeAndUpdate={changeandUpdateModel} updatingData={updatingData} />}
      <div className='border d-flex justify-content-between p-2'>
        <div className='fw-bold fs-4'>Sublocation</div>
        <div>
          <button className='btn btn-primary' onClick={changeModel}> <AiOutlinePlus size={"1.5rem"} /> Add Sublocation</button>
        </div>
      </div>
      <TableContainer className="-striped -highlight"
        columns={columns} data={values} />
    </div>
  )
}

export default AllSubLocation