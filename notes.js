const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return 'Your notes...';
}


const removeNote = (title) => {
  const notes = loadNotes();
  const goodNotes = notes.filter((note) => note.title !== title);

  if (goodNotes.length < notes.length) {
    console.log(chalk.green.inverse('Note Removed ' + title + '!'));
    saveNotes(goodNotes);
  } else {
    console.log(chalk.red.inverse('Note ' + title + ' not found'));
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  // n nnnnnnnnnnnn
  const duplicateNote = notes.find((note) => note.title === title);

  debugger 
  
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('Note ' + title +' added'));
  } else {
    console.log(chalk.red.inverse('Title taken'));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
    console.log(chalk.green.inverse("Your Notes"));
    let notes = loadNotes();
    notes.forEach((note) => {
      console.log(chalk.blue.inverse(note.title));
    }) 
};

const readNote = (title) => {
    let notes = loadNotes();
    const readNote = notes.find((note) => note.title === title);
    if (readNote) {
      console.log(chalk.green.inverse(readNote.title));
      console.log(readNote.body);
    } else {
      console.log(chalk.red.inverse("Note not found"));
    }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNotes: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
