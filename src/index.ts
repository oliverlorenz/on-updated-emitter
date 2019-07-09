import { EventEmitter } from 'events';

export class UpdateData {
    public currentValue: any;
    public previousValue: any;

    constructor(currentValue: any, previousValue: any) {
        this.currentValue = currentValue;
        this.previousValue = previousValue;
    }
}

export abstract class OnUpdatedEmitter extends EventEmitter {

    currentValue: any;
    previousUpdateValue: any;

    constructor() {
        super();
        this.currentValue = null
        this.previousUpdateValue = null;
    }

    onUpdated(callback: (updateData: UpdateData) => void): void {
        this.on(OnUpdatedEmitter.EVENT_UPDATED, callback)
    }

    onceUpdate(callback: (updateData: UpdateData) => void): void {
        this.once(OnUpdatedEmitter.EVENT_UPDATED, callback);
    }

    protected emitUpdated(): void {
        this.emit(
            OnUpdatedEmitter.EVENT_UPDATED,
            new UpdateData(
                this.currentValue,
                this.previousUpdateValue
            )
        )
    }

    set(value: any): void {
        this.previousUpdateValue = this.currentValue;
        this.currentValue = value;
        this.emitUpdated();
    }

    get(): any {
        return this.currentValue;
    }

    static get EVENT_UPDATED(): string {
        return 'event_updated'; 
    }
}
