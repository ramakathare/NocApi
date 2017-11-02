'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const notify = require('../mailer');



const Schema = mongoose.Schema;


/**
 * Article Schema
 */

const ModelSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId, required: true, default: ObjectId("507f1f77bcf86cd799439011"), ref: 'Client'
    },
    appId: {
        type: Schema.Types.ObjectId, required: true, default: ObjectId("507f191e810c19729de860ea"), ref: 'App'
    },
    name: {
        type: String, trim: true, required: true
    },
    desc: {
        type: String, default: '', trim: true, required: false
    },
    properties: new Schema({ type: Schema.Types.Mixed }, {strict:false}),
    createdAt: {
        type: Date, default: Date.now
    }
});

/**
 * Statics
 */

ArticleSchema.statics = {

    /**
     * Find article by id
     *
     * @param {ObjectId} id
     * @api private
     */

    load: function (_id) {
        return this.find(p => p.appId == ObjectId("507f191e810c19729de860ea") && p.clientId == ObjectId("507f1f77bcf86cd799439011"))
            .populate('user', 'name email username')
            .populate('comments.user')
            .exec();
    },

    /**
     * List articles
     *
     * @param {Object} options
     * @api private
     */

    list: function (options) {
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        return this.find(criteria)
            .populate('user', 'name username')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
};

mongoose.model('Article', ArticleSchema);
