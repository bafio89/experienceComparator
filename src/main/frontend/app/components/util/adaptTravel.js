import React from "react";

function adaptIncludedServices(data) {

    let adptedData = [];
    let splittedData = data[0].split("\n");
    splittedData.forEach(it => (it !== "" ? adptedData.push(<li>{it}</li>) : it));
    return adptedData
}

function adaptIncludedServicesWithPrefix(data) {

    let adptedData = [];
    if (data[0] !== "") {
        adptedData.push("La cassa comune include: ")
    }
    let splittedData = data[0].split("\n");
    splittedData.forEach(it => (it !== "" ? adptedData.push(<li>{it}</li>) : it));
    return adptedData
}

function adaptArray(data) {

    let adptedData = []
    data.forEach(it => (adptedData.push(<li>{it}</li>)));
    return adptedData
}

export {
    adaptIncludedServices,
    adaptIncludedServicesWithPrefix,
    adaptArray
}
