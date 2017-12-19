const fs = require('fs');
const moment = require('moment-timezone');

const getAll = () => {
    const notes = readDatabase();
    return notes;
};

const findOne = (id) => {
    const notes = readDatabase();
    const result = notes.filter(note => note.id == id);

    if (result.length) {
        return result[0];
    } else {
        throw new Error('not-found');
    }
};

const insertOne = (body, color) => {
    const notes = readDatabase();

    notes.push({
        'id' : notes[notes.length - 1] ? notes[notes.length - 1].id + 1 : 1,
        'body': body,
        'color': color,
        'created_at': moment().tz('America/Sao_Paulo').format('DD/MM/YYYY h:mm:ss')
    });

    persistData(notes);
};

const removeOne = (id) => {
    const notes = readDatabase();
    const result = notes.filter(note => note.id != id);


    if (result.length != notes.length) {
        persistData(result);
    } else {
        throw new Error('not-found');
    }
};

const readDatabase = () => {
    try {
        var file = fs.exists(__base  + process.env.DATABASE_PATH);
        const db = fs.readFileSync(__base + process.env.DATABASE_PATH);
        const notes = JSON.parse(db);
        return notes;
    } catch (e) {
        if (e.message == 'Unexpected end of JSON input') {
          return [];
        }
        console.log(e);
        throw new Error("database-error");
    }
}

const persistData = (notes) => {
    try {
        fs.writeFileSync(__base + process.env.DATABASE_PATH, JSON.stringify(notes));
    } catch (e) {
        console.log(e);
        throw new Error('write-error');
    }
}

module.exports = {
    getAll,
    insertOne,
    findOne,
    removeOne
};
