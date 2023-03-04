import { Context, EvaluationResult } from './types';
import load from './load';
import defaultPlugins from './plugins';
import evaluationPipeline from './pipeline';

export { serializeStack } from './utils/context-utils';
const loadingResult = load(defaultPlugins, __PROFILE);
const defaultContext = loadingResult.context;
const documentation = loadingResult.documentation;

function foo(a: boolean, b: boolean) {
    return a && b;
}

export const bar = foo(true, false);

export function init() {
    console.warn('init is deprecated');
}

export function getDocumentation() {
    if (!documentation) {
        init();
    }

    return documentation;
}

export function getDefaultContext() {
    if (!defaultContext) {
        init();
    }

    return defaultContext;
}

export default function evaluate(input: string, context?: Context): EvaluationResult {
    if (!context) {
        context = getDefaultContext();
    }

    return evaluationPipeline({ input, context });
}
