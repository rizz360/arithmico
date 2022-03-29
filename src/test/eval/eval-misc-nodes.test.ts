import { Context } from '../../types';
import createBooleanNode from '../../create/BooleanNode';
import createNumberNode from '../../create/NumberNode';
import evaluate from '../../eval';
import createPlus from '../../create/Plus';
import createVector from '../../create/Vector';
import createNegate from '../../create/Negate';

const testContext: Context = {
    options: {
        decimalPlaces: 6,
        magnitudeThresholdForScientificNotation: 6,
        decimalSeparator: '.',
    },
    stack: [
        {
            a: createNumberNode(42),
            g: {
                type: 'function',
                evaluateParametersBefore: true,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                evaluator: (_params, _context) => createNumberNode(42),
                serialized: 'foo',
                header: [{ type: 'number', name: 'x' }],
            },
        },
    ],
};

test('evaluate vector', () => {
    expect(evaluate(createVector([createPlus(createNumberNode(1), createNumberNode(2))]), testContext)).toStrictEqual(
        createVector([createNumberNode(3)]),
    );
});

test('evaluate negate - boolean', () => {
    expect(evaluate(createNegate(createBooleanNode(false)), testContext)).toStrictEqual(createBooleanNode(true));
});

test('evaluate negate - number', () => {
    expect(evaluate(createNegate(createNumberNode(10)), testContext)).toStrictEqual(createNumberNode(-10));
});

test('evaluate negate - throw', () => {
    expect(() => evaluate(createNegate(createVector([])), testContext)).toThrow();
});

test('evaluate unknown node type', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => evaluate({ type: 'foo' }, testContext)).toThrow();
});
