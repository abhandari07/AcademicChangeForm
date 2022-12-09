import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'students';

/**
 * User model.
 */
class Student extends bookshelf.Model {

    get tableName() {
        return TABLE_NAME;
    }

}

export default Student;