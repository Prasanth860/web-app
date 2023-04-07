import React, { useEffect, useState } from "react"
import { useTable, useSortBy, useFilters, usePagination, useGlobalFilter } from "react-table"
import { Filter, DefaultColumnFilter } from './filters';
import { Table, Row, Col, Button, Input } from "reactstrap"
import { FaArrowDown } from "react-icons/fa"
import { FaArrowUp } from "react-icons/fa"
import { FaArrowsAltV } from "react-icons/fa"

const TableContainer = ({ columns, data }) => {
    const [pageNum, setPageNum] = useState(0)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows, -> we change 'rows' to 'page'
        page,
        prepareRow,
        visibleColumns,
        // below new props related to 'usePagination' hook
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        state: { globalFilter },
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: { pageIndex: 0, pageSize: 10 },
        sortTypes: {
            alphanumeric: (row1, row2, columnName) => {
                const rowOneColumn = row1.values[columnName];
                const rowTwoColumn = row2.values[columnName];
                if (isNaN(rowOneColumn)) {
                    return rowOneColumn?.toUpperCase() >
                        rowTwoColumn?.toUpperCase()
                        ? 1
                        : -1;
                }
                return Number(rowOneColumn) > Number(rowTwoColumn) ? 1 : -1;
            }
        }
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    )
    const generateSortingIndicator = column => {
        if (!column.disableSortBy) {
            return column.isSorted ? (column.isSortedDesc ? <FaArrowDown /> : <FaArrowUp />) : <FaArrowsAltV />
        }
    }

    const onChangeInSelect = event => {
        setPageSize(Number(event.target.value))
    }

    const onChangeInInput = event => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0
        gotoPage(page)
    }

    const gotoNextPage = () => {
        nextPage()
        const pageNumber = pageIndex + 1
        setPageNum(pageNumber)
    }

    const gotoLastPage = () => {
        gotoPage(pageCount - 1)
        const pageNumber = pageCount - 1
        setPageNum(pageNumber)
    }

    const gotoPreviousPage = () => {
        previousPage()
        const pageNumber = pageIndex + 1
        setPageNum(pageNumber)
    }

    const gotoFirstPage = () => {
        gotoPage(0)
        const pageNumber = pageIndex + 1
        setPageNum(pageNumber)
    }

    useEffect(() => {
        setTimeout(() => {
            if (data && data?.length > 0) {
                gotoPage(pageNum)
            }
        }, "200")
    }, [data])

    return (
        // If you're curious what props we get as a result of calling our getter functions (getTableProps(), getRowProps())
        // Feel free to use console.log()  This will help you better understand how react table works underhood.
        <div style={{ backgroundColor: "#fff" }}>
            <Table >
                <div className="table pb-4 pt-4">
                    {/* <div className=" d-flex justify-content-center">
                        <GlobalFilter filter={globalFilter} setfilter={setGlobalFilter} />
                    </div> */}
                    <table {...getTableProps()} className="table border  ">
                        <thead className="">
                            {headerGroups?.map(headerGroup => (
                                <tr   {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup?.headers?.map(column => (
                                        <>
                                            {column.condition != false && <>
                                                <th className="align-top " {...column.getHeaderProps()}  >
                                                    <div className="d-flex" {...column.getSortByToggleProps()} >
                                                        {column.condition}
                                                        {(column.render("Header")).toUpperCase()}
                                                        {generateSortingIndicator(column)}
                                                    </div>
                                                    <Filter column={column} />
                                                </th>
                                            </>}
                                        </>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()}>
                            {page.length > 0 ? page?.map(row => {
                                prepareRow(row);
                                return (
                                    <>
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                // return <>  <td {...cell.getCellProps()} title={typeof (cell.value) == "string" && cell.value}>{cell.render("Cell")}</td></>
                                                // return <>  <td {...cell.getCellProps()} title={ cell.value}>{cell.render("Cell")}</td></>
                                                return <td {...cell.getCellProps()} >{cell.render("Cell")}</td>
                                            })}
                                        </tr>
                                    </>
                                )
                            }) : <tr className="d-flex align-items-center justify-content-center"> No records found </tr>}
                        </tbody>
                    </table>
                </div>
            </Table>
            <Row className="" style={{ maxWidth: 1000, margin: "0 auto", padding: "15px", textAlign: "center" }}>
                <Col md={1} ></Col>
                <Col md={2} className=" d-flex justify-content-around">
                    <Button
                        color="primary"
                        onClick={() => gotoFirstPage()}
                        disabled={!canPreviousPage}
                    >
                        {"<<"}
                    </Button>
                    <Button
                        color="primary"
                        onClick={gotoPreviousPage}
                        disabled={!canPreviousPage}
                    >
                        {"<"}
                    </Button>
                </Col>
                <Col md={3} className=" d-flex align-items-center justify-content-center">
                    Showing&nbsp;
                    <strong>
                        {/* {(pageIndex * pageSize) + 1}&nbsp; - {((pageIndex + 1) * pageSize) > data.length ? data.length : (pageIndex + 1) * pageSize}&nbsp; of &nbsp;{data.length} */}
                        {(pageIndex * pageSize) + 1}&nbsp; - {((pageIndex + 1) * pageSize) > data.length ? data.length : (pageIndex + 1) * pageSize}&nbsp; of &nbsp;{data.length}
                    </strong>
                </Col>
                {/* <Col md={2} className=" d-flex align-items-center justify-content-center">
                    Page&nbsp;
                    <strong>
                        {pageIndex + 1}&nbsp; of &nbsp;{pageOptions.length}
                    </strong>
                </Col> */}
                <Col md={1}>
                    <Input
                        type="number"
                        min={1}
                        style={{ width: 70 }}
                        max={pageOptions.length}
                        defaultValue={pageIndex + 1}
                        onChange={onChangeInInput}
                    />
                </Col>
                <Col md={1}>
                    <Input type="select" style={{ width: 70 }} value={pageSize} onChange={onChangeInSelect}>
                        {[5, 10, 20, 30, 40, 50]?.map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </Input>
                </Col>
                <Col md={2} className=" d-flex justify-content-around" >
                    <Button color="primary" onClick={gotoNextPage} disabled={!canNextPage}>
                        {">"}
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => gotoLastPage()}
                        disabled={!canNextPage}
                    >
                        {">>"}
                    </Button>
                </Col>
            </Row>
        </ div>
    )
}

export default TableContainer