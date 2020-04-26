const DEPHIS = '-',
    LONG_DEPHIS = '—',
    WRONGS_QUOTES = { 1: '“', 2: '”' },
    RIGHT_QUOTES = { 1: '«', 2: '»' },
    TAB = ' ';


class AbstractExpression {
    constructor(context) {
        this.context = context;
    }

    static interpret(context) {
        let correct = context;
        correct = NextString.interpret(correct)
        correct = Spaces.interpret(correct);
        correct = Dephis.interpret(correct);
        correct = Quotes.interpret(correct);
        correct = Tabs.interpret(correct);
        correct = Brackets.interpret(correct);

        this.context = correct;
    }

    static showContext() {
        return this.context
    }
}

class Spaces extends AbstractExpression {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] === ' ' && context[i + 1] === ' ') {
                delete context[i]
            }
        }
        context = context.join('');
        return context
    }
}

class Dephis extends AbstractExpression {
    static interpret(context) {
        context = context.split('');

        for (let i = 0; i < context.length; i++) {
            if (context[i - 1] === ' ' && context[i] === DEPHIS && context[i + 1] === ' ') {
                context[i] = LONG_DEPHIS
            }
        }
        context = context.join('');
        return context
    }
}

class Quotes extends AbstractExpression {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] === WRONGS_QUOTES["1"]) {
                context[i] = RIGHT_QUOTES["1"];
            } else if (context[i] === WRONGS_QUOTES["2"]) {
                context[i] = RIGHT_QUOTES["2"];
            }
        }
        context = context.join('');
        return context
    }
}

class Tabs extends AbstractExpression {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] === TAB && context[i + 1] === TAB) {
                delete context[i]
            }
        }
        context = context.join('');
        return context
    }
}

class Brackets extends AbstractExpression {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] === ' ' && (context[i + 1] === ')' || context[i + 1] === ',' || context[i + 1] === '.')) {
                delete context[i]
            }
            if (context[i] === '(' && context[i + 1] === ' ') {
                delete context[i + 1]
            }
        }
        context = context.join('');
        return context
    }
}

class NextString {
    static interpret(context) {
        context = context.split('');
        for (let i = 0; i < context.length; i++) {
            if (context[i] === DEPHIS && context[i + 1] === DEPHIS) {
                delete context[i];
                context[i + 1] = DEPHIS
            }
        }
        context = context.join('');
        return context
    }
}

AbstractExpression.interpret('Сейчас слева были удалены лишние пробелы. А тут вместо - будет —. Сейчас будут исправлены “кавычки”. ' +
    'Теперь уйдет лишняя табуляция. ( лишний пробелы ) , а также перед знаками препинания . Лишние знаки пере--' +
    'носа строки убраны');
console.log(AbstractExpression.showContext());