import { StackFrame } from './../../types/Context';
import evaluate from '..';
import { DefineFunction, Context, SyntaxTreeNode, DefineFunctionParameterType } from '../../types';
import createDefine from '../../create/Define';
import createFunction from '../../create/Function';

export default function evaluateDefineFunction(node: DefineFunction, context: Context): SyntaxTreeNode {
    if (context.stack.length === 0) {
        throw 'ContextError: No stackframes available';
    }

    const evaluator = (parameters: SyntaxTreeNode[], context: Context) => {
        if (parameters.length !== node.parameters.length) {
            throw `RuntimeError: ${node.name}: invalid number of arguments expected ${node.parameters.length} got ${parameters.length}`;
        }

        node.parameters
            .map((parameter) => parameter.type)
            .forEach((pType, index) => {
                let valid = false;

                if (pType === DefineFunctionParameterType.Any) {
                    valid = true;
                } else if (pType === parameters[index].type) {
                    valid = true;
                }

                if (!valid) {
                    throw `TypeError: ${node.name}: at argument #${index}: expected ${pType} got ${parameters[index].type}`;
                }
            });

        const localStackFrame: StackFrame = Object.fromEntries(
            node.parameters.map((parameter, index) => [parameter.name, parameters[index]]),
        );

        const localContext = {
            ...context,
            stack: [...context.stack, localStackFrame],
        };

        return evaluate(node.value, localContext);
    };

    return createDefine(node.name, createFunction(true, evaluator));
}
