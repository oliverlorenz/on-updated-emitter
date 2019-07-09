import test from 'tape';
import { OnUpdatedEmitter, UpdateData }  from '../../src/index';

const TestObject = class TestObject extends OnUpdatedEmitter { }

test('onUpdate calls callback once, if set called once', function(t) {
    t.plan(1);

    const testObject = new TestObject();
    testObject.onUpdated(() => {
        t.pass('callback was called once')
    });
    
    testObject.set('test value')
})

test('onUpdate contains in updateData a valid previous value', function(t) {
    t.plan(1);

    const testObject = new TestObject();
    testObject.onUpdated((updateData) => {
        UpdateData
        t.equals(updateData.previousValue, null);
    })
    
    testObject.set('test value')
})

test('onUpdate calls callback twice, if set called twice', function(t) {
    t.plan(2);

    const testObject = new TestObject();
    testObject.onUpdated(() => {
        t.pass('callback was called')
    })
    
    testObject.set('test value 1')
    testObject.set('test value 2')
})

test('onUpdate calls callback twice, if set called twice, also if its the same value', function(t) {
    t.plan(2);

    const testObject = new TestObject();
    testObject.onUpdated(() => {
        t.pass('callback was called')
    })
    
    testObject.set('same value')
    testObject.set('same value ')
})

test('Object emits update with changed previousValue in updateData', function(t) {
    t.plan(4);

    const firstUpdateValue = 'first value';
    const secondUpdateValue = 'second value';

    const testObject = new TestObject();
    testObject.onceUpdate((firstUpdateData) => {
        t.equals(firstUpdateData.previousValue, null);
        t.equals(firstUpdateData.currentValue, firstUpdateValue);
        testObject.onceUpdate((secondUpdateData) => {
            t.equals(secondUpdateData.previousValue, firstUpdateValue);
            t.equals(secondUpdateData.currentValue, secondUpdateValue);
        });
        testObject.set(secondUpdateValue);
    })
    testObject.set(firstUpdateValue);
})
