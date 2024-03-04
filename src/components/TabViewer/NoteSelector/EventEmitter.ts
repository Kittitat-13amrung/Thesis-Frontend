
const callbacks: ((arg: any) => any)[] = [];

function emitEvent(event: any) {
    callbacks.forEach((callback) => callback(event));
}

function getStringNumber(y: number, barBounds: any) {
    // TODO: Add padding around first and last frets
    const fretH = barBounds.h / 6;
    if (y > barBounds.y && y < barBounds.y + fretH * 1) {
        return 6;
    }
    if (y > barBounds.y && y < barBounds.y + fretH * 2) {
        return 5;
    }
    if (y > barBounds.y && y < barBounds.y + fretH * 3) {
        return 4;
    }
    if (y > barBounds.y && y < barBounds.y + fretH * 4) {
        return 3;
    }
    if (y > barBounds.y && y < barBounds.y + fretH * 5) {
        return 2;
    }
    if (y > barBounds.y && y < barBounds.y + fretH * 6) {
        return 1;
    }
    return null;
}

function setupListeners(renderer: any) {

    window.addEventListener('alphaTab.beatMouseDown', (event: any) => { // eslint-disable-line
        console.log(event);
    });

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        console.log(event);
        if (event.type === 'keydown' && event.key === 'Delete') {
            emitEvent({
                type: 'delete-selected-note',
                rawEvent: event,
                data: {},
            });
        }
        if (event.type === 'keydown' && event.key === 'ArrowLeft') {
            if (event.ctrlKey) {
                emitEvent({
                    type: 'move-cursor-previous-bar',
                    rawEvent: event,
                    data: {},
                });
            } else {
                emitEvent({
                    type: 'move-cursor-left',
                    rawEvent: event,
                    data: {},
                });
            }
        }
        if (event.type === 'keydown' && event.key === 'ArrowRight') {
            if (event.ctrlKey) {
                emitEvent({
                    type: 'move-cursor-next-bar',
                    rawEvent: event,
                    data: {},
                });
            } else {
                emitEvent({
                    type: 'move-cursor-right',
                    rawEvent: event,
                    data: {},
                });
            }
        }
        if (event.type === 'keydown' && event.key === 'ArrowUp') {
            emitEvent({
                type: 'move-cursor-up',
                rawEvent: event,
                data: {},
            });
        }
        if (event.type === 'keydown' && event.key === 'ArrowDown') {
            emitEvent({
                type: 'move-cursor-down',
                rawEvent: event,
                data: {},
            });
        }
        if (event.type === 'keydown' && event.key === 'Escape') {
            emitEvent({
                type: 'deselect-cursor',
                rawEvent: event,
                data: {},
            });
        }
        if (event.ctrlKey === true && event.key === 'z') {
            emitEvent({
                type: 'undo-action',
                rawEvent: event,
                data: {},
            });
        }
        if (event.ctrlKey === true && event.key === 'y') {
            emitEvent({
                type: 'redo-action',
                rawEvent: event,
                data: {},
            });
        }
    });
}

export default class EventEmitter {
    constructor(renderer: ScoreRenderer, callback: (arg: any) => any) {
        setupListeners(renderer);
        callbacks.push(callback);
    }
}
