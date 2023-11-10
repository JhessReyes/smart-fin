
import _, { type List } from "lodash";
export const summedCategoryGroup = (data: any[]) => {
    const groupedAndSummed = _.chain(data)
        .groupBy('category.id')
        .mapValues(categoryItems => _.sumBy(categoryItems, 'amount'))
        .value();
    return groupedAndSummed
}