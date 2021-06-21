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
            // console.log('Client connected!', socket.id);

            // emit to the connected client all current bands
            socket.emit('current-bands', this.bandList.getBands());

            // vote for the band
            socket.on('vote-band', ({ id }) => {
                this.bandList.increaseVote(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });
            // delete the band
            socket.on('delete-band', ({ id }) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });
            // change name of the band
            socket.on('change-band-name', ({ id, name }) => {
                this.bandList.changeBandName(id, name);
                this.io.emit('current-bands', this.bandList.getBands());
            });
        });
    }
}

module.exports = Sockets;
