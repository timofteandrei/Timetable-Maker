
module.exports = (() => {
    'use strict';
  
    const squel = require('squel');
    const { Extension } = require('./../../config/pools.js');
    const ApplicationRecord = require('./application_record.js');
  
    class Subject extends ApplicationRecord {
      constructor() {
        console.log(Extension);
        super(Extension, "subjects");
      }
  
      where({
        id, userId
      }) {
        let whereClause = squel.expr();
  
        if (id) {
          whereClause = whereClause.and("id = ?", id);
        }
        if (userId) {
          whereClause = whereClause.and('id_user = ?', userId)
        }
        this.query = this.query.where(whereClause);
        return this;
      }
    }
  
    return Subject;
  })();
  