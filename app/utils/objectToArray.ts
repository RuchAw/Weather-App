export type dropDownObjectType = {
    [id: string|number]: string
}

export type dropDownDataType = {
    valeur: string | number
    label: string
}

export const transformObjectToArray = (object?: dropDownObjectType): dropDownDataType[] => {
    const transformedArray: dropDownDataType[] = []

    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key]
            transformedArray.push({ valeur: key, label: value })
        }
    }

    return transformedArray
}

type DataWithCle = {
    cle: string | number
    label: string
}

export const changeCleToIdForDropDownData = (dataWithCle: DataWithCle[]): dropDownDataType[] =>{
    return dataWithCle.map(elementWithCle => ({
        valeur: elementWithCle.cle,
        label: elementWithCle.label
    }));
}