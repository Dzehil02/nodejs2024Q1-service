import { ModelUUID } from 'db-store/types';
import { checkModelById } from 'src/utils/modelValidators';

export const removeEntityFromFavs = <T extends ModelUUID>(id: string, models: Array<T>): void => {
    const entity = checkModelById(id, models);
    if (models.includes(entity)) {
        models.splice(models.indexOf(entity), 1);
    }
};
