const BandList = require('./band-list');

class Sockets {
    constructor(io) {
        this.io = io;
        this.bandList = new BandList();
        this.socketsEvents();
    }

    socketsEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log('Client connected!', socket.id);

            // emit to the connected client all current bands
            socket.emit('current-bands', this.bandList.getBands());
        });
    }
}

module.exports = Sockets;
