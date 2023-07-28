"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SQLCollector {
    constructor() {
        this.initializeData();
    }
    initializeData() {
        this.executionTime = 0;
        this.queries = [];
    }
    reset() {
        this.initializeData();
    }
    addQuery({ executionTime, query }) {
        this.executionTime += executionTime;
        this.queries.push({
            executionTime,
            query,
        });
        return this;
    }
    static getInstance() {
        if (!SQLCollector.instance) {
            SQLCollector.instance = new SQLCollector();
        }
        return SQLCollector.instance;
    }
}
exports.default = SQLCollector.getInstance();
