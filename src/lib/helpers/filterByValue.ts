/**

Filtra un array de objetos por un valor de búsqueda en una o varias propiedades.

@param {Array} arr - El array de objetos

@param {string} value - El valor de búsqueda.

@param {Array} properties - (Opcional) Las propiedades en las que se realizará la búsqueda. Si no se proporciona, se usarán todas las propiedades del primer objeto en el array.

@returns {Array} - El nuevo array filtrado.
*/
export default function filterByValue(arr: any[], value: string, properties: Array<any> = undefined): Array<any> {
    if (arr.length < 1) return arr;
    const normalizedValue = value?.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const regex = new RegExp(normalizedValue, 'i');
    const searchProps = properties || Object.keys(arr[0]); // Usar todas las propiedades si no se proporcionan

    return arr.filter((obj: { [x: string]: string; }) => {
        for (let prop of searchProps) {
            if (typeof obj[prop] === 'string') {
                const normalizedPropValue = obj[prop].toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                if (regex.test(normalizedPropValue)) {
                    return true;
                }
            }
        }
        return false;
    });
}
