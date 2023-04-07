export const returnData = (data, key) => {
    let v = data?.[key]
    return (v && v != "" && v != undefined && v != null) ? v : ""
}

export const returnErrorColor = (condition) => {
    let v = condition
    return (v && v != undefined && v != null && v != '') ? "border border-danger" : ''
}