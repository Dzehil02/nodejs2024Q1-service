import { ModelUUID } from 'db-store/types';
import { checkEntityById } from './checkEntityById';

export const addEntityToFavs = <T extends ModelUUID>(id: string, models: Array<T>, results: Array<T>): T => {
    const model = checkEntityById(id, models);

    if (!results.includes(model)) {
        results.push(model);
    }
    return model;
};
