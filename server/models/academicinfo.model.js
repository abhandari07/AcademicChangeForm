import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'academic_info';

/**
 * User model.
 */
class AcademicInfo extends bookshelf.Model {

    get tableName() {
        return TABLE_NAME;
    }

}

export default AcademicInfo;